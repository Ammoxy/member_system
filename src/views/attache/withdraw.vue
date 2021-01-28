<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-input placeholder="请输入用户名称" v-model="name" @keyup.enter.native="search(name)"
                    class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search(name)"></el-button>
                </el-input>
            </div>
        </div>
        <el-table :data="tableData" border :header-cell-style="{ background: '#f0f0f0' }" max-height="620">
            <el-table-column prop="health_id" label="健康专员ID"></el-table-column>
            <el-table-column prop="health_user.name" label="姓名"></el-table-column>
            <el-table-column prop="health_user.phone" label="手机"></el-table-column>
            <el-table-column prop="health_user.identity" label="身份证"></el-table-column>
            <el-table-column prop="health_user.money" label="余额"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="state" label="审核状态">
                <template slot-scope="scope">
                    <div v-if="scope.row.state == 1">
                        <span>提交</span>
                    </div>
                    <div v-if="scope.row.state == 2">
                        <span>成功</span>
                    </div>
                    <div v-if="scope.row.state == 3">
                        <span>失败</span>
                    </div>
                    <div v-if="scope.row.state == 4">
                        <span>退回</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="created_at" label="提交时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleAudit(scope.$index, scope.row)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
            <el-pagination @current-change="currentChange" :current-page.sync="current" :page-size="size"
                layout="sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange"></el-pagination>
        </div>

        <!-- 审核 -->
        <el-dialog :visible.sync="dialogAudit" title="审核" width="30%" align="center">
            <div style="font-size: 20px; margin-bottom: 30px">是否通过该用户的提现申请
            </div>
            <!-- <el-input placeholder="请输入不通过审核理由(不通过, 选填)" v-model="remark" class="input-with-select input"
                @change="inputRemark">
            </el-input> -->
            <span>
                <el-button type="primary" @click="toAudit">确定</el-button>
                <el-button type="danger" @click="unAudit">不通过</el-button>
            </span>
        </el-dialog>

        <!-- 审核 -->
        <el-dialog :visible.sync="dialogIpt" title="审核" width="30%" align="center">
            <el-input placeholder="请输入不通过审核理由(选填)" v-model="remark" class="input-with-select input"
                @change="inputRemark">
            </el-input>
            <span>
                <el-button type="primary" @click="toUnAudit">确定</el-button>
                <el-button type="danger" @click="dialogIpt = false">取消</el-button>
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

                current: 1, // 分页
                total: 0,
                size: 10,

                name: '',
                dialogAudit: false,
                id: '',
                remark: '',
                dialogIpt: false
            }
        },

        mounted() {
            this.permissionData = localStorage.getItem("permissions").split(",");
            this.getList(this.current, this.size);
        },

        methods: {
            getList(cur, list, name, state) {
                var self = this;
                self.loading = true;
                API.withdrawsList(cur, list, name, state)
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
                if (self.name) {
                    self.getList(val, self.size, self.name);
                } else {
                    self.getList(val, self.size);
                }
            },
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                if (self.name) {
                    self.getList(1, val, self.name);
                } else {
                    self.getList(1, val);
                }
                self.current = 1;
            },

            search() {
                var self = this;
                self.loading = true;
                self.current = 1;
                self.getList(self.current, self.size, self.name);
            },

            handleAudit(index, row) {
                var self = this;
                self.id = row.id;
                if (self.permissionData.includes("auditWithdraw")) {
                    self.dialogAudit = true;
                } else {
                    self.$message.warning("无权操作");
                }
            },

            toAudit() {
                var self = this;
                API.withdrawsCheck(self.id, 2).then(res => {
                    self.dialogAudit = false;
                    self.getList(self.current, self.size);

                })
            },

            inputRemark(value) {
                var self = this;
                self.remark = value;
            },

            unAudit() {
                var self = this;
                self.dialogIpt = true;
                // API.withdrawsCheck(self.id, 4, self.remark).then(res => {
                //     self.dialogAudit = false;
                //     self.getList(self.current, self.size);
                // })
            },

            toUnAudit() {
                var self = this;
                API.withdrawsCheck(self.id, 4, self.remark).then(res => {
                    self.dialogAudit = false;
                    selfe.dialogIpt = false;
                    self.getList(self.current, self.size);
                })
            },

        },
    }
</script>

<style lang="scss" scoped>
    .input {
        margin-bottom: 20px;
    }
</style>