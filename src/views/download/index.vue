<!--
 * @Description: 下载客户端

 * @Date: 2022-06-30 15:48:32

 * @LastEditTime: 2022-06-30 15:53:30
-->
<template>
	<div>下载客户端</div>
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
