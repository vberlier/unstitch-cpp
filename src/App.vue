<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEventListener } from '@vueuse/core'

import { send } from './vscode'
import EditorRoot from './components/EditorRoot.vue'
import EditorNode from './components/EditorNode.vue'
import EditorLink from './components/EditorLink.vue'

const graphNodes = ref<Record<string, GraphNode>>({})
const graphLinks = ref<Record<string, GraphLink>>({})

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
</script>

<template>
  <EditorRoot>
    <svg class="links">
      <EditorLink v-for="[k, v] in Object.entries(graphLinks)" :key="k" :graph-link="v" />
    </svg>
    <EditorNode v-for="[k, v] in Object.entries(graphNodes)" :key="k" :graph-node="v" />
  </EditorRoot>
</template>

<style scoped>
.links {
  overflow: visible;
}
</style>
