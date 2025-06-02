<script setup lang="ts">
import ControlsGrid, { type Buttons } from '@/components/controls-grid.vue';
import CanvasWrapper from '@/components/canvas-wrapper.vue';
import RenderCanvas from '@/components/render-canvas.vue';
import { createFractalSets } from '@/modules/fractal-sets';
import { onBeforeUnmount } from 'vue';

let fractalSets: ReturnType<typeof createFractalSets>;

const controlsGridButtons: Buttons = [
  [
    { text: 'Mandelbrot set', action: () => fractalSets.selectSet('mandelbrot') },
    { text: 'Julia set', action: () => fractalSets.selectSet('julia') },
  ],
  [
    { text: '+', action: () => fractalSets.setZoom(2) },
    { text: '-', action: () => fractalSets.setZoom(0.5) },
  ],
];

const onCanvasMounted = (canvas: HTMLCanvasElement) => {
  fractalSets = createFractalSets({ canvas });
};

onBeforeUnmount(() => {
  fractalSets.cleanup();
});
</script>

<template>
  <div :class="$style.root">
    <CanvasWrapper #default="{ size }" :class="$style.canvasWrapper">
      <RenderCanvas :class="$style.canvas" :size="size" @mounted="onCanvasMounted" />
    </CanvasWrapper>
    <ControlsGrid :buttons="controlsGridButtons" :class="$style.controls" />
  </div>
</template>

<style module lang="scss">
.root {
  width: 100%;
  height: 100%;
}

.canvasWrapper {
  width: 100%;
  height: 100%;
}

.canvas {
  cursor: move;
}

.controls {
  position: absolute;
  right: 20px;
  bottom: 20px;
  left: 20px;
  margin-left: auto;
}
</style>
