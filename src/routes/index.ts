import { createRouter, createWebHistory } from 'vue-router'

const modules = import.meta.glob('./modules/*.ts', { eager: true })

const routes = Object.values(modules).map((mod: any) => mod.default)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        {
          path: '/callback',
          name: 'auth-callback',
          component: () => import("@/views/pages/Callback.vue"),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/sign-in',
          name: 'page-login',
          component: () => import("@/views/pages/Login.vue"),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/lock-screen',
          name: 'page-lock-screen',
          component: () => import("@/views/pages/LockScreen.vue"),
          meta: {
            rule: 'editor',
            authRequired: true
          }
        },
        {
          path: '/coming-soon',
          name: 'page-coming-soon',
          component: () => import("@/views/pages/ComingSoon.vue"),
          meta: {
            rule: 'editor',
            authRequired: true
          }
        },
        {
          path: '/error-404',
          name: 'page-error-404',
          component: () => import("@/views/pages/Error404.vue"),
          meta: {
            rule: 'editor',
          }
        },
        {
          path: '/error-500',
          name: 'page-error-500',
          component: () => import("@/views/pages/Error500.vue"),
          meta: {
            rule: 'editor',
          }
        },
        {
          path: '/not-authorized',
          name: 'page-not-authorized',
          component: () => import("@/views/pages/NotAuthorized.vue"),
          meta: {
            rule: 'editor',
          }
        },
        {
          path: '/maintenance',
          name: 'page-maintenance',
          component: () => import("@/views/pages/Maintenance.vue"),
          meta: {
            rule: 'editor',
          }
        }
      ]
    },
    {
      path: '',
      component: () => import("@/layouts/main/Main.vue"),
      children: routes
    },
    {
      path: '*',
      redirect: '/error-404'
    }
  ],
})


export default router