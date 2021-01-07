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

// 获取商家
API.merchants = function (currentPage, perPage, name) {
	return axios.get(url.Merchants, {
		currentPage: currentPage,
		perPage: perPage,
		name: name
	})
}
// 新增商家
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
API.document = function (currentPage, perPage) {
	return axios.get(url.Document, {
		currentPage: currentPage,
		perPage: perPage
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

export default API