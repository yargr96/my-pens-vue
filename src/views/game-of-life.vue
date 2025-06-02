<script setup lang="ts">
import RenderCanvas from '@/components/render-canvas.vue';
import CanvasWrapper from '@/components/canvas-wrapper.vue';
import { createGameOfLife } from '@/modules/game-of-life';
import { onBeforeUnmount } from 'vue';
import ControlsGrid, { type Buttons } from '@/components/controls-grid.vue';

let gameOfLife: ReturnType<typeof createGameOfLife>;

const onCanvasMounted = (canvas: HTMLCanvasElement) => {
  gameOfLife = createGameOfLife({ canvas });
};

onBeforeUnmount(() => {
  gameOfLife?.cleanup();
});

const controlsGridButtons: Buttons = [
  [
    { text: 'Play', action: () => void gameOfLife?.togglePlay() },
    { text: 'Clear', action: () => void gameOfLife?.clear() },
    { text: 'Random Fill', action: () => void gameOfLife?.randomFill() },
  ],
  [
    { text: 'Cells small', action: () => void gameOfLife?.setSize(5) },
    { text: 'Cells medium', action: () => void gameOfLife?.setSize(10) },
    { text: 'Cells large', action: () => void gameOfLife?.setSize(20) },
  ],
  [
    { text: 'Speed small', action: () => void gameOfLife?.setSpeed(10) },
    { text: 'Speed medium', action: () => void gameOfLife?.setSpeed(20) },
    { text: 'Speed maximum', action: () => void gameOfLife?.setSpeed('auto') },
  ],
];
</script>

<template>
  <div :class="$style.root">
    <CanvasWrapper #default="{ size }" :class="$style.canvasWrapper">
      <RenderCanvas :size="size" @mounted="onCanvasMounted" />
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

.controls {
  position: absolute;
  right: 20px;
  bottom: 20px;
  left: 20px;
  margin-left: auto;
}
</style>
