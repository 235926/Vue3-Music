<!--
 * @Description: 手机登录
 * @Author: cdl
 * @Date: 2022-07-01 11:06:14
 * @LastEditors: cdl
 * @LastEditTime: 2022-07-01 18:32:18
-->
<template>
	<div class="phone-wrap">
		<el-form ref="formRef" :model="state.form" class="mlr80">
			<el-form-item>
				<el-input v-model="state.form.phone" placeholder="请输入账号" />
			</el-form-item>

			<el-form-item>
				<el-input v-model="state.form.password" show-password placeholder="请输入密码" />
			</el-form-item>

			<el-form-item class="btn-login">
				<el-button type="primary" round @click="onLogin">登录</el-button>
			</el-form-item>
		</el-form>

		<div class="btn-wrap">
			<el-link type="primary" :underline="false" @click="switchLogin('dashboard')">
				<el-icon><ArrowLeft /></el-icon>其他登录方式
			</el-link>
		</div>
	</div>
</template>

<script setup>
import { login } from '@/api/index.js' // api
import { Local } from '@/utils/storage.js' // 浏览器存储
const { proxy } = getCurrentInstance() // vue 实例
const emit = defineEmits(['closeDialog']) // 使用 emit需要把自定义的事件在defineEmits定义，要不会有警告

// 定义响应式数据
const state = reactive({
	// 表单
	form: {
		phone: '13439594353',
		password: 'cdl235926',
	},
})

/**
 * @description: 登录
 * @return {*}
 * @author: cdl
 */
const onLogin = () => {
	login(state.form).then((res) => {
		if (res.code === 200) {
			Local.set('music-token', res.token)
			emit('closeDialog')
			ElMessage({ message: res.message, type: 'success' })
		}
	})
}

/**
 * @description: 切换登录方式
 * @param {*} key
 * @return {*}
 * @author: cdl
 */
const switchLogin = (key) => {
	proxy.mittBus.emit('switchLogin', key)
}

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {})
</script>

<style lang="scss" scoped>
.phone-wrap {
	padding-bottom: 40px;

	.btn-login {
		:deep(.el-form-item__content) {
			justify-content: center;
		}

		.el-button {
			width: 200px;
			margin: 10px 0;
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
	}
}
</style>
