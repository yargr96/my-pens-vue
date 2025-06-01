<script setup lang="ts">
import RenderCanvas from '@/components/render-canvas.vue';
import CanvasWrapper from '@/components/canvas-wrapper.vue';
import { createGameOfLife } from '@/modules/game-of-life';
import ControlsButton from '@/components/controls-button.vue';
import { onBeforeUnmount } from 'vue';

let gameOfLife: ReturnType<typeof createGameOfLife>;

const onCanvasMounted = (canvas: HTMLCanvasElement) => {
  gameOfLife = createGameOfLife({ canvas });
};

onBeforeUnmount(() => {
  gameOfLife?.cleanup();
});
</script>

<template>
  <div :class="$style.root">
    <CanvasWrapper #default="{ size }" :class="$style.canvasWrapper">
      <RenderCanvas :size="size" @mounted="onCanvasMounted" />
    </CanvasWrapper>
    <div :class="$style.controls">
      <div :class="$style.controlsRow">
        <ControlsButton :class="$style.button" @click="gameOfLife?.togglePlay()"
          >Play</ControlsButton
        >
        <ControlsButton :class="$style.button" @click="gameOfLife?.clear()">Clear</ControlsButton>
        <ControlsButton :class="$style.button" @click="gameOfLife?.randomFill()"
          >Random Fill</ControlsButton
        >
      </div>
      <div :class="$style.controlsRow">
        <ControlsButton :class="$style.button" @click="gameOfLife?.setSize(5)"
          >Cells small</ControlsButton
        >
        <ControlsButton :class="$style.button" @click="gameOfLife?.setSize(10)"
          >Cells medium</ControlsButton
        >
        <ControlsButton :class="$style.button" @click="gameOfLife?.setSize(20)"
          >Cells large</ControlsButton
        >
      </div>
      <div :class="$style.controlsRow">
        <ControlsButton :class="$style.button" @click="gameOfLife?.setSpeed(10)"
          >Speed small</ControlsButton
        >
        <ControlsButton :class="$style.button" @click="gameOfLife?.setSpeed(30)"
          >Speed medium</ControlsButton
        >
        <ControlsButton :class="$style.button" @click="gameOfLife?.setSpeed('auto')"
          >Speed maximum</ControlsButton
        >
      </div>
    </div>
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
  max-width: max-content;
}

.controlsRow {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
}

.button {
  flex-grow: 1;
  margin-right: 6px;

  &:last-child {
    margin-right: 0;
  }
}
</style>
