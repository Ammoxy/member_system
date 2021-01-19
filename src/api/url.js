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
	
	// 部门管理
	'Merchants': BaseURL + '/merchant/list', // 获取部门
	'CreateMerchant': BaseURL + '/creation/merchant', // 新增部门
	'MerchantsSelect': BaseURL + '/merchant/select/list', // 获取部门选择列表
	'Areas': BaseURL + '/china/areas', // 获取省市区
	
	// 资讯管理
	'Banners': BaseURL + '/banner/list', // 获取轮播图
	'CreateBanner': BaseURL + '/creation/banner', // 新增轮播图
	'DelBanner': BaseURL + '/banner', // 删除轮播图
	'DocumentType': BaseURL + '/document/type/list', // 获取资讯分类
	'CreateDocumentType': BaseURL + '/creation/document/type', // 新增资讯分类
	'DelDocumentType': BaseURL + '/document/type', // 删除资讯分类
	'Document': BaseURL + '/document/list', // 获取资讯
	'CreateDocument': BaseURL + '/creation/document', // 新增资讯
	'DelDocument': BaseURL + '/document', // 删除资讯

	// 分类管理
	'Classify': BaseURL + '/classify', // 获取分类/删除分类
	'CreateClassify': BaseURL + '/creation/classify', // 新增分类
	'SeleClassify': BaseURL + '/select/classify', // 选择分类

	// 商品管理
	'Goods': BaseURL + '/goods', // 获取商品列表
	'CreateGoods': BaseURL + '/creation/good', // 新增商品
	'GoodDetail': BaseURL + '/good', // 获取商品详情
	'UserGoods': BaseURL + '/user/goods', // 获取会员商品列表
	'CreateUserGoods': BaseURL + '/creation/user/good', // 新增会员商品
	'UserGoodDetail': BaseURL + '/user/good', // 获取会员商品详情
	'CreateKeyword': BaseURL + '/creation/keyword', // 新增关键词
	'Keywords': BaseURL + '/keywords', // 获取关键字列表
	'DelKeyword': BaseURL + '/keyword', // 删除关键字
	'CreateActivity': BaseURL + '/creation/activity', // 创建活动
	'Activities': BaseURL + '/activities', // 获取活动

	// 用户
	'WxUser': BaseURL + '/wx/users', // 获取用户列表
	'UserInfo': BaseURL + '/user/info', // 用户列表

	// 分销管理
	'HealthUserList': BaseURL + '/health/user/list', // 获取健康专员列表
	'HealthApplyList': BaseURL + '/health/apply/list', // 获取健康专员申请列表
	'HealthCheck': BaseURL + '/health/check', // 健康专员审核

	// 专家
	'Specialists': BaseURL + '/specialists', // 专家列表
	'CreateSpecialists': BaseURL + '/creation/specialist', // 新增专家
	'DelSpecialist': BaseURL + '/specialist', // 删除专家
	
}

module.exports = url;