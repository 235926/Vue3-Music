/*
 * @Description: 接口文档
 * @Author: cdl
 * @Date: 2022-06-30 13:50:00
 * @LastEditors: cdl
 * @LastEditTime: 2022-07-01 14:59:51
 */
import request from '@/plugin/axios.js' // axios

/**
 * @description: 手机/邮箱登录
 * @param {*} data
 * @return {*}
 * @author: cdl
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
 * @author: cdl
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
 * @author: cdl
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
 * @author: cdl
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
 * @author: cdl
 */
export const loginRefresh = (data) => {
	return request({
		url: '/login/refresh',
		method: 'get',
		params: data,
	})
}
