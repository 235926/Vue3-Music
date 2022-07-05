/*
 * @Description: 方法合集
 * @Date: 2022-07-05 15:22:45
 * @LastEditTime: 2022-07-05 15:22:55
 */

/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
 */
export function deepClone(obj) {
	let newObj
	try {
		newObj = obj.push ? [] : {}
	} catch (error) {
		newObj = {}
	}
	for (let attr in obj) {
		if (typeof obj[attr] === 'object') {
			newObj[attr] = deepClone(obj[attr])
		} else {
			newObj[attr] = obj[attr]
		}
	}
	return newObj
}
