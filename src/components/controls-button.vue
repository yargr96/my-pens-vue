<template>
  <button type="button" :class="$style.root">
    <slot />
  </button>
</template>

<style module lang="scss">
.root {
  color: var(--color-light);
  background-color: var(--color-primary);
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  flex-grow: 1;
}
</style>
