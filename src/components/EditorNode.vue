<script setup lang="ts">
import { computed } from 'vue'

import { UNIT_X, UNIT_Y, UNIT_X_PX, UNIT_Y_PX } from '../units'

const props = defineProps<{ graphNode: GraphNode }>()

const collapse = computed(
  () => props.graphNode.inputs.length === 0 && props.graphNode.outputs.length === 1,
)

const alignClasses = computed(() => ({
  alignInputs: props.graphNode.inputs.length > 0,
  alignOutputs: props.graphNode.outputs.length > 0,
}))

const transformStyle = computed(() =>
  props.graphNode.coordinates
    ? {
        transform: `translate(${props.graphNode.coordinates[0] * UNIT_X}px, ${props.graphNode.coordinates[1] * UNIT_Y}px)`,
      }
    : {},
)
</script>

<template>
  <div class="wrapper" :style="transformStyle">
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
      <div v-for="(input, i) in props.graphNode.inputs" :class="input.type" :key="i"></div>
    </div>
    <div class="outputPorts">
      <div v-for="(output, i) in props.graphNode.outputs" :class="output.type" :key="i"></div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: absolute;
  width: v-bind(UNIT_X_PX);
  will-change: transform;
  --foreground: var(--vscode-button-secondaryForeground);
  --background: var(--vscode-button-secondaryBackground);
  --hoverForeground: var(--vscode-list-activeSelectionForeground);
}

.content {
  color: var(--foreground);
  border: 1px var(--foreground) solid;
  background-color: var(--background);
  line-height: v-bind(UNIT_Y_PX);
  border-radius: calc(0.5 * v-bind(UNIT_Y_PX));
  cursor: pointer;
  user-select: none;
}

.content:hover {
  color: var(--hoverForeground);
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
  top: 32px;
}

.inputPorts {
  left: calc(2 * v-bind(UNIT_Y_PX) - 6px);
}

.outputPorts {
  right: calc(2 * v-bind(UNIT_Y_PX) - 6px);
}

.data,
.execution {
  position: relative;
  height: calc(0.5 * v-bind(UNIT_Y_PX));
  margin: calc(0.5 * v-bind(UNIT_Y_PX)) 0;
}

.data {
  width: calc(0.5 * v-bind(UNIT_Y_PX));
  border-radius: 50%;
  box-sizing: border-box;
  border: 1px var(--foreground) solid;
  background: var(--background);
}

.execution {
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 14px solid var(--foreground);
}
</style>
