(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f0d37dc2"],{1276:function(e,t,r){"use strict";var a=r("d784"),n=r("44e7"),s=r("825a"),i=r("1d80"),o=r("4840"),l=r("8aa5"),c=r("50c4"),u=r("14c3"),d=r("9263"),p=r("d039"),g=[].push,f=Math.min,h=4294967295,m=!p((function(){return!RegExp(h,"y")}));a("split",2,(function(e,t,r){var a;return a="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,r){var a=String(i(this)),s=void 0===r?h:r>>>0;if(0===s)return[];if(void 0===e)return[a];if(!n(e))return t.call(a,e,s);var o,l,c,u=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),f=0,m=new RegExp(e.source,p+"g");while(o=d.call(m,a)){if(l=m.lastIndex,l>f&&(u.push(a.slice(f,o.index)),o.length>1&&o.index<a.length&&g.apply(u,o.slice(1)),c=o[0].length,f=l,u.length>=s))break;m.lastIndex===o.index&&m.lastIndex++}return f===a.length?!c&&m.test("")||u.push(""):u.push(a.slice(f)),u.length>s?u.slice(0,s):u}:"0".split(void 0,0).length?function(e,r){return void 0===e&&0===r?[]:t.call(this,e,r)}:t,[function(t,r){var n=i(this),s=void 0==t?void 0:t[e];return void 0!==s?s.call(t,n,r):a.call(String(n),t,r)},function(e,n){var i=r(a,e,this,n,a!==t);if(i.done)return i.value;var d=s(e),p=String(this),g=o(d,RegExp),v=d.unicode,_=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(m?"y":"g"),y=new g(m?d:"^(?:"+d.source+")",_),b=void 0===n?h:n>>>0;if(0===b)return[];if(0===p.length)return null===u(y,p)?[p]:[];var w=0,C=0,x=[];while(C<p.length){y.lastIndex=m?C:0;var k,P=u(y,m?p:p.slice(C));if(null===P||(k=f(c(y.lastIndex+(m?0:C)),p.length))===w)C=l(p,C,v);else{if(x.push(p.slice(w,C)),x.length===b)return x;for(var S=1;S<=P.length-1;S++)if(x.push(P[S]),x.length===b)return x;C=w=k}}return x.push(p.slice(w)),x}]}),!m)},2455:function(e,t,r){},"365c":function(e,t,r){"use strict";var a=r("be3b"),n=r("99b1"),s=r.n(n),i={createRole:function(e){return a["a"].post(s.a.CreateRole,e)},roles:function(e,t){return a["a"].get(s.a.Roles,{currentPage:e,perPage:t})},delRoles:function(e){return a["a"].del(s.a.Roles,{id:e})},createUser:function(e){return a["a"].post(s.a.CreateUser,e)},users:function(e,t){return a["a"].get(s.a.Users,{currentPage:e,perPage:t})},delUser:function(e){return a["a"].del(s.a.DelUser,{id:e})},resetPassword:function(e){return a["a"].post(s.a.ResetPassword,e)},createHealthUser:function(e){return a["a"].post(s.a.HealthUser,e)},healthUser:function(){return a["a"].get(s.a.HealthUser,{})},merchants:function(e,t,r){return a["a"].get(s.a.Merchants,{currentPage:e,perPage:t,name:r})},merchantsSelect:function(){return a["a"].get(s.a.MerchantsSelect,{})},createMerchant:function(e){return a["a"].post(s.a.CreateMerchant,e)},areas:function(e,t){return a["a"].get(s.a.Areas,{type:e,parent_id:t})},createBanner:function(e){return a["a"].post(s.a.CreateBanner,e)},banners:function(e,t){return a["a"].get(s.a.Banners,{currentPage:e,perPage:t})},delBanner:function(e){return a["a"].del(s.a.DelBanner,{id:e})},createDocumentType:function(e){return a["a"].post(s.a.CreateDocumentType,e)},documentType:function(e,t){return a["a"].get(s.a.DocumentType,{currentPage:e,perPage:t})},delDocumentType:function(e){return a["a"].del(s.a.DelDocumentType,{id:e})},createDocument:function(e){return a["a"].post(s.a.CreateDocument,e)},document:function(e,t,r){return a["a"].get(s.a.Document,{currentPage:e,perPage:t,document_type:r})},delDocument:function(e){return a["a"].del(s.a.DelDocument,{id:e})},createClassify:function(e){return a["a"].post(s.a.CreateClassify,e)},classifies:function(e,t,r){return a["a"].get(s.a.Classify,{currentPage:e,perPage:t,type:r})},delClassify:function(e){return a["a"].del(s.a.Classify,{id:e})},seleClassify:function(e,t){return a["a"].get(s.a.SeleClassify,{type:e,parent_id:t})},createGoods:function(e){return a["a"].post(s.a.CreateGoods,e)},goods:function(e,t,r,n,i){return a["a"].get(s.a.Goods,{currentPage:e,perPage:t,name:r,classify_id:n,on_shelf:i})},goodDetail:function(e){return a["a"].get(s.a.GoodDetail,{id:e})},createUserGoods:function(e){return a["a"].post(s.a.CreateUserGoods,e)},userGoods:function(e,t,r,n){return a["a"].get(s.a.UserGoods,{currentPage:e,perPage:t,name:r,on_shelf:n})},userGoodDetail:function(e){return a["a"].get(s.a.UserGoodDetail,{id:e})},createKeyword:function(e){return a["a"].post(s.a.CreateKeyword,e)},keywords:function(e,t,r){return a["a"].get(s.a.Keywords,{currentPage:e,perPage:t,keyword:r})},delKeyword:function(e){return a["a"].del(s.a.DelKeyword,{id:e})},createActivity:function(e){return a["a"].post(s.a.CreateActivity,e)},activities:function(e,t){return a["a"].get(s.a.Activities,{currentPage:e,perPage:t})},wxUser:function(e,t,r,n){return a["a"].get(s.a.WxUser,{currentPage:e,perPage:t,user_id:r,nickname:n})},userInfo:function(e,t,r,n){return a["a"].get(s.a.UserInfo,{currentPage:e,perPage:t,name:r,state:n})},healthCheck:function(e,t){return a["a"].post(s.a.HealthCheck,{id:e,state:t})},healthUserList:function(e,t,r){return a["a"].get(s.a.HealthUserList,{currentPage:e,perPage:t,name:r})},healthApplyList:function(e,t,r,n){return a["a"].get(s.a.HealthApplyList,{currentPage:e,perPage:t,name:r,state:n})},withdrawsList:function(e,t,r,n){return a["a"].get(s.a.WithdrawsList,{currentPage:e,perPage:t,name:r,state:n})},withdrawsCheck:function(e,t,r){return a["a"].post(s.a.WithdrawsCheck,{id:e,state:t,remark:r})},underlingUser:function(e,t,r){return a["a"].get(s.a.UnderlingUser,{currentPage:e,perPage:t,user_id:r})},commissionSource:function(e,t,r){return a["a"].get(s.a.CommissionSource,{currentPage:e,perPage:t,user_id:r})},merCommission:function(e,t,r){return a["a"].get(s.a.MerCommission,{currentPage:e,perPage:t,merchant_id:r})},moneyEmpty:function(e){return a["a"].post(s.a.MoneyEmpty,{user_id:e})},createSpecialists:function(e){return a["a"].post(s.a.CreateSpecialists,e)},specialists:function(e,t,r){return a["a"].get(s.a.Specialists,{currentPage:e,perPage:t,name:r})},delSpecialist:function(e){return a["a"].del(s.a.DelSpecialist,{id:e})},userOrder:function(e,t,r,n,i){return a["a"].get(s.a.UserOrder,{currentPage:e,perPage:t,status:r,no:n,good_id:i})},shopingpInfo:function(e,t){return a["a"].get(s.a.ShopingpInfo,{order_id:e,type:t})},recaptionInfo:function(e,t){return a["a"].get(s.a.RecaptionInfo,{order_id:e,type:t})},orders:function(e,t,r,n,i){return a["a"].get(s.a.Orders,{currentPage:e,perPage:t,status:r,no:n,good_id:i})},ordersGoods:function(e){return a["a"].get(s.a.OrdersGoods,{order_id:e})},confirmShipments:function(e,t){return a["a"].post(s.a.ConfirmShipments,{order_id:e,type:t})}};t["a"]=i},8764:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[r("div",{staticClass:"handle-box"},[r("div",{staticClass:"btn"},[r("el-select",{attrs:{placeholder:"请选择订单状态"},on:{change:e.stateChange},model:{value:e.orderStatus,callback:function(t){e.orderStatus=t},expression:"orderStatus"}},e._l(e.statusList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("div",{staticClass:"btn"},[r("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入订单号"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(e.keyword)}},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}},[r("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(t){return e.search(e.keyword)}},slot:"append"}),r("el-button",{attrs:{slot:"append",icon:"el-icon-refresh"},on:{click:e.refresh},slot:"append"})],1)],1)]),r("el-table",{attrs:{data:e.tableData,border:"","header-cell-style":{background:"#f0f0f0"},"max-height":"620"}},[r("el-table-column",{attrs:{prop:"id",label:"订单ID"}}),r("el-table-column",{attrs:{prop:"good_id",label:"商品ID"}}),r("el-table-column",{attrs:{prop:"userGood.name",label:"商品名称"}}),r("el-table-column",{attrs:{prop:"userGood.img",label:"缩略图"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.userGood.img?r("div",[r("el-popover",{attrs:{placement:"top-start",title:"",trigger:"click"}},[r("img",{staticStyle:{"max-width":"800px","max-height":"800px"},attrs:{src:t.row.userGood.img}}),r("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{slot:"reference",src:t.row.userGood.img},slot:"reference"})])],1):r("div",[r("span",[e._v("--暂无图片--")])])]}}])}),r("el-table-column",{attrs:{prop:"no",label:"订单号"}}),r("el-table-column",{attrs:{prop:"count",label:"数量"}}),r("el-table-column",{attrs:{prop:"money",label:"商品总金额"}}),r("el-table-column",{attrs:{prop:"freight",label:"运费"}}),r("el-table-column",{attrs:{prop:"is_fetch",label:"收货方式"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.is_fetch?r("div",[r("span",[e._v("物流配送")])]):e._e(),2==t.row.is_fetch?r("div",[r("span",[e._v("到店自取")])]):e._e()]}}])}),r("el-table-column",{attrs:{prop:"status",label:"订单状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?r("div",[r("span",[e._v("待支付")])]):e._e(),2==t.row.status?r("div",[r("span",[e._v("待发货")])]):e._e(),3==t.row.status?r("div",[r("span",[e._v("待收货")])]):e._e(),4==t.row.status?r("div",[r("span",[e._v("已收货")])]):e._e(),5==t.row.status?r("div",[r("span",[e._v("退款")])]):e._e(),6==t.row.status?r("div",[r("span",[e._v("订单取消")])]):e._e()]}}])}),r("el-table-column",{attrs:{prop:"created_at",label:"创建时间"}}),r("el-table-column",{attrs:{label:"操作",width:"120px"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-dropdown",[r("el-button",{attrs:{type:"primary"}},[e._v(" 操作 "),r("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",[1==t.row.is_fetch?r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.handleDetail(t.$index,t.row)}}},[e._v(" 配送信息 ")]):e._e(),2==t.row.is_fetch?r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.handleDetail(t.$index,t.row)}}},[e._v(" 自提信息 ")]):e._e()],1),r("el-dropdown-item",[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.handleShipments(t.$index,t.row)}}},[e._v(" 发货 ")])],1)],1)],1)]}}])})],1),r("div",{staticClass:"block"},[r("el-pagination",{attrs:{"current-page":e.current,"page-size":e.size,layout:"sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.currentChange,"update:currentPage":function(t){e.current=t},"update:current-page":function(t){e.current=t},"size-change":e.sizeChange}})],1),r("el-dialog",{attrs:{title:"收货信息",visible:e.dialogOrder,width:"50%",center:""},on:{"update:visible":function(t){e.dialogOrder=t}}},[r("div",{staticClass:"box"},[1==e.is_fetch?r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("配送信息")])]),r("div",{staticClass:"text item"},[e._v(" "+e._s("订单ID: "+e.orderData.order_id)+" ")]),r("div",{staticClass:"text item"},[e._v(" "+e._s("姓名: "+e.orderData.name)+" ")]),r("div",{staticClass:"text item"},[e._v(" "+e._s("手机: "+e.orderData.phone)+" ")]),r("div",{staticClass:"text item"},[e._v(" "+e._s("地址: "+e.orderData.address)+" ")]),r("div",{staticClass:"text item"},[e._v(" "+e._s("创建时间: "+e.orderData.created_at)+" ")])]):e._e(),2==e.is_fetch?r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("到店自取信息")])]),r("div",{staticClass:"text item"},[e._v(" "+e._s("订单ID: "+e.orderData.order_id)+" ")]),r("div",{staticClass:"text item"},[e._v(" "+e._s("核销码: "+e.orderData.code)+" ")]),r("div",{staticClass:"text item"},[e._v(" "+e._s("商家名称: "+e.merchant_name)+" ")]),r("div",{staticClass:"text item"},[e._v(" "+e._s("商家地址: "+e.merchant_address)+" ")]),r("div",{staticClass:"text item"},[e._v(" "+e._s("创建时间: "+e.orderData.created_at)+" ")])]):e._e()],1)]),r("el-dialog",{attrs:{visible:e.dialogShipments,title:"发货",width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogShipments=t}}},[r("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否发货")]),r("span",[r("el-button",{attrs:{type:"primary"},on:{click:e.toConfirm}},[e._v("确定")]),r("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogShipments=!1}}},[e._v("取消")])],1)])],1)},n=[],s=(r("caad"),r("b0c0"),r("ac1f"),r("2532"),r("1276"),r("365c")),i={inject:["reload"],data:function(){return{loading:!0,tableData:[],current:1,total:0,size:10,name:"",is_fetch:"",order_id:"",dialogOrder:!1,orderData:[],merchant_name:"",merchant_address:"",dialogShipments:!1,orderStatus:"",statusList:[{value:0,label:"全部"},{value:1,label:"待支付"},{value:2,label:"待发货"},{value:3,label:"待收货"},{value:4,label:"已收货"},{value:5,label:"取消"}],keyword:""}},mounted:function(){this.permissionData=localStorage.getItem("permissions").split(","),this.getOrderList(this.current,this.size)},methods:{getOrderList:function(e,t,r,a,n){var i=this;i.loading=!0,s["a"].userOrder(e,t,r,a,n).then((function(e){i.loading=!1,i.tableData=e.result.data,i.total=e.result.total})).catch((function(e){i.loading=!1}))},currentChange:function(e){var t=this;t.current=e,t.loading=!0,t.orderStatus?t.getOrderList(e,t.size,t.orderStatus):t.keyword?t.getOrderList(e,t.size,t.orderStatus,t.keyword):t.getOrderList(e,t.size)},sizeChange:function(e){var t=this;t.size=e,t.loading=!0,t.current=1,t.orderStatus?t.getOrderList(1,e,t.orderStatus):t.keyword?t.getOrderList(1,e,t.orderStatus,t.keyword):t.getOrderList(1,e)},stateChange:function(e){var t=this;t.loading=!0,t.current=1,t.keyword="",0==t.orderStatus?t.getOrderList(t.current,t.size):t.getOrderList(t.current,t.size,t.orderStatus)},search:function(){var e=this;e.loading=!0,e.current=1,e.orderStatus="",e.getOrderList(e.current,e.size,e.orderStatus,e.keyword)},handleDetail:function(e,t){var r=this;r.is_fetch=t.is_fetch,r.order_id=t.id,r.permissionData.includes("sendGoodMer")?(r.dialogOrder=!0,1==t.is_fetch?s["a"].shopingpInfo(r.order_id,2).then((function(e){console.log(r.orderData),r.orderData=e.result,r.$message.success("获取数据成功")})):2==t.is_fetch&&s["a"].recaptionInfo(r.order_id,2).then((function(e){r.orderData=e.result,r.merchant_name=e.result.merchant.name,r.merchant_address=e.result.merchant.address,console.log(r.orderData.merchant.name),r.$message.success("获取数据成功")}))):r.$message.warning("无权操作")},handleShipments:function(e,t){var r=this;r.order_id=t.id,r.permissionData.includes("sendGoodMer")?2==t.status?r.dialogShipments=!0:r.$message.warning("订单已发货"):r.$message.warning("无权操作")},toConfirm:function(){var e=this;s["a"].confirmShipments(e.order_id,2).then((function(t){e.$message.success("发货成功"),e.dialogShipments=!1,e.getOrderList(e.current,e.size)}))},refresh:function(){this.reload()}}},o=i,l=(r("beda"),r("2877")),c=Object(l["a"])(o,a,n,!1,null,"32deffbd",null);t["default"]=c.exports},beda:function(e,t,r){"use strict";r("2455")}}]);
//# sourceMappingURL=chunk-f0d37dc2.c421b47a.js.map