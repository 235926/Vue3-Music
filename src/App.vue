<!--
 * @Description: 入口页面
 * @Author: cdl
 * @Date: 2022-06-06 05:10:48
 * @LastEditors: cdl
 * @LastEditTime: 2022-06-06 09:51:44
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
