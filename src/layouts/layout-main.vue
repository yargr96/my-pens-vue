<script setup lang="ts">
import { ref } from 'vue';
import BurgerButton from '@/components/burger-button.vue';
import SidebarMain from '@/components/sidebar-main.vue';

const isSidebarOpened = ref(false);
</script>

<template>
  <div :class="$style.root">
    <BurgerButton :class="$style.burger" @click="isSidebarOpened = !isSidebarOpened" />
    <SidebarMain
      :class="$style.sidebar"
      :opened="isSidebarOpened"
      @close="isSidebarOpened = false"
    />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  height: 100%;
  overflow-x: hidden;
}

.sidebar {
  width: 300px;
  height: 100%;
  background-color: var(--color-dark);
  flex-shrink: 0;
}

.content {
  height: 100%;
  flex-grow: 1;
  position: relative;
}

.burger {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
}
</style>
