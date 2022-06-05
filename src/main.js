/*
 * @Description: 入口文件 加载组件 初始化等
 * @Author: cdl
 * @Date: 2022-06-06 05:10:48
 * @LastEditors: cdl
 * @LastEditTime: 2022-06-06 06:03:34
 */
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 引入 ElementPlus UI 库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 全局使用 ElementPlus 自带的图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (let [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 引入进度条插件
import '@/plugin/nprogress.js'

// 引入 svg 图标注册脚本
import 'virtual:svg-icons-register'

// 引入路由
import router from '@/router/index.js'

// 页面共享状态
import pinia from '@/pinia/index.js'

app.use(router).use(pinia).use(ElementPlus)
app.mount('#app')