import { createRouter, createWebHistory } from 'vue-router'
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
    path: '/classroom-join',
    component: () => import('@/pages/ClassroomJoin.vue')
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
  },
  {
    path: '/user-sign-in',
    component: () => import('@/pages/UserSignIn.vue'),
  },
  {
    path: '/user-sign-up',
    component: () => import('@/pages/UserSignUp.vue'),
  },
  {
    path: '/user-activate-:activation_code',
    component: () => import('@/pages/UserActivate.vue'),
  }
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export function routerPush (path, params){
  if (params !== undefined) {
    return router.push({
      path: path,
      params: params,
    })
  } else {
    return router.push({ path: path })
  }
}