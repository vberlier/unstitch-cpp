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

useEventListener(window, 'mousemove', (e: MouseEvent) => {
  if (!isGrabbingNode.value) return

  const dx = e.clientX - lastX
  const dy = e.clientY - lastY

  const [grabX, grabY] = graphNodesGrab.value[isGrabbingNode.value] ?? [0, 0]

  graphNodesGrab.value[isGrabbingNode.value] = [
    grabX + dx / state.value.scale,
    grabY + dy / state.value.scale,
  ]

  lastX = e.clientX
  lastY = e.clientY
})

useEventListener(window, 'mouseup', () => {
  if (!isGrabbingNode.value) return

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
})

function getPixelCoordinates(
  { key, coordinates: [x, y], index }: GraphNodePortLocation,
  margin: number,
): [number, number] {
  const [grabX, grabY] = graphNodesGrab.value[key] ?? [0, 0]
  return [x * UNIT_X + margin + grabX, (y + index + 8.5) * UNIT_Y + grabY]
}

const nodeMargin = 2 * UNIT_Y
const connections = computed(() =>
  Object.entries(graphLinks.value).flatMap(([key, graphLink]) =>
    graphLink.targets.map((targetLocation, i) => {
      let origin = getPixelCoordinates(graphLink.origin, nodeMargin)
      let target = getPixelCoordinates(targetLocation, nodeMargin)

      if (graphLink.type === 'data') {
        origin[0] += UNIT_X - 2 * nodeMargin
      } else {
        target[0] += UNIT_X - 2 * nodeMargin
        const temp = origin
        origin = target
        target = temp
      }

      return { key: `${key} ${i}`, type: graphLink.type, origin, target }
    }),
  ),
)
</script>

<template>
  <EditorRoot v-model="state">
    <svg class="links">
      <EditorConnection
        v-for="{ key, type, origin, target } in connections"
        :type="type"
        :origin="origin"
        :target="target"
        :key="key"
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
    />
  </EditorRoot>
</template>

<style scoped>
.links {
  overflow: visible;
}
</style>
