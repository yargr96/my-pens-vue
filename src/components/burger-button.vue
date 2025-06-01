<template>
  <div :class="$style.root">
    <div v-for="n in 3" :key="n" :class="$style.line"></div>
  </div>
</template>

<style module lang="scss">
.root {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-light);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 9px 5px;
  background-color: var(--color-primary);
  cursor: pointer;
  transition: background-color .3s;

  &:hover {
    background-color: var(--color-primary-alpha-80);
  }
}

.line {
  height: 2px;
  border-radius: 50px;
  width: 100%;
  background-color: var(--color-light);;
}
</style>
