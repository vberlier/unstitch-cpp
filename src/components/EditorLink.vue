<script setup lang="ts">
import { computed } from 'vue'

import { UNIT_X, UNIT_Y } from '../units'
import EditorConnection from './EditorConnection.vue'

const props = defineProps<{
  graphLink: GraphLink
  drag: Record<string, [number, number]>
}>()

function getPixelCoordinates(
  { key, coordinates: [x, y], index }: GraphNodePortLocation,
  margin: number,
  drag: Record<string, [number, number]>,
): [number, number] {
  const [dragX, dragY] = drag[key] ?? [0, 0]
  return [x * UNIT_X + margin + dragX, (y + index + 8.5) * UNIT_Y + dragY]
}

const connections = computed(() => {
  return props.graphLink.targets.map((targetLocation) => {
    const margin = 2 * UNIT_Y
    let origin = getPixelCoordinates(props.graphLink.origin, margin, props.drag)
    let target = getPixelCoordinates(targetLocation, margin, props.drag)

    if (props.graphLink.type === 'data') {
      origin[0] += UNIT_X - 2 * margin
    } else {
      target[0] += UNIT_X - 2 * margin
      const temp = origin
      origin = target
      target = temp
    }

    return { type: props.graphLink.type, origin, target }
  })
})
</script>

<template>
  <EditorConnection
    v-for="({ type, origin, target }, i) in connections"
    :type="type"
    :origin="origin"
    :target="target"
    :key="i"
  />
</template>

<style scoped></style>
