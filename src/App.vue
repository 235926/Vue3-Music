<!--
 * @Description: 入口页面
 * @Date: 2022-06-06 05:10:48
 * @LastEditTime: 2022-07-05 13:47:22
-->
<template>
	<el-config-provider :locale="zhCn">
		<!-- 路由出口 -->
		<router-view />
	</el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 中文
</script>

<style lang="scss" scoped></style>
