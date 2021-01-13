<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <!-- <div class="handle-box">
            <div class="btn">
                <el-input placeholder="请输入用户ID/昵称" v-model="userId" @keyup.enter.native="search(userId)"
                    class="input-with-select">
                    <el-select v-model="type" placeholder="请选择搜索方式" slot="prepend" @change="changeType"
                        style="width: 150px">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search(userId)"></el-button>
                </el-input>
            </div>
        </div> -->
        <el-table :data="tableData" border :header-cell-style="{ background: '#f0f0f0' }" max-height="620">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="identity" label="身份证"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="merchant.name" label="部门"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="money" label="总佣金"></el-table-column>
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
            <!-- <el-table-column prop="nickname" label="昵称"></el-table-column> -->
            <!-- <el-table-column prop="name" label="名称"></el-table-column> -->
            <!-- <el-table-column prop="sex" label="性别" width="120px">
                <template slot-scope="scope">
                    <span v-text="scope.row.sex == 1 ? '男' : '女'"></span>
                </template>
            </el-table-column> -->
            <!-- <el-table-column prop="phone" label="手机号码"></el-table-column> -->
            <!-- <el-table-column prop="mandate.created_at" label="是否已授权">
        <template slot-scope="scope">
          <span v-text="scope.row.mandate == null ? '未授权' : '已授权'"></span>
        </template>
      </el-table-column> -->
            <!-- <el-table-column prop="mandate.created_at" label="授权时间"></el-table-column> -->
            <el-table-column label="操作" width="120px">
                <template slot-scope="scope">
                    <el-dropdown>
                        <el-button type="primary">
                            操作
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" v-if="scope.row.state == 1"
                                    @click="handleAudit(scope.$index, scope.row)">审核</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
            <el-pagination @current-change="currentChange" :current-page.sync="current" :page-size="size"
                layout="sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange"></el-pagination>
        </div>

        <!-- 审核 -->
        <el-dialog :visible.sync="dialogAudit" title="审核" width="20%" align="center">
            <div style="font-size: 20px; margin-bottom: 30px">是否通过审核</div>
            <span>
                <el-button type="primary" @click="toAudit">通过</el-button>
                <el-button type="danger" @click="unAudit">不通过</el-button>
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

                userId: "", // 搜索用户id
                nickname: '',
                dialogAudit: false,
                id: ''
            }
        },

        mounted() {
            this.permissionData = localStorage.getItem("permissions").split(",");
            this.getList(this.current, this.size);
        },

        methods: {
            getList(currentPage, perPage, name, state) {
                var self = this;
                API.healthUserList(currentPage, perPage, name, state).then(res => {
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

            handleAudit(index, row) {
                var self = this;
                self.dialogAudit = true;
                self.id = row.id;
            },
            fucAudit(id, state) {
                var self = this;
                API.healthCheck(id, state).then((res) => {
                    console.log(res);
                    if (res.code = 10000) {
                        self.$message.success("审核");
                        self.getList(self.current, self.size);
                        self.dialogAudit = false;
                    }

                });
            },
            toAudit() {
                var self = this;
                self.fucAudit(self.id, 2);
            },
            unAudit() {
                var self = this;
                self.fucAudit(self.id, 3);
            },

        }
    }
</script>

<style lang="scss" scoped>

</style>