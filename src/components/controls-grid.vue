<script setup lang="ts">
import ControlsButton from '@/components/controls-button.vue';

type Button = {
  text: string;
  action: () => void;
};

export type Buttons = Button[][];

type Props = {
  buttons: Buttons;
};

const { buttons } = defineProps<Props>();
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.row" v-for="(row, i) in buttons" :key="i">
      <ControlsButton v-for="(item, j) in row" :key="j" :class="$style.item" @click="item.action">
        {{ item.text }}
      </ControlsButton>
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  max-width: max-content;
}

.row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
}

.item {
  flex-grow: 1;
  margin-right: 6px;

  &:last-child {
    margin-right: 0;
  }
}
</style>
