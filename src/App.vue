<!--
 * @Description: 入口页面
 * @Author: cdl
 * @Date: 2022-06-06 05:10:48
 * @LastEditors: cdl
 * @LastEditTime: 2022-06-06 06:10:51
-->
<template>
    <router-view></router-view>
</template>

<script setup>
import { search } from '@/api/user.js' // api


const getSearch = () => {
    const params = {
        keywords: '海阔天空'
    }
    search(params).then(res => {
        console.log(res)
    })
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    getSearch()
})
</script>

<style lang="scss" scoped>
</style>
