(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d540ff58"],{"2fb4":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[r("div",{staticClass:"handle-box"},[r("div",{staticClass:"btn"},[r("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(e.name)}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}},[r("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(t){return e.search(e.name)}},slot:"append"})],1)],1)]),r("el-table",{attrs:{data:e.tableData,border:"","header-cell-style":{background:"#f0f0f0"},"max-height":"620"}},[r("el-table-column",{attrs:{prop:"id",label:"ID"}}),r("el-table-column",{attrs:{prop:"user.avatarUrl",label:"头像"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.user.avatarUrl?r("div",[r("el-popover",{attrs:{placement:"top-start",title:"",trigger:"click"}},[r("img",{staticStyle:{"max-width":"800px","max-height":"800px"},attrs:{src:t.row.user.avatarUrl}}),r("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{slot:"reference",src:t.row.user.avatarUrl},slot:"reference"})])],1):r("div",[r("span",[e._v("--暂无图片--")])])]}}])}),r("el-table-column",{attrs:{prop:"user.nickname",label:"昵称"}}),r("el-table-column",{attrs:{prop:"name",label:"姓名"}}),r("el-table-column",{attrs:{prop:"type",label:"身份"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.type?r("div",[r("span",[e._v("普通用户")])]):e._e(),2==t.row.type?r("div",[r("span",[e._v("会员")])]):e._e(),3==t.row.type?r("div",[r("span",[e._v("健康专员")])]):e._e()]}}])}),r("el-table-column",{attrs:{prop:"sex",label:"性别",width:"120px"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",{domProps:{textContent:e._s(1==t.row.sex?"男":"女")}})]}}])}),r("el-table-column",{attrs:{prop:"age",label:"年龄"}}),r("el-table-column",{attrs:{prop:"stature",label:"身高"}}),r("el-table-column",{attrs:{prop:"weight",label:"体重"}}),r("el-table-column",{attrs:{prop:"profession",label:"职业"}}),r("el-table-column",{attrs:{prop:"phone",label:"手机号码"}})],1),r("div",{staticClass:"block"},[r("el-pagination",{attrs:{"current-page":e.current,"page-size":e.size,layout:"sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.currentChange,"update:currentPage":function(t){e.current=t},"update:current-page":function(t){e.current=t},"size-change":e.sizeChange}})],1)],1)},n=[],o=(r("b0c0"),r("365c")),s={data:function(){return{loading:!0,tableData:[],current:1,total:0,size:10,name:""}},mounted:function(){this.getUserInfo(this.current,this.size)},methods:{getUserInfo:function(e,t,r){var a=this;a.loading=!0,o["a"].userInfo(e,t,r,2).then((function(e){a.loading=!1,a.tableData=e.result.data,a.total=e.result.total})).catch((function(e){a.loading=!1}))},currentChange:function(e){var t=this;t.current=e,t.loading=!0,t.name?t.getUserInfo(e,t.size,t.name):t.getUserInfo(e,t.size)},sizeChange:function(e){var t=this;t.size=e,t.loading=!0,t.name?t.getUserInfo(1,e,t.name):t.getUserInfo(1,e),t.current=1},search:function(){var e=this;e.loading=!0,e.current=1,e.getUserInfo(e.current,e.size,e.name)}}},u=s,i=r("2877"),c=Object(i["a"])(u,a,n,!1,null,"19d20992",null);t["default"]=c.exports},"365c":function(e,t,r){"use strict";var a=r("be3b"),n=r("99b1"),o=r.n(n),s={createRole:function(e){return a["a"].post(o.a.CreateRole,e)},roles:function(e,t){return a["a"].get(o.a.Roles,{currentPage:e,perPage:t})},delRoles:function(e){return a["a"].del(o.a.Roles,{id:e})},createUser:function(e){return a["a"].post(o.a.CreateUser,e)},users:function(e,t){return a["a"].get(o.a.Users,{currentPage:e,perPage:t})},delUser:function(e){return a["a"].del(o.a.DelUser,{id:e})},resetPassword:function(e){return a["a"].post(o.a.ResetPassword,e)},createHealthUser:function(e){return a["a"].post(o.a.HealthUser,e)},healthUser:function(){return a["a"].get(o.a.HealthUser,{})},merchants:function(e,t,r){return a["a"].get(o.a.Merchants,{currentPage:e,perPage:t,name:r})},merchantsSelect:function(){return a["a"].get(o.a.MerchantsSelect,{})},createMerchant:function(e){return a["a"].post(o.a.CreateMerchant,e)},areas:function(e,t){return a["a"].get(o.a.Areas,{type:e,parent_id:t})},createBanner:function(e){return a["a"].post(o.a.CreateBanner,e)},banners:function(e,t){return a["a"].get(o.a.Banners,{currentPage:e,perPage:t})},delBanner:function(e){return a["a"].del(o.a.DelBanner,{id:e})},createDocumentType:function(e){return a["a"].post(o.a.CreateDocumentType,e)},documentType:function(e,t){return a["a"].get(o.a.DocumentType,{currentPage:e,perPage:t})},delDocumentType:function(e){return a["a"].del(o.a.DelDocumentType,{id:e})},createDocument:function(e){return a["a"].post(o.a.CreateDocument,e)},document:function(e,t,r){return a["a"].get(o.a.Document,{currentPage:e,perPage:t,document_type:r})},delDocument:function(e){return a["a"].del(o.a.DelDocument,{id:e})},createClassify:function(e){return a["a"].post(o.a.CreateClassify,e)},classifies:function(e,t,r){return a["a"].get(o.a.Classify,{currentPage:e,perPage:t,type:r})},delClassify:function(e){return a["a"].del(o.a.Classify,{id:e})},seleClassify:function(e,t){return a["a"].get(o.a.SeleClassify,{type:e,parent_id:t})},createGoods:function(e){return a["a"].post(o.a.CreateGoods,e)},goods:function(e,t,r,n,s){return a["a"].get(o.a.Goods,{currentPage:e,perPage:t,name:r,classify_id:n,on_shelf:s})},goodDetail:function(e){return a["a"].get(o.a.GoodDetail,{id:e})},createUserGoods:function(e){return a["a"].post(o.a.CreateUserGoods,e)},userGoods:function(e,t,r,n){return a["a"].get(o.a.UserGoods,{currentPage:e,perPage:t,name:r,on_shelf:n})},userGoodDetail:function(e){return a["a"].get(o.a.UserGoodDetail,{id:e})},createKeyword:function(e){return a["a"].post(o.a.CreateKeyword,e)},keywords:function(e,t,r){return a["a"].get(o.a.Keywords,{currentPage:e,perPage:t,keyword:r})},delKeyword:function(e){return a["a"].del(o.a.DelKeyword,{id:e})},createActivity:function(e){return a["a"].post(o.a.CreateActivity,e)},activities:function(e,t){return a["a"].get(o.a.Activities,{currentPage:e,perPage:t})},wxUser:function(e,t,r,n){return a["a"].get(o.a.WxUser,{currentPage:e,perPage:t,user_id:r,nickname:n})},userInfo:function(e,t,r,n){return a["a"].get(o.a.UserInfo,{currentPage:e,perPage:t,name:r,state:n})},healthCheck:function(e,t){return a["a"].post(o.a.HealthCheck,{id:e,state:t})},healthUserList:function(e,t,r){return a["a"].get(o.a.HealthUserList,{currentPage:e,perPage:t,name:r})},healthApplyList:function(e,t,r,n){return a["a"].get(o.a.HealthApplyList,{currentPage:e,perPage:t,name:r,state:n})},withdrawsList:function(e,t,r,n){return a["a"].get(o.a.WithdrawsList,{currentPage:e,perPage:t,name:r,state:n})},withdrawsCheck:function(e,t,r){return a["a"].post(o.a.WithdrawsCheck,{id:e,state:t,remark:r})},underlingUser:function(e,t,r){return a["a"].get(o.a.UnderlingUser,{currentPage:e,perPage:t,user_id:r})},commissionSource:function(e,t,r){return a["a"].get(o.a.CommissionSource,{currentPage:e,perPage:t,user_id:r})},merCommission:function(e,t,r){return a["a"].get(o.a.MerCommission,{currentPage:e,perPage:t,merchant_id:r})},moneyEmpty:function(e){return a["a"].post(o.a.MoneyEmpty,{user_id:e})},createSpecialists:function(e){return a["a"].post(o.a.CreateSpecialists,e)},specialists:function(e,t,r){return a["a"].get(o.a.Specialists,{currentPage:e,perPage:t,name:r})},delSpecialist:function(e){return a["a"].del(o.a.DelSpecialist,{id:e})},userOrder:function(e,t,r,n,s){return a["a"].get(o.a.UserOrder,{currentPage:e,perPage:t,status:r,no:n,good_id:s})},shopingpInfo:function(e,t){return a["a"].get(o.a.ShopingpInfo,{order_id:e,type:t})},recaptionInfo:function(e,t){return a["a"].get(o.a.RecaptionInfo,{order_id:e,type:t})},orders:function(e,t,r,n,s){return a["a"].get(o.a.Orders,{currentPage:e,perPage:t,status:r,no:n,good_id:s})},ordersGoods:function(e){return a["a"].get(o.a.OrdersGoods,{order_id:e})},confirmShipments:function(e,t){return a["a"].post(o.a.ConfirmShipments,{order_id:e,type:t})}};t["a"]=s}}]);
//# sourceMappingURL=chunk-d540ff58.eb0f5da1.js.map