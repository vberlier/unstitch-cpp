<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEventListener, watchDeep } from '@vueuse/core'

import { send, webviewApi } from './vscode'
import EditorRoot from './components/EditorRoot.vue'
import EditorNode from './components/EditorNode.vue'
import EditorLink from './components/EditorLink.vue'

const state = ref(webviewApi.getState() ?? { scale: 1, translateX: 0, translateY: 0 })
watchDeep(state, (newState) => {
  webviewApi.setState(newState) // currently shared across all editors...
})

const graphNodes = ref<Record<string, GraphNode>>({})
const graphLinks = ref<Record<string, GraphLink>>({})
const graphNodesDrag = ref<Record<string, [number, number]>>({})

onMounted(() => {
  send({ type: 'ready' })
})

useEventListener(window, 'message', (event) => {
  const message = event.data as ExtensionMessage
  switch (message.type) {
    case 'update':
      graphNodes.value = message.graphNodes
      graphLinks.value = message.graphLinks
      break
  }
})

const isDraggingNode = ref('')
let lastX = 0
let lastY = 0

function onDragNode(key: string, x: number, y: number, el: HTMLElement) {
  isDraggingNode.value = key
  lastX = x
  lastY = y
}

useEventListener(window, 'mousemove', (e: MouseEvent) => {
  if (!isDraggingNode.value) return

  const dx = e.clientX - lastX
  const dy = e.clientY - lastY

  const [dragX, dragY] = graphNodesDrag.value[isDraggingNode.value] ?? [0, 0]

  graphNodesDrag.value[isDraggingNode.value] = [
    dragX + dx / state.value.scale,
    dragY + dy / state.value.scale,
  ]

  lastX = e.clientX
  lastY = e.clientY
})

useEventListener(window, 'mouseup', () => {
  isDraggingNode.value = ''
})
</script>

<template>
  <EditorRoot v-model="state">
    <svg class="links">
      <EditorLink
        v-for="[k, v] in Object.entries(graphLinks)"
        :key="k"
        :graph-link="v"
        :drag="graphNodesDrag"
      />
    </svg>
    <EditorNode
      v-for="[k, v] in Object.entries(graphNodes)"
      :key="k"
      :graph-node="v"
      :dragX="graphNodesDrag[k]?.[0] ?? 0"
      :dragY="graphNodesDrag[k]?.[1] ?? 0"
      :dragging="k === isDraggingNode"
      @drag="onDragNode"
    />
  </EditorRoot>
</template>

<style scoped>
.links {
  overflow: visible;
}
</style>
