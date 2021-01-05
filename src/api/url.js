//  const BaseURL = "https://chu.fengniaotuangou.cn"
const BaseURL = "http://192.168.0.107"

const url = {
	// 登录
	'Login': BaseURL + '/login', // 登录
	'Logout': BaseURL + '/logout', // 退出

	// 系统设置
	'Permissions': BaseURL + '/token/permissions', // 获取权限
	'CreateRole': BaseURL + '/creation/role', // 添加角色
	'Roles': BaseURL + '/roles', // 获取角色
	'CreateUser': BaseURL + '/creation/user', // 添加用户
	'Users': BaseURL + '/users', // 获取用户
	'DelUser': BaseURL + '/user', // 删除用户
	'ResetPassword': BaseURL + '/reset/password', // 重置密码
	'HealthUser': BaseURL + '/health/user', // 获取专员列表/编辑
	
	// 商家管理
	'Merchants': BaseURL + '/merchant/list', // 获取商家
	'CreateMerchant': BaseURL + '/creation/merchant', // 新增商家
	'Areas': BaseURL + '/china/areas', // 获取省市区
	
	// 轮播图管理
	'Banners': BaseURL + '/banner/list', // 获取轮播图
	'CreateBanner': BaseURL + '/creation/banner', // 新增轮播图
	'DelBanner': BaseURL + '/banner', // 删除轮播图

	// 分类管理
	'Classify': BaseURL + '/classify', // 获取分类/删除分类
	'CreateClassify': BaseURL + '/creation/classify', // 新增分类
	'SeleClassify': BaseURL + '/select/classify', // 选择分类

	// 商品管理
	'Goods': BaseURL + '/goods', // 获取商品列表
	'CreateGoods': BaseURL + '/creation/good', // 新增商品
	'GoodDetail': BaseURL + '/good', // 获取商品详情
	'CreateKeyword': BaseURL + '/creation/keyword', // 新增关键词
	'Keywords': BaseURL + '/keywords', // 获取关键字列表
	'DelKeyword': BaseURL + '/keyword', // 删除关键字
	'CreateActivity': BaseURL + '/creation/activity', // 创建活动
	'Activities': BaseURL + '/activities', // 获取活动

	// 用户
	'WxUser': BaseURL + '/wx/users', // 获取用户列表
	
}

module.exports = url;