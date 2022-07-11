<!--
 * @Description: 验证码验证
 * @Date: 2022-07-05 09:50:27
 * @LastEditTime: 2022-07-11 16:08:38
-->
<template>
	<div class="login-wrap">
		<div class="captcha">
			<div class="phone-wrap">
				<span>你的手机号：</span>
				<span class="countrycode"><span class="plus">+</span>{{ state.countrycode }}</span>
				<span class="phone">{{ state.phone.substring(0, 3) + '****' + state.phone.substring(7, 11) }}</span>
			</div>
			<div class="security">为了安全，我们会给你发送短信验证码</div>
			<div class="validation">
				<el-input v-model="state.captcha.input1" oninput="value=value.replace(/[^\d.]/g,'')" maxlength="1" />
				<el-input v-model="state.captcha.input2" oninput="value=value.replace(/[^\d.]/g,'')" maxlength="1" />
				<el-input v-model="state.captcha.input3" oninput="value=value.replace(/[^\d.]/g,'')" maxlength="1" />
				<el-input v-model="state.captcha.input4" oninput="value=value.replace(/[^\d.]/g,'')" maxlength="1" />
				<div type="danger" v-if="state.isError !== ''" :underline="false" class="error">
					{{ state.isError }}
				</div>
				<el-link type="primary" class="again" v-if="state.waitState" @click="onCaptchaSent">重新发送</el-link>
				<div class="timing" v-if="!state.waitState">{{ state.wait }}S</div>
			</div>
			<el-button round type="primary" class="w100">下一步</el-button>
		</div>
		<div class="btn-wrap">
			<el-link type="primary" :underline="false" @click="switchLogin('dashboard')">
				<el-icon><ArrowLeft /></el-icon>其他登录方式
			</el-link>
		</div>
	</div>
</template>

<script setup>
import { captchaSent, captchaVerify } from '@/api/index.js' // api
const { proxy } = getCurrentInstance() // vue 实例

// 定义响应式数据
const state = reactive({
	countrycode: '', // 国家吗
	phone: '', // 手机号
	captcha: {}, // 验证码
	isError: '', // 验证码错误提示
	wait: 60, // 倒计时时间
	waitState: true, // 切换状态
})

/**
 * @description: 切换登录方式
 * @param {*} key
 * @return {*}
 */
const switchLogin = (key) => {
	proxy.mittBus.emit('switchLogin', key)
}

/**
 * @description: 发送验证码
 * @return {*}
 */
const onCaptchaSent = () => {
	const params = {
		ctcode: state.countrycode,
		phone: state.phone,
	}
	captchaSent(params).then((res) => {
		if (res.code === 400) {
			state.isError = res.message
		}
	})
	countDown()
}

/**
 * @description: 倒计时
 * @return {*}
 */
const countDown = () => {
	state.waitState = false
	const clearTimer = setInterval(() => {
		state.wait--
		if (state.wait === 0) {
			clearInterval(clearTimer)
			state.waitState = true
			state.wait = 60
		}
	}, 1000)
}

/**
 * @description: 验证验证码
 * @return {*}
 */
const onCaptchaVerify = () => {
	const params = {
		ctcode: state.countrycode,
		phone: state.phone,
		captcha: '',
	}
}

// 监听验证码
watch(
	() => [state.captcha],
	(newValue) => {
		console.log(newValue)
	},
	{ deep: true }
)

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
	proxy.mittBus.on('phoneRegister', (data) => {
		state.countrycode = data.countrycode.slice(0)
		state.phone = data.phone
		onCaptchaSent()
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

	.validation {
		margin: 20px 0 30px 0;
		display: flex;
		column-gap: 20px;
		position: relative;

		:deep(.el-input__inner) {
			text-align: center;
		}

		.error {
			position: absolute;
			bottom: -22px;
			left: 0;
			font-size: 14px;
			color: var(--el-color-error);
			font-weight: 500;
		}

		.again,
		.timing {
			position: absolute;
			bottom: -22px;
			right: 0;
			font-size: 14px;
		}
	}
}
</style>
