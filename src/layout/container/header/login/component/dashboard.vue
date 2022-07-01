<!--
 * @Description: 登录指示板
 * @Author: cdl
 * @Date: 2022-07-01 15:10:02
 * @LastEditors: cdl
 * @LastEditTime: 2022-07-01 18:21:33
-->
<template>
	<div class="dashboard-wrap">
		<div class="left">
			<img :src="Dashboard" />
			<el-button type="primary">手机号登录</el-button>
			<el-button>注册</el-button>
		</div>
		<div class="right">
			<ul>
				<li v-for="(item, index) in state.rightList" :key="index" @click="switchLogin(item.icon)">
					<SvgIcon :name="item.icon" :class="item.icon" />
					<span class="name">{{ item.name }}</span>
				</li>
			</ul>
		</div>

		<div class="terms">
			<el-checkbox v-model="state.terms" @change="termsChange">同意</el-checkbox>
			<el-link href="http://st.music.163.com/official-terms/service" type="primary">《服务条款》</el-link>
			<el-link href="http://st.music.163.com/official-terms/privacy" type="primary">《隐私政策》</el-link>
			<el-link href="https://st.music.163.com/official-terms/children" type="primary">《儿童隐私政策》</el-link>
		</div>

		<div class="terms-desc" :class="{ isTermsDesc: state.isTermsDesc }">
			请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》
		</div>

		<img :src="Qrcode" class="qrcode" @click="switchLogin('code')" />
	</div>
</template>

<script setup>
import Dashboard from '@/assets/images/dashboard.png' // 左侧图片
import Qrcode from '@/assets/images/qrcode.png' // 二维码图片
import { Session } from '@/utils/storage.js' // 浏览器存储
const { proxy } = getCurrentInstance() // vue 实例

// 定义响应式数据
const state = reactive({
	rightList: [
		{ name: '微信登录', icon: 'weixin' },
		{ name: 'QQ登录', icon: 'qq' },
		{ name: '微博登录', icon: 'weibo' },
		{ name: '网易邮箱账号登录', icon: 'email' },
	],
	terms: Session.get('termsChange') || false, // 选中条款
	isTermsDesc: false, // 条款提示语
})

/**
 * @description: 切换条款选中
 * @return {*}
 * @author: cdl
 */
const termsChange = (value) => {
	Session.set('termsChange', value)
}

/**
 * @description: 切换登录方式
 * @param {*} key
 * @return {*}
 * @author: cdl
 */
const switchLogin = (key) => {
	if (state.terms) {
		if (key === 'weixin' || key === 'qq' || key === 'weibo') {
			return
		} else {
			proxy.mittBus.emit('switchLogin', key)
		}
	} else {
		state.isTermsDesc = true
		setTimeout(() => {
			state.isTermsDesc = false
		}, 1500)
	}
}

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {})
</script>

<style lang="scss" scoped>
.dashboard-wrap {
	display: flex;
	flex-wrap: wrap;
	margin: 0 50px;

	.left {
		flex: 0 0 50%;
		border-right: 1px dotted #ccc;

		img {
			width: 224px;
			height: 120px;
		}

		.el-button {
			width: 224px;
			margin-top: 10px;
			margin-left: 0;
		}
	}

	.right {
		flex: 0 0 50%;

		ul {
			margin: 0;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			li {
				list-style: none;
				display: flex;
				align-items: center;

				.svg-icon {
					font-size: 38px;
					border: 1px solid #ccc;
					border-radius: 50%;
					padding: 5px;

					&.weixin {
						color: var(--el-color-success);
					}
					&.qq {
						color: var(--el-color-primary);
					}
					&.weibo {
						color: var(--el-color-danger);
					}
					&.email {
						color: var(--el-color-warning);
					}
				}

				.name {
					margin-left: 30px;
					color: #333;
					cursor: pointer;
				}

				&:hover {
					.name {
						text-decoration: underline;
					}
				}
			}
		}
	}

	.terms {
		flex: 1;
		display: flex;
		align-items: center;
		margin-top: 30px;
	}

	// 条款提示语
	.terms-desc {
		width: 320px;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: -1;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		padding: 15px 20px;
		font-size: 14px;
		color: #fff;
		line-height: 30px;
		text-align: center;
		border-radius: 4px;
		background: rgba(0, 0, 0, 0.8);
		opacity: 0;
		-webkit-transition: all 200ms linear;
		transition: all 200ms linear;

		&.isTermsDesc {
			opacity: 1;
			z-index: 1;
		}
	}

	.qrcode {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 52px;
		height: 52px;
		cursor: pointer;
	}
}
</style>
