<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useEventListener, watchDeep } from '@vueuse/core'

import { send, webviewApi } from './vscode'
import { UNIT_X, UNIT_Y } from './units'
import EditorRoot from './components/EditorRoot.vue'
import EditorNode from './components/EditorNode.vue'
import EditorConnection from './components/EditorConnection.vue'

const state = ref(webviewApi.getState() ?? { scale: 1, translateX: 0, translateY: 0 })
watchDeep(state, (newState) => {
  webviewApi.setState(newState) // currently shared across all editors...
})

const graphNodes = ref<Record<string, GraphNode>>({})
const graphLinks = ref<Record<string, GraphLink>>({})

const graphNodesGrab = ref<Record<string, [number, number]>>({})
const graphNodesToFlush: string[] = []

function flushGraphNodes() {
  for (const key of graphNodesToFlush) {
    graphNodesGrab.value[key] = [0, 0]
  }
}

onMounted(() => {
  send({ type: 'ready' })
})

useEventListener(window, 'message', (event) => {
  const message = event.data as ExtensionMessage
  switch (message.type) {
    case 'update':
      flushGraphNodes()
      newConnection.value = undefined
      graphNodes.value = message.graphNodes
      graphLinks.value = message.graphLinks
      break
  }
})

const isGrabbingNode = ref('')
let lastX = 0
let lastY = 0

function onGrabNode(key: string, x: number, y: number) {
  isGrabbingNode.value = key
  lastX = x
  lastY = y
}

const newConnection = ref<{
  type: 'data' | 'execution'
  side: 'inputs' | 'outputs'
  fromLocation: GraphNodePortLocation
  replaceLocation?: GraphNodePortLocation
  origin: [number, number]
  target: [number, number]
  backward: boolean
}>()

function onGrabConnection(
  type: 'data' | 'execution',
  fromLocation: GraphNodePortLocation,
  toLocation: GraphNodePortLocation,
  x: number,
  y: number,
) {
  onGrabPort(toLocation.key, toLocation.index, type === 'data' ? 'inputs' : 'outputs', x, y)
}

function onGrabPort(key: string, index: number, side: 'inputs' | 'outputs', x: number, y: number) {
  const graphNode = graphNodes.value[key]!
  let fromLocation = { key, index, coordinates: graphNode.coordinates! }
  let replaceLocation: GraphNodePortLocation | undefined

  const port = graphNode[side][index]!
  let backward = port.type === 'data' ? side === 'inputs' : side === 'outputs'
  const link = port.link && graphLinks.value[port.link]
  if (link) {
    backward = false
    side = port.type === 'data' ? 'outputs' : 'inputs'
    fromLocation = link.origin
    replaceLocation = link.targets.filter((t) => t.key === key && t.index === index)[0]
  }

  let origin = getPixelCoordinates(fromLocation)
  if ((port.type === 'data') === !backward) {
    origin = flipSide(origin)
  }

  const [originX, originY] = origin
  const clientX = originX * state.value.scale + state.value.translateX
  const clientY = originY * state.value.scale + state.value.translateY

  const dx = x - clientX
  const dy = y - clientY

  let target: [number, number] = [
    originX + dx / state.value.scale,
    originY + dy / state.value.scale,
  ]
  if ((port.type === 'execution') === !backward) {
    const temp = origin
    origin = target
    target = temp
  }
  newConnection.value = {
    type: port.type,
    side,
    fromLocation,
    replaceLocation,
    origin,
    target,
    backward,
  }

  lastX = x
  lastY = y
}

function onConnectPort(key: string, index: number, side: 'inputs' | 'outputs') {
  if (isGrabbingNode.value) {
    graphNodesToFlush.push(isGrabbingNode.value)
    flushGraphNodes()
    isGrabbingNode.value = ''
  }
  if (newConnection.value) {
    const { type, side: fromSide, fromLocation, replaceLocation } = newConnection.value

    const graphNode = graphNodes.value[key]!
    const port = graphNode[side][index]!
    if (port.type !== type || fromLocation.key === key || fromSide === side) {
      if (replaceLocation) {
        send({
          type: `connect:${type}`,
          fromGraphNodeKey: fromLocation.key,
          fromPortIndex: fromLocation.index,
          replaceGraphNodeKey: replaceLocation.key,
          replacePortIndex: replaceLocation.index,
        })
      } else {
        newConnection.value = undefined
      }
    } else {
      let origin = [fromLocation.key, fromLocation.index] as const
      let target = [key, index] as const
      if (newConnection.value.backward) {
        const temp = origin
        origin = target
        target = temp
      }
      const [fromGraphNodeKey, fromPortIndex] = origin
      const [toGraphNodeKey, toPortIndex] = target
      send({
        type: `connect:${type}`,
        fromGraphNodeKey,
        fromPortIndex,
        toGraphNodeKey,
        toPortIndex,
        replaceGraphNodeKey: replaceLocation?.key,
        replacePortIndex: replaceLocation?.index,
      })
    }
  }
}

useEventListener(window, 'mousemove', (e: MouseEvent) => {
  if (isGrabbingNode.value) {
    const dx = e.clientX - lastX
    const dy = e.clientY - lastY

    const [grabX, grabY] = graphNodesGrab.value[isGrabbingNode.value] ?? [0, 0]

    graphNodesGrab.value[isGrabbingNode.value] = [
      grabX + dx / state.value.scale,
      grabY + dy / state.value.scale,
    ]

    lastX = e.clientX
    lastY = e.clientY
  } else if (newConnection.value) {
    const dx = e.clientX - lastX
    const dy = e.clientY - lastY

    const grab =
      (newConnection.value.type === 'execution') === !newConnection.value.backward
        ? newConnection.value.origin
        : newConnection.value.target

    grab[0] += dx / state.value.scale
    grab[1] += dy / state.value.scale

    lastX = e.clientX
    lastY = e.clientY
  }
})

useEventListener(window, 'mouseup', () => {
  if (isGrabbingNode.value) {
    const [grabX, grabY] = graphNodesGrab.value[isGrabbingNode.value] ?? [0, 0]
    graphNodesToFlush.push(isGrabbingNode.value)

    const graphNode = graphNodes.value[isGrabbingNode.value]
    const [baseX, baseY] = graphNode?.coordinates ?? [0, 0]

    const deltaX = Math.round(grabX / UNIT_X)
    const deltaY = Math.round(grabY / UNIT_Y)

    const newX = baseX + deltaX
    const newY = baseY + deltaY

    const taken = `${newX} ${newY}` in graphNodes.value
    if (!taken) {
      send({ type: 'move', graphNodeKey: isGrabbingNode.value, newCoordinates: [newX, newY] })
    } else {
      flushGraphNodes()
    }

    isGrabbingNode.value = ''
  }
  if (newConnection.value) {
    const { type, fromLocation, replaceLocation } = newConnection.value
    if (replaceLocation) {
      send({
        type: `connect:${type}`,
        fromGraphNodeKey: fromLocation.key,
        fromPortIndex: fromLocation.index,
        replaceGraphNodeKey: replaceLocation.key,
        replacePortIndex: replaceLocation.index,
      })
      newConnection.value = undefined // todo: flush on update
    } else {
      newConnection.value = undefined
    }
  }
})

const nodeMargin = 2 * UNIT_Y
function getPixelCoordinates({
  key,
  coordinates: [x, y],
  index,
}: GraphNodePortLocation): [number, number] {
  const [grabX, grabY] = graphNodesGrab.value[key] ?? [0, 0]
  return [x * UNIT_X + nodeMargin + grabX, (y + index + 8.5) * UNIT_Y + grabY]
}

function flipSide([x, y]: [number, number]): [number, number] {
  return [x + UNIT_X - 2 * nodeMargin, y]
}

function getConnectionEndpoints(
  type: 'data' | 'execution',
  fromLocation: GraphNodePortLocation,
  toLocation: GraphNodePortLocation,
) {
  let origin = getPixelCoordinates(fromLocation)
  let target = getPixelCoordinates(toLocation)

  if (type === 'data') {
    origin = flipSide(origin)
  } else {
    target = flipSide(target)
    const temp = origin
    origin = target
    target = temp
  }

  return { origin, target, fromLocation, toLocation }
}

const connections = computed(() =>
  Object.entries(graphLinks.value)
    .flatMap(([key, graphLink]) =>
      graphLink.targets.map((targetLocation, i) => ({
        key: `${key} ${i}`,
        type: graphLink.type,
        ...getConnectionEndpoints(graphLink.type, graphLink.origin, targetLocation),
      })),
    )
    .filter(({ toLocation }) => toLocation !== newConnection.value?.replaceLocation),
)
</script>

<template>
  <EditorRoot v-model="state">
    <svg class="links">
      <EditorConnection
        v-for="{ key, type, origin, target, fromLocation, toLocation } in connections"
        :type="type"
        :origin="origin"
        :target="target"
        :fromLocation="fromLocation"
        :toLocation="toLocation"
        :key="key"
        @grab="onGrabConnection"
      />
      <EditorConnection
        v-if="newConnection"
        :type="newConnection.type"
        :origin="newConnection.origin"
        :target="newConnection.target"
        key="new"
      />
    </svg>
    <EditorNode
      v-for="[k, v] in Object.entries(graphNodes)"
      :key="k"
      :graph-node="v"
      :grabX="graphNodesGrab[k]?.[0] ?? 0"
      :grabY="graphNodesGrab[k]?.[1] ?? 0"
      :grabbing="k === isGrabbingNode"
      @grab="onGrabNode"
      @grab-port="onGrabPort"
      @connect-port="onConnectPort"
    />
  </EditorRoot>
</template>

<style scoped>
.links {
  overflow: visible;
}
</style>
