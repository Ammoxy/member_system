<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addKeywords">添加关键字</el-button>
            </div>
        </div>
        <el-table :data="tableData" border :header-cell-style="{ background: '#f0f0f0' }" max-height="620">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="count" label="搜索次数"></el-table-column>
            <el-table-column prop="keyword" label="关键字"></el-table-column>
            <el-table-column prop="updated_at" label="更新时间"></el-table-column>
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

        <el-dialog title="编辑" :visible.sync="dialogKeyword" :close-on-click-modal="false" width="800px">
            <el-form label-width="80px" :model="form">
                <el-form-item label="关键字">
                    <el-input v-model="form.keyword"></el-input>
                </el-form-item>
                <el-form-item label="搜索次数">
                    <el-input v-model="form.count"></el-input>
                </el-form-item>
                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="newKeywords">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>

        </el-dialog>

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

    export default {
        data() {
            return {
                loading: false,
                tableData: [],

                current: 1, // 分页
                total: 0,
                size: 10,

                userId: "", // 搜索用户id
                nickname: '',
                type: 1, // 选中的搜索方式
                typeList: [{
                        // 搜索方式
                        value: 1,
                        label: "按用户ID搜索",
                    },
                    {
                        value: 2,
                        label: "按昵称搜索",
                    },
                ],
                typeDisabled: false,
                dialogDel: false,
                dialogKeyword: false,
                form: {
                    count: '',
                    keyword: ''
                },
                id: '',
                permissionData: []
            }
        },

        mounted() {
            this.getKeywords(this.current, this.size);
            this.permissionData = localStorage.getItem("permissions").split(",");
        },

        methods: {
            getKeywords(cur, list, keyword) {
                var self = this;
                self.loading = true;
                API.keywords(cur, list, keyword)
                    .then((res) => {
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
                self.getKeywords(val, self.size);
            },
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                self.getKeywords(1, val);
                self.current = 1;
            },

            addKeywords() {
                var self = this;
                if (self.permissionData.includes("keywordAdd")) {
                    self.dialogKeyword = true;
                } else {
                    self.$message.warning("无权操作");
                }
                self.form = {
                    count: '',
                    keyword: ''
                }
            },

            newKeywords() {
                var self = this;
                API.createKeyword(self.form).then(res => {
                    if (res.code == 10000) {
                        self.$message.success(res.toast);
                        self.dialogKeyword = false;
                        self.tableData = res.result.data;
                        self.total = res.result.total;
                        self.form = {};
                        self.getKeywords(self.current, self.size);
                    }
                })
            },

            handleDelete(index, row) {
                var self = this;
                if (self.permissionData.includes("keywordDel")) {
                    self.dialogDel = true;
                } else {
                    self.$message.warning("无权操作");
                }
                self.id = row.id;
            },
            toDel() {
                var self = this;
                API.delKeyword(self.id).then((res) => {
                    self.$message.success("删除成功");
                    self.dialogDel = false;
                    self.getKeywords(self.current, self.size);
                }).catch(err => {
                    console.log(err);
                });
            },

            handleEdit(index, row) {
                var self = this;
                if (self.permissionData.includes("keywordEdit")) {
                    self.dialogKeyword = true;
                } else {
                    self.$message.warning("无权操作");
                }
                self.form = {
                    count: row.count,
                    keyword: row.keyword
                }
            },
            // 选择搜索方式
            //   changeType(val) {
            //     var self = this;
            //     self.typeDisabled = true;
            //     self.userId = "";
            //   },
            //   search() {
            //     var self = this;
            //     self.loading = true;
            //     if (self.type == 1) {
            //       var user_id = self.userId;
            //       self.getWxUser(self.current, self.size, user_id, nickname);
            //     } else {
            //       var nickname = self.userId;
            //       self.getWxUser(self.current, self.size, user_id, nickname);
            //     }
            //   },

        },
    }
</script>

<style lang="scss" scoped>

</style>