<script setup lang="ts">
import CanvasWrapper from '@/components/canvas-wrapper.vue';
import RenderCanvas from '@/components/render-canvas.vue';
import { createGravitySimulator } from '@/modules/gravity-simulator';
import { onBeforeUnmount } from 'vue';

const SCALE = 2;

let gravitySimulator: ReturnType<typeof createGravitySimulator>;

const onCanvasMounted = (canvas: HTMLCanvasElement) => {
  gravitySimulator = createGravitySimulator({ canvas, scale: SCALE });
};

onBeforeUnmount(() => {
  gravitySimulator.cleanup();
});
</script>

<template>
  <CanvasWrapper #default="{ size }" :class="$style.root">
    <RenderCanvas :size="size" :scale="SCALE" @mounted="onCanvasMounted" />
  </CanvasWrapper>
</template>

<style module lang="scss">
.root {
  width: 100%;
  height: 100%;
}
</style>
