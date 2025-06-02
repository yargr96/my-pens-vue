<script setup lang="ts">
import CanvasWrapper from '@/components/canvas-wrapper.vue';
import RenderCanvas from '@/components/render-canvas.vue';
import { createSierpinskiTriangle } from '@/modules/sierpinski-triangle';
import { onBeforeUnmount, ref, watch } from 'vue';

const SCALE = 2;

let sierpinskiTriangle: ReturnType<typeof createSierpinskiTriangle>;

const basePointsCount = ref(3);

const onCanvasMounted = (canvas: HTMLCanvasElement) => {
  sierpinskiTriangle = createSierpinskiTriangle({ canvas });
};

watch(
  () => basePointsCount.value,
  (value) => {
    sierpinskiTriangle.setBasePointsCount(value);
  },
);

onBeforeUnmount(() => {
  sierpinskiTriangle.cleanup();
});
</script>

<template>
  <div :class="$style.root">
    <CanvasWrapper #default="{ size }" :class="$style.canvasWrapper">
      <RenderCanvas :size="size" :scale="SCALE" @mounted="onCanvasMounted" />
    </CanvasWrapper>
    <input type="range" :class="$style.range" min="3" max="10" v-model="basePointsCount" />
  </div>
</template>

<style module lang="scss">
.root,
.canvasWrapper {
  width: 100%;
  height: 100%;
}

.range {
  position: absolute;
  right: 0;
  bottom: 100px;
  left: 0;
  margin: auto;
  width: 300px;
}
</style>
