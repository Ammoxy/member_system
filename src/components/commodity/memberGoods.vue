<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addGoods">添加商品</el-button>
            </div>
            <div class="btn">
                <el-input v-model="keyword" placeholder="请输入商品名称" class="input-with-select"
                    @keyup.enter.native="search(keyword)">
                    <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
                </el-input>
            </div>
        </div>

        <el-dialog :visible.sync="dialogGood" title="添加商品" @close="close" width="1200px">
            <el-form label-width="150px" :model="goodsInfo">
                <el-form-item label="是否上架">
                    <el-radio-group v-model="goodsInfo.on_shelf">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否允许到店自取">
                    <el-radio-group v-model="goodsInfo.is_fetch" @change="changeFetch">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="可以到店自取的部门" v-if="goodsInfo.is_fetch == 1">
                    <el-select v-model="goodsInfo.have_merchant" multiple placeholder="请选择部门(可多选)"
                        @change="merchantChange" style="width: 400px">
                        <el-option v-for="(item1, index) in merchantList" :key="index" :label="item1.name"
                            :value="item1.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="goodsInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="商品简介">
                    <el-input v-model="goodsInfo.intro"></el-input>
                </el-form-item>
                <div class="momey-info">
                    <el-form-item label="市级佣金">
                        <el-input v-model="goodsInfo.good_commissions[0].money" placeholder="请输入佣金(市级)"></el-input>
                    </el-form-item>
                    <el-form-item label="区县佣金">
                        <el-input v-model="goodsInfo.good_commissions[1].money" placeholder="请输入佣金(区县)"></el-input>
                    </el-form-item>
                    <el-form-item label="社区佣金">
                        <el-input v-model="goodsInfo.good_commissions[2].money" placeholder="请输入佣金(社区)"></el-input>
                    </el-form-item>
                </div>
                <div class="momey-info">
                    <el-form-item label="价格">
                        <el-input v-model="goodsInfo.price"></el-input>
                    </el-form-item>
                    <el-form-item label="运费">
                        <el-input v-model="goodsInfo.freight"></el-input>
                    </el-form-item>
                </div>
                <div class="momey-info">
                    <el-form-item label="商品销量">
                        <el-input v-model="goodsInfo.sales"></el-input>
                    </el-form-item>
                    <el-form-item label="浏览量">
                        <el-input v-model="goodsInfo.browse"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="商品图片">
                    <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="1"
                        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
                        :file-list='files' :on-exceed="handleExceed" list-type="picture-card" :on-change="handleChange"
                        :auto-upload="true">
                        <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="批量上传详情图片">
                    <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="9"
                        :before-upload="beforeAvatarUpload1" :on-remove="handleRemove1" :on-exceed="handleExceed1"
                        :auto-upload="true" :on-change="handleChange1" multiple list-type="picture-card"
                        :file-list='fileLists' :on-success="handleAvatarSuccess1">
                        <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品详情">
                    <quill-editor ref="myQuillEditor" v-model="goodsInfo.detail" :options="editorOption"
                        style="height:430px;margin:0 0 60px 0;"></quill-editor>
                    <el-upload class="avatar-uploader quill-img" action="https://api.fengniaotuangou.cn/api/upload"
                        :before-upload="beforeUpload" :on-success="quillImgSuccess" style="display: none">
                        <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">点击上传
                        </el-button>
                    </el-upload>
                </el-form-item>
                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="newMerchants">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>

        <!-- 表格数据 -->
        <el-table :data="tableData" empty-text="暂无数据" border :header-cell-style="{ background: '#f0f0f0' }"
            max-height="620">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="img" label="图片" width="150">
                <template slot-scope="scope">
                    <div v-if="scope.row.img">
                        <el-popover placement="top-start" title trigger="click">
                            <img :src="scope.row.img" style="max-width: 800px; max-height: 800px" />
                            <img slot="reference" :src="scope.row.img" style="max-width: 180px; max-height: 80px" />
                        </el-popover>
                    </div>
                    <div v-else>
                        <span>--暂无图片--</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="freight" label="运费"></el-table-column>
            <el-table-column prop="is_fetch" label="是否到店自取" width="120">
                <template slot-scope="scope">
                    <div v-if="scope.row.is_fetch == 1">
                        <span>是</span>
                    </div>
                    <div v-if="scope.row.is_fetch == 2">
                        <span>否</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="on_shelf" label="是否上架">
                <template slot-scope="scope">
                    <div v-if="scope.row.on_shelf == 1">
                        <span>是</span>
                    </div>
                    <div v-if="scope.row.on_shelf == 2">
                        <span>否</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="sales" label="销量"></el-table-column>
            <el-table-column prop="browse" label="浏览量"></el-table-column>
            <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleDetail(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
            <el-pagination @current-change="currentChange" :current-page.sync="current"
                :page-sizes="[10, 20, 30, 40, 50]" :page-size="size" layout="sizes, prev, pager, next, jumper"
                :total="total" @size-change="sizeChange">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import API from "@/api/index.js";
    import {
        log
    } from "util";
    import md5 from "blueimp-md5";
    import {
        quillEditor
    } from "vue-quill-editor";
    import "quill/dist/quill.core.css";
    import "quill/dist/quill.snow.css";
    import "quill/dist/quill.bubble.css";
    let loading;
    export default {
        inject: ["reload"],
        components: {
            quillEditor,
        },
        data() {
            return {
                loading: true,

                tableData: [], // 表格数据
                current: 1, // 分页
                size: 10,
                total: 0,

                id: "", // 删除id
                dialogDel: false,
                dialogGood: false,
                editorOption: {
                    placeholder: "请输入文档内容",
                    theme: "snow",
                    modules: {
                        toolbar: {
                            container: [
                                ["bold", "italic", "underline", "strike"],
                                ["blockquote", "code-block"],
                                [{
                                    direction: "rtl",
                                }, ],
                                [{
                                    size: ["small", false, "large", "huge"],
                                }, ],
                                [{
                                    header: [1, 2, 3, 4, 5, 6, false],
                                }, ],
                                [{
                                        color: [],
                                    },
                                    {
                                        background: [],
                                    },
                                ],
                                [{
                                    font: [],
                                }, ],
                                [{
                                    align: [],
                                }, ],
                                ["clean"],
                                ["link", "image"],
                            ],
                            handlers: {
                                image: function (value) {
                                    if (value) {
                                        document.querySelector(".quill-img input").click();
                                    } else {
                                        this.quill.format("image", false);
                                    }
                                },
                            },
                        },
                    },
                },
                goodsInfo: {
                    name: '',
                    intro: '',
                    detail: '',
                    img: '',
                    imgs: [],
                    price: '',
                    freight: '',
                    on_shelf: 1,
                    is_fetch: 1,
                    have_merchant: [],
                    sales: 0,
                    browse: 0,
                    sort: 0,
                    good_commissions: [{
                        type: 1,
                        money: ''
                    }, {
                        type: 2,
                        money: ''
                    }, {
                        type: 3,
                        money: ''
                    }]
                },
                merchantList: [],
                name: '',
                stateList: [{
                        value: 1,
                        label: '是'
                    },
                    {
                        value: 2,
                        label: '否'
                    }
                ],
                state: '',
                keyword: '',
                fileLists: [],
                files: [],
                permissionData: []
            };
        },
        mounted() {
            this.getList(this.current, this.size);
            this.getParent();
            this.permissionData = localStorage.getItem("permissions").split(",");
        },
        methods: {
            getParent() {
                var self = this;
                API.merchantsSelect()
                    .then((res) => {
                        // console.log(res);
                        self.merchantList = res.result;
                    })
            },
            // 表格数据
            getList(cur, list, name, on_shelf) {
                var self = this;
                API.userGoods(cur, list, name, on_shelf).then(res => {
                    // console.log(res);
                    self.loading = false;
                    self.tableData = res.result.data;
                    self.total = res.result.total;
                }).catch(err => {
                    self.loading = false;
                })
            },
            search() {
                var self = this;
                self.current = 1;
                self.loading = true;
                self.getList(self.current, self.size, self.keyword);
            },
            // 分页
            currentChange(val) {
                var self = this;
                self.current = val;
                self.loading = true;
                if (self.keyword) {
                    self.getList(val, self.size, self.keyword);
                } else {
                    self.getList(val, self.size);
                }
            },
            // 每页几条
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                self.current = 1;
                if (self.keyword) {
                    self.getList(1, val, self.keyword);
                } else {
                    self.getList(1, val);
                }
            },

            addGoods() {
                var self = this;
                if (self.permissionData.includes("memberGoodsAdd")) {
                    self.dialogGood = true;
                } else {
                    self.$message.warning("无权操作");
                }
                if (self.isYes) {
                    self.goodsInfo = {
                        name: '',
                        intro: '',
                        detail: '',
                        img: '',
                        imgs: [],
                        price: '',
                        freight: '',
                        on_shelf: 1,
                        is_fetch: 1,
                        have_merchant: [],
                        sales: 0,
                        browse: 0,
                        sort: 0,
                        good_commissions: [{
                            type: 1,
                            money: ''
                        }, {
                            type: 2,
                            money: ''
                        }, {
                            type: 3,
                            money: ''
                        }]
                    };
                } else {
                    self.goodsInfo = {
                        name: '',
                        intro: '',
                        detail: '',
                        img: '',
                        imgs: [],
                        price: '',
                        freight: '',
                        on_shelf: 1,
                        is_fetch: 1,
                        sales: 0,
                        browse: 0,
                        sort: 0,
                        good_commissions: [{
                            type: 1,
                            money: ''
                        }, {
                            type: 2,
                            money: ''
                        }, {
                            type: 3,
                            money: ''
                        }]
                    };
                }

                if (self.$refs.upload) {
                    self.$refs.upload.clearFiles();
                }
            },

            newMerchants() {
                var self = this;
                console.log(self.goodsInfo);
                if (self.goodsInfo.name && self.goodsInfo.img && self.goodsInfo.imgs && self.goodsInfo.price && self
                    .goodsInfo.good_commissions) {
                    API.createUserGoods(self.goodsInfo).then(res => {
                        if (res.code == 10000) {
                            self.$message.success("添加成功");
                            self.dialogGood = false;
                            self.getList(self.current, self.size);
                        }
                    })
                } else {
                    self.$message.warning("请填写完整信息");
                }
            },
            changeFetch(val) {
                console.log(val);
                if (val == 1) {
                    self.isYes = true
                } else {
                    self.isYes = false
                }
            },

            merchantChange(val) {
                console.log(val);
                var self = this;
                self.goodsInfo.have_merchant = val;
            },

            handleDetail(index, row) {
                var self = this;
                self.id = row.id;
                var have_merchant = []
                if (self.permissionData.includes("memberGoodsEdit")) {
                    self.dialogGood = true;

                    API.userGoodDetail(self.id).then(res => {
                        res.result.have_merchant.forEach(item => {
                            have_merchant.push(item.id);
                        })

                        if (res.result.good_commission.length > 0 && res.result.is_fetch == 1) {
                            self.goodsInfo = {
                                name: res.result.name,
                                intro: res.result.intro,
                                detail: res.result.detail,
                                img: res.result.img,
                                imgs: res.result.imgs,
                                price: res.result.price,
                                freight: res.result.freight,
                                on_shelf: res.result.on_shelf,
                                is_fetch: res.result.is_fetch,
                                have_merchant: have_merchant,
                                id: res.result.id,
                                sales: res.result.sales,
                                browse: res.result.browse,
                                sort: res.result.sort,
                                good_commissions: [{
                                        type: 1,
                                        money: res.result.good_commission[0].money,
                                        id: res.result.good_commission[0].id,
                                    },
                                    {
                                        type: 2,
                                        money: res.result.good_commission[1].money,
                                        id: res.result.good_commission[1].id,
                                    },
                                    {
                                        type: 3,
                                        money: res.result.good_commission[2].money,
                                        id: res.result.good_commission[2].id,
                                    }
                                ]
                            }
                        } else if (res.result.good_commission.length > 0 && res.result.is_fetch == 2) {
                            self.goodsInfo = {
                                name: res.result.name,
                                intro: res.result.intro,
                                detail: res.result.detail,
                                img: res.result.img,
                                imgs: res.result.imgs,
                                price: res.result.price,
                                freight: res.result.freight,
                                on_shelf: res.result.on_shelf,
                                is_fetch: res.result.is_fetch,
                                id: res.result.id,
                                sales: res.result.sales,
                                browse: res.result.browse,
                                sort: res.result.sort,
                                good_commissions: [{
                                        type: 1,
                                        money: res.result.good_commission[0].money,
                                        id: res.result.good_commission[0].id,
                                    },
                                    {
                                        type: 2,
                                        money: res.result.good_commission[1].money,
                                        id: res.result.good_commission[1].id,
                                    },
                                    {
                                        type: 3,
                                        money: res.result.good_commission[2].money,
                                        id: res.result.good_commission[2].id,
                                    }
                                ]
                            }
                        } else if (res.result.good_commission.length == 0) {
                            self.goodsInfo = {
                                name: res.result.name,
                                intro: res.result.intro,
                                detail: res.result.detail,
                                img: res.result.img,
                                imgs: res.result.imgs,
                                price: res.result.price,
                                freight: res.result.freight,
                                on_shelf: res.result.on_shelf,
                                is_fetch: res.result.is_fetch,
                                have_merchant: have_merchant,
                                id: res.result.id,
                                sales: res.result.sales,
                                browse: res.result.browse,
                                sort: res.result.sort,
                                good_commissions: [{
                                    type: 1,
                                    money: ''
                                }, {
                                    type: 2,
                                    money: ''
                                }, {
                                    type: 3,
                                    money: ''
                                }]
                            }
                        }
                        self.fileLists = self.goodsInfo.imgs.map(t => {
                            var obj = {};
                            obj.url = t;
                            return obj;
                        })

                        let urlStr = self.goodsInfo.img.split(",");
                        urlStr.forEach(item => {
                            let obj = new Object();
                            obj.url = item;
                            self.files.push(obj);
                        });
                    })
                } else {
                    self.$message.warning("无权操作");
                }
            },

            close() {
                var self = this;
                self.fileLists = [];
                self.files = [];
            },

            // 富文本选择图片时的事件
            beforeUpload() {
                // 显示加载动画
                loading = this.$loading({
                    lock: true,
                    text: "图片上传中",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)",
                });
            },
            // 富文本插入图片时上传图片
            quillImgSuccess(res, file) {
                let quill = this.$refs.myQuillEditor.quill;
                // 关闭动画
                loading.close();
                if (res.data) {
                    let length = quill.getSelection().index;
                    quill.insertEmbed(length, "image", res.data);
                    quill.setSelection(length + 1);
                } else {
                    this.$message.error("图片插入失败");
                }
            },
            handleRemove(file, fileList) {
                //移除图片
                var self = this;
                self.files = fileList
                self.goodsInfo.img = ''
            },
            beforeAvatarUpload(file) {
                //文件上传之前调用做一些拦截限制
                // const isLt2M = file.size / 1024 / 1024 < 2;
                // if (!isLt2M) {
                //     this.$message.error("上传图片大小不能超过 2MB!");
                // }
                const isLt2M = 300 * 1024;
                if (!isLt2M) {
                    this.$message.error("上传图片大小不能超过300KB");
                }
                return isLt2M;
            },
            handleAvatarSuccess(res, file) {
                //图片上传成功
                var self = this;
                self.goodsInfo.img = file.response.data;
            },
            handleExceed(files, fileList) {
                //图片上传超过数量限制
                var self = this;
                self.$message.error("上传图片不能超过1张!");
            },

            handleChange(file, fileList) {
                var self = this;
                self.files = fileList;
            },

            handleRemove1(file, fileList) {
                //移除图片
                var self = this;
                console.log(file);
                self.fileLists = fileList
                self.goodsInfo.imgs.splice(self.goodsInfo.imgs.indexOf(file.url), 1)
                console.log(self.goodsInfo.imgs);
                self.hasNewImage1 = false;
            },
            beforeAvatarUpload1(file) {
                //文件上传之前调用做一些拦截限制

                if (this.fileLists.length > 9) {
                    this.$message.error('最多只能上传9张图片')
                }
                const isLt500K = file.size / 1024 < 500
                if (!isLt500K) {
                    this.$message.error('上传产品图片大小不能超过 500K!')
                }
                return isLt500K && this.fileLists.length <= 9
            },
            handleAvatarSuccess1(res, file) {
                //图片上传成功
                console.log(res);
                var self = this;
                self.goodsInfo.imgs.push(file.response.data);
            },
            handleExceed1(files, fileList) {
                //图片上传超过数量限制
                var self = this;
                self.$message.error("上传图片不能超过9张!");
            },

            handleChange1(file, fileList) {
                var self = this;
                self.fileLists = fileList;
            },
        },
    };
</script>

<style>
</style>

<style scoped>
    .service {
        display: flex;
        flex-wrap: wrap;
    }

    .service-item {
        margin: 10px;
        padding: 0 10px;
    }

    .upload-btn {
        margin-top: 10px;
    }

    .up-img {
        display: inline-block;
        margin: 10px;
    }

    .pic-box {
        max-width: 100%;
        height: 200px;
    }

    .auto-img {
        max-width: 100%;
        height: 100px;
        margin: 10px 0 10px 10px;
    }

    .tips {
        margin-bottom: 20px;
        color: red;
    }

    .bi {
        display: inline;
    }

    .wth {
        width: 100px;
    }

    .momey-info {
        display: flex;
    }
</style>