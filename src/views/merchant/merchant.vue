<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addMerchants">添加商家</el-button>
            </div>
            <div class="btn">
                <el-input v-model="merchants_name" placeholder="输入商家名称" class="input-with-select"
                    @keyup.enter.native="search(merchants_name)">
                    <el-button slot="append" icon="el-icon-search" @click="search(merchants_name)"></el-button>
                    <el-button slot="append" icon="el-icon-refresh" @click="refresh"></el-button>
                </el-input>
            </div>
        </div>

        <el-table :data="tableData" border :header-cell-style="{ background: '#f0f0f0' }">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="商家名称"></el-table-column>
            <el-table-column prop="province.name" label="商家所在省份"></el-table-column>
            <el-table-column prop="city.name" label="商家所在城市"></el-table-column>
            <el-table-column prop="district.name" label="商家所在区域"></el-table-column>
            <el-table-column prop="address" label="商家地址"></el-table-column>
            <el-table-column prop="img" label="商家logo" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.img">
                        <el-popover placement="top-start" title trigger="click">
                            <img :src="scope.row.img" style="max-width: 800px; max-height: 800px" />
                            <img slot="reference" :src="scope.row.img"
                                style="max-width: 180px; max-height: 80px" />
                        </el-popover>
                    </div>
                    <div v-else>
                        <span>--暂无图片--</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination @current-change="currentChange" :current-page.sync="current"
                :page-sizes="[10, 20, 30, 40, 50]" :page-size="size" layout="sizes, prev, pager, next, jumper"
                :total="total" @size-change="sizeChange">
            </el-pagination>
        </div>

        <el-dialog :visible.sync="dialogMerchants" title="添加商家" width="1000px" @close="close">
            <el-form label-width="100px" :model="merchantInfo">
                <el-form-item label="选择省份">
                    <el-select v-model="merchantInfo.province_id" placeholder="请选择省份" @change="proChange"
                        style="margin-right: 10px;">
                        <el-option v-for="item in proList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择市级">
                    <el-select v-model="merchantInfo.city_id" placeholder="选择市级" @change="cityChange"
                        style="margin-right: 10px;">
                        <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择区级">
                    <el-select v-model="merchantInfo.district_id" placeholder="请选择省份" style="margin-right: 10px;">
                        <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否显示商家">
                    <el-radio-group v-model="merchantInfo.on_shelf">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商家名称">
                    <el-input v-model="merchantInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="商家简介">
                    <el-input v-model="merchantInfo.intro"></el-input>
                </el-form-item>
                <el-form-item label="商家地址">
                    <el-input v-model="merchantInfo.address"></el-input>
                </el-form-item>
                <el-form-item label="商家logo">
                    <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="1"
                        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
                        :on-exceed="handleExceed" :auto-upload="true" :on-change="handleChange" list-type="picture-card"
                        :file-list='files'>
                        <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="newMerchants">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import API from "@/api/index.js";
    import md5 from "blueimp-md5";
    import {
        quillEditor
    } from "vue-quill-editor";
    import "quill/dist/quill.core.css";
    import "quill/dist/quill.snow.css";
    import "quill/dist/quill.bubble.css";
    export default {
        inject: ["reload"],

        data() {
            return {
                loading: true,
                tableData: [],
                dialogMerchants: false,
                // 分页
                current: 1,
                size: 10,
                total: 0,
                role: localStorage.getItem("role"),
                permissionData: [],
                merchantInfo: {
                    name: '',
                    intro: '',
                    img: '',
                    address: '',
                    province_id: '',
                    city_id: '',
                    district_id: '',
                    on_shelf: 1,
                    id: ''
                },
                stateList: [{
                    label: '是',
                    value: 1
                }, {
                    label: '否',
                    value: 2
                }],
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
                files: [],
                proList: [],
                cityList: [],
                areaList: [],
                pro_id: '',
                merchants_name: ''
            }
        },

        mounted() {
            this.permissionData = localStorage.getItem("permissions").split(",");
            this.getMerchants(this.current, this.size);
            this.getPro();
        },

        methods: {
            // 获取商家
            getMerchants(cur, list, name) {
                var self = this;
                API.merchants(cur, list, name)
                    .then((res) => {
                        console.log(res.result.data);
                        self.loading = false;
                        self.tableData = res.result.data;
                        self.total = res.result.total;
                    })
                    .catch((err) => {
                        self.loading = false;
                    });
            },
            // 分页
            currentChange(val) {
                var self = this;
                self.current = val;
                self.loading = true;
                if (self.merchants_name) {
                    self.getMerchants(val, self.size, self.merchants_name);
                } else {
                    self.getMerchants(val, self.size);
                }
            },
            // 每页多少条
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                if (self.merchants_name) {
                    self.getMerchants(1, val, self.merchants_name);
                } else {
                    self.getMerchants(1, val);
                }
                self.current = 1;
            },
            search() {
                var self = this;
                self.current = 1;
                self.getMerchants(self.current, self.size, self.merchants_name);
            },

            // 获取省市区
            getPro() {
                var self = this;
                API.areas(1, 0).then(res => {
                    console.log(res);
                    self.proList = res.result;
                })
            },
            getCity(val) {
                var self = this;
                API.areas(2, val).then(res => {
                    console.log(res);
                    self.cityList = res.result;
                })
            },
            getArea(val) {
                var self = this;
                API.areas(3, val).then(res => {
                    self.areaList = res.result;
                })
            },
            // 选择省市区
            proChange(val) {
                var self = this;
                self.merchantInfo.city_id = '';
                self.merchantInfo.district_id = '';
                self.getCity(val);
            },
            cityChange(val) {
                var self = this;
                self.merchantInfo.district_id = '';
                self.getArea(val);
            },

            addMerchants() {
                var self = this;
                if (self.permissionData.includes("merchantAdd")) {
                    self.dialogMerchants = true;
                } else {
                    self.$message.warning("无权操作");
                }
                self.merchantInfo = {
                    name: '',
                    intro: '',
                    img: '',
                    address: '',
                    province_id: '',
                    city_id: '',
                    district_id: '',
                    on_shelf: 1,
                    id: ''
                };
            },
            close() {
                var self = this;
                self.files = [];
            },
            newMerchants() {
                var self = this;
                API.createMerchant(self.merchantInfo).then(res => {
                    if (res.code == 10000) {
                        self.$message.success("提交成功");
                        self.dialogMerchants = false;
                        self.getMerchants(self.current, self.size);
                        self.merchantInfo = {};
                        self.merchantInfo.img = '';
                    }
                })
            },

            handleEdit(index, row) {
                var self = this;
                if (self.permissionData.includes("merchantEdit")) {
                    self.dialogMerchants = true;
                } else {
                    self.$message.warning("无权操作");
                }
                self.merchantInfo = {
                    name: row.name,
                    intro: row.intro,
                    img: row.img,
                    address: row.address,
                    province_id: row.province_id,
                    city_id: row.city_id,
                    district_id: row.district_id,
                    on_shelf: 1,
                    id: row.id
                };
                let urlStr = self.merchantInfo.img.split(",");
                urlStr.forEach(item => {
                    let obj = new Object();
                    obj.url = item;
                    self.files.push(obj);
                });
                self.getCity(self.merchantInfo.province_id);
                self.getArea(self.merchantInfo.city_id);
            },

            // 刷新
            refresh() {
                this.reload();
            },

            handleRemove(file, fileList) {
                //移除图片
                var self = this;
                self.files = fileList
                self.merchantInfo.img = ''
            },
            beforeAvatarUpload(file) {
                //文件上传之前调用做一些拦截限制
                const isLt2M = 300 * 1024;
                if (!isLt2M) {
                    this.$message.error("上传图片大小不能超过300KB");
                }
                return isLt2M;
            },
            handleAvatarSuccess(res, file) {
                //图片上传成功
                var self = this;
                self.merchantInfo.img = file.response.data;
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
        },
    }
</script>

<style lang="scss" scoped>

</style>