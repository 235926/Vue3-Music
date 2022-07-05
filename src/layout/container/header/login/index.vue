<!--
 * @Description: 登录根组件
 * @Date: 2022-07-01 10:58:56
 * @LastEditTime: 2022-07-05 17:18:06
-->
<template>
	<div class="login-container">
		<el-button link class="btn fr" @click="openDialog">登录{{ state.num }}</el-button>

		<el-dialog
			v-model="state.isShowDialog"
			:width="677"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			:draggable="true"
			@closed="closeDialog"
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
import Phone from './component/phone.vue' // 手机登录
import Register from './component/register.vue' // 手机号注册
import Captcha from './component/captcha.vue' // 验证码验证
import Code from './component/code.vue' // 扫码登录
import Email from './component/email.vue' // 邮箱登录
const { proxy } = getCurrentInstance() // vue 实例

// 跟踪自身 .value 变化的 ref，配合 component 使用
const component = shallowRef({
	dashboard: Dashboard,
	phone: Phone,
	register: Register,
	captcha: Captcha,
	code: Code,
	email: Email,
})

// 定义响应式数据
const state = reactive({
	isShowDialog: false, // 弹窗状态
	title: '登录', // 标题
	activeName: 'captcha', // 登录方式
})

// 打开弹窗
const openDialog = () => {
	state.isShowDialog = true
}

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false
	state.activeName = 'code'
}

// 箭头登录切换
watch(
	() => state.activeName,
	(newValue) => {
		switch (newValue) {
			case 'dashboard':
				state.title = '登录'
				break
			case 'phone':
				state.title = '手机号登录'
				break
			case 'register':
				state.title = '手机号注册'
				break
			case 'captcha':
				state.title = '验证码验证'
				break
			case 'email':
				state.title = '邮箱登录'
				break
			case 'code':
				state.title = '扫码登录'
				break
		}
	},
	{ deep: true }
)

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
	proxy.mittBus.on('switchLogin', (data) => {
		state.activeName = data // 切换登录方式
	})
})

// 组件销毁完成后执行的函数
onUnmounted(() => {
	proxy.mittBus.off('switchLogin', () => {})
})
</script>

<style lang="scss" scoped>
.login-container {
	:deep(.login-wrap) {
		padding-bottom: 50px;

		.btn-login {
			.el-form-item__content {
				justify-content: center;
			}

			.el-button {
				width: 100%;
			}
		}

		.btn-wrap {
			width: 100%;
			height: 50px;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 0 20px;
			border-top: 1px solid var(--el-border-color);
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>
