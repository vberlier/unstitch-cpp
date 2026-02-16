<script setup lang="ts">
import { computed } from 'vue'

import { UNIT_X, UNIT_Y, UNIT_X_PX, UNIT_Y_PX } from '../units'

const props = defineProps<{
  graphNode: GraphNode
  grabX: number
  grabY: number
  grabbing: boolean
}>()

const emit = defineEmits<{
  grab: [key: string, x: number, y: number]
  grabPort: [key: string, index: number, side: 'inputs' | 'outputs', x: number, y: number]
  connectPort: [key: string, index: number, side: 'inputs' | 'outputs']
}>()

const collapse = computed(
  () =>
    props.graphNode.inputs.length === 0 &&
    props.graphNode.outputs.length === 1 &&
    props.graphNode.outputs[0]?.type === 'data',
)

const alignClasses = computed(() => ({
  alignInputs: props.graphNode.inputs.length > 0,
  alignOutputs: props.graphNode.outputs.length > 0,
}))

const transformStyle = computed(() =>
  props.graphNode.coordinates
    ? {
        transform: `translate(${props.graphNode.coordinates[0] * UNIT_X + props.grabX}px, ${props.graphNode.coordinates[1] * UNIT_Y + props.grabY}px)`,
      }
    : {},
)

const shadowOffsetX = computed(() => `${Math.round(props.grabX / UNIT_X) * UNIT_X - props.grabX}px`)
const shadowOffsetY = computed(() => `${Math.round(props.grabY / UNIT_Y) * UNIT_Y - props.grabY}px`)

function grabPort(event: MouseEvent, index: number, side: 'inputs' | 'outputs') {
  emit('grabPort', props.graphNode.key, index, side, event.clientX, event.clientY)
}

function connectPort(event: MouseEvent, index: number, side: 'inputs' | 'outputs') {
  emit('connectPort', props.graphNode.key, index, side)
}
</script>

<template>
  <div
    class="wrapper"
    :class="{ grabbing: props.grabbing }"
    :style="transformStyle"
    @mousedown.stop="emit('grab', props.graphNode.key, $event.clientX, $event.clientY)"
  >
    <div v-if="collapse" class="content collapse" :class="alignClasses">
      {{ props.graphNode.title }}
    </div>
    <div v-else class="content box" :class="alignClasses">
      <div class="title truncate" :title="props.graphNode.title">
        {{ props.graphNode.title }}
      </div>
      <div
        class="input truncate"
        v-for="(input, i) in props.graphNode.inputs"
        :key="input.link"
        :style="`grid-row: ${i + 2};`"
      >
        {{ input.name }} {{ input.default && '= ' + input.default }}
      </div>
      <div
        class="output truncate"
        v-for="(output, i) in props.graphNode.outputs"
        :key="output.link"
        :style="`grid-row: ${i + 2};`"
        :title="output.name"
      >
        {{ output.name }}
      </div>
    </div>
    <div class="inputPorts">
      <div
        v-for="(input, i) in props.graphNode.inputs"
        class="inputPort"
        :key="i"
        @mousedown.stop="grabPort($event, i, 'inputs')"
        @mouseup.stop="connectPort($event, i, 'inputs')"
      >
        <div :class="input.type"></div>
      </div>
    </div>
    <div class="outputPorts">
      <div
        v-for="(output, i) in props.graphNode.outputs"
        class="outputPort"
        :key="i"
        @mousedown.stop="grabPort($event, i, 'outputs')"
        @mouseup.stop="connectPort($event, i, 'outputs')"
      >
        <div :class="output.type"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: absolute;
  width: v-bind(UNIT_X_PX);
  cursor: grab;
  user-select: none;
  will-change: transform;
  --foreground: var(--vscode-button-secondaryForeground);
  --background: var(--vscode-button-secondaryBackground);
}

.wrapper:hover {
  --background: var(--vscode-button-secondaryHoverBackground);
}

.wrapper.grabbing {
  cursor: grabbing;
  --foreground: var(--vscode-list-activeSelectionForeground);
  z-index: 10;
}

.content {
  color: var(--foreground);
  border: 1px var(--foreground) solid;
  background-color: var(--background);
  line-height: v-bind(UNIT_Y_PX);
  border-radius: calc(0.5 * v-bind(UNIT_Y_PX));
}

.content::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--foreground);
  border-radius: calc(0.5 * v-bind(UNIT_Y_PX));
  transform: translate(v-bind(shadowOffsetX), v-bind(shadowOffsetY));
  opacity: 0.4;
  pointer-events: none;
  z-index: -1;
}

.collapse {
  position: absolute;
  max-width: v-bind(UNIT_X_PX);
  margin: v-bind(UNIT_Y_PX) calc(2 * v-bind(UNIT_Y_PX));
  padding: calc(0.5 * v-bind(UNIT_Y_PX)) 18px;
  text-align: right;
}

.box {
  position: absolute;
  display: grid;
  grid-template-columns: auto auto;
  margin: 0 calc(2 * v-bind(UNIT_Y_PX));
  padding-bottom: calc(0.5 * v-bind(UNIT_Y_PX));
}

.alignInputs {
  left: 0;
}

.alignOutputs {
  right: 0;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title {
  grid-column: 1/3;
  height: v-bind(UNIT_Y_PX);
  padding: 0 18px;
  margin-bottom: 11px;
  border-bottom: 1px var(--foreground) solid;
}

.input {
  position: relative;
  height: v-bind(UNIT_Y_PX);
  grid-column: 1/2;
  padding-left: 18px;
  padding-right: 4px;
}

.output {
  position: relative;
  height: v-bind(UNIT_Y_PX);
  grid-column: 2/3;
  padding-left: 4px;
  padding-right: 18px;
  text-align: right;
}

.inputPorts,
.outputPorts {
  position: absolute;
  top: 38px;
}

.inputPorts {
  left: calc(1.5 * v-bind(UNIT_Y_PX));
}

.outputPorts {
  right: calc(1.5 * v-bind(UNIT_Y_PX));
}

.inputPort,
.outputPort {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: v-bind(UNIT_Y_PX);
  height: v-bind(UNIT_Y_PX);
  cursor: auto;

  &:hover {
    transform: scale(1.5);
  }
}

.data {
  position: relative;
  height: calc(0.6 * v-bind(UNIT_Y_PX));
  width: calc(0.6 * v-bind(UNIT_Y_PX));
  border-radius: 50%;
  box-sizing: border-box;
  border: 1px var(--foreground) solid;
  background: var(--background);
}

.execution {
  position: relative;
  width: 0;
  height: 0;
  left: 6px;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 8px solid var(--foreground);
  box-shadow: -8px 0 var(--foreground);
}
</style>
