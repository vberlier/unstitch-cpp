<script setup lang="ts">
import { computed } from 'vue'

import { UNIT_X, UNIT_Y } from '../units'
import EditorConnection from './EditorConnection.vue'

const props = defineProps<{ graphLink: GraphLink }>()

function applyScale([x, y]: [number, number]): [number, number] {
  return [x * UNIT_X, y * UNIT_Y]
}

const connections = computed(() => {
  return props.graphLink.targets.map((targetLocation) => {
    let origin = applyScale(props.graphLink.origin.coordinates)
    let target = applyScale(targetLocation.coordinates)

    origin[1] += (props.graphLink.origin.index + 8.5) * UNIT_Y
    target[1] += (targetLocation.index + 8.5) * UNIT_Y

    const margin = 2 * UNIT_Y
    origin[0] += margin
    target[0] += margin

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
