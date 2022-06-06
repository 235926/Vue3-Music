/*
 * @Description: 路由根页面
 * @Author: cdl
 * @Date: 2022-06-06 05:46:17
 * @LastEditors: cdl
 * @LastEditTime: 2022-06-06 07:05:34
 */
import { createRouter, createWebHashHistory } from 'vue-router' // 路由


export const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页' }
    },
]


/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})


export default router