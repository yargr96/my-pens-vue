<script setup lang="ts">
type Props = {
  opened: boolean;
};

withDefaults(defineProps<Props>(), {
  opened: false,
});
</script>

<template>
  <div :class="[$style.root, opened && $style.active]">
    <div :class="$style.header">
      <div :class="$style.logoPre">Pens by</div>
      Yaroslav Gromov
    </div>
    <div :class="$style.items" />
  </div>
</template>

<style module lang="scss">
.root {
  border-right: 1px solid var(--color-light);
  color: var(--color-light);
  transform: translateX(calc(-100% - 10px));
  transition: transform 0.3s;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  &.active {
    transform: none;
  }
}

.header {
  padding: 10px 10px 10px 60px;
  background-color: var(--color-primary);
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 20px;
}

.logoPre {
  font-size: 12px;
  font-style: italic;
  margin-bottom: 2px;
}

.items {
  font-size: 18px;
}

.item {
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s;

  &.active {
    background-color: var(--color-gray-500);
    color: var(--color-dark);
  }

  &:hover {
    background-color: rgba(var(--color-gray-500), 0.8);
  }
}
</style>
