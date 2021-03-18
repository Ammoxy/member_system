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
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
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
            <el-table-column prop="money" label="余额"></el-table-column>
            <el-table-column prop="identity" label="身份证"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="merchant.name" label="部门"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <!-- <el-table-column prop="money" label="总佣金"></el-table-column> -->
            <!-- <el-table-column prop="state" width="120px" label="审核状态">
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
            </el-table-column> -->

            <el-table-column label="操作" width="120px">
                <template slot-scope="scope">
                    <el-dropdown>
                        <el-button type="primary">
                            操作
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <!-- <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleQRcode(scope.$index, scope.row)">
                                    详情
                                </el-button>
                            </el-dropdown-item> -->
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleUnderling(scope.$index, scope.row)">
                                    下级会员列表
                                </el-button>
                            </el-dropdown-item>
                            <!-- <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleQRcode(scope.$index, scope.row)">
                                    订单列表
                                </el-button>
                            </el-dropdown-item> -->
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleSource(scope.$index, scope.row)">
                                    佣金来源</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleEmpty(scope.$index, scope.row)">
                                    金额清零
                                </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button size="mini" type="primary"
                                    @click="handleCreateQRcode(scope.$index, scope.row)">
                                    重新生成二维码
                                </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleQRcode(scope.$index, scope.row)">
                                    查看二维码
                                </el-button>
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
        <!-- <el-dialog :visible.sync="dialogAudit" title="审核" width="20%" align="center">
            <div style="font-size: 20px; margin-bottom: 30px">是否通过审核</div>
            <span>
                <el-button type="primary" @click="toAudit">通过</el-button>
                <el-button type="danger" @click="unAudit">不通过</el-button>
            </span>
        </el-dialog> -->

        <!-- 二维码 -->
        <el-dialog :visible.sync="dialogQRcode" title="二维码" width="50%" align="center">
            <img :src="qr_code" alt="">
        </el-dialog>

        <!-- 佣金来源 -->
        <el-dialog title="佣金来源" :visible.sync="dialogRec" width="80%">
            <el-table :data="recDate" empty-text="暂无数据" border :header-cell-style="{ background: '#f0f0f0' }"
                max-height="620">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="order.no" label="支付订单号"></el-table-column>
                <el-table-column prop="money" label="佣金"></el-table-column>
                <el-table-column prop="type" label="类型">
                    <template slot-scope="scope">
                        <div v-if="scope.row.type == 1">
                            <span>普通订单</span>
                        </div>
                        <div v-if="scope.row.type == 2">
                            <span>会员订单</span>
                        </div>

                    </template>
                </el-table-column>
                <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                        <div v-if="scope.row.state == 1">
                            <span>待分佣</span>
                        </div>
                        <div v-if="scope.row.state == 2">
                            <span>已分佣</span>
                        </div>

                    </template>
                </el-table-column>
                <!-- <el-table-column prop="created_at" label="创建时间"></el-table-column> -->
            </el-table>

            <!-- 分页 -->
            <div class="block">
                <el-pagination @current-change="recCurrentChange" :current-page.sync="recCurrent" :page-size="recSize"
                    layout="sizes, prev, pager, next, jumper" :total="recTotal" @size-change="recSizeChange">
                </el-pagination>
            </div>
        </el-dialog>

        <!-- 下级会员 -->
        <el-dialog title="下级会员" :visible.sync="dialogUnderling" width="85%">
            <el-table :data="underlingData" empty-text="暂无数据" border :header-cell-style="{ background: '#f0f0f0' }"
                max-height="620">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="wx_user.avatarUrl" label="头像">
                    <template slot-scope="scope">
                        <div v-if="scope.row.wx_user.avatarUrl">
                            <el-popover placement="top-start" title trigger="click">
                                <img :src="scope.row.wx_user.avatarUrl" style="max-width: 800px; max-height: 800px" />
                                <img slot="reference" :src="scope.row.wx_user.avatarUrl"
                                    style="max-width: 180px; max-height: 80px" />
                            </el-popover>
                        </div>
                        <div v-else>
                            <span>--暂无图片--</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="wx_user.nickname" label="昵称"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <!-- <el-table-column prop="type" label="身份">
                    <template slot-scope="scope">
                        <div v-if="scope.row.type == 1">
                            <span>普通用户</span>
                        </div>
                        <div v-if="scope.row.type == 2">
                            <span>会员</span>
                        </div>
                        <div v-if="scope.row.type == 3">
                            <span>健康专员</span>
                        </div>
                    </template>
                </el-table-column> -->
                <el-table-column prop="phone" label="手机号码"></el-table-column>
                <!-- <el-table-column prop="created_at" label="创建时间" width="200px"></el-table-column> -->
            </el-table>

            <!-- 分页 -->
            <div class="block">
                <el-pagination @current-change="recCurrentChange" :current-page.sync="recCurrent" :page-size="recSize"
                    layout="sizes, prev, pager, next, jumper" :total="recTotal" @size-change="recSizeChange">
                </el-pagination>
            </div>
        </el-dialog>

        <!-- 余额请0 -->
        <el-dialog :visible.sync="dialogEmpty" title="余额清零" width="20%" align="center" :close-on-click-modal="false">
            <div style="font-size: 20px; margin-bottom: 30px;">是否将该用户的余额清零</div>
            <span>
                <el-button type="primary" @click="toEmpty">确定</el-button>
                <el-button type="danger" @click="dialogEmpty = false">取消</el-button>
            </span>
        </el-dialog>

        <!-- 重新生成二维码 -->
        <el-dialog :visible.sync="dialogCreateQRcode" title="重新生成二维码" width="20%" align="center"
            :close-on-click-modal="false">
            <div style="font-size: 20px; margin-bottom: 30px;">是否重新生成二维码</div>
            <span>
                <el-button type="primary" @click="toConfirm">确定</el-button>
                <el-button type="danger" @click="dialogCreateQRcode = false">取消</el-button>
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
                dialogQRcode: false,
                dialogCreateQRcode: false,
                user_id: '',
                qr_code: '',
                keyword: '',
                dialogRec: false,
                recDate: [],
                recCurrent: 1,
                recSize: 10,
                recTotal: 0,
                dialogUnderling: false,
                underlingData: [],
                dialogEmpty: false,
                id: '', // id
            }
        },

        mounted() {
            this.permissionData = localStorage.getItem("permissions").split(",");
            this.getList(this.current, this.size);
        },

        methods: {
            getList(currentPage, perPage, name) {
                var self = this;
                API.healthUserList(currentPage, perPage, name).then(res => {
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

            handleCreateQRcode(idex, row) {
                var self = this;
                if (self.permissionData.includes("createQrcode")) {
                    if (row.qr_code) {
                        self.dialogCreateQRcode = true;
                        self.id = row.id
                    } else {
                        self.$message.warning("暂无二维码");
                    }
                } else {
                    self.$message.warning("无权操作");
                }
            },

            toConfirm() {
                var self = this;
                API.creationQrCode(self.id).then(res => {
                    self.$message.success("操作成功！");
                    self.dialogCreateQRcode = false;
                    self.getList(self.current, self.size)
                })
            },

            handleQRcode(index, row) {
                var self = this;
                if (self.permissionData.includes("qrcode")) {
                    if (row.qr_code) {
                        self.dialogQRcode = true;
                        self.qr_code = row.qr_code
                    } else {
                        self.$message.warning("暂无二维码");
                    }
                } else {
                    self.$message.warning("无权操作");
                }

            },

            getRec(cur, list) {
                var self = this;
                API.commissionSource(cur, list, self.user_id).then(res => {
                    self.$message.success("获取数据成功！");
                    self.recDate = res.result.data;
                    self.recTotal = res.result.total;
                })
            },

            handleSource(index, row) {
                var self = this;
                self.user_id = row.user_id
                if (self.permissionData.includes("commission")) {
                    self.dialogRec = true;
                    self.getRec(self.recCurrent, self.recSize)
                } else {
                    self.$message.warning("无权操作");
                }
            },

            recCurrentChange(val) {
                var self = this;
                self.recCurrent = val;
                self.getRec(val, self.recSize);
            },
            recSizeChange(val) {
                var self = this;
                self.recSize = val;
                self.getRec(1, val);
                self.recCurrent = 1;
            },

            handleUnderling(index, row) {
                var self = this;
                self.user_id = row.user_id;
                if (self.permissionData.includes("underling")) {
                    self.dialogUnderling = true;
                    self.getUnderling(self.recCurrent, self.recSize)
                } else {
                    self.$message.warning("无权操作");
                }

            },

            getUnderling(cur, list) {
                var self = this;
                API.underlingUser(cur, list, self.user_id).then(res => {
                    self.$message.success("获取数据成功！");
                    self.underlingData = res.result.data;
                    self.recTotal = res.result.total;
                })
            },

            handleEmpty(index, row) {
                var self = this;
                if (self.permissionData.includes("emptyMoney")) {
                    self.user_id = row.user_id
                    self.dialogEmpty = true;
                } else {
                    self.$message.warning("无权操作");
                }
            },

            toEmpty() {
                var self = this;
                API.moneyEmpty(self.user_id).then(res => {
                    self.dialogEmpty = false;
                    self.$message.success("操作成功");
                    self.getList(self.current, self.size);
                })
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>