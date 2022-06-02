import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/Home.vue'),
    redirect: '/Program',
    children: [
      {
        path: '/Program',
        name: 'Program',
        component: () => import('@/views/Program/index.vue')
      },
      {
        path: '/Books',
        name: 'Books',
        component: () => import('@/views/Books/index.vue')
      },
      {
        path: '/Issue',
        name: 'Issue',
        component: () => import('@/views/Issue/index.vue')
      },
      {
        path: '/TechnicalArticles',
        name: 'TechnicalArticles',
        component: () => import('@/views/TechnicalArticles/index.vue')
      },
      {
        path: '/Code',
        name: 'Code',
        component: () => import('@/views/Code/index.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
