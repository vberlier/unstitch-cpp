<script setup lang="ts">
import { computed } from 'vue'

import { UNIT_Y_PX } from '../units'

const props = defineProps<{
  type: 'data' | 'execution'
  origin: [number, number]
  target: [number, number]
  fromLocation?: GraphNodePortLocation
  toLocation?: GraphNodePortLocation
}>()

const emit = defineEmits<{
  grab: [
    type: 'data' | 'execution',
    fromLocation: GraphNodePortLocation,
    toLocation: GraphNodePortLocation,
    x: number,
    y: number,
  ]
}>()

const path = computed(() => {
  const [x1, y1] = props.origin
  const [x2, y2] = props.target

  const dx = Math.abs(x2 - x1) * 0.5

  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
})

function grab(event: MouseEvent) {
  if (props.fromLocation && props.toLocation) {
    emit('grab', props.type, props.fromLocation, props.toLocation, event.clientX, event.clientY)
  }
}
</script>

<template>
  <path class="interact" :d="path" @mousedown.stop="grab($event)" />
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
  stroke-width: v-bind(UNIT_Y_PX);
  stroke-linecap: round;
  cursor: auto;
}

.interact:hover + .path {
  stroke: var(--vscode-list-activeSelectionForeground);
}
</style>
