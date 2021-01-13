<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addExpert">添加专家</el-button>
            </div>
            <!-- <div class="btn">
                <el-input placeholder="请输入用户ID/昵称" v-model="userId" @keyup.enter.native="search(userId)"
                    class="input-with-select">
                    <el-select v-model="type" placeholder="请选择搜索方式" slot="prepend" @change="changeType"
                        style="width: 150px">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search(userId)"></el-button>
                </el-input>
            </div> -->
        </div>
        <el-table :data="tableData" border :header-cell-style="{ background: '#f0f0f0' }" max-height="620">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="specialty" label="专业"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="picture" label="照片">
                <template slot-scope="scope">
                    <div v-if="scope.row.picture">
                        <el-popover placement="top-start" title trigger="click">
                            <img :src="scope.row.picture" style="max-width: 800px; max-height: 800px" />
                            <img slot="reference" :src="scope.row.picture" style="max-width: 180px; max-height: 80px" />
                        </el-popover>
                    </div>
                    <div v-else>
                        <span>--暂无图片--</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
            <el-pagination @current-change="currentChange" :current-page.sync="current" :page-size="size"
                layout="sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange"></el-pagination>
        </div>

        <!-- 删除提示框 -->
        <el-dialog :visible.sync="dialogDel" title="删除专家" width="20%" align="center" :close-on-click-modal="false">
            <div style="font-size: 20px; margin-bottom: 30px;">是否删除</div>
            <span>
                <el-button type="primary" @click="toDel">删除</el-button>
                <el-button type="danger" @click="dialogDel = false">取消</el-button>
            </span>
        </el-dialog>

        <el-dialog :visible.sync="dialogExpert" title="添加专家" width="1000px" @close="close">
            <el-form label-width="100px" :model="expertyInfo">
                <el-form-item label="名称">
                    <el-input v-model="expertyInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="expertyInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="expertyInfo.specialty"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="expertyInfo.intro"></el-input>
                </el-form-item>
                <el-form-item label="照片">
                    <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="1"
                        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
                        :on-exceed="handleExceed" :auto-upload="true" :on-change="handleChange" list-type="picture-card"
                        :file-list='files'>
                        <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品详情">
                    <quill-editor ref="myQuillEditor" v-model="expertyInfo.details" :options="editorOption"
                        style="height:430px;margin:0 0 60px 0;"></quill-editor>
                    <el-upload class="avatar-uploader quill-img" action="https://api.fengniaotuangou.cn/api/upload"
                        :before-upload="beforeUpload" :on-success="quillImgSuccess" style="display: none">
                        <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">点击上传
                        </el-button>
                    </el-upload>
                </el-form-item>
                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="newExpert">提交</el-button>
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
    let loading;

    export default {
        components: {
            quillEditor,
        },
        data() {
            return {
                loading: true,
                tableData: [],

                current: 1, // 分页
                total: 0,
                size: 10,

                userId: "", // 搜索用户id
                nickname: '',
                dialogDel: false,
                id: '',
                qr_code: '',
                expertyInfo: {
                    name: '',
                    phone: '',
                    picture: '',
                    intro: '',
                    specialty: '',
                    details: ''
                },
                files: [],
                dialogExpert: false,
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
            }
        },

        mounted() {
            this.permissionData = localStorage.getItem("permissions").split(",");
            this.getList(this.current, this.size);
        },

        methods: {
            getList(currentPage, perPage, name) {
                var self = this;
                API.specialists(currentPage, perPage, name).then(res => {
                    // console.log(res);
                    self.loading = false;
                    self.tableData = res.result.data;
                    self.total = res.result.total;
                }).catch(err => {
                    self.loading = false;
                })
            },
            // 分页
            currentChange(val) {
                var self = this;
                self.current = val;
                self.loading = true;
                self.getList(val, self.size);
            },
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                self.getList(1, val);
                self.current = 1;
            },

            addExpert() {
                var self = this;
                self.dialogExpert = true;

            },

            close() {
                var self = this;
                self.files = [];
                self.expertyInfo = {
                    name: '',
                    phone: '',
                    picture: '',
                    intro: '',
                    specialty: '',
                    details: ''
                };
            },

            newExpert() {
                var self = this;
                if (self.expertyInfo.name && self.expertyInfo.phone && self.expertyInfo.picture && self.expertyInfo
                    .intro && self.expertyInfo.specialty && self.expertyInfo.details) {
                    API.createSpecialists(self.expertyInfo).then(res => {
                        self.dialogExpert = false;
                        self.$message.success("提交成功");
                        self.getList(self.current, self.size);
                    })
                } else {
                    self.$message.warning("请填写完整信息");
                }
            },

            handleEdit(index, row) {
                var self = this;
                self.dialogExpert = true;
                console.log(row);
                self.expertyInfo = {
                    name: row.name,
                    phone: row.phone,
                    picture: row.picture,
                    intro: row.intro,
                    specialty: row.specialty,
                    details: row.details,
                    id: row.id
                };

                let urlStr = self.expertyInfo.picture.split(",");
                urlStr.forEach(item => {
                    let obj = new Object();
                    obj.url = item;
                    self.files.push(obj);
                });
            },


            handleDelete(index, row) {
                var self = this;
                self.dialogDel = true;
                self.id = row.id;

            },

            toDel() {
                var self = this;
                API.delSpecialist(self.id).then((res) => {
                    self.$message.success("删除成功");
                    self.dialogDel = false;
                    self.getList(self.current, self.size);
                });
            },

            handleRemove(file, fileList) {
                //移除图片
                var self = this;
                self.files = fileList
                self.expertyInfo.picture = ''
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
                self.expertyInfo.picture = file.response.data;
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
        }
    }
</script>

<style lang="scss" scoped>

</style>