<!--
 * @Description: 排行榜
 * @Date: 2022-06-30 16:29:53
 * @LastEditTime: 2022-07-05 17:15:00
-->
<template>
	<div>
		<div>排行榜</div>
	</div>
</template>

<script setup>
const route = useRoute() // 路由参数
const router = useRouter() // 路由实例
const { proxy } = getCurrentInstance() // vue 实例

// 定义响应式数据
const state = reactive({})

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {})
</script>

<style lang="scss" scoped></style>
