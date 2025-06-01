<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';
import { assert } from '@/utils/assert.ts';

const rootRef = useTemplateRef('root');

const size = ref<[width: number, height: number]>();

onMounted(() => {
  assert(rootRef.value, 'Canvas not mounted');

  const { width, height } = rootRef.value.getBoundingClientRect();
  size.value = [width, height];
});
</script>

<template>
  <div ref="root">
    <slot v-if="size" :size="size" />
  </div>
</template>
