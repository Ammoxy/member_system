const dynamicRouter = [{
	path: '/merchant',
	name: 'merchant',
	component: () => import('@/views/merchant/merchant.vue'),
	meta: {
		title: '部门管理',
		icon: 'el-icon-user-solid',
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
				title: '普通商品列表'
			}
		},
		{
			path: '/memberGoods',
			name: 'memberGoods',
			component: () => import('@/components/commodity/memberGoods.vue'),
			meta: {
				title: '会员商品列表'
			}
		},
		{
			path: '/keyword',
			name: 'keyword',
			component: () => import('@/components/commodity/keyword.vue'),
			meta: {
				title: '关键字列表'
			}
		},
		{
			path: '/activity',
			name: 'activity',
			component: () => import('@/components/commodity/activity.vue'),
			meta: {
				title: '活动列表'
			}
		},
	]
}, {
	path: '/user',
	name: 'user',
	component: () => import('@/views/user/user.vue'),
	meta: {
		title: '分销管理',
		icon: 'el-icon-user-solid',
	},
	children: [{
			path: '/attache',
			name: 'attache',
			component: () => import('@/views/attache/attache.vue'),
			meta: {
				title: '健康专员'
			}
		},
	]
},  {
	path: '/expert',
	name: 'expert',
	component: () => import('@/views/expert/expert.vue'),
	meta: {
		title: '专家管理',
		icon: 'el-icon-user-solid',
	},
	// children: [{
	// 		path: '/attache',
	// 		name: 'attache',
	// 		component: () => import('@/views/attache/attache.vue'),
	// 		meta: {
	// 			title: '健康专员'
	// 		}
	// 	},
	// ]
},{
	path: '/information',
	name: 'information',
	component: () => import('@/views/information/index.vue'),
	meta: {
		title: '资讯管理',
		icon: 'el-icon-picture',
	},
	children: [{
			path: '/banner',
			name: 'banner',
			component: () => import('@/components/information/banner.vue'),
			meta: {
				title: '轮播图管理'
			}
		},
		{
			path: '/message',
			name: 'message',
			component: () => import('@/views/information/message.vue'),
			meta: {
				title: '资讯管理'
			}
		},
	]
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