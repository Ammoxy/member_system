import axios from '@/plugins/axios'
import url from './url.js'

var API = {};

// 添加角色
API.createRole = function (data) {
	return axios.post(url.CreateRole, data)
}
// 获取角色
API.roles = function (currentPage, perPage) {
	return axios.get(url.Roles, {
		currentPage: currentPage,
		perPage: perPage
	})
}
// 删除角色
API.delRoles = function (id) {
	return axios.del(url.Roles, {
		id: id
	})
}

// 添加用户
API.createUser = function (data) {
	return axios.post(url.CreateUser, data)
}
// 获取用户
API.users = function (currentPage, perPage) {
	return axios.get(url.Users, {
		currentPage: currentPage,
		perPage: perPage
	})
}
// 删除用户
API.delUser = function (id) {
	return axios.del(url.DelUser, {
		id: id
	})
}
// 重置密码
API.resetPassword = function (data) {
	return axios.post(url.ResetPassword, data)
}
// 编辑
API.createHealthUser = function (data) {
	return axios.post(url.HealthUser, data)
}
// 获取专员
API.healthUser = function () {
	return axios.get(url.HealthUser, {})
}

// 获取部门
API.merchants = function (currentPage, perPage, name) {
	return axios.get(url.Merchants, {
		currentPage: currentPage,
		perPage: perPage,
		name: name
	})
}
// 获取部门选择列表
API.merchantsSelect = function () {
	return axios.get(url.MerchantsSelect, {})
}
// 新增部门
API.createMerchant = function (data) {
	return axios.post(url.CreateMerchant, data)
}
// 获取省市区
API.areas = function (type, parent_id) {
	return axios.get(url.Areas, {
		type: type,
		parent_id: parent_id
	})
}

// 添加轮播图
API.createBanner = function (data) {
	return axios.post(url.CreateBanner, data)
}
// 获取轮播图
API.banners = function (currentPage, perPage) {
	return axios.get(url.Banners, {
		currentPage: currentPage,
		perPage: perPage
	})
}
// 删除轮播图
API.delBanner = function (id) {
	return axios.del(url.DelBanner, {
		id: id
	})
}
// 添加资讯分类
API.createDocumentType = function (data) {
	return axios.post(url.CreateDocumentType, data)
}
// 获取资讯分类
API.documentType = function (currentPage, perPage) {
	return axios.get(url.DocumentType, {
		currentPage: currentPage,
		perPage: perPage
	})
}
// 删除资讯分类
API.delDocumentType = function (id) {
	return axios.del(url.DelDocumentType, {
		id: id
	})
}
// 添加资讯
API.createDocument = function (data) {
	return axios.post(url.CreateDocument, data)
}
// 获取资讯
API.document = function (currentPage, perPage, document_type) {
	return axios.get(url.Document, {
		currentPage: currentPage,
		perPage: perPage,
		document_type: document_type
	})
}
// 删除资讯
API.delDocument = function (id) {
	return axios.del(url.DelDocument, {
		id: id
	})
}

// 新增分类
API.createClassify = function (data) {
	return axios.post(url.CreateClassify, data)
}
// 获取分类
API.classifies = function (currentPage, perPage, type) {
	return axios.get(url.Classify, {
		currentPage: currentPage,
		perPage: perPage,
		type: type
	})
}
// 删除分类
API.delClassify = function (id) {
	return axios.del(url.Classify, {
		id: id
	})
}
// 选择分类
API.seleClassify = function (type, parent_id) {
	return axios.get(url.SeleClassify, {
		type: type,
		parent_id: parent_id
	})
}

// 添加商品
API.createGoods = function (data) {
	return axios.post(url.CreateGoods, data)
}
// 获取商品
API.goods = function (currentPage, perPage, name, classify_id, on_shelf) {
	return axios.get(url.Goods, {
		currentPage: currentPage,
		perPage: perPage,
		name: name,
		classify_id: classify_id,
		on_shelf: on_shelf
	})
}
// 获取商品详情
API.goodDetail = function (id) {
	return axios.get(url.GoodDetail, {
		id: id
	})
}
// 添加会员商品
API.createUserGoods = function (data) {
	return axios.post(url.CreateUserGoods, data)
}
// 获取会员商品
API.userGoods = function (currentPage, perPage, name, on_shelf) {
	return axios.get(url.UserGoods, {
		currentPage: currentPage,
		perPage: perPage,
		name: name,
		on_shelf: on_shelf
	})
}
// 获取会员商品详情
API.userGoodDetail = function (id) {
	return axios.get(url.UserGoodDetail, {
		id: id
	})
}
// 新增关键词
API.createKeyword = function (data) {
	return axios.post(url.CreateKeyword, data)
}
// 获取关键字列表
API.keywords = function (currentPage, perPage, keyword) {
	return axios.get(url.Keywords, {
		currentPage: currentPage,
		perPage: perPage,
		keyword: keyword
	})
}
// 删除关键字
API.delKeyword = function (id) {
	return axios.del(url.DelKeyword, {
		id: id
	})
}
// 创建活动
API.createActivity = function (data) {
	return axios.post(url.CreateActivity, data)
}
// 获取活动列表
API.activities = function (currentPage, perPage) {
	return axios.get(url.Activities, {
		currentPage: currentPage,
		perPage: perPage
	})
}

// 获取用户列表
API.wxUser = function (currentPage, perPage, user_id, nickname) {
	return axios.get(url.WxUser, {
		currentPage: currentPage,
		perPage: perPage,
		user_id: user_id,
		nickname: nickname
	})
}

// 获取用户列表
API.userInfo = function (currentPage, perPage, name, state) {
	return axios.get(url.UserInfo, {
		currentPage: currentPage,
		perPage: perPage,
		name: name,
		state: state
	})
}

// 分销管理
// 审核
API.healthCheck = function (id, state) {
	return axios.post(url.HealthCheck, {
		id: id,
		state: state,
	})
}
// 获取用户列表
API.healthUserList = function (currentPage, perPage, name) {
	return axios.get(url.HealthUserList, {
		currentPage: currentPage,
		perPage: perPage,
		name: name,
	})
}
// 申请列表
API.healthApplyList = function (currentPage, perPage, name, state) {
	return axios.get(url.HealthApplyList, {
		currentPage: currentPage,
		perPage: perPage,
		name: name,
		state: state
	})
}
// 提现申请列表
API.withdrawsList = function (currentPage, perPage, name, state) {
	return axios.get(url.WithdrawsList, {
		currentPage: currentPage,
		perPage: perPage,
		name: name,
		state: state
	})
}
// 审核提现申请
API.withdrawsCheck = function (id, state, remark) {
	return axios.post(url.WithdrawsCheck, {
		id: id,
		state: state,
		remark: remark
	})
}
// 获取下级会员
API.underlingUser = function (currentPage, perPage, user_id) {
	return axios.get(url.UnderlingUser, {
		currentPage: currentPage,
		perPage: perPage,
		user_id: user_id
	})
}
// 获取健康专员佣金来源
API.commissionSource = function (currentPage, perPage, user_id) {
	return axios.get(url.CommissionSource, {
		currentPage: currentPage,
		perPage: perPage,
		user_id: user_id
	})
}
// 获取商家佣金来源
API.merCommission = function (currentPage, perPage, merchant_id) {
	return axios.get(url.MerCommission, {
		currentPage: currentPage,
		perPage: perPage,
		merchant_id: merchant_id
	})
}
// 余额清0
API.moneyEmpty = function (user_id) {
	return axios.post(url.MoneyEmpty, {
		user_id: user_id
	})
}

// 新增专家
API.createSpecialists = function (data) {
	return axios.post(url.CreateSpecialists, data)
}
// 专家列表
API.specialists = function (currentPage, perPage, name) {
	return axios.get(url.Specialists, {
		currentPage: currentPage,
		perPage: perPage,
		name: name
	})
}
// 删除专家
API.delSpecialist = function (id) {
	return axios.del(url.DelSpecialist, {
		id: id
	})
}

// 订单管理
// 会员订单列表
API.userOrder = function (currentPage, perPage, status, no, good_id) {
	return axios.get(url.UserOrder, {
		currentPage: currentPage,
		perPage: perPage,
		status: status,
		no: no,
		good_id: good_id
	})
}
// 获取订单收货地址
API.shopingpInfo = function (order_id, type) {
	return axios.get(url.ShopingpInfo, {
		order_id: order_id,
		type: type
	})
}
// 获取订单到店自提信息
API.recaptionInfo = function (order_id, type) {
	return axios.get(url.RecaptionInfo, {
		order_id: order_id,
		type: type
	})
}
// 订单列表
API.orders = function (currentPage, perPage, status, no, good_id) {
	return axios.get(url.Orders, {
		currentPage: currentPage,
		perPage: perPage,
		status: status,
		no: no,
		good_id: good_id
	})
}
// 获取订单商品
API.ordersGoods = function (order_id) {
	return axios.get(url.OrdersGoods, {
		order_id: order_id
	})
}
// 确认收货
API.confirmShipments = function (order_id, type, express_no, logistics_id) {
	return axios.post(url.ConfirmShipments, {
		order_id: order_id,
		type: type,
		express_no: express_no,
		logistics_id: logistics_id
	})
}

// 创建物流
API.creationLogistic = function (data) {
	return axios.post(url.CreationLogistic, data)
}
// 物流列表
API.logistics = function (currentPage, perPage, name) {
	return axios.get(url.Logistics, {
		currentPage: currentPage,
		perPage: perPage,
		name: name,
	})
}
// 删除物流列表
API.delLogistic = function (id) {
	return axios.del(url.DelLogistic, {
		id: id
	})
}

// 物流列表
API.OrderInquire = function (express_no, logistics_id) {
	return axios.get(url.OrderInquire, {
		express_no: express_no,
		logistics_id: logistics_id
	})
}

export default API