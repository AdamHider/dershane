import { createRouter, createWebHistory } from 'vue-router'
import { isAuthorized } from '@/store/user'
//import routes from '~pages'

export const  routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/lessons-:category_id',
    component: () => import('@/pages/Lessons.vue')
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
    component: () => import('@/pages/StudentStartup.vue'),
    beforeEnter: () => !isAuthorized()
  },
  {
    path: '/user-sign-in',
    component: () => import('@/pages/UserSignIn.vue'),
    beforeEnter: () => !isAuthorized()
  },
  {
    path: '/user-sign-up',
    component: () => import('@/pages/UserSignUp.vue'),
    beforeEnter: () => !isAuthorized()
  }
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export function routerPush (name, params){
  if (params !== undefined) {
    return router.push({
      name,
      params,
    })
  } else {
    return router.push({ name })
  }
}