const dynamicRouter = [{
		path: '/merchant',
		name: 'merchant',
		component: () => import('@/views/merchant/merchant.vue'),
		meta: {
			title: '部门管理',
			icon: 'el-icon-user-solid',
		},
	},
	{
		path: '/commodity',
		name: 'commodity',
		component: () => import('@/views/commodity/index.vue'),
		meta: {
			title: '商品管理',
			icon: 'el-icon-s-goods',
		},
		children: [{
				path: '/classify',
				name: 'classify',
				component: () => import('@/views/classify/classify.vue'),
				meta: {
					title: '商品分类',
					// icon: 'el-icon-menu',
				},
			}, {
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
	},
	{
		path: '/order',
		name: 'order',
		component: () => import('@/views/order/index.vue'),
		meta: {
			title: '订单管理',
			icon: 'el-icon-s-order',
		},
		children: [{
			path: '/commonOrder',
			name: 'commonOrder',
			component: () => import('@/views/order/commonOrder.vue'),
			meta: {
				title: '普通订单'
			}
		}, {
			path: '/memberOrder',
			name: 'memberOrder',
			component: () => import('@/views/order/memberOrder.vue'),
			meta: {
				title: '会员订单'
			}
		}, {
			path: '/expressage',
			name: 'expressage',
			component: () => import('@/views/order/expressage.vue'),
			meta: {
				title: '快递设置'
			}
		}, ]
	},
	{
		path: '/user',
		name: 'user',
		component: () => import('@/views/user/user.vue'),
		meta: {
			title: '分销管理',
			icon: 'el-icon-user-solid',
		},
		children: [{
			path: '/apply',
			name: 'apply',
			component: () => import('@/views/attache/apply.vue'),
			meta: {
				title: '健康专员申请列表'
			}
		}, {
			path: '/attache',
			name: 'attache',
			component: () => import('@/views/attache/attache.vue'),
			meta: {
				title: '健康专员列表'
			}
		}, ]
	}, {
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
	}, {
		path: '/member',
		name: 'member',
		component: () => import('@/views/member/index.vue'),
		meta: {
			title: '会员管理',
			icon: 'el-icon-user-solid',
		},
		children: [{
			path: '/memberUser',
			name: 'memberUser',
			component: () => import('@/components/member/memberUser.vue'),
			meta: {
				title: '会员列表'
			}
		}, {
			path: '/memberGoods',
			name: 'memberGoods',
			component: () => import('@/components/member/memberGoods.vue'),
			meta: {
				title: '会员商品列表'
			}
		}, ]
	}, {
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
	}
]

export default dynamicRouter