const dynamicRouter = [{
	path: '/merchant',
	name: 'merchant',
	component: () => import('@/views/merchant/merchant.vue'),
	meta: {
		title: '商家管理',
		icon: 'el-icon-s-shop',
	},
}, {
	path: '/classify',
	name: 'classify',
	component: () => import('@/views/classify/classify.vue'),
	meta: {
		title: '商品分类',
		icon: 'el-icon-menu',
	},
}, {
	path: '/commodity',
	name: 'commodity',
	component: () => import('@/views/commodity/index.vue'),
	meta: {
		title: '商品管理',
		icon: 'el-icon-s-goods',
	},
	children: [{
			path: '/commodityList',
			name: 'commodityList',
			component: () => import('@/components/commodity/commodityList.vue'),
			meta: {
				title: '商品列表'
			}
		},
		{
			path: '/keyword',
			name: 'keyword',
			component: () => import('@/components/commodity/keyword.vue'),
			meta: {
				title: '关键字'
			}
		},
		{
			path: '/activity',
			name: 'activity',
			component: () => import('@/components/commodity/activity.vue'),
			meta: {
				title: '活动'
			}
		},
	]
}, {
	path: '/banner',
	name: 'banner',
	component: () => import('@/views/banner/banner.vue'),
	meta: {
		title: '轮播图管理',
		icon: 'el-icon-picture',
	},
}, {
	path: '/permission',
	name: 'permission',
	component: () => import('@/views/permission/permission.vue'),
	meta: {
		title: '系统管理',
		icon: 'el-icon-s-tools'
	},
	children: [{
			path: '/roles',
			name: 'roles',
			component: () => import('@/components/permission/roles.vue'),
			meta: {
				title: '角色管理'
			}
		},
		{
			path: '/manage',
			name: 'manage',
			component: () => import('@/components/permission/user.vue'),
			meta: {
				title: '账号管理'
			}
		},
		{
			path: '/healthUser',
			name: 'healthUser',
			component: () => import('@/components/permission/healthUser.vue'),
			meta: {
				title: '健康专员管理'
			}
		},
	]
}]

export default dynamicRouter