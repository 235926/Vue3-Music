/*
 * @Description: 验证规则
 * @Date: 2022-07-04 11:26:38
 * @LastEditTime: 2022-07-04 14:57:51
 */

/**
 * @description: 手机号码
 * @param {*} val
 * @return {*}
 */
export function verifyPhone(rule, value, callback) {
	if (!value) {
		callback(new Error('请输入手机号'))
	} else if (!/^((12[0-9])|(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0|1,5-9]))\d{8}$/.test(value)) {
		callback(new Error('手机号码不正确'))
	} else {
		callback()
	}
}
