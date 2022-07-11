<!--
 * @Description: 手机号注册
 * @Date: 2022-07-04 10:16:59
 * @LastEditTime: 2022-07-11 15:00:45
-->
<template>
	<div class="login-wrap">
		<el-form ref="formRef" :model="state.form" :rules="state.rules" class="mlr80">
			<el-form-item prop="phone" class="countrycode">
				<el-input
					v-model="state.form.phone"
					placeholder="请输入手机号"
					oninput="value=value.replace(/[^\d.]/g,'')"
				>
					<template #prepend>
						<el-select v-model="state.form.countrycode" placeholder="请选择">
							<el-option
								v-for="item in state.countriesCodeList"
								:key="item.code"
								:label="`+${item.code}`"
								:value="item.code"
							>
								<span class="fl">{{ item.zh }}</span>
								<span class="fr">+{{ item.code }} </span>
							</el-option>
						</el-select>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item prop="password">
				<el-input
					v-model.trim="state.form.password"
					show-password
					:maxlength="20"
					placeholder="设置登录密码，不少于8位"
					@focus="focusHandler"
					@input="inputHandler"
				/>
			</el-form-item>

			<el-form-item class="desc" v-if="state.isDesc">
				<div class="desc-item">
					<el-icon><CircleCheckFilled /></el-icon>密码不能包含空格
				</div>
				<div class="desc-item" :class="{ error: state.isAlphabetDigital }">
					<el-icon>
						<component
							:is="state.isAlphabetDigital ? 'CircleCloseFilled' : 'CircleCheckFilled'"
						/> </el-icon
					>包含字母、数字、符号中至少两种
				</div>
				<div class="desc-item" :class="{ error: state.isPassLength }">
					<el-icon>
						<component :is="state.isPassLength ? 'CircleCloseFilled' : 'CircleCheckFilled'" /> </el-icon
					>密码长度为8-20位
				</div>
			</el-form-item>

			<el-form-item class="btn-login">
				<el-button type="primary" round @click="nextClick('captcha')">下一步</el-button>
			</el-form-item>
		</el-form>

		<div class="btn-wrap">
			<el-link type="primary" :underline="false" @click="switchLogin('dashboard')">
				<el-icon><ArrowLeft /></el-icon>返回登录
			</el-link>
		</div>
	</div>
</template>

<script setup>
import { countriesCodeList } from '@/api/index.js' // api
import { verifyPhone } from '@/utils/validate.js' // 验证工具
const { proxy } = getCurrentInstance() // vue 实例

// 定义响应式数据
const formRef = ref(null)
const state = reactive({
	// 表单
	form: {
		countrycode: '86',
		phone: '13439594353',
		password: 'cdl235926',
	},
	countriesCodeList: [], // 国家编码列表
	// 验证规则
	rules: {
		phone: [{ required: true, validator: verifyPhone, trigger: 'blur' }],
	},
	isDesc: false, // 是否显示密码校验规则
	isAlphabetDigital: true, // 包含字母，数字，字符
	isPassLength: true, // 密码长度
})

/**
 * @description: 获取国家编码列表
 * @return {*}
 */
const onCountriesCodeList = () => {
	countriesCodeList().then((res) => {
		res.data.forEach((item) => {
			state.countriesCodeList.push(...item.countryList)
		})
	})
}

/**
 * @description: 密码框获取焦点事件
 * @return {*}
 */
const focusHandler = () => {
	state.isDesc = true
}

/**
 * @description: 在密码框值改变时触发
 * @return {*}
 */
const inputHandler = () => {
	verifyPassword()
}

/**
 * @description: 验证密码
 * @return {*}
 */
const verifyPassword = () => {
	let str = state.form?.password
	let passLength = str?.length
	let isAlphabet = false // 包含字母
	let isSpecial = false // 包含特殊字符
	let isDigital = false // 验证密码长度

	// 包含字母
	str.search(/[A-Za-z]+/) != -1 ? (isAlphabet = true) : (isAlphabet = false)

	// 包含数字
	str.search(/[0-9]/) != -1 ? (isDigital = true) : (isDigital = false)

	// 包含特殊字符
	str.search(/[#@*&.]/) != -1 ? (isSpecial = true) : (isSpecial = false)

	// 包含字母、数字、符号中至少两种
	if ((isAlphabet && isDigital) || (isAlphabet && isSpecial) || (isDigital && isSpecial)) {
		state.isAlphabetDigital = false
	} else {
		state.isAlphabetDigital = true
	}

	// 验证密码长度
	passLength > 8 && passLength < 21 ? (state.isPassLength = false) : (state.isPassLength = true)
}

/**
 * @description: 下一步
 * @return {*}
 */
const nextClick = (key) => {
	formRef.value.validate((valid) => {
		if (valid) {
			if (!state.isAlphabetDigital && !state.isPassLength) {
				proxy.mittBus.emit('switchLogin', key)

				setTimeout(() => {
					proxy.mittBus.emit('phoneRegister', {
						countrycode: state.form.countrycode,
						phone: state.form.phone,
					})
				}, 100)
			}
		} else {
			return false
		}
	})
}

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
	onCountriesCodeList()
})
</script>

<style lang="scss" scoped>
.login-wrap {
	.countrycode {
		:deep(.el-input-group__prepend) {
			width: 80px;
		}
	}

	.desc {
		margin-bottom: 0;

		:deep(.el-form-item__content) {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			position: relative;
			top: -10px;

			.desc-item {
				line-height: 22px;
				display: flex;
				align-items: center;
				font-size: 12px;

				.el-icon {
					font-size: 16px;
					margin-right: 5px;
				}

				&.error {
					color: var(--el-color-error);
				}
			}
		}
	}
}
</style>
