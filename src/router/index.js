import { createRouter, createWebHistory } from 'vue-router'
//import routes from '~pages'
import { useUserStore } from '@/store/user'


export const  routes = [
  {
    path: '/',
    
  },
  {
    path: '/home',
    meta: { requiresAuth: true },
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/lessons-:category_id',
    component: () => import('@/pages/Lessons.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/classroom',
    component: () => import('@/pages/Classroom.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/classroom-join',
    redirect: '/classroom-join/code=0'
  },
  {
    path: '/classroom-join/code=:code',
    component: () => import('@/pages/ClassroomJoin.vue')
  },
  {
    path: '/notifications',
    component: () => import('@/pages/Notifications.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user-dashboard',
    meta: { requiresAuth: true },
    component: () => import('@/pages/UserDashboard.vue'),
  },
  {
    path: '/user-startup',
    component: () => import('@/pages/UserStartup.vue'),
  },
  {
    path: '/user-sign-in',
    redirect: '/user-sign-in/step1'
  },
  {
    path: '/user-sign-in/step:step',
    name: 'user-sign-in',
    component: () => import('@/pages/UserSignIn.vue'),
  },
  {
    path: '/user-sign-up',
    redirect: '/user-sign-up/step1'
  },
  {
    path: '/user-sign-up/step:step',
    name: 'user-sign-up',
    component: () => import('@/pages/UserSignUp.vue')
  },
  {
    path: '/user-activate-:activation_code',
    component: () => import('@/pages/UserActivate.vue'),
  },
  {
    path: '/user-edit',
    component: () => import('@/pages/UserEdit.vue'),
  },
  {
    path: '/user-password-edit',
    component: () => import('@/pages/UserPasswordEdit.vue'),
  },
  {
    path: '/user-achievements',
    component: () => import('@/pages/UserAchievements.vue'),
  },
  {
    path: '/settings',
    component: () => import('@/pages/Settings.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const { user } = useUserStore()
    if (!user.active.data.id) {
      router.push({ path: "/user-startup"})
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
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