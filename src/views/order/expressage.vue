<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addLogistic">创建物流</el-button>
            </div>
            <div class="btn">
                <el-input v-model="keyword" placeholder="请输入名称" class="input-with-select"
                    @keyup.enter.native="search(keyword)">
                    <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
                </el-input>
            </div>
        </div>

        <el-table :data="tableData" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="number" label="快递编码"></el-table-column>
            <!-- <el-table-column prop="type" label="类型级别">
                <template slot-scope="scope">
                    <div v-if="scope.row.type == 1">
                        <span>一级分类</span>
                    </div>
                    <div v-if="scope.row.type == 2">
                        <span>二级分类</span>
                    </div>
                    <div v-if="scope.row.type == 3">
                        <span>三级分类</span>
                    </div>
                </template>
            </el-table-column> -->
            <el-table-column prop="logo" label="分类图标">
                <template slot-scope="scope">
                    <div v-if="scope.row.logo">
                        <el-popover placement="top-start" title trigger="click">
                            <img :src="scope.row.logo" style="max-width: 800px; max-height: 800px" />
                            <img slot="reference" :src="scope.row.logo" style="max-width: 180px; max-height: 80px" />
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

        <div class="block">
            <el-pagination @current-change="currentChange" :current-page.sync="current"
                :page-sizes="[10, 20, 30, 40, 50]" :page-size="size" layout="sizes, prev, pager, next, jumper"
                :total="total" @size-change="sizeChange">
            </el-pagination>
        </div>

        <el-dialog :visible.sync="dialogLogistic" :title="isAdd ? '创建物流' : '编辑'" center width="1000px" @close="close">
            <el-form label-width="100px" :model="logisticsInfo">
                <el-form-item label="名称">
                    <el-input v-model="logisticsInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="快递编码">
                    <el-input v-model="logisticsInfo.number"></el-input>
                </el-form-item>
                <el-form-item label="快递logo">
                    <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="1"
                        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
                        :on-exceed="handleExceed" :auto-upload="true" :on-change="handleChange" list-type="picture-card"
                        :file-list='files'>
                        <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="newLogistic">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog :visible.sync="dialogDel" title="删除物流" width="20%" align="center" :close-on-click-modal="false">
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

    export default {
        data() {
            return {
                loading: true,
                tableData: [],
                current: 1,
                size: 10,
                total: 0,
                logisticsInfo: {
                    name: '',
                    logo: '',
                    number: ''
                },
                files: [],
                dialogLogistic: false,
                id: '',
                dialogDel: false,
                keyword: '',
                isAdd: false
            }
        },

        mounted() {
            this.getList(this.current, this.size);
            this.permissionData = localStorage.getItem("permissions").split(",");
        },

        methods: {
            getList(cur, list, name) {
                var self = this;
                API.logistics(cur, list, name).then(res => {
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
                if (self.keyword) {
                    self.getList(val, self.size, self.keyword);
                } else {
                    self.getList(val, self.size);
                }

            },
            // 每页多少条
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                if (self.keyword) {
                    self.getList(1, val, self.keyword);
                } else {
                    self.getList(1, val);
                }
                self.current = 1;
            },

            search() {
                var self = this;
                self.current = 1;
                self.loading = true;
                self.getList(self.current, self.size, self.keyword)
            },

            addLogistic() {
                var self = this;
                if (self.permissionData.includes("logisticsAdd")) {
                    self.dialogLogistic = true;
                } else {
                    self.$message.warning("无权操作");
                }
                self.isAdd = true;
            },
            close() {
                var self = this;
                self.files = [];
                self.logisticsInfo = {
                    name: '',
                    logo: '',
                    number: ''
                }
            },

            newLogistic() {
                var self = this;
                if (self.logisticsInfo.logo && self.logisticsInfo.name && self.logisticsInfo.number) {
                    API.creationLogistic(self.logisticsInfo).then(res => {
                        self.$message.success("创建成功");
                        self.dialogLogistic = false;
                        self.getList(self.current, self.size);
                    })
                } else {
                    self.$message.warning("请填写完整信息");
                }
            },

            handleEdit(index, row) {
                var self = this;
                if (self.permissionData.includes("logisticsEidt")) {
                    self.dialogLogistic = true;
                } else {
                    self.$message.warning("无权操作");
                }
                self.isAdd = false;
                self.logisticsInfo = {
                    name: row.name,
                    logo: row.logo,
                    number: row.number,
                    id: row.id
                }
                let urlStr = self.logisticsInfo.logo.split(",");
                urlStr.forEach(item => {
                    let obj = new Object();
                    obj.url = item;
                    self.files.push(obj);
                });
            },

            handleDelete(index, row) {
                var self = this;
                self.id = row.id;
                if (self.permissionData.includes("logisticsDel")) {
                    self.dialogDel = true;
                } else {
                    self.$message.warning("无权操作");
                }
            },

            toDel() {
                var self = this;
                API.delLogistic(self.id).then(res => {
                    self.dialogDel = false;
                    self.$message.success("删除成功");
                    self.getList(self.current, self.size);

                })
            },


            handleRemove(file, fileList) {
                //移除图片
                var self = this;
                self.files = fileList
                self.logisticsInfo.logo = ''
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
                self.logisticsInfo.logo = file.response.data;
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