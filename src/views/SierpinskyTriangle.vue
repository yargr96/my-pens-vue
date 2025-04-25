<script setup lang="ts">
import AppCanvas from '@/components/AppCanvas.vue'

const onCanvasMounted = (el: HTMLCanvasElement) => {
  console.log(el)
}
</script>

<template>
  <AppCanvas @canvasMounted="onCanvasMounted" />
</template>
