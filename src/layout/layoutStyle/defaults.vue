<!--
 * @Description: 默认布局
 * @Date: 2022-06-30 15:07:40
 * @LastEditTime: 2022-06-30 15:12:02
-->
<template>
	<el-container class="layout-container is-vertical">
		<Header />
		<Main />
	</el-container>
</template>

<script setup>
import Header from '@/layout/container/header/index.vue' // 头部
import Main from '@/layout/container/main/index.vue' // 内容渲染主体
const route = useRoute() // 路由参数
const router = useRouter() // 路由实例
const { proxy } = getCurrentInstance() // vue 实例

// 定义响应式数据
const state = reactive({})

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {})
</script>

<style lang="scss" scoped></style>
