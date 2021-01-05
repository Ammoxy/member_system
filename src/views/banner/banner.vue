<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addBanner">添加轮播图</el-button>
            </div>
        </div>

        <el-dialog title="上传图片" :visible.sync="dialogBanner" @close="close" :close-on-click-modal="false" width="800px">
            <el-form label-width="80px" :model="form">
                <el-form-item label="是否显示">
                    <el-radio-group v-model="form.is_show">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="图片排序">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item label="跳转地址">
                    <el-input v-model="form.target"></el-input>
                </el-form-item>
                <el-form-item label="轮播图">
                    <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="1"
                        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
                        list-type="picture-card" :on-exceed="handleExceed" :file-list='fileLists' :auto-upload="true"
                        :on-change="handleChange">
                        <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="upload">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>

        </el-dialog>

        <el-table :data="tableDate" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
            <el-table-column prop="id" label="轮播图ID"></el-table-column>
            <el-table-column prop="img" label="缩略图">
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
            <el-table-column prop="is_show" label="是否显示">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.is_show" active-color="#2a9f93"
                        @change="notifyChange(scope.row.is_show, scope.$index, scope.row)">
                    </el-switch>
                </template>
                <!-- <template slot-scope="scope">
                    <div v-if="scope.row.is_show == 1">
                        <span>显示</span>
                    </div>
                    <div v-if="scope.row.is_show == 2">
                        <span>不显示</span>
                    </div>
                </template> -->
            </el-table-column>
            <el-table-column prop="updated_at" label="更新时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- <div class="block">
            <el-pagination @current-change="currentChange" :current-page.sync="current"
                :page-sizes="[10, 20, 30, 40, 50]" :page-size="size" layout="sizes, prev, pager, next, jumper"
                :total="total" @size-change="sizeChange">
            </el-pagination>
        </div> -->

        <!-- 删除提示框 -->
        <el-dialog :visible.sync="dialogDel" title="删除轮播图" width="20%" align="center" :close-on-click-modal="false">
            <div style="font-size: 20px; margin-bottom: 30px;">是否删除</div>
            <span>
                <el-button type="primary" @click="toDel">删除</el-button>
                <el-button type="danger" @click="dialogDel = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import API from "@/api/index.js";
    import axios from "axios";

    export default {
        name: "banner",
        data() {
            return {
                loading: true,
                dialogBanner: false,
                disabled: false, // 上传图片
                dialogDel: false,

                tableDate: [],

                // current: 1,
                // size: 10,
                // total: 0,
                qiniuaddr: "https://tu.fengniaotuangou.cn", // 七牛云图片外链地址

                hasNewImage: false,
                form: {
                    img: "",
                    id: "",
                    target: '',
                    sort: '',
                    is_show: 1
                },
                statetList: [{
                        val: 1,
                        label: '显示'
                    },
                    {
                        val: 2,
                        label: '不显示'
                    }
                ],
                fileLists: [],
                is_show: false
            };
        },
        mounted() {
            this.getBanner();
        },
        methods: {
            // 获取轮播图
            getBanner() {
                var self = this;
                API.banners()
                    .then((res) => {
                        self.loading = false;
                        res.result.forEach(item => {
                            // console.log(item);
                            item.is_show == 1 ? item.is_show = true : item.is_show = false;
                        })
                        self.tableDate = res.result;
                    })
                    .catch((err) => {
                        self.loading = false;
                    });
            },

            // 操作
            handleEdit(index, row) {
                var self = this;
                self.dialogBanner = true;
                if (Number(row.is_show) == 0) {
                    self.form = {
                        img: row.img,
                        id: row.id,
                        target: row.target,
                        sort: row.sort,
                        is_show: 2
                    };
                } else {
                    self.form = {
                        img: row.img,
                        id: row.id,
                        target: row.target,
                        sort: row.sort,
                        is_show: 1
                    };
                }
                let urlStr = self.form.img.split(",");
                urlStr.forEach(item => {
                    let obj = new Object();
                    obj.url = item;
                    self.fileLists.push(obj);
                });
            },
            stateChange(val) {
                var self = this;
                self.form.is_show = val;
            },

            handleDelete(index, row) {
                var self = this;
                self.dialogDel = true;
                self.id = row.id;
            },
            toDel() {
                var self = this;
                self.dialogDel = false;
                API.delBanner(self.id).then((res) => {
                    self.$message.success("删除成功");
                    self.dialogDel = false;
                    self.getBanner();
                });
            },
            notifyChange(val, index, row) {
                var self = this;
                console.log(row);
                if (val == true) {
                    self.form = {
                        img: row.img,
                        id: row.id,
                        target: row.target,
                        sort: row.sort,
                        is_show: 1
                    }
                    API.createBanner(self.form).then(res => {
                        self.$message.success("提交成功");
                        self.getBanner();
                    })
                } else {
                    self.form = {
                        img: row.img,
                        id: row.id,
                        target: row.target,
                        sort: row.sort,
                        is_show: 2
                    }
                    API.createBanner(self.form).then(res => {
                        self.$message.success("提交成功");
                        self.getBanner();
                    })
                }
            },


            // 上传图片
            upload() {
                var self = this;
                const loading = self.$loading({
                    lock: true,
                    text: "提交中...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)",
                });
                API.createBanner(self.form).then((res) => {
                    loading.close();
                    if (res.code == 10000) {
                        self.getBanner();
                        self.form = {
                            img: '',
                            id: '',
                            target: '',
                            sort: '',
                            is_show: 1
                        }
                        self.dialogBanner = false;
                    }
                }).catch((err) => {
                    loading.close();
                });
            },
            addBanner() {
                var self = this;
                self.dialogBanner = true;
                self.hasNewImage = false;
                self.form = {
                    img: '',
                    id: '',
                    target: '',
                    sort: '',
                    is_show: 1
                }
                if (self.$refs.upload) {
                    self.$refs.upload.clearFiles();
                }
            },
            close() {
                var self = this;
                self.fileLists = [];
            },
            handleRemove(file, fileList) {
                //移除图片
                var self = this;
                self.fileLists = fileList
                self.form.img = ''
            },
            beforeAvatarUpload(file) {
                //文件上传之前调用做一些拦截限制
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error("上传图片大小不能超过 2MB!");
                }
                return isLt2M;
            },
            handleAvatarSuccess(res, file) {
                //图片上传成功
                var self = this;
                self.form.img = file.response.data;
            },
            handleExceed(files, fileList) {
                //图片上传超过数量限制
                var self = this;
                self.$message.error("上传图片不能超过1张!");
            },

            handleChange(file, fileList) {
                var self = this;
                self.fileLists = fileList;
            },

            getQiniuToken() {
                var self = this;
                axios
                    .get("https://api.fengniaotuangou.cn/api/upload/token")
                    .then((res) => {
                        self.imgData.token = res.data.uptoken;
                    });
            },
        },
    };
</script>

<style scoped>
    .upload-btn {
        margin-top: 10px;
    }

    .pic-box {
        max-width: 100%;
        height: 200px;
    }
</style>