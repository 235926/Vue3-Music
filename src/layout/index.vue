<!--
 * @Description: 布局页面
 * @Author: cdl
 * @Date: 2022-06-30 14:46:44
 * @LastEditors: cdl
 * @LastEditTime: 2022-06-30 15:08:09
-->
<template>
	<component :is="Defaults" />
</template>

<script setup>
import Defaults from '@/layout/layoutStyle/defaults.vue' // 默认布局
const route = useRoute() // 路由参数
const router = useRouter() // 路由实例
const { proxy } = getCurrentInstance() // vue 实例

// 定义响应式数据
const state = reactive({})

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {})
</script>

<style lang="scss" scoped></style>
