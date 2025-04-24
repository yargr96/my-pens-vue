import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/game-of-life',
      name: 'game-of-life',
      component: () => import('../views/GameOfLife.vue'),
    },
    {
      path: '/sierpinsky-triangle',
      name: 'sierpinsky-triangle',
      component: () => import('../views/SierpinskyTriangle.vue'),
    },
  ],
})

export default router
