<script setup lang="ts">
import { ref, computed, useTemplateRef, watchEffect } from 'vue'
import { useEventListener } from '@vueuse/core'

import { webviewApi } from '../vscode'

const state = webviewApi.getState()

const viewport = useTemplateRef('viewport')
const canvas = useTemplateRef('canvas')

const scale = ref(state?.scale ?? 1)
const translateX = ref(state?.translateX ?? 0)
const translateY = ref(state?.translateY ?? 0)

watchEffect(() => {
  webviewApi.setState({
    scale: scale.value,
    translateX: translateX.value,
    translateY: translateY.value,
  })
})

const MIN_SCALE = 0.25
const MAX_SCALE = 4

const transformStyle = computed(() => ({
  transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
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

  translateX.value += dx
  translateY.value += dy

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
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale.value * zoomFactor))

    const scaleRatio = newScale / scale.value

    translateX.value = cursorX - scaleRatio * (cursorX - translateX.value)

    translateY.value = cursorY - scaleRatio * (cursorY - translateY.value)

    scale.value = newScale
  },
  { passive: false },
)
</script>

<template>
  <div ref="viewport" class="viewport">
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
}

.canvas {
  will-change: transform;
}
</style>
