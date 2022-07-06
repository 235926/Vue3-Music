<!--
 * @Description: 验证码验证
 * @Date: 2022-07-05 09:50:27
 * @LastEditTime: 2022-07-06 15:45:47
-->
<template>
	<div class="login-wrap">
		<div class="captcha">
			<div class="phone-wrap">
				<span>你的手机号：</span>
				<span class="countrycode"><span class="plus">+</span>{{ state.countrycode }}</span>
				<span class="phone">{{ state.phone }}</span>
			</div>
			<div class="security">为了安全，我们会给你发送短信验证码</div>
		</div>
		<div class="btn-wrap">
			<el-link type="primary" :underline="false" @click="switchLogin('dashboard')">
				<el-icon><ArrowLeft /></el-icon>其他登录方式
			</el-link>
		</div>
	</div>
</template>

<script setup>
const { proxy } = getCurrentInstance() // vue 实例

// 定义响应式数据
const state = reactive({
	countrycode: '',
	phone: '',
})

/**
 * @description: 切换登录方式
 * @param {*} key
 * @return {*}
 */
const switchLogin = (key) => {
	proxy.mittBus.emit('switchLogin', key)
}

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
	proxy.mittBus.on('phoneRegister', (data) => {
		state.countrycode = data.countrycode.slice(0)
		state.phone = data.phone.substring(0, 3) + '****' + data.phone.substring(7, 11)
	})
})

// 组件销毁完成后执行的函数
onUnmounted(() => {
	proxy.mittBus.off('phoneRegister', () => {})
})
</script>

<style lang="scss" scoped>
.captcha {
	width: 70%;
	margin: 0 auto;
	font-size: 16px;
	color: var(--el-text-color-primary);

	.phone-wrap {
		.countrycode {
			margin-right: 10px;
			font-weight: 700;
		}

		.plus {
			position: relative;
			top: -2px;
		}

		.encryption,
		.phone {
			font-weight: 700;
		}
	}

	.security {
		margin-top: 10px;
	}
}
</style>
