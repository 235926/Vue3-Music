<!--
 * @Description: 内容渲染主体
 * @Author: cdl
 * @Date: 2022-06-30 15:08:56
 * @LastEditors: cdl
 * @LastEditTime: 2022-06-30 16:06:37
-->
<template>
	<el-main>
		<layoutRouterView />
	</el-main>
</template>

<script setup>
import layoutRouterView from '@/layout/openWay/routerView.vue' // 路由出口
const route = useRoute() // 路由参数
const router = useRouter() // 路由实例
const { proxy } = getCurrentInstance() // vue 实例

// 定义响应式数据
const state = reactive({})

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {})
</script>

<style lang="scss" scoped></style>
