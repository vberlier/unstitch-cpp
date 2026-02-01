<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useEventListener } from '@vueuse/core'

import type { ViewportState } from '../vscode'
import { UNIT_X, UNIT_Y } from '../units'

const props = defineProps<{ showColumns?: boolean }>()
const model = defineModel<ViewportState>({ required: true })

const viewport = useTemplateRef('viewport')
const canvas = useTemplateRef('canvas')

const MIN_SCALE = 0.25
const MAX_SCALE = 4

const transformStyle = computed(() => ({
  transform: `translate(${model.value.translateX}px, ${model.value.translateY}px) scale(${model.value.scale})`,
  transformOrigin: '0 0',
}))

let isPanning = false
let lastX = 0
let lastY = 0

useEventListener(viewport, 'mousedown', (e: MouseEvent) => {
  if (e.target === viewport.value || e.target === canvas.value) {
    isPanning = true
    lastX = e.clientX
    lastY = e.clientY
  }
})

useEventListener(window, 'mousemove', (e: MouseEvent) => {
  if (!isPanning) return

  const dx = e.clientX - lastX
  const dy = e.clientY - lastY

  model.value.translateX += dx
  model.value.translateY += dy

  lastX = e.clientX
  lastY = e.clientY
})

useEventListener(window, 'mouseup', () => {
  isPanning = false
})

useEventListener(
  viewport,
  'wheel',
  (e: WheelEvent) => {
    e.preventDefault()
    if (!viewport.value) return

    const rect = viewport.value.getBoundingClientRect()

    const cursorX = e.clientX - rect.left
    const cursorY = e.clientY - rect.top

    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, model.value.scale * zoomFactor))

    const scaleRatio = newScale / model.value.scale

    model.value.translateX = cursorX - scaleRatio * (cursorX - model.value.translateX)

    model.value.translateY = cursorY - scaleRatio * (cursorY - model.value.translateY)

    model.value.scale = newScale
  },
  { passive: false },
)

const backgroundPosition = computed(
  () =>
    `${model.value.translateX}px ${model.value.translateY + UNIT_Y * 0.43 * model.value.scale}px`,
)
const backgroundSize = computed(
  () => `${UNIT_X * model.value.scale}px ${UNIT_Y * model.value.scale}px`,
)
</script>

<template>
  <div ref="viewport" class="viewport" :class="{ showColumns: props.showColumns }">
    <div ref="canvas" class="canvas" :style="transformStyle">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.viewport {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  cursor: move;
}

.viewport.showColumns {
  --background: var(--vscode-editor-background);
  --backgroundLine: var(--vscode-button-secondaryBackground);

  background-position: v-bind(backgroundPosition);
  background-size: v-bind(backgroundSize);
  background-image:
    linear-gradient(
      to right,
      var(--background) 20%,
      transparent 20%,
      transparent 80%,
      var(--background) 80%
    ),
    linear-gradient(to bottom, var(--backgroundLine) 2px, transparent 2px);
}

.canvas {
  will-change: transform;
}
</style>
