<!--
 * @Description: 推荐

 * @Date: 2022-06-30 16:27:42

 * @LastEditTime: 2022-06-30 16:27:46
-->
<template>
	<div>推荐</div>
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
