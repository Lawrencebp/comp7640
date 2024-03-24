import {createRouter, createWebHistory} from 'vue-router'
import {useCustomerStore,useVendorStore} from "@/stores/index.js";
import {ElMessage} from "element-plus";
import App from "@/App.vue";
import {createApp} from "vue";
import pinia from "@/stores/index.js";

const app = createApp(App)
app.use(pinia)

const customerStore = useCustomerStore()
const vendorStore = useVendorStore()
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/views/loginIndex.vue')
        },
        {
            path: '/vendor/index',
            component: () => import('@/views/AllIndex.vue'),
            redirect: '/goods',
            children: [
                {
                    path: '/vendors',
                    component: () => import('@/views/allVendors.vue')
                },
                {
                    path: '/goods',
                    component: () => import('@/views/goodsList.vue')
                }, {
                    path: '/manage',
                    component: () => import('@/views/vendor/manageGoods.vue')
                },
                {
                    path: '/newGoods',
                    component: () => import('@/views/vendor/newGoods.vue')
                },
            ]
        },
        {
            path: '/customer/index',
            component: () => import('@/views/AllIndex.vue'),
            redirect: '/cusGoods',
            children: [
                {
                    path: '/cusGoods',
                    component: () => import('@/views/goodsList.vue'),
                },
                {
                    path: '/cusVendors',
                    component: () => import('@/views/allVendors.vue')
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

router.beforeEach(to => {
    if (to.path !== '/'){
        if (!customerStore.customerId && !vendorStore.vendorId){
            ElMessage.error({
                showClose: true,
                duration:1000,
                message: 'You are not logged in, please login'
            })
            return '/'
        }
    }
})
export default router
