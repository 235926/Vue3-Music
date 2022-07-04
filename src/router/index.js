/*
 * @Description: 路由根页面
 * @Date: 2022-06-06 05:46:17
 * @LastEditTime: 2022-07-04 14:23:11
 */
import { createRouter, createWebHashHistory } from 'vue-router' // 路由

export const routes = [
	{
		path: '/',
		name: '/',
		component: () => import('@/layout/index.vue'),
		meta: { title: '布局页面' },
		redirect: '/discover',
		children: [
			{
				path: '/discover',
				name: 'discover',
				component: () => import('@/layout/openWay/routerView.vue'),
				meta: {
					title: '发现音乐',
				},
				redirect: '/discover/recommend',
				children: [
					{
						path: '/discover/recommend',
						name: 'DiscoverRecommend',
						component: () => import('@/views/discover/recommend/index.vue'),
						meta: {
							title: '推荐',
						},
					},
					{
						path: '/discover/toplist',
						name: 'DiscoverToplist',
						component: () => import('@/views/discover/toplist/index.vue'),
						meta: {
							title: '排行榜',
						},
					},
					{
						path: '/discover/playlist',
						name: 'DiscoverPlaylist',
						component: () => import('@/views/discover/playlist/index.vue'),
						meta: {
							title: '歌单',
						},
					},
					{
						path: '/discover/djradio',
						name: 'DiscoverDjradio',
						component: () => import('@/views/discover/djradio/index.vue'),
						meta: {
							title: '主播电台',
						},
					},
					{
						path: '/discover/artist',
						name: 'DiscoverArtist',
						component: () => import('@/views/discover/artist/index.vue'),
						meta: {
							title: '歌手',
						},
					},
					{
						path: '/discover/album',
						name: 'DiscoverAlbum',
						component: () => import('@/views/discover/album/index.vue'),
						meta: {
							title: '新碟上架',
						},
					},
				],
			},
			{
				path: '/my-music',
				name: 'my-music',
				component: () => import('@/views/my-music/index.vue'),
				meta: {
					title: '我的音乐',
				},
			},
			{
				path: '/friend',
				name: 'friend',
				component: () => import('@/views/friend/index.vue'),
				meta: {
					title: '关注',
				},
			},
			{
				path: '/product',
				name: 'product',
				component: () => import('@/views/product/index.vue'),
				meta: {
					title: '商城',
				},
			},
			{
				path: '/musician',
				name: 'musician',
				component: () => import('@/views/musician/index.vue'),
				meta: {
					title: '音乐人',
				},
			},
			{
				path: '/download',
				name: 'download',
				component: () => import('@/views/download/index.vue'),
				meta: {
					title: '下载客户端',
				},
			},
		],
	},
]

/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
export const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
})

export default router
