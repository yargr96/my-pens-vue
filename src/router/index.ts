import { createRouter, createWebHistory } from 'vue-router';
import {
  ROUTE_FRACTAL_SETS,
  ROUTE_GAME_OF_LIFE,
  ROUTE_GRAVITY,
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
    },
    {
      path: '/game-of-life',
      name: ROUTE_GAME_OF_LIFE,
    },
    {
      path: '/gravity',
      name: ROUTE_GRAVITY,
    },
    {
      path: '/sierpinski-triangle',
      name: ROUTE_SIERPINSKI_TRIANGLE,
    },
  ],
});

export default router;
