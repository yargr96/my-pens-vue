import { createRouter, createWebHistory } from 'vue-router';
import {
  ROUTE_FRACTAL_SETS,
  ROUTE_GAME_OF_LIFE,
  ROUTE_GRAVITY_SIMULATOR,
  ROUTE_SIERPINSKI_TRIANGLE,
} from '@/router/routes.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: ROUTE_FRACTAL_SETS,
      },
    },
    {
      path: '/fractal-sets',
      name: ROUTE_FRACTAL_SETS,
      component: () => import('@/views/fractal-sets.vue'),
    },
    {
      path: '/game-of-life',
      name: ROUTE_GAME_OF_LIFE,
      component: () => import('@/views/game-of-life.vue'),
    },
    {
      path: '/gravity-simulator',
      name: ROUTE_GRAVITY_SIMULATOR,
      component: () => import('@/views/gravity-simulator.vue'),
    },
    {
      path: '/sierpinski-triangle',
      name: ROUTE_SIERPINSKI_TRIANGLE,
      component: () => import('@/views/sierpinski-triangle.vue'),
    },
  ],
});

export default router;
