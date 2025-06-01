<script setup lang="ts">
import RenderCanvas from '@/components/render-canvas.vue';
import CanvasWrapper from '@/components/canvas-wrapper.vue';

const onCanvasMounted = (e: HTMLCanvasElement) => {
  console.log(e);
};
</script>

<template>
  <div :class="$style.root">
    <CanvasWrapper #default="{ size }" :class="$style.canvasWrapper">
      <RenderCanvas :size="size" :scale="2" @mounted="onCanvasMounted" />
    </CanvasWrapper>
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
</style>
