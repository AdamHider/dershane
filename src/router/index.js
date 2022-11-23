import { createRouter, createWebHistory } from 'vue-router'
//import routes from '~pages'

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/classroom',
    component: () => import('@/pages/Classroom.vue')
  },
  {
    path: '/notifications',
    component: () => import('@/pages/Notifications.vue')
  },
  {
    path: '/student-dashboard',
    component: () => import('@/pages/StudentDashboard.vue')
  },
  {
    path: '/student-startup',
    component: () => import('@/pages/StudentStartup.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
export default router