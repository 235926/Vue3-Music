/*
 * @Description: 用户部分接口
 * @Author: cdl
 * @Date: 2022-06-06 06:05:03
 * @LastEditors: cdl
 * @LastEditTime: 2022-06-06 06:09:07
 */
import request from '@/plugin/axios.js' // axios


// 用户登录
export const search = (data) => {
    return request({
        url: '/search',
        method: 'get',
        params: data
    })
}