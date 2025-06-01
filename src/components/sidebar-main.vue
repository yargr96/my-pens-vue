<script setup lang="ts">
import {
  ROUTE_FRACTAL_SETS,
  ROUTE_GAME_OF_LIFE,
  ROUTE_GRAVITY,
  ROUTE_SIERPINSKI_TRIANGLE,
} from '@/router/routes.ts';

type Props = {
  opened: boolean;
};

type Item = {
  text: string;
  routeName: symbol;
};

withDefaults(defineProps<Props>(), {
  opened: false,
});

const items: Item[] = [
  {
    text: 'Fractal sets',
    routeName: ROUTE_FRACTAL_SETS,
  },
  {
    text: 'Game of Life',
    routeName: ROUTE_GAME_OF_LIFE,
  },
  {
    text: 'Gravity',
    routeName: ROUTE_GRAVITY,
  },
  {
    text: 'Sierpinski triangle',
    routeName: ROUTE_SIERPINSKI_TRIANGLE,
  },
];
</script>

<template>
  <div :class="[$style.root, opened && $style.active]">
    <div :class="$style.header">
      <div :class="$style.logoPre">Pens by</div>
      Yaroslav Gromov
    </div>
    <div :class="$style.items">
      <router-link
        v-for="item in items"
        :key="item.routeName"
        :class="$style.item"
        :to="{ name: item.routeName }"
      >
        {{ item.text }}
      </router-link>
    </div>
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
  display: block;
  text-decoration: none;
  color: var(--color-light);

  &:global(.router-link-active) {
    background-color: var(--color-gray-500);
    color: var(--color-dark);
  }

  &:hover {
    background-color: var(--color-gray-500-alpha-80);
  }

  &:visited {
    color: var(--color-light);
  }
}
</style>
