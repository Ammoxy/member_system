<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-input v-model="keyword" placeholder="请输入名称" class="input-with-select"
                    @keyup.enter.native="search(keyword)">
                    <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
                </el-input>
            </div>
        </div>
        <el-table :data="tableData" border :header-cell-style="{ background: '#f0f0f0' }" max-height="620">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="user.avatarUrl" label="头像">
                <template slot-scope="scope">
                    <div v-if="scope.row.user.avatarUrl">
                        <el-popover placement="top-start" title trigger="click">
                            <img :src="scope.row.user.avatarUrl" style="max-width: 800px; max-height: 800px" />
                            <img slot="reference" :src="scope.row.user.avatarUrl"
                                style="max-width: 180px; max-height: 80px" />
                        </el-popover>
                    </div>
                    <div v-else>
                        <span>--暂无图片--</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="user.nickname" label="昵称"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="health_grade.name" label="专员等级"></el-table-column>
            <el-table-column prop="identity" label="身份证" width="180px"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="merchant.name" label="部门"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <!-- <el-table-column prop="money" label="总佣金"></el-table-column> -->
            <el-table-column prop="state" width="120px" label="审核状态">
                <template slot-scope="scope">
                    <div v-if="scope.row.state == 1">
                        <span>待审核</span>
                    </div>
                    <div v-if="scope.row.state == 2">
                        <span style="color: green">已通过</span>
                    </div>
                    <div v-if="scope.row.state == 3">
                        <span style="color: red">未通过</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="250px">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleAudit(scope.$index, scope.row)">通过审核</el-button>
                    <el-button size="mini" type="danger" @click="handleFailAudit(scope.$index, scope.row)">不通过审核
                    </el-button>
                    <!-- <el-dropdown>
                        <el-button type="primary">
                            操作
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" v-if="scope.row.state == 1"
                                    @click="handleAudit(scope.$index, scope.row)">审核</el-button>

                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleQRcode(scope.$index, scope.row)">
                                    查看二维码
                                </el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                </template>

            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
            <el-pagination @current-change="currentChange" :current-page.sync="current" :page-size="size"
                layout="sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange"></el-pagination>
        </div>

        <!-- 审核 通过 -->
        <el-dialog :visible.sync="dialogAudit" title="审核" width="20%" align="center">
            <div style="font-size: 20px; margin-bottom: 30px">是否通过审核</div>
            <span>
                <el-button type="primary" @click="toAudit">确定</el-button>
                <el-button type="danger" @click="dialogAudit = false">取消</el-button>
            </span>
        </el-dialog>

        <!-- 审核 不通过 -->
        <el-dialog :visible.sync="dialogFailAudit" title="审核" width="20%" align="center">
            <div style="font-size: 20px; margin-bottom: 30px">是否不通过审核</div>
            <span>
                <el-button type="primary" @click="unAudit">确定</el-button>
                <el-button type="danger" @click="dialogFailAudit = false">取消</el-button>
            </span>
        </el-dialog>

        <!-- 二维码 -->
        <!-- <el-dialog :visible.sync="dialogQRcode" title="二维码" width="50%" align="center">
            <img :src="qr_code" alt="">
        </el-dialog> -->
    </div>
</template>

<script>
    import API from "@/api/index.js";

    export default {
        data() {
            return {
                loading: true,
                tableData: [],

                current: 1, // 分页
                total: 0,
                size: 10,

                userId: "", // 搜索用户id
                nickname: '',
                dialogAudit: false,
                dialogFailAudit: false,
                // dialogQRcode: false,
                id: '',
                // qr_code: '',
                keyword: ''
            }
        },

        mounted() {
            this.permissionData = localStorage.getItem("permissions").split(",");
            this.getList(this.current, this.size);
        },

        methods: {
            getList(currentPage, perPage, name, state) {
                var self = this;
                API.healthApplyList(currentPage, perPage, name, state).then(res => {
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
                self.getList(self.current, self.size, self.keyword);
            },

            handleAudit(index, row) {
                var self = this;
                if (self.permissionData.includes("attacheAudit")) {
                    if (row.state == 1) {
                        self.dialogAudit = true;
                    } else {
                        self.$message.warning("该用户已审核, 请勿重复操作");
                    }
                } else {
                    self.$message.warning("无权操作");
                }
                self.id = row.id;
            },

            toAudit() {
                var self = this;
                API.healthCheck(self.id, 2).then((res) => {
                    // console.log(res);
                    if (res.code = 10000) {
                        self.$message.success("审核成功");
                        self.getList(self.current, self.size);
                        self.dialogAudit = false;
                    }
                });
            },
            unAudit() {
                var self = this;
                API.healthCheck(self.id, 3).then((res) => {
                    // console.log(res);
                    if (res.code = 10000) {
                        self.$message.success("审核成功");
                        self.getList(self.current, self.size);
                        self.dialogFailAudit = false;
                    }
                });
            },

            // handleQRcode(index, row) {
            //     var self = this;
            //     if (row.qr_code) {
            //         self.dialogQRcode = true;
            //         self.qr_code = row.qr_code
            //     } else {
            //         self.$message.warning("暂无二维码");
            //     }
            // },

            handleFailAudit(index, row) {
                var self = this;
                self.id = row.id;
                if (self.permissionData.includes("attacheUnAudit")) {
                    if (row.state == 1) {
                        self.dialogFailAudit = true;
                    } else {
                        self.$message.warning("该用户已审核, 请勿重复操作");
                    }
                } else {
                    self.$message.warning("无权操作");
                }

            },

        }
    }
</script>

<style lang="scss" scoped>

</style>