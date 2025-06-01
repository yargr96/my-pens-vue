<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from 'vue';
import { assert } from '@/utils/assert.ts';

type Props = {
  size: [width: number, height: number];
  scale?: number;
};

type Emits = {
  mounted: [el: HTMLCanvasElement];
};

const {
  size: [width, height],
  scale,
} = withDefaults(defineProps<Props>(), {
  scale: 1,
});
const emit = defineEmits<Emits>();

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvas');

const canvasSize = computed(() => ({
  width: width * scale,
  height: height * scale,
}));

const sizeStyle = computed(() => ({
  width: `${width}px`,
  height: `${height}px`,
}));

onMounted(() => {
  assert(canvasRef.value, 'No canvas mounted');

  emit('mounted', canvasRef.value);
});
</script>

<template>
  <canvas
    ref="canvas"
    :width="canvasSize.width"
    :height="canvasSize.height"
    :class="$style.root"
    :style="sizeStyle"
  />
</template>

<style module lang="scss">
.root {
  display: block;
}
</style>
