/*
 * @Description: 接口文档
 * @Date: 2022-06-30 13:50:00
 * @LastEditTime: 2022-07-04 14:22:20
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
