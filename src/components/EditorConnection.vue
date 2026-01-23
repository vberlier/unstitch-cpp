<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: 'data' | 'execution'
  origin: [number, number]
  target: [number, number]
}>()

const path = computed(() => {
  const [x1, y1] = props.origin
  const [x2, y2] = props.target

  const dx = Math.abs(x2 - x1) * 0.5

  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
})
</script>

<template>
  <path class="interact" :d="path" />
  <path class="path" :class="[props.type]" :d="path" />
</template>

<style scoped>
.path {
  fill: none;
  stroke: var(--vscode-button-secondaryForeground);
  stroke-width: 2;
  pointer-events: none;
}

.data {
  stroke-dasharray: 4;
  stroke-linecap: round;
}

.interact {
  fill: none;
  stroke: transparent;
  stroke-width: 16;
  cursor: pointer;
}

.interact:hover + .path {
  stroke: var(--vscode-list-activeSelectionForeground);
}
</style>
