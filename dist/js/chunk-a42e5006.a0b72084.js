(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a42e5006"],{1276:function(e,t,r){"use strict";var a=r("d784"),n=r("44e7"),s=r("825a"),i=r("1d80"),o=r("4840"),l=r("8aa5"),u=r("50c4"),c=r("14c3"),d=r("9263"),p=r("d039"),m=[].push,g=Math.min,f=4294967295,h=!p((function(){return!RegExp(f,"y")}));a("split",2,(function(e,t,r){var a;return a="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,r){var a=String(i(this)),s=void 0===r?f:r>>>0;if(0===s)return[];if(void 0===e)return[a];if(!n(e))return t.call(a,e,s);var o,l,u,c=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),g=0,h=new RegExp(e.source,p+"g");while(o=d.call(h,a)){if(l=h.lastIndex,l>g&&(c.push(a.slice(g,o.index)),o.length>1&&o.index<a.length&&m.apply(c,o.slice(1)),u=o[0].length,g=l,c.length>=s))break;h.lastIndex===o.index&&h.lastIndex++}return g===a.length?!u&&h.test("")||c.push(""):c.push(a.slice(g)),c.length>s?c.slice(0,s):c}:"0".split(void 0,0).length?function(e,r){return void 0===e&&0===r?[]:t.call(this,e,r)}:t,[function(t,r){var n=i(this),s=void 0==t?void 0:t[e];return void 0!==s?s.call(t,n,r):a.call(String(n),t,r)},function(e,n){var i=r(a,e,this,n,a!==t);if(i.done)return i.value;var d=s(e),p=String(this),m=o(d,RegExp),w=d.unicode,b=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(h?"y":"g"),v=new m(h?d:"^(?:"+d.source+")",b),y=void 0===n?f:n>>>0;if(0===y)return[];if(0===p.length)return null===c(v,p)?[p]:[];var P=0,_=0,C=[];while(_<p.length){v.lastIndex=h?_:0;var D,U=c(v,h?p:p.slice(_));if(null===U||(D=g(u(v.lastIndex+(h?0:_)),p.length))===P)_=l(p,_,w);else{if(C.push(p.slice(P,_)),C.length===y)return C;for(var x=1;x<=U.length-1;x++)if(C.push(U[x]),C.length===y)return C;_=P=D}}return C.push(p.slice(P)),C}]}),!h)},"1d5a":function(e,t,r){"use strict";r("480a")},"365c":function(e,t,r){"use strict";var a=r("be3b"),n=r("99b1"),s=r.n(n),i={createRole:function(e){return a["a"].post(s.a.CreateRole,e)},roles:function(e,t){return a["a"].get(s.a.Roles,{currentPage:e,perPage:t})},delRoles:function(e){return a["a"].del(s.a.Roles,{id:e})},createUser:function(e){return a["a"].post(s.a.CreateUser,e)},users:function(e,t){return a["a"].get(s.a.Users,{currentPage:e,perPage:t})},delUser:function(e){return a["a"].del(s.a.DelUser,{id:e})},resetPassword:function(e){return a["a"].post(s.a.ResetPassword,e)},createHealthUser:function(e){return a["a"].post(s.a.HealthUser,e)},healthUser:function(){return a["a"].get(s.a.HealthUser,{})},merchants:function(e,t,r){return a["a"].get(s.a.Merchants,{currentPage:e,perPage:t,name:r})},merchantsSelect:function(){return a["a"].get(s.a.MerchantsSelect,{})},createMerchant:function(e){return a["a"].post(s.a.CreateMerchant,e)},areas:function(e,t){return a["a"].get(s.a.Areas,{type:e,parent_id:t})},createBanner:function(e){return a["a"].post(s.a.CreateBanner,e)},banners:function(e,t){return a["a"].get(s.a.Banners,{currentPage:e,perPage:t})},delBanner:function(e){return a["a"].del(s.a.DelBanner,{id:e})},createDocumentType:function(e){return a["a"].post(s.a.CreateDocumentType,e)},documentType:function(e,t){return a["a"].get(s.a.DocumentType,{currentPage:e,perPage:t})},delDocumentType:function(e){return a["a"].del(s.a.DelDocumentType,{id:e})},createDocument:function(e){return a["a"].post(s.a.CreateDocument,e)},document:function(e,t,r){return a["a"].get(s.a.Document,{currentPage:e,perPage:t,document_type:r})},delDocument:function(e){return a["a"].del(s.a.DelDocument,{id:e})},createImg:function(e){return a["a"].post(s.a.CreateImg,e)},imgesList:function(e,t){return a["a"].get(s.a.ImgesList,{currentPage:e,perPage:t})},delImg:function(e){return a["a"].del(s.a.DelImg,{id:e})},createClassify:function(e){return a["a"].post(s.a.CreateClassify,e)},classifies:function(e,t,r){return a["a"].get(s.a.Classify,{currentPage:e,perPage:t,type:r})},delClassify:function(e){return a["a"].del(s.a.Classify,{id:e})},seleClassify:function(e,t){return a["a"].get(s.a.SeleClassify,{type:e,parent_id:t})},createGoods:function(e){return a["a"].post(s.a.CreateGoods,e)},goods:function(e,t,r,n,i){return a["a"].get(s.a.Goods,{currentPage:e,perPage:t,name:r,classify_id:n,on_shelf:i})},goodDetail:function(e){return a["a"].get(s.a.GoodDetail,{id:e})},delGood:function(e){return a["a"].del(s.a.DelGood,{id:e})},createUserGoods:function(e){return a["a"].post(s.a.CreateUserGoods,e)},userGoods:function(e,t,r,n){return a["a"].get(s.a.UserGoods,{currentPage:e,perPage:t,name:r,on_shelf:n})},delUserGood:function(e){return a["a"].del(s.a.DelUserGood,{id:e})},userGoodDetail:function(e){return a["a"].get(s.a.UserGoodDetail,{id:e})},createKeyword:function(e){return a["a"].post(s.a.CreateKeyword,e)},keywords:function(e,t,r){return a["a"].get(s.a.Keywords,{currentPage:e,perPage:t,keyword:r})},delKeyword:function(e){return a["a"].del(s.a.DelKeyword,{id:e})},createActivity:function(e){return a["a"].post(s.a.CreateActivity,e)},activities:function(e,t){return a["a"].get(s.a.Activities,{currentPage:e,perPage:t})},wxUser:function(e,t,r,n){return a["a"].get(s.a.WxUser,{currentPage:e,perPage:t,user_id:r,nickname:n})},userInfo:function(e,t,r,n){return a["a"].get(s.a.UserInfo,{currentPage:e,perPage:t,name:r,state:n})},healthCheck:function(e,t){return a["a"].post(s.a.HealthCheck,{id:e,state:t})},healthUserList:function(e,t,r){return a["a"].get(s.a.HealthUserList,{currentPage:e,perPage:t,name:r})},healthApplyList:function(e,t,r,n){return a["a"].get(s.a.HealthApplyList,{currentPage:e,perPage:t,name:r,state:n})},withdrawsList:function(e,t,r,n){return a["a"].get(s.a.WithdrawsList,{currentPage:e,perPage:t,name:r,state:n})},withdrawsCheck:function(e,t,r){return a["a"].post(s.a.WithdrawsCheck,{id:e,state:t,remark:r})},underlingUser:function(e,t,r){return a["a"].get(s.a.UnderlingUser,{currentPage:e,perPage:t,user_id:r})},commissionSource:function(e,t,r){return a["a"].get(s.a.CommissionSource,{currentPage:e,perPage:t,user_id:r})},merCommission:function(e,t,r){return a["a"].get(s.a.MerCommission,{currentPage:e,perPage:t,merchant_id:r})},moneyEmpty:function(e){return a["a"].post(s.a.MoneyEmpty,{user_id:e})},creationQrCode:function(e){return a["a"].post(s.a.CreationQrCode,{id:e})},createSpecialists:function(e){return a["a"].post(s.a.CreateSpecialists,e)},specialists:function(e,t,r){return a["a"].get(s.a.Specialists,{currentPage:e,perPage:t,name:r})},delSpecialist:function(e){return a["a"].del(s.a.DelSpecialist,{id:e})},userOrder:function(e,t,r,n,i){return a["a"].get(s.a.UserOrder,{currentPage:e,perPage:t,status:r,no:n,good_id:i})},shopingpInfo:function(e,t){return a["a"].get(s.a.ShopingpInfo,{order_id:e,type:t})},recaptionInfo:function(e,t){return a["a"].get(s.a.RecaptionInfo,{order_id:e,type:t})},orders:function(e,t,r,n,i){return a["a"].get(s.a.Orders,{currentPage:e,perPage:t,status:r,no:n,good_id:i})},ordersGoods:function(e){return a["a"].get(s.a.OrdersGoods,{order_id:e})},confirmShipments:function(e,t,r,n){return a["a"].post(s.a.ConfirmShipments,{order_id:e,type:t,express_no:r,logistics_id:n})},creationLogistic:function(e){return a["a"].post(s.a.CreationLogistic,e)},logistics:function(e,t,r){return a["a"].get(s.a.Logistics,{currentPage:e,perPage:t,name:r})},delLogistic:function(e){return a["a"].del(s.a.DelLogistic,{id:e})},OrderInquire:function(e,t){return a["a"].get(s.a.OrderInquire,{express_no:e,logistics_id:t})}};t["a"]=i},"480a":function(e,t,r){},b753:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[r("div",{staticClass:"handle-box"},[r("div",{staticClass:"btn"},[r("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v("添加用户")])],1)]),r("el-table",{attrs:{data:e.tableData,border:"","header-cell-style":{background:"#f0f0f0"}}},[r("el-table-column",{attrs:{prop:"id",label:"ID"}}),r("el-table-column",{attrs:{prop:"name",label:"账号"}}),r("el-table-column",{attrs:{prop:"role",label:"角色名"}}),r("el-table-column",{attrs:{prop:"enable",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",{domProps:{textContent:e._s("1"==t.row.enable?"启用":"禁用")}})]}}])}),r("el-table-column",{attrs:{label:"操作",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(r){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(r){return e.handleReset(t.$index,t.row)}}},[e._v("重置密码")]),r("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(r){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),r("el-dialog",{attrs:{visible:e.dialogDel,title:"删除用户",width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogDel=t}}},[r("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否删除")]),r("span",[r("el-button",{attrs:{type:"primary"},on:{click:e.toDel}},[e._v("删除")]),r("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogDel=!1}}},[e._v("取消")])],1)]),r("div",{staticClass:"block"},[r("el-pagination",{attrs:{"current-page":e.current,"page-sizes":[10,20,30,40,50],"page-size":e.size,layout:"sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.currentChange,"update:currentPage":function(t){e.current=t},"update:current-page":function(t){e.current=t},"size-change":e.sizeChange}})],1),r("el-dialog",{attrs:{title:e.isAdd?"添加用户":"编辑",center:"",visible:e.dialogUser,width:"60%","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogUser=t}}},[r("div",{staticClass:"box"},[r("el-form",{attrs:{model:e.form,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"账号"}},[r("el-input",{attrs:{placeholder:"请输入账号"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),r("el-form-item",{attrs:{label:"输入密码"}},[r("el-input",{attrs:{placeholder:"请输入密码",type:"password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),r("el-form-item",{attrs:{label:"选择角色"}},[r("el-select",{attrs:{placeholder:"请选择角色"},model:{value:e.form.role,callback:function(t){e.$set(e.form,"role",t)},expression:"form.role"}},e._l(e.rolesList,(function(e){return r("el-option",{key:e.title,attrs:{label:e.name,value:e.title}})})),1)],1),r("el-form-item",{attrs:{label:"选择部门"}},[r("el-select",{attrs:{placeholder:"选择部门"},model:{value:e.form.merchant_id,callback:function(t){e.$set(e.form,"merchant_id",t)},expression:"form.merchant_id"}},e._l(e.merchantList,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),r("el-form-item",{attrs:{label:"选择状态"}},[r("el-select",{attrs:{placeholder:"请选择状态"},model:{value:e.form.enable,callback:function(t){e.$set(e.form,"enable",t)},expression:"form.enable"}},e._l(e.stateList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("div",{staticClass:"submit"},[r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.newUser}},[e._v("提交")])],1)],1)],1)],1)]),r("el-dialog",{attrs:{title:"修改密码",center:"",visible:e.dialogResetPassWord,width:"500px","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogResetPassWord=t}}},[r("div",{staticClass:"box"},[r("el-form",{attrs:{model:e.pwdForm,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"账号"}},[r("el-input",{model:{value:e.pwdForm.username,callback:function(t){e.$set(e.pwdForm,"username",t)},expression:"pwdForm.username"}})],1),r("el-form-item",{attrs:{label:"旧密码"}},[r("el-input",{model:{value:e.pwdForm.former_password,callback:function(t){e.$set(e.pwdForm,"former_password",t)},expression:"pwdForm.former_password"}})],1),r("el-form-item",{attrs:{label:"新密码"}},[r("el-input",{model:{value:e.pwdForm.new_password,callback:function(t){e.$set(e.pwdForm,"new_password",t)},expression:"pwdForm.new_password"}})],1),r("el-form-item",{attrs:{label:"再次确认新密码"}},[r("el-input",{model:{value:e.pwdForm.confirm_password,callback:function(t){e.$set(e.pwdForm,"confirm_password",t)},expression:"pwdForm.confirm_password"}})],1),r("div",{staticClass:"submit"},[r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.changePassword}},[e._v("提交")])],1)],1)],1)],1)])],1)},n=[],s=(r("caad"),r("b0c0"),r("ac1f"),r("2532"),r("1276"),r("365c")),i={data:function(){return{loading:!0,dialogUser:!1,form:{id:"",username:"",password:"",enable:"",role:"",merchant_id:""},stateList:[{label:"启用",value:1},{label:"禁用",value:2}],rolesList:[],merchantList:[],tableData:[],dialogResetPassWord:!1,pwdForm:{username:"",new_password:"",former_password:"",confirm_password:"",id:""},dialogDel:!1,id:"",current:1,size:10,total:0,isAdd:!1}},mounted:function(){this.permissionData=localStorage.getItem("permissions").split(","),this.getUsers(this.current,this.size),this.getRoles(),this.getMerchants()},methods:{getRoles:function(){var e=this;s["a"].roles(1,100).then((function(t){e.loading=!1,e.rolesList=t.result.data})).catch((function(t){e.loading=!1}))},getUsers:function(e,t){var r=this;s["a"].users(e,t).then((function(e){r.loading=!1,r.tableData=e.result.data,r.total=e.result.total})).catch((function(e){r.loading=!1}))},currentChange:function(e){var t=this;t.current=e,t.loading=!0,t.getUsers(e,t.size)},sizeChange:function(e){var t=this;t.size=e,t.loading=!0,t.getUsers(1,e),t.current=1},getMerchants:function(){var e=this;s["a"].merchants(1,100).then((function(t){e.merchantList=t.result.data}))},addUser:function(){var e=this;e.isAdd=!0,e.permissionData.includes("manageAdd")?(e.dialogUser=!0,e.form={id:"",username:"",password:"",enable:"",role:"",merchant_id:""}):e.$message.warning("无权操作")},newUser:function(){var e=this;e.form.username&&e.form.password&&e.form.enable&&e.form.role?s["a"].createUser(e.form).then((function(t){e.dialogUser=!1,e.$message.success("提交成功"),e.getUsers(e.current,e.size),e.form={}})):e.$message.warning("请补充完整信息")},handleEdit:function(e,t){var r=this;r.isAdd=!1,r.permissionData.includes("manageEdit")?r.dialogUser=!0:r.$message.warning("无权操作"),r.form={id:t.id,username:t.name,password:"",enable:t.enable,role:t.role,merchant_id:t.id}},handleReset:function(e,t){var r=this;r.permissionData.includes("manageResetPwd")?r.dialogResetPassWord=!0:r.$message.warning("无权操作"),r.pwdForm.id=t.id},changePassword:function(){var e=this;e.pwdForm.new_password&&e.pwdForm.confirm_password&&e.pwdForm.former_password&&e.pwdForm.username?e.pwdForm.new_password===e.pwdForm.confirm_passwor?s["a"].resetPassword(e.pwdForm).then((function(t){e.dialogResetPassWord=!1,e.$message.success("修改成功"),e.getUsers(e.current,e.size),e.pwdForm={}})):e.$message.error("新密码与确认密码不一致"):e.$message.warning("请补充完整信息")},handleDel:function(e,t){var r=this;r.permissionData.includes("manageDel")?r.dialogDel=!0:r.$message.warning("无权操作"),r.id=t.id},toDel:function(){var e=this;s["a"].delUser(e.id).then((function(t){e.$message.success("删除成功"),e.dialogDel=!1,e.getUsers(e.current,e.size)}))}}},o=i,l=(r("1d5a"),r("2877")),u=Object(l["a"])(o,a,n,!1,null,"2a8e0e55",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-a42e5006.a0b72084.js.map