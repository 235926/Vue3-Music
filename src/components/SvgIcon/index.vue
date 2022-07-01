<!--
 * @Description: svg 图标组件
 * @Author: cdl
 * @Date: 2022-07-01 15:41:40
 * @LastEditors: cdl
 * @LastEditTime: 2022-07-01 15:52:26
-->
<template>
	<svg class="svg-icon" aria-hidden="true">
		<use :xlink:href="symbolId" :fill="color" />
	</svg>
</template>

<script>
import { defineComponent, computed } from 'vue' // vue 内置方法

export default defineComponent({
	name: 'SvgIcon',
	props: {
		// svg 前缀
		prefix: {
			type: String,
			default: 'icon',
		},
		// svg 图标组件名字
		name: {
			type: String,
			required: true,
		},
		// svg 大小
		size: {
			type: Number,
			default: () => 14,
		},
		// svg 颜色
		color: {
			type: String,
		},
	},
	setup(props) {
		const symbolId = computed(() => `#${props.prefix}-${props.name}`)
		return { symbolId }
	},
})
</script>

<style scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	font-size: 16px;
	fill: currentColor;
	overflow: hidden;
	cursor: pointer;
}
</style>
