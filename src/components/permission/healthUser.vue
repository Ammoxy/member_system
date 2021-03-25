<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <el-table :data="tableDate" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="money" label="分佣金额"></el-table-column>
            <el-table-column prop="updated_at" label="更新时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
 
        <el-dialog title="编辑" center :visible.sync="dialogUser" :close-on-click-modal="false" width="800px">
            <el-form label-width="80px" :model="form">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="分佣金额">
                    <el-input v-model="form.money"></el-input>
                </el-form-item>
                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="newUser">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
    import API from "@/api/index.js";

    export default {
        data() {
            return {
                loading: true,
                tableDate: [],
                dialogUser: false,
                form: {
                    id: '',
                    name: '',
                    money: ''
                },
                permissionData: []
            }
        },

        mounted() {
            this.getHealthUser();
            this.permissionData = localStorage.getItem("permissions").split(",");
        },

        methods: {
            getHealthUser() {
                var self = this;
                API.healthUser().then(res => {
                    self.loading = false;
                    self.tableDate = res.result;
                }).catch(err => {
                    self.loading = false;
                })
            },
            handleEdit(index, row) {
                var self = this;
                if (self.permissionData.includes("healthUserEdit")) {
                    self.dialogUser = true;
                } else {
                    self.$message.warning("无权操作");
                }
                self.form = {
                    id: row.id,
                    name: row.name,
                    money: row.money
                }
            },
            newUser() {
                var self = this;
                API.createHealthUser(self.form).then(res => {
                    self.dialogUser = false;
                    self.$message.success(res.toast);
                    self.getHealthUser();
                })
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>