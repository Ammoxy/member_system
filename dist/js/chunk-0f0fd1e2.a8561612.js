(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0f0fd1e2"],{1276:function(e,t,r){"use strict";var n=r("d784"),a=r("44e7"),i=r("825a"),o=r("1d80"),s=r("4840"),l=r("8aa5"),c=r("50c4"),u=r("14c3"),d=r("9263"),p=r("d039"),g=[].push,f=Math.min,h=4294967295,m=!p((function(){return!RegExp(h,"y")}));n("split",2,(function(e,t,r){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,r){var n=String(o(this)),i=void 0===r?h:r>>>0;if(0===i)return[];if(void 0===e)return[n];if(!a(e))return t.call(n,e,i);var s,l,c,u=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),f=0,m=new RegExp(e.source,p+"g");while(s=d.call(m,n)){if(l=m.lastIndex,l>f&&(u.push(n.slice(f,s.index)),s.length>1&&s.index<n.length&&g.apply(u,s.slice(1)),c=s[0].length,f=l,u.length>=i))break;m.lastIndex===s.index&&m.lastIndex++}return f===n.length?!c&&m.test("")||u.push(""):u.push(n.slice(f)),u.length>i?u.slice(0,i):u}:"0".split(void 0,0).length?function(e,r){return void 0===e&&0===r?[]:t.call(this,e,r)}:t,[function(t,r){var a=o(this),i=void 0==t?void 0:t[e];return void 0!==i?i.call(t,a,r):n.call(String(a),t,r)},function(e,a){var o=r(n,e,this,a,n!==t);if(o.done)return o.value;var d=i(e),p=String(this),g=s(d,RegExp),y=d.unicode,v=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(m?"y":"g"),b=new g(m?d:"^(?:"+d.source+")",v),w=void 0===a?h:a>>>0;if(0===w)return[];if(0===p.length)return null===u(b,p)?[p]:[];var _=0,C=0,x=[];while(C<p.length){b.lastIndex=m?C:0;var k,P=u(b,m?p:p.slice(C));if(null===P||(k=f(c(b.lastIndex+(m?0:C)),p.length))===_)C=l(p,C,y);else{if(x.push(p.slice(_,C)),x.length===w)return x;for(var S=1;S<=P.length-1;S++)if(x.push(P[S]),x.length===w)return x;C=_=k}}return x.push(p.slice(_)),x}]}),!m)},1319:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[r("div",{staticClass:"handle-box"},[r("div",{staticClass:"btn"},[r("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(e.keyword)}},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}},[r("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(t){return e.search(e.keyword)}},slot:"append"})],1)],1)]),r("el-table",{attrs:{data:e.tableData,border:"","header-cell-style":{background:"#f0f0f0"},"max-height":"620"}},[r("el-table-column",{attrs:{prop:"user_id",label:"用户ID"}}),r("el-table-column",{attrs:{prop:"user.avatarUrl",label:"头像"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.user.avatarUrl?r("div",[r("el-popover",{attrs:{placement:"top-start",title:"",trigger:"click"}},[r("img",{staticStyle:{"max-width":"800px","max-height":"800px"},attrs:{src:t.row.user.avatarUrl}}),r("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{slot:"reference",src:t.row.user.avatarUrl},slot:"reference"})])],1):r("div",[r("span",[e._v("--暂无图片--")])])]}}])}),r("el-table-column",{attrs:{prop:"user.nickname",label:"昵称"}}),r("el-table-column",{attrs:{prop:"name",label:"姓名"}}),r("el-table-column",{attrs:{prop:"money",label:"余额"}}),r("el-table-column",{attrs:{prop:"identity",label:"身份证"}}),r("el-table-column",{attrs:{prop:"phone",label:"电话"}}),r("el-table-column",{attrs:{prop:"merchant.name",label:"部门"}}),r("el-table-column",{attrs:{prop:"address",label:"地址"}}),r("el-table-column",{attrs:{label:"操作",width:"120px"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-dropdown",[r("el-button",{attrs:{type:"primary"}},[e._v(" 操作 "),r("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.handleUnderling(t.$index,t.row)}}},[e._v(" 下级会员列表 ")])],1),r("el-dropdown-item",[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.handleSource(t.$index,t.row)}}},[e._v(" 佣金来源")])],1),r("el-dropdown-item",[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.handleEmpty(t.$index,t.row)}}},[e._v(" 金额清零 ")])],1),r("el-dropdown-item",[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.handleQRcode(t.$index,t.row)}}},[e._v(" 查看二维码 ")])],1)],1)],1)]}}])})],1),r("div",{staticClass:"block"},[r("el-pagination",{attrs:{"current-page":e.current,"page-size":e.size,layout:"sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.currentChange,"update:currentPage":function(t){e.current=t},"update:current-page":function(t){e.current=t},"size-change":e.sizeChange}})],1),r("el-dialog",{attrs:{visible:e.dialogQRcode,title:"二维码",width:"50%",align:"center"},on:{"update:visible":function(t){e.dialogQRcode=t}}},[r("img",{attrs:{src:e.qr_code,alt:""}})]),r("el-dialog",{attrs:{title:"佣金来源",visible:e.dialogRec,width:"80%"},on:{"update:visible":function(t){e.dialogRec=t}}},[r("el-table",{attrs:{data:e.recDate,"empty-text":"暂无数据",border:"","header-cell-style":{background:"#f0f0f0"},"max-height":"620"}},[r("el-table-column",{attrs:{prop:"id",label:"ID"}}),r("el-table-column",{attrs:{prop:"order.no",label:"支付订单号"}}),r("el-table-column",{attrs:{prop:"money",label:"佣金"}}),r("el-table-column",{attrs:{prop:"type",label:"类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.type?r("div",[r("span",[e._v("普通订单")])]):e._e(),2==t.row.type?r("div",[r("span",[e._v("会员订单")])]):e._e()]}}])}),r("el-table-column",{attrs:{prop:"state",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.state?r("div",[r("span",[e._v("待分佣")])]):e._e(),2==t.row.state?r("div",[r("span",[e._v("已分佣")])]):e._e()]}}])})],1),r("div",{staticClass:"block"},[r("el-pagination",{attrs:{"current-page":e.recCurrent,"page-size":e.recSize,layout:"sizes, prev, pager, next, jumper",total:e.recTotal},on:{"current-change":e.recCurrentChange,"update:currentPage":function(t){e.recCurrent=t},"update:current-page":function(t){e.recCurrent=t},"size-change":e.recSizeChange}})],1)],1),r("el-dialog",{attrs:{title:"下级会员",visible:e.dialogUnderling,width:"85%"},on:{"update:visible":function(t){e.dialogUnderling=t}}},[r("el-table",{attrs:{data:e.underlingData,"empty-text":"暂无数据",border:"","header-cell-style":{background:"#f0f0f0"},"max-height":"620"}},[r("el-table-column",{attrs:{prop:"id",label:"ID"}}),r("el-table-column",{attrs:{prop:"wx_user.avatarUrl",label:"头像"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.wx_user.avatarUrl?r("div",[r("el-popover",{attrs:{placement:"top-start",title:"",trigger:"click"}},[r("img",{staticStyle:{"max-width":"800px","max-height":"800px"},attrs:{src:t.row.wx_user.avatarUrl}}),r("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{slot:"reference",src:t.row.wx_user.avatarUrl},slot:"reference"})])],1):r("div",[r("span",[e._v("--暂无图片--")])])]}}])}),r("el-table-column",{attrs:{prop:"wx_user.nickname",label:"昵称"}}),r("el-table-column",{attrs:{prop:"name",label:"姓名"}}),r("el-table-column",{attrs:{prop:"phone",label:"手机号码"}})],1),r("div",{staticClass:"block"},[r("el-pagination",{attrs:{"current-page":e.recCurrent,"page-size":e.recSize,layout:"sizes, prev, pager, next, jumper",total:e.recTotal},on:{"current-change":e.recCurrentChange,"update:currentPage":function(t){e.recCurrent=t},"update:current-page":function(t){e.recCurrent=t},"size-change":e.recSizeChange}})],1)],1),r("el-dialog",{attrs:{visible:e.dialogEmpty,title:"余额清零",width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogEmpty=t}}},[r("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否将该用户的余额清零")]),r("span",[r("el-button",{attrs:{type:"primary"},on:{click:e.toEmpty}},[e._v("确定")]),r("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogEmpty=!1}}},[e._v("取消")])],1)])],1)},a=[],i=(r("caad"),r("ac1f"),r("2532"),r("1276"),r("365c")),o={data:function(){return{loading:!0,tableData:[],current:1,total:0,size:10,userId:"",nickname:"",dialogAudit:!1,dialogQRcode:!1,user_id:"",qr_code:"",keyword:"",dialogRec:!1,recDate:[],recCurrent:1,recSize:10,recTotal:0,dialogUnderling:!1,underlingData:[],dialogEmpty:!1}},mounted:function(){this.permissionData=localStorage.getItem("permissions").split(","),this.getList(this.current,this.size)},methods:{getList:function(e,t,r){var n=this;i["a"].healthUserList(e,t,r).then((function(e){n.loading=!1,n.tableData=e.result.data,n.total=e.result.total})).catch((function(e){n.loading=!1}))},currentChange:function(e){var t=this;t.current=e,t.loading=!0,t.keyword?t.getList(e,t.size,t.keyword):t.getList(e,t.size)},sizeChange:function(e){var t=this;t.size=e,t.loading=!0,t.keyword?t.getList(1,e,t.keyword):t.getList(1,e),t.current=1},search:function(){var e=this;e.current=1,e.getList(e.current,e.size,e.keyword)},handleQRcode:function(e,t){var r=this;r.permissionData.includes("qrcode")?t.qr_code?(r.dialogQRcode=!0,r.qr_code=t.qr_code):r.$message.warning("暂无二维码"):r.$message.warning("无权操作")},getRec:function(e,t){var r=this;i["a"].commissionSource(e,t,r.user_id).then((function(e){r.$message.success("获取数据成功！"),r.recDate=e.result.data,r.recTotal=e.result.total}))},handleSource:function(e,t){var r=this;r.user_id=t.user_id,r.permissionData.includes("commission")?(r.dialogRec=!0,r.getRec(r.recCurrent,r.recSize)):r.$message.warning("无权操作")},recCurrentChange:function(e){var t=this;t.recCurrent=e,t.getRec(e,t.recSize)},recSizeChange:function(e){var t=this;t.recSize=e,t.getRec(1,e),t.recCurrent=1},handleUnderling:function(e,t){var r=this;r.user_id=t.user_id,r.permissionData.includes("underling")?(r.dialogUnderling=!0,r.getUnderling(r.recCurrent,r.recSize)):r.$message.warning("无权操作")},getUnderling:function(e,t){var r=this;i["a"].underlingUser(e,t,r.user_id).then((function(e){r.$message.success("获取数据成功！"),r.underlingData=e.result.data,r.recTotal=e.result.total}))},handleEmpty:function(e,t){var r=this;r.permissionData.includes("emptyMoney")?(r.user_id=t.user_id,r.dialogEmpty=!0):r.$message.warning("无权操作")},toEmpty:function(){var e=this;i["a"].moneyEmpty(e.user_id).then((function(t){e.dialogEmpty=!1,e.$message.success("操作成功"),e.getList(e.current,e.size)}))}}},s=o,l=r("2877"),c=Object(l["a"])(s,n,a,!1,null,"6dd4c116",null);t["default"]=c.exports},"365c":function(e,t,r){"use strict";var n=r("be3b"),a=r("99b1"),i=r.n(a),o={createRole:function(e){return n["a"].post(i.a.CreateRole,e)},roles:function(e,t){return n["a"].get(i.a.Roles,{currentPage:e,perPage:t})},delRoles:function(e){return n["a"].del(i.a.Roles,{id:e})},createUser:function(e){return n["a"].post(i.a.CreateUser,e)},users:function(e,t){return n["a"].get(i.a.Users,{currentPage:e,perPage:t})},delUser:function(e){return n["a"].del(i.a.DelUser,{id:e})},resetPassword:function(e){return n["a"].post(i.a.ResetPassword,e)},createHealthUser:function(e){return n["a"].post(i.a.HealthUser,e)},healthUser:function(){return n["a"].get(i.a.HealthUser,{})},merchants:function(e,t,r){return n["a"].get(i.a.Merchants,{currentPage:e,perPage:t,name:r})},merchantsSelect:function(){return n["a"].get(i.a.MerchantsSelect,{})},createMerchant:function(e){return n["a"].post(i.a.CreateMerchant,e)},areas:function(e,t){return n["a"].get(i.a.Areas,{type:e,parent_id:t})},createBanner:function(e){return n["a"].post(i.a.CreateBanner,e)},banners:function(e,t){return n["a"].get(i.a.Banners,{currentPage:e,perPage:t})},delBanner:function(e){return n["a"].del(i.a.DelBanner,{id:e})},createDocumentType:function(e){return n["a"].post(i.a.CreateDocumentType,e)},documentType:function(e,t){return n["a"].get(i.a.DocumentType,{currentPage:e,perPage:t})},delDocumentType:function(e){return n["a"].del(i.a.DelDocumentType,{id:e})},createDocument:function(e){return n["a"].post(i.a.CreateDocument,e)},document:function(e,t,r){return n["a"].get(i.a.Document,{currentPage:e,perPage:t,document_type:r})},delDocument:function(e){return n["a"].del(i.a.DelDocument,{id:e})},createClassify:function(e){return n["a"].post(i.a.CreateClassify,e)},classifies:function(e,t,r){return n["a"].get(i.a.Classify,{currentPage:e,perPage:t,type:r})},delClassify:function(e){return n["a"].del(i.a.Classify,{id:e})},seleClassify:function(e,t){return n["a"].get(i.a.SeleClassify,{type:e,parent_id:t})},createGoods:function(e){return n["a"].post(i.a.CreateGoods,e)},goods:function(e,t,r,a,o){return n["a"].get(i.a.Goods,{currentPage:e,perPage:t,name:r,classify_id:a,on_shelf:o})},goodDetail:function(e){return n["a"].get(i.a.GoodDetail,{id:e})},createUserGoods:function(e){return n["a"].post(i.a.CreateUserGoods,e)},userGoods:function(e,t,r,a){return n["a"].get(i.a.UserGoods,{currentPage:e,perPage:t,name:r,on_shelf:a})},userGoodDetail:function(e){return n["a"].get(i.a.UserGoodDetail,{id:e})},createKeyword:function(e){return n["a"].post(i.a.CreateKeyword,e)},keywords:function(e,t,r){return n["a"].get(i.a.Keywords,{currentPage:e,perPage:t,keyword:r})},delKeyword:function(e){return n["a"].del(i.a.DelKeyword,{id:e})},createActivity:function(e){return n["a"].post(i.a.CreateActivity,e)},activities:function(e,t){return n["a"].get(i.a.Activities,{currentPage:e,perPage:t})},wxUser:function(e,t,r,a){return n["a"].get(i.a.WxUser,{currentPage:e,perPage:t,user_id:r,nickname:a})},userInfo:function(e,t,r,a){return n["a"].get(i.a.UserInfo,{currentPage:e,perPage:t,name:r,state:a})},healthCheck:function(e,t){return n["a"].post(i.a.HealthCheck,{id:e,state:t})},healthUserList:function(e,t,r){return n["a"].get(i.a.HealthUserList,{currentPage:e,perPage:t,name:r})},healthApplyList:function(e,t,r,a){return n["a"].get(i.a.HealthApplyList,{currentPage:e,perPage:t,name:r,state:a})},withdrawsList:function(e,t,r,a){return n["a"].get(i.a.WithdrawsList,{currentPage:e,perPage:t,name:r,state:a})},withdrawsCheck:function(e,t,r){return n["a"].post(i.a.WithdrawsCheck,{id:e,state:t,remark:r})},underlingUser:function(e,t,r){return n["a"].get(i.a.UnderlingUser,{currentPage:e,perPage:t,user_id:r})},commissionSource:function(e,t,r){return n["a"].get(i.a.CommissionSource,{currentPage:e,perPage:t,user_id:r})},merCommission:function(e,t,r){return n["a"].get(i.a.MerCommission,{currentPage:e,perPage:t,merchant_id:r})},moneyEmpty:function(e){return n["a"].post(i.a.MoneyEmpty,{user_id:e})},createSpecialists:function(e){return n["a"].post(i.a.CreateSpecialists,e)},specialists:function(e,t,r){return n["a"].get(i.a.Specialists,{currentPage:e,perPage:t,name:r})},delSpecialist:function(e){return n["a"].del(i.a.DelSpecialist,{id:e})},userOrder:function(e,t,r,a,o){return n["a"].get(i.a.UserOrder,{currentPage:e,perPage:t,status:r,no:a,good_id:o})},shopingpInfo:function(e,t){return n["a"].get(i.a.ShopingpInfo,{order_id:e,type:t})},recaptionInfo:function(e,t){return n["a"].get(i.a.RecaptionInfo,{order_id:e,type:t})},orders:function(e,t,r,a,o){return n["a"].get(i.a.Orders,{currentPage:e,perPage:t,status:r,no:a,good_id:o})},ordersGoods:function(e){return n["a"].get(i.a.OrdersGoods,{order_id:e})},confirmShipments:function(e,t,r,a){return n["a"].post(i.a.ConfirmShipments,{order_id:e,type:t,express_no:r,logistics_id:a})},creationLogistic:function(e){return n["a"].post(i.a.CreationLogistic,e)},logistics:function(e,t,r){return n["a"].get(i.a.Logistics,{currentPage:e,perPage:t,name:r})},delLogistic:function(e){return n["a"].del(i.a.DelLogistic,{id:e})},OrderInquire:function(e,t){return n["a"].get(i.a.OrderInquire,{express_no:e,logistics_id:t})}};t["a"]=o}}]);
//# sourceMappingURL=chunk-0f0fd1e2.a8561612.js.map