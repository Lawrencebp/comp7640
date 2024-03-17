import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component: () => import('@/views/loginIndex.vue')
    },
    {
      path:'/vendor/index',
      component: () => import('@/views/vendor/layoutIndex.vue'),
      redirect:'/goods',
      children: [
        {
          path:'/vendors',
          component: () => import('@/views/vendor/allVendors.vue')
        },
        {
          path:'/goods',
          component: () => import('@/views/vendor/goodsList.vue')
        },{
          path:'/manage',
          component: () => import('@/views/vendor/manageGoods.vue')
        },{
          path:'/introduce',
          component: () => import('@/views/vendor/introduceVendor.vue')
        },
      ]
    },
    {
      path:'/customer/index',
      component: () => import('@/views/customer/customerIndex.vue'),
      redirect: '/cusGoods',
      children:[
        {
          path:'/cusGoods',
          component: () => import('@/views/vendor/goodsList.vue')
        },
        {
          path:'/cusVendors',
          component: () => import('@/views/vendor/allVendors.vue')
        },
        {
          path: '/cart',
          component: () => import('@/views/customer/customerCart.vue')
        },
        {
          path: '/order',
          component: () => import('@/views/customer/orderModification.vue')
        }
      ]
    }
  ]
})

export default router
