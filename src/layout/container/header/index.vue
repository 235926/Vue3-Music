<!--
 * @Description: 头部
 * @Date: 2022-06-30 15:08:53
 * @LastEditTime: 2022-07-05 17:16:03
-->
<template>
	<el-header class="layout-header">
		<!-- 路由菜单 -->
		<div class="nav-top">
			<div class="wrap">
				<h1 class="logo flex-center fl">网易云音乐</h1>
				<div class="nav-list fl">
					<router-link v-for="item in navList" :key="item.path" :to="item.path" tag="li">
						{{ item.meta.title }}
						<span class="triangle-up"></span>
					</router-link>
				</div>

				<LoginBtn />
				<span class="creator fr">创作者中心</span>
				<el-input v-model="state.search" class="search fr" placeholder="音乐/视频/电台/用户">
					<template #prefix>
						<el-icon class="el-input__icon"><search /></el-icon>
					</template>
				</el-input>
			</div>
		</div>

		<!-- 发现音乐子级 -->
		<div class="subnav" v-if="route.matched[1].path === '/discover'">
			<div class="wrap flex">
				<router-link v-for="item in subnav" :key="item.path" :to="item.path" tag="li">
					<span class="sub-title">{{ item.meta.title }}</span>
				</router-link>
			</div>
		</div>
		<div class="subnav-up" v-else></div>
	</el-header>
</template>

<script setup>
import LoginBtn from './login/index.vue' // login 组件
const route = useRoute() // 路由参数
const router = useRouter() // 路由实例
const { proxy } = getCurrentInstance() // vue 实例

// 定义响应式数据
const state = reactive({
	search: '', // 搜索
})

/**
 * @description: 获取一级路由
 * @param {*} computed
 */
const navList = computed(() => {
	return route.matched[0].children
})

/**
 * @description: 获取发现音乐子级路由
 * @param {*} computed
 */
const subnav = computed(() => {
	return route.matched[0].children[0].children
})

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {})
</script>

<style lang="scss" scoped></style>
