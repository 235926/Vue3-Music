/*
 * @Description: 接口文档
 * @Date: 2022-06-30 13:50:00
 * @LastEditTime: 2022-07-05 09:54:13
 */
import request from '@/plugin/axios.js' // axios

/**
 * @description: 手机/邮箱登录
 * @param {*} data
 * @return {*}
 */
export const login = (data) => {
	return request({
		url: '/login',
		method: 'get',
		params: data,
	})
}

/**
 * @description: 二维码登录 - 二维码 key 生成接口
 * @param {*} data
 * @return {*}
 */
export const loginQrKey = (data) => {
	return request({
		url: '/login/qr/key',
		method: 'get',
		params: data,
	})
}

/**
 * @description: 二维码登录 - 二维码生成接口
 * @param {*} data
 * @return {*}
 */
export const loginQrCreate = (data) => {
	return request({
		url: '/login/qr/create',
		method: 'get',
		params: data,
	})
}

/**
 * @description: 二维码登录 - 二维码检测扫码状态接口
 * @param {*} data
 * @return {*}
 */
export const loginQrCheck = (data) => {
	return request({
		url: '/login/qr/check',
		method: 'get',
		params: data,
	})
}

/**
 * @description: 刷新登录状态
 * @description: 调用此接口 , 可刷新登录状态,返回内容包含新的cookie(不支持刷新二维码登录的cookie)
 * @param {*} data
 * @return {*}
 */
export const loginRefresh = (data) => {
	return request({
		url: '/login/refresh',
		method: 'get',
		params: data,
	})
}

/**
 * @description: 获取国家编码列表
 * @param {*} data
 * @return {*}
 */
export const countriesCodeList = (data) => {
	return request({
		url: '/countries/code/list',
		method: 'get',
		params: data,
	})
}

/**
 * @description: 发送验证码
 * @description: 必选参数 : phone: 手机号码
 * @description: 可选参数 : ctcode: 国家区号,默认 86 即中国
 * @return {*}
 */
export const captchaSent = (data) => {
	return request({
		url: '/captcha/sent',
		method: 'get',
		params: data,
	})
}

/**
 * @description: 验证验证码
 * @return {*}
 */
export const captchaVerify = (data) => {
	return request({
		url: '/captcha/verify',
		method: 'get',
		params: data,
	})
}

/**
 * @description: 检测手机号码是否已注册
 * @return {*}
 */
export const cellphoneExistenceCheck = (data) => {
	return request({
		url: '/cellphone/existence/check',
		method: 'get',
		params: data,
	})
}

/**
 * @description: 初始化昵称
 * @description: 必选参数 : nickname : 昵称
 * @return {*}
 */
export const activateInitProfile = (data) => {
	return request({
		url: '/activate/init/profile',
		method: 'get',
		params: data,
	})
}

/**
 * @description: 重复昵称检测
 * @description: 必选参数 : nickname : 昵称
 * @return {*}
 */
export const nicknameCheck = (data) => {
	return request({
		url: '/nickname/check',
		method: 'get',
		params: data,
	})
}

/**
 * @description: 注册(修改密码)
 * @description: 必选参数 : captcha: 验证码
 * @description: 必选参数 : phone : 手机号码
 * @description: 必选参数 : password: 密码
 * @description: 必选参数 : nickname: 昵称
 * @description: 可选参数 : countrycode: 国家码，用于国外手机号，例如美国传入：1 ,默认 86 即中国
 * @return {*}
 */
export const registerCellphone = (data) => {
	return request({
		url: '/register/cellphone',
		method: 'get',
		params: data,
	})
}
