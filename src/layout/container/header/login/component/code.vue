<!--
 * @Description: 扫码登录
 * @Author: cdl
 * @Date: 2022-07-01 11:08:45
 * @LastEditors: cdl
 * @LastEditTime: 2022-07-01 18:34:53
-->
<template>
	<div class="code-wrap">
		<div class="left">
			<img :src="CodeLeft" />
		</div>
		<div class="right">
			<h3>扫码登录</h3>
			<div ref="qrcodeRef" class="qr-code">
				<div class="overdue" v-if="!state.overdue">
					<p>二维码已失效</p>
					<el-button type="success" @click="refresh">点击刷新</el-button>
				</div>
			</div>
			<p class="desc">使用<el-link type="primary">网易云音乐</el-link>扫码登录</p>
		</div>
		<div class="btn-wrap">
			<el-button round @click="switchLogin('dashboard')">选择其他登录模式</el-button>
		</div>
	</div>
</template>

<script setup>
import { loginQrKey, loginQrCreate, loginQrCheck, loginRefresh } from '@/api/index.js' // api
import CodeLeft from '@/assets/images/code-left.png' // 左侧图片
import QRCode from 'qrcodejs2-fixes' // 生成二维码插件
const { proxy } = getCurrentInstance() // vue 实例
const emit = defineEmits(['closeDialog']) // 使用 emit需要把自定义的事件在defineEmits定义，要不会有警告

// 定义响应式数据
const qrcodeRef = ref('')
const state = reactive({
	overdue: false, // 二维码是否过期
	timer: null, // 定时器
})

/**
 * @description: 1. 二维码 key 生成接口
 * @description: 调用此接口可生成一个 key
 * @return {*}
 * @author: cdl
 */
const onLoginQrKey = () => {
	loginQrKey().then((res) => {
		onLoginQrCreate(res.data.unikey)
	})
}

/**
 * @description: 二维码生成接口
 * @description: 调用此接口传入上一个接口生成的 key 可生成二维码图片的 base64 和二维码信息,可使用 base64 展示图片,或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码
 * @description: 必选参数: key,由第一个接口生成
 * @description: 可选参数: qrimg 传入后会额外返回二维码图片 base64 编码
 * @param {*} key
 * @return {*}
 * @author: cdl
 */
const onLoginQrCreate = (key) => {
	let params = {
		key,
	}
	loginQrCreate(params).then((res) => {
		if (res.code === 200) {
			new QRCode(qrcodeRef.value, {
				text: res.data?.qrurl,
				width: 130,
				height: 130,
				colorDark: '#000000',
				colorLight: '#ffffff',
			})
			onLoginQrCheck(key)
		}
	})
}

/**
 * @description: 二维码检测扫码状态接口
 * @description: 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
 * @description: 必选参数: key,由第一个接口生成
 * @return {*}
 * @author: cdl
 */
const onLoginQrCheck = (key) => {
	let params = {
		key,
	}
	state.timer = setInterval(() => {
		loginQrCheck(params).then((res) => {
			switch (res.code) {
				case 800:
					// 为二维码过期
					state.overdue = true
					clearInterval(state.timer)
					break
				case 803:
					// 为授权登录成功
					clearInterval(state.timer)
					emit('closeDialog')
					break
			}
		})
	}, 1500)
}

/**
 * @description: 点击刷新
 * @return {*}
 * @author: cdl
 */
const refresh = () => {
	state.overdue = false
	qrcodeRef.value.innerHTML = ''
	onLoginQrKey()
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
onMounted(() => {
	refresh()
})

// 组件销毁完成后执行的函数
onUnmounted(() => {
	clearInterval(state.timer)
})
</script>

<style lang="scss" scoped>
.code-wrap {
	display: flex;
	flex-wrap: wrap;
	margin: 0 50px;

	.left {
		flex: 0 0 50%;
		text-align: right;

		img {
			width: 125px;
			height: 220px;
			margin-right: 50px;
		}
	}

	.right {
		flex: 0 0 50%;

		h3 {
			text-align: center;
		}

		.qr-code {
			width: 130px;
			height: 130px;
			margin: 13px auto;
			position: relative;

			.overdue {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background: rgba(255, 255, 255, 0.9);
				text-align: center;

				p {
					font-weight: 500;
					margin: 35px auto 10px;
				}
			}
		}

		.desc {
			display: flex;
			align-items: center;
			justify-content: center;

			.el-link {
				margin: 0 5px;
			}
		}
	}

	.btn-wrap {
		flex: 1;
		text-align: center;
		margin-top: 30px;
	}
}
</style>
