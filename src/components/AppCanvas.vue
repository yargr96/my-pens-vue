<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'

type Emits = {
  canvasMounted: [el: HTMLCanvasElement]
}

const emit = defineEmits<Emits>()

const DEFAULT_CANVAS_SCALE = 2

const root = useTemplateRef('root')
const canvas = useTemplateRef('canvas')

onMounted(() => {
  const { width, height } = root.value.getBoundingClientRect()
  canvas.value.width = width * DEFAULT_CANVAS_SCALE
  canvas.value.height = height * DEFAULT_CANVAS_SCALE

  emit('canvasMounted', canvas.value)
})
</script>

<template>
  <div ref="root" :class="$style.root">
    <canvas ref="canvas" :class="$style.canvas" />
  </div>
</template>

<style module lang="scss">
.root {
  width: 100%;
  height: 100%;
}

.canvas {
  display: block;
}
</style>
