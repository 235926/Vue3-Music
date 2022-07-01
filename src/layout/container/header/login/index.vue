<!--
 * @Description: 登录根组件
 * @Author: cdl
 * @Date: 2022-07-01 10:58:56
 * @LastEditors: cdl
 * @LastEditTime: 2022-07-01 18:30:49
-->
<template>
	<div class="login-wrap">
		<el-button link class="btn fr" @click="openDialog">登录</el-button>

		<el-dialog
			v-model="state.isShowDialog"
			:width="677"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			:draggable="true"
		>
			<template #header>
				<div>{{ state.title }}</div>
			</template>

			<el-scrollbar :max-height="400">
				<component :is="component[state.activeName]" @closeDialog="closeDialog" />
			</el-scrollbar>
		</el-dialog>
	</div>
</template>

<script setup>
import Dashboard from './component/dashboard.vue' // 登录指示板
import Phone from './component/phone.vue' // 登录指示板
import Code from './component/code.vue' // 扫码登录
import Email from './component/email.vue' // 邮箱登录
const route = useRoute() // 路由参数
const router = useRouter() // 路由实例
const { proxy } = getCurrentInstance() // vue 实例

// 跟踪自身 .value 变化的 ref，配合 component 使用
const component = shallowRef({
	dashboard: Dashboard,
	code: Code,
	email: Email,
	phone: Phone,
})

// 定义响应式数据
const state = reactive({
	isShowDialog: false, // 弹窗状态
	title: '登录', // 标题
	activeName: 'dashboard', // 登录方式
})

// 打开弹窗
const openDialog = () => {
	state.isShowDialog = true
}

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false
}

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
	proxy.mittBus.on('switchLogin', (data) => {
		state.activeName = data // 切换登录方式
	})
})

// 组件销毁完成后执行的函数
onUnmounted(() => {
	proxy.mittBus.off('switchLogin')
})
</script>

<style lang="scss" scoped></style>
