(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9a3bcdc6"],{"4fc5":function(e,t,s){"use strict";s("59ab")},"59ab":function(e,t,s){},aa7d:function(e,t,s){"use strict";s.r(t);var o,i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[s("div",{staticClass:"handle-box"},[s("div",{staticClass:"btn"},[s("el-button",{attrs:{type:"primary"},on:{click:e.addGoods}},[e._v("添加商品")])],1),s("div",{staticClass:"btn"},[s("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入商品名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(e.keyword)}},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}},[s("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(t){return e.search(e.keyword)}},slot:"append"})],1)],1)]),s("el-dialog",{attrs:{visible:e.dialogGood,title:"添加商品",width:"85%"},on:{"update:visible":function(t){e.dialogGood=t},close:e.close}},[s("el-form",{attrs:{"label-width":"150px",model:e.goodsInfo}},[s("el-form-item",{attrs:{label:"是否上架"}},[s("el-radio-group",{model:{value:e.goodsInfo.on_shelf,callback:function(t){e.$set(e.goodsInfo,"on_shelf",t)},expression:"goodsInfo.on_shelf"}},[s("el-radio",{attrs:{label:1}},[e._v("是")]),s("el-radio",{attrs:{label:2}},[e._v("否")])],1)],1),s("el-form-item",{attrs:{label:"是否允许到店自取"}},[s("el-radio-group",{attrs:{disabled:e.isDisabled},on:{change:e.changeFetch},model:{value:e.goodsInfo.is_fetch,callback:function(t){e.$set(e.goodsInfo,"is_fetch",t)},expression:"goodsInfo.is_fetch"}},[s("el-radio",{attrs:{label:1}},[e._v("是")]),s("el-radio",{attrs:{label:2}},[e._v("否")])],1)],1),1==e.goodsInfo.is_fetch?s("el-form-item",{attrs:{label:"可以到店自取的部门"}},[s("el-select",{staticStyle:{width:"400px"},attrs:{multiple:"",placeholder:"请选择部门(可多选)",disabled:e.isDisabled},on:{change:e.merchantChange},model:{value:e.goodsInfo.have_merchant,callback:function(t){e.$set(e.goodsInfo,"have_merchant",t)},expression:"goodsInfo.have_merchant"}},e._l(e.merchantList,(function(e,t){return s("el-option",{key:t,attrs:{label:e.name,value:e.id}})})),1)],1):e._e(),s("el-form-item",{attrs:{label:"商品分类"}},[s("div",{staticClass:"momey-info",staticStyle:{"margin-bottom":"10px"}},[s("el-select",{attrs:{placeholder:"请选择一级类型",clearable:"",disabled:e.isDisabled},on:{change:e.oneTypeChange},model:{value:e.firstName,callback:function(t){e.firstName=t},expression:"firstName"}},e._l(e.oneType,(function(e){return s("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),s("el-select",{attrs:{placeholder:"请选择二级类型",disabled:e.isDisabled},on:{change:e.twoTypeChange},model:{value:e.secondName,callback:function(t){e.secondName=t},expression:"secondName"}},e._l(e.twoType,(function(e){return s("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),s("el-select",{staticStyle:{width:"350px"},attrs:{multiple:"",placeholder:"请选择三级类型(可多选)",disabled:e.isDisabled},on:{change:e.threeTypeChange},model:{value:e.thirdName,callback:function(t){e.thirdName=t},expression:"thirdName"}},e._l(e.threeType,(function(e){return s("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)]),s("el-form-item",{attrs:{label:"商品名称"}},[s("el-input",{model:{value:e.goodsInfo.name,callback:function(t){e.$set(e.goodsInfo,"name",t)},expression:"goodsInfo.name"}})],1),s("el-form-item",{attrs:{label:"商品简介"}},[s("el-input",{model:{value:e.goodsInfo.intro,callback:function(t){e.$set(e.goodsInfo,"intro",t)},expression:"goodsInfo.intro"}})],1),s("el-form-item",{attrs:{label:"分享标题"}},[s("el-input",{model:{value:e.goodsInfo.share_title,callback:function(t){e.$set(e.goodsInfo,"share_title",t)},expression:"goodsInfo.share_title"}})],1),s("div",{staticClass:"momey-info"},[s("el-form-item",{attrs:{label:"价格"}},[s("el-input",{model:{value:e.goodsInfo.price,callback:function(t){e.$set(e.goodsInfo,"price",t)},expression:"goodsInfo.price"}})],1),s("el-form-item",{attrs:{label:"会员价"}},[s("el-input",{model:{value:e.goodsInfo.vip_price,callback:function(t){e.$set(e.goodsInfo,"vip_price",t)},expression:"goodsInfo.vip_price"}})],1),s("el-form-item",{attrs:{label:"运费"}},[s("el-input",{model:{value:e.goodsInfo.freight,callback:function(t){e.$set(e.goodsInfo,"freight",t)},expression:"goodsInfo.freight"}})],1)],1),s("div",{staticClass:"momey-info"},[s("el-form-item",{attrs:{label:"市级佣金"}},[s("el-input",{attrs:{placeholder:"请输入佣金(市级)"},model:{value:e.goodsInfo.good_commissions[0].money,callback:function(t){e.$set(e.goodsInfo.good_commissions[0],"money",t)},expression:"goodsInfo.good_commissions[0].money"}})],1),s("el-form-item",{attrs:{label:"区县佣金"}},[s("el-input",{attrs:{placeholder:"请输入佣金(区县)"},model:{value:e.goodsInfo.good_commissions[1].money,callback:function(t){e.$set(e.goodsInfo.good_commissions[1],"money",t)},expression:"goodsInfo.good_commissions[1].money"}})],1),s("el-form-item",{attrs:{label:"社区佣金"}},[s("el-input",{attrs:{placeholder:"请输入佣金(社区)"},model:{value:e.goodsInfo.good_commissions[2].money,callback:function(t){e.$set(e.goodsInfo.good_commissions[2],"money",t)},expression:"goodsInfo.good_commissions[2].money"}})],1)],1),s("div",{staticClass:"momey-info"},[s("el-form-item",{attrs:{label:"商品库存"}},[s("el-input",{model:{value:e.goodsInfo.repertory,callback:function(t){e.$set(e.goodsInfo,"repertory",t)},expression:"goodsInfo.repertory"}})],1),s("el-form-item",{attrs:{label:"商品销量"}},[s("el-input",{model:{value:e.goodsInfo.sales,callback:function(t){e.$set(e.goodsInfo,"sales",t)},expression:"goodsInfo.sales"}})],1),s("el-form-item",{attrs:{label:"浏览量"}},[s("el-input",{model:{value:e.goodsInfo.browse,callback:function(t){e.$set(e.goodsInfo,"browse",t)},expression:"goodsInfo.browse"}})],1)],1),s("el-form-item",{attrs:{label:"商品图片"}},[s("el-upload",{ref:"upload",attrs:{action:"https://api.fengniaotuangou.cn/api/upload",limit:1,"before-upload":e.beforeAvatarUpload,"on-success":e.handleAvatarSuccess,"on-remove":e.handleRemove,"file-list":e.files,"on-exceed":e.handleExceed,"list-type":"picture-card","on-change":e.handleChange,"auto-upload":!0}},[s("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})])],1),s("el-form-item",{attrs:{label:"批量上传详情图片"}},[s("el-upload",{ref:"upload",attrs:{action:"https://api.fengniaotuangou.cn/api/upload",limit:9,"before-upload":e.beforeAvatarUpload1,"on-remove":e.handleRemove1,"on-exceed":e.handleExceed1,"auto-upload":!0,"on-change":e.handleChange1,multiple:"","list-type":"picture-card","file-list":e.fileLists,"on-success":e.handleAvatarSuccess1}},[s("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})])],1),s("el-form-item",{attrs:{label:"商品详情"}},[s("quill-editor",{ref:"myQuillEditor",staticStyle:{height:"430px",margin:"0 0 60px 0"},attrs:{options:e.editorOption},model:{value:e.goodsInfo.detail,callback:function(t){e.$set(e.goodsInfo,"detail",t)},expression:"goodsInfo.detail"}}),s("el-upload",{staticClass:"avatar-uploader quill-img",staticStyle:{display:"none"},attrs:{action:"https://api.fengniaotuangou.cn/api/upload","before-upload":e.beforeUpload,"on-success":e.quillImgSuccess}},[s("el-button",{attrs:{size:"small",type:"primary",id:"imgInput","element-loading-text":"插入中,请稍候"}},[e._v("点击上传 ")])],1)],1),s("div",{staticClass:"submit"},[s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:e.newMerchants}},[e._v("提交")])],1)],1)],1)],1),s("el-table",{attrs:{data:e.tableData,"empty-text":"暂无数据",border:"","header-cell-style":{background:"#f0f0f0"},"max-height":"620"}},[s("el-table-column",{attrs:{prop:"id",label:"ID"}}),s("el-table-column",{attrs:{prop:"name",label:"名称"}}),s("el-table-column",{attrs:{prop:"img",label:"图片",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.img?s("div",[s("el-popover",{attrs:{placement:"top-start",title:"",trigger:"click"}},[s("img",{staticStyle:{"max-width":"800px","max-height":"800px"},attrs:{src:t.row.img}}),s("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{slot:"reference",src:t.row.img},slot:"reference"})])],1):s("div",[s("span",[e._v("--暂无图片--")])])]}}])}),s("el-table-column",{attrs:{prop:"price",label:"价格"}}),s("el-table-column",{attrs:{prop:"vip_price",label:"会员价"}}),s("el-table-column",{attrs:{prop:"freight",label:"运费"}}),s("el-table-column",{attrs:{prop:"is_fetch",label:"是否到店自取",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-switch",{attrs:{"active-color":"#2a9f93"},on:{change:function(s){return e.notifyChange(t.row.is_fetch,t.$index,t.row)}},model:{value:t.row.is_fetch,callback:function(s){e.$set(t.row,"is_fetch",s)},expression:"scope.row.is_fetch"}})]}}])}),s("el-table-column",{attrs:{prop:"on_shelf",label:"是否上架"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.on_shelf?s("div",[s("span",[e._v("是")])]):e._e(),2==t.row.on_shelf?s("div",[s("span",[e._v("否")])]):e._e()]}}])}),s("el-table-column",{attrs:{prop:"repertory",label:"库存"}}),s("el-table-column",{attrs:{prop:"sales",label:"销量"}}),s("el-table-column",{attrs:{prop:"browse",label:"浏览量"}}),s("el-table-column",{attrs:{prop:"created_at",label:"创建时间",width:"180"}}),s("el-table-column",{attrs:{label:"操作",width:"250px"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(s){return e.handleDetail(t.$index,t.row)}}},[e._v("编辑")]),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(s){return e.handleClassify(t.$index,t.row)}}},[e._v("编辑分类 ")]),s("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(s){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),s("div",{staticClass:"block"},[s("el-pagination",{attrs:{"current-page":e.current,"page-sizes":[10,20,30,40,50],"page-size":e.size,layout:"sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.currentChange,"update:currentPage":function(t){e.current=t},"update:current-page":function(t){e.current=t},"size-change":e.sizeChange}})],1),s("el-dialog",{attrs:{visible:e.dialogClassify,title:"编辑商品分类",width:"85%"},on:{"update:visible":function(t){e.dialogClassify=t},close:e.close}},[s("el-form",{attrs:{"label-width":"150px",model:e.goodsInfo}},[s("div",{staticClass:"momey-info"},[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",[e._v("商品原分类")])]),s("div",{staticClass:"text item"},[e._v(" 一级: "+e._s(e.oldFirstName)+" ")]),s("div",{staticClass:"text item"},[e._v(" 二级: "+e._s(e.oldSecondName)+" ")]),s("div",{staticClass:"text item"},[e._v(" 三级: "),e._l(e.oldThirdName,(function(t){return s("span",{key:t.name},[e._v(e._s(t+"、"))])}))],2)]),s("el-form-item",{attrs:{label:"商品分类"}},[s("div",{staticClass:"momey-info",staticStyle:{"margin-bottom":"10px"}},[s("el-select",{attrs:{placeholder:"请选择一级类型",clearable:""},on:{change:e.oneTypeChange},model:{value:e.firstName,callback:function(t){e.firstName=t},expression:"firstName"}},e._l(e.oneType,(function(e){return s("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),s("el-select",{attrs:{placeholder:"请选择二级类型"},on:{change:e.twoTypeChange},model:{value:e.secondName,callback:function(t){e.secondName=t},expression:"secondName"}},e._l(e.twoType,(function(e){return s("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),s("el-select",{staticStyle:{width:"350px"},attrs:{multiple:"",placeholder:"请选择三级类型(可多选)"},on:{change:e.threeTypeChange},model:{value:e.thirdName,callback:function(t){e.thirdName=t},expression:"thirdName"}},e._l(e.threeType,(function(e){return s("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)])],1),s("div",{staticClass:"submit"},[s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:e.newMerchants}},[e._v("提交")])],1)],1)])],1),s("el-dialog",{attrs:{visible:e.dialogSel,title:"可到店自取部门",width:"85%"},on:{"update:visible":function(t){e.dialogSel=t},close:e.close}},[s("el-form",{attrs:{"label-width":"150px",model:e.goodsInfo}},[s("el-form-item",{attrs:{label:"可以到店自取的部门"}},[s("el-select",{staticStyle:{width:"400px"},attrs:{multiple:"",placeholder:"请选择部门(可多选)"},on:{change:e.merchantChange},model:{value:e.goodsInfo.have_merchant,callback:function(t){e.$set(e.goodsInfo,"have_merchant",t)},expression:"goodsInfo.have_merchant"}},e._l(e.merchantList,(function(e,t){return s("el-option",{key:t,attrs:{label:e.name,value:e.id}})})),1)],1),s("el-form-item",{attrs:{label:"运费"}},[s("el-input",{model:{value:e.goodsInfo.freight,callback:function(t){e.$set(e.goodsInfo,"freight",t)},expression:"goodsInfo.freight"}})],1),s("div",{staticClass:"submit"},[s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:e.newMerchants}},[e._v("提交")])],1)],1)],1)],1),s("el-dialog",{attrs:{visible:e.dialogDel,title:"删除商品",width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogDel=t}}},[s("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否删除")]),s("span",[s("el-button",{attrs:{type:"primary"},on:{click:e.toDel}},[e._v("删除")]),s("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogDel=!1}}},[e._v("取消")])],1)])],1)},l=[],a=(s("4160"),s("caad"),s("c975"),s("d81d"),s("a434"),s("b0c0"),s("ac1f"),s("2532"),s("1276"),s("159b"),s("365c")),n=(s("3022"),s("8d81"),s("953d")),r=(s("a753"),s("8096"),s("14e1"),{inject:["reload"],components:{quillEditor:n["quillEditor"]},data:function(){return{loading:!0,tableData:[],current:1,size:10,total:0,id:"",dialogDel:!1,dialogGood:!1,editorOption:{placeholder:"请输入文档内容",theme:"snow",modules:{toolbar:{container:[["bold","italic","underline","strike"],["blockquote","code-block"],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image"]],handlers:{image:function(e){e?document.querySelector(".quill-img input").click():this.quill.format("image",!1)}}}}},goodsInfo:{name:"",intro:"",share_title:"",detail:"",img:"",imgs:[],price:"",vip_price:"",freight:"",on_shelf:1,is_fetch:1,have_merchant:[],repertory:"",sales:0,browse:0,classify_id:[],sort:0,good_commissions:[{type:1,money:""},{type:2,money:""},{type:3,money:""}]},merchantList:[],name:"",stateList:[{value:1,label:"是"},{value:2,label:"否"}],state:"",keyword:"",fileLists:[],files:[],classifyList:[],permissionData:[],isYes:!0,oneType:[],twoType:[],threeType:[],firstName:"",secondName:"",thirdName:[],typeArr:[],isEidt:!1,isDisabled:!1,dialogClassify:!1,oldFirstName:"",oldSecondName:"",oldThirdName:[],is_fetch:!0,dialogSel:!1}},mounted:function(){this.getList(this.current,this.size),this.getOneList(),this.getParent(),this.permissionData=localStorage.getItem("permissions").split(",")},methods:{getParent:function(){var e=this;a["a"].merchantsSelect().then((function(t){e.merchantList=t.result}))},getList:function(e,t,s){var o=this;a["a"].goods(e,t,s).then((function(e){o.loading=!1,o.tableData=e.result.data,o.total=e.result.total,e.result.data.forEach((function(e){1==e.is_fetch?e.is_fetch=!0:e.is_fetch=!1}))})).catch((function(e){o.loading=!1}))},search:function(){var e=this;e.current=1,e.loading=!0,e.getList(e.current,e.size,e.keyword)},currentChange:function(e){var t=this;t.current=e,t.loading=!0,t.keyword?t.getList(e,t.size,t.keyword):t.getList(e,t.size)},sizeChange:function(e){var t=this;t.size=e,t.loading=!0,t.current=1,t.keyword?t.getList(1,e,t.keyword):t.getList(1,e)},addGoods:function(){var e=this;e.permissionData.includes("commodityAdd")?e.dialogGood=!0:e.$message.warning("无权操作"),e.isYes?e.goodsInfo={name:"",intro:"",share_title:"",detail:"",img:"",imgs:[],price:"",vip_price:"",freight:"",on_shelf:1,is_fetch:1,have_merchant:[],repertory:"",sales:0,browse:0,classify_id:[],sort:0,good_commissions:[{type:1,money:""},{type:2,money:""},{type:3,money:""}]}:e.goodsInfo={name:"",intro:"",share_title:"",detail:"",img:"",imgs:[],price:"",vip_price:"",on_shelf:1,is_fetch:1,repertory:"",sales:0,browse:0,classify_id:[],sort:0,good_commissions:[{type:1,money:""},{type:2,money:""},{type:3,money:""}]},e.$refs.upload&&e.$refs.upload.clearFiles(),e.isEidt=!1,e.isDisabled=!1},close:function(){var e=this;e.fileLists=[],e.files=[],e.typeArr=[],e.firstName="",e.secondName="",e.thirdName=[],e.oldFirstName="",e.oldSecondName="",e.oldThirdName=[]},newMerchants:function(){var e=this;e.goodsInfo.name&&e.goodsInfo.intro&&e.goodsInfo.share_title&&e.goodsInfo.img&&e.goodsInfo.imgs&&e.goodsInfo.price&&e.goodsInfo.vip_price&&e.goodsInfo.repertory&&e.goodsInfo.classify_id&&e.goodsInfo.good_commissions&&e.typeArr.length<3?(e.goodsInfo.classify_id.push.apply(e.goodsInfo.classify_id,e.typeArr),a["a"].createGoods(e.goodsInfo).then((function(t){1e4==t.code&&(e.$message.success("添加成功"),e.dialogGood=!1,e.dialogClassify=!1,e.dialogSel=!1,e.getList(e.current,e.size))}))):e.$message.warning("请填写完整信息")},getOneList:function(){var e=this;a["a"].seleClassify(1,0).then((function(t){e.oneType=t.result}))},oneTypeChange:function(e){var t=this;t.typeArr.push(e),a["a"].seleClassify(2,e).then((function(e){t.twoType=e.result})),t.thirdName=[],t.secondName=""},twoTypeChange:function(e){var t=this;t.typeArr.push(e),a["a"].seleClassify(3,e).then((function(e){t.threeType=e.result})),t.thirdName=[]},threeTypeChange:function(e){var t=this;t.goodsInfo.classify_id=e},merchantChange:function(e){var t=this;t.goodsInfo.have_merchant=e},notifyChange:function(e,t,s){var o=this;console.log(s.id);var i=[],l=[],n=[];o.loading=!0,a["a"].goodDetail(s.id).then((function(t){t.result.have_merchant.forEach((function(e){i.push(e.id)})),t.result.classify.forEach((function(e){l.push(e.id),l.push(e.subs[0].id),a["a"].seleClassify(2,e.id).then((function(e){o.twoType=e.result})),e.subs&&(a["a"].seleClassify(3,e.subs[0].id).then((function(e){o.threeType=e.result})),e.subs[0].subs&&e.subs[0].subs.forEach((function(e){l.push(e.id),n.push(e.id)})))})),1==e?(o.goodsInfo={name:t.result.name,intro:t.result.intro,share_title:t.result.share_title,detail:t.result.detail,img:t.result.img,imgs:t.result.imgs,price:t.result.price,vip_price:t.result.vip_price,freight:t.result.freight,on_shelf:t.result.on_shelf,is_fetch:1,have_merchant:i,repertory:t.result.repertory,id:t.result.id,sales:t.result.sales,browse:t.result.browse,classify_id:l,sort:t.result.sort,good_commissions:[{type:1,money:t.result.good_commission[0].money,id:t.result.good_commission[0].id},{type:2,money:t.result.good_commission[1].money,id:t.result.good_commission[1].id},{type:3,money:t.result.good_commission[2].money,id:t.result.good_commission[2].id}]},o.dialogSel=!0):(o.goodsInfo={name:t.result.name,intro:t.result.intro,share_title:t.result.share_title,detail:t.result.detail,img:t.result.img,imgs:t.result.imgs,price:t.result.price,vip_price:t.result.vip_price,freight:t.result.freight,on_shelf:t.result.on_shelf,is_fetch:2,repertory:t.result.repertory,id:t.result.id,sales:t.result.sales,browse:t.result.browse,classify_id:l,sort:t.result.sort,good_commissions:[{type:1,money:t.result.good_commission[0].money,id:t.result.good_commission[0].id},{type:2,money:t.result.good_commission[1].money,id:t.result.good_commission[1].id},{type:3,money:t.result.good_commission[2].money,id:t.result.good_commission[2].id}]},o.newMerchants())}))},changeFetch:function(e){console.log(e),self.isYes=1==e},handleDetail:function(e,t){var s=this;s.id=t.id;var o=[],i=[],l=[];s.isEidt=!0,s.isDisabled=!0,s.permissionData.includes("commodityEdit")?(s.dialogGood=!0,a["a"].goodDetail(s.id).then((function(e){e.result.classify[0]&&(o.push(e.result.classify[0].id),e.result.classify[0].subs&&(o.push(e.result.classify[0].subs[0].id),e.result.classify[0].subs[0].subs&&e.result.classify[0].subs[0].subs.forEach((function(e){o.push(e.id),l.push(e.id)})))),e.result.classify.forEach((function(e){a["a"].seleClassify(2,e.id).then((function(e){s.twoType=e.result})),e.subs&&a["a"].seleClassify(3,e.subs[0].id).then((function(e){s.threeType=e.result}))})),e.result.classify[0]&&(s.firstName=e.result.classify[0].id,e.result.classify[0].subs&&(s.secondName=e.result.classify[0].subs[0].id)),s.thirdName=l,e.result.have_merchant.forEach((function(e){i.push(e.id)})),e.result.good_commission.length>0&&1==e.result.is_fetch?s.goodsInfo={name:e.result.name,intro:e.result.intro,share_title:e.result.share_title,detail:e.result.detail,img:e.result.img,imgs:e.result.imgs,price:e.result.price,vip_price:e.result.vip_price,freight:e.result.freight,on_shelf:e.result.on_shelf,is_fetch:e.result.is_fetch,have_merchant:i,repertory:e.result.repertory,id:e.result.id,sales:e.result.sales,browse:e.result.browse,classify_id:o,sort:e.result.sort,good_commissions:[{type:1,money:e.result.good_commission[0].money,id:e.result.good_commission[0].id},{type:2,money:e.result.good_commission[1].money,id:e.result.good_commission[1].id},{type:3,money:e.result.good_commission[2].money,id:e.result.good_commission[2].id}]}:e.result.good_commission.length>0&&2==e.result.is_fetch&&(s.goodsInfo={name:e.result.name,intro:e.result.intro,share_title:e.result.share_title,detail:e.result.detail,img:e.result.img,imgs:e.result.imgs,price:e.result.price,vip_price:e.result.vip_price,on_shelf:e.result.on_shelf,freight:e.result.freight,is_fetch:e.result.is_fetch,repertory:e.result.repertory,id:e.result.id,sales:e.result.sales,browse:e.result.browse,classify_id:o,sort:e.result.sort,good_commissions:[{type:1,money:e.result.good_commission[0].money,id:e.result.good_commission[0].id},{type:2,money:e.result.good_commission[1].money,id:e.result.good_commission[1].id},{type:3,money:e.result.good_commission[2].money,id:e.result.good_commission[2].id}]}),s.fileLists=s.goodsInfo.imgs.map((function(e){var t={};return t.url=e,t}));var t=s.goodsInfo.img.split(",");t.forEach((function(e){var t=new Object;t.url=e,s.files.push(t)}))}))):s.$message.warning("无权操作")},handleClassify:function(e,t){var s=this,o=[];s.id=t.id,s.permissionData.includes("classifyEdit")?(s.dialogClassify=!0,a["a"].goodDetail(s.id).then((function(e){e.result.classify[0]&&(s.oldFirstName=e.result.classify[0].name,e.result.classify[0].subs&&(s.oldSecondName=e.result.classify[0].subs[0].name,e.result.classify[0].subs[0].subs&&e.result.classify[0].subs[0].subs.forEach((function(e){s.oldThirdName.push(e.name)})))),e.result.have_merchant.forEach((function(e){o.push(e.id)})),e.result.good_commission.length>0&&1==e.result.is_fetch?s.goodsInfo={name:e.result.name,intro:e.result.intro,share_title:e.result.share_title,detail:e.result.detail,img:e.result.img,imgs:e.result.imgs,price:e.result.price,vip_price:e.result.vip_price,freight:e.result.freight,on_shelf:e.result.on_shelf,is_fetch:e.result.is_fetch,have_merchant:o,repertory:e.result.repertory,id:e.result.id,sales:e.result.sales,browse:e.result.browse,sort:e.result.sort,good_commissions:[{type:1,money:e.result.good_commission[0].money,id:e.result.good_commission[0].id},{type:2,money:e.result.good_commission[1].money,id:e.result.good_commission[1].id},{type:3,money:e.result.good_commission[2].money,id:e.result.good_commission[2].id}]}:e.result.good_commission.length>0&&2==e.result.is_fetch&&(s.goodsInfo={name:e.result.name,intro:e.result.intro,share_title:e.result.share_title,detail:e.result.detail,img:e.result.img,imgs:e.result.imgs,price:e.result.price,vip_price:e.result.vip_price,freight:e.result.freight,on_shelf:e.result.on_shelf,is_fetch:e.result.is_fetch,repertory:e.result.repertory,id:e.result.id,sales:e.result.sales,browse:e.result.browse,sort:e.result.sort,good_commissions:[{type:1,money:e.result.good_commission[0].money,id:e.result.good_commission[0].id},{type:2,money:e.result.good_commission[1].money,id:e.result.good_commission[1].id},{type:3,money:e.result.good_commission[2].money,id:e.result.good_commission[2].id}]}),s.fileLists=s.goodsInfo.imgs.map((function(e){var t={};return t.url=e,t}));var t=s.goodsInfo.img.split(",");t.forEach((function(e){var t=new Object;t.url=e,s.files.push(t)}))}))):s.$message.warning("无权操作")},handleDelete:function(e,t){var s=this;s.permissionData.includes("commodityDel")?s.dialogDel=!0:s.$message.warning("无权操作"),s.id=t.id},toDel:function(){var e=this;a["a"].delGood(e.id).then((function(t){1e4==t.code&&(e.$message.success("删除成功"),e.dialogDel=!1,e.getList(e.current,e.size))})).catch((function(e){console.log(e)}))},beforeUpload:function(){o=this.$loading({lock:!0,text:"图片上传中",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})},quillImgSuccess:function(e,t){var s=this.$refs.myQuillEditor.quill;if(o.close(),e.data){var i=s.getSelection().index;s.insertEmbed(i,"image",e.data),s.setSelection(i+1)}else this.$message.error("图片插入失败")},handleRemove:function(e,t){var s=this;s.files=t,s.goodsInfo.img=""},beforeAvatarUpload:function(e){var t=307200;return t||this.$message.error("上传图片大小不能超过300KB"),t},handleAvatarSuccess:function(e,t){var s=this;s.goodsInfo.img=t.response.data},handleExceed:function(e,t){var s=this;s.$message.error("上传图片不能超过1张!")},handleChange:function(e,t){var s=this;s.files=t},handleRemove1:function(e,t){var s=this;s.fileLists=t,s.goodsInfo.imgs.splice(s.goodsInfo.imgs.indexOf(e.url),1),s.hasNewImage1=!1},beforeAvatarUpload1:function(e){this.fileLists.length>9&&this.$message.error("最多只能上传9张图片");var t=e.size/1024<500;return t||this.$message.error("上传产品图片大小不能超过 500K!"),t&&this.fileLists.length<=9},handleAvatarSuccess1:function(e,t){var s=this;s.goodsInfo.imgs.push(t.response.data)},handleExceed1:function(e,t){var s=this;s.$message.error("上传图片不能超过9张!")},handleChange1:function(e,t){var s=this;s.fileLists=t}}}),c=r,d=(s("4fc5"),s("2877")),u=Object(d["a"])(c,i,l,!1,null,"db75059c",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-9a3bcdc6.13e4d2ce.js.map