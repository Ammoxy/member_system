<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-select v-model="orderStatus" placeholder="请选择订单状态" @change="stateChange">
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="btn">
                <el-input v-model="keyword" placeholder="请输入订单号" class="input-with-select"
                    @keyup.enter.native="search(keyword)">
                    <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
                    <el-button slot="append" icon="el-icon-refresh" @click="refresh"></el-button>
                </el-input>
            </div>
        </div>
        <el-table :data="tableData" border :header-cell-style="{ background: '#f0f0f0' }" max-height="620">
            <el-table-column prop="id" label="订单ID"></el-table-column>
            <el-table-column prop="express_no" label="快递订单号"></el-table-column>
            <el-table-column prop="logistic" label="物流"></el-table-column>
            <el-table-column prop="good_id" label="商品ID"></el-table-column>
            <el-table-column prop="userGood.name" label="商品名称"></el-table-column>
            <el-table-column prop="userGood.img" label="缩略图">
                <template slot-scope="scope">
                    <div v-if="scope.row.userGood.img">
                        <el-popover placement="top-start" title trigger="click">
                            <img :src="scope.row.userGood.img" style="max-width: 800px; max-height: 800px" />
                            <img slot="reference" :src="scope.row.userGood.img"
                                style="max-width: 180px; max-height: 80px" />
                        </el-popover>
                    </div>
                    <div v-else>
                        <span>--暂无图片--</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="no" label="支付订单号"></el-table-column>
            <el-table-column prop="count" label="数量"></el-table-column>
            <el-table-column prop="money" label="商品总金额"></el-table-column>
            <el-table-column prop="freight" label="运费"></el-table-column>
            <!-- <el-table-column prop="real_money" label="实付金额"></el-table-column> -->
            <el-table-column prop="is_fetch" label="收货方式">
                <template slot-scope="scope">
                    <div v-if="scope.row.is_fetch == 1">
                        <span>物流配送</span>
                    </div>
                    <div v-if="scope.row.is_fetch == 2">
                        <span>到店自取</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="订单状态">
                <template slot-scope="scope">
                    <div v-if="scope.row.status == 1">
                        <span>待支付</span>
                    </div>
                    <div v-if="scope.row.status == 2">
                        <span>待发货</span>
                    </div>
                    <div v-if="scope.row.status == 3">
                        <span>待收货</span>
                    </div>
                    <div v-if="scope.row.status == 4">
                        <span>已收货</span>
                    </div>
                    <div v-if="scope.row.status == 5">
                        <span>退款</span>
                    </div>
                    <div v-if="scope.row.status == 6">
                        <span>订单取消</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="120px">
                <template slot-scope="scope">
                    <el-dropdown>
                        <el-button type="primary">
                            操作
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)"
                                    v-if="scope.row.is_fetch == 1">
                                    配送信息
                                </el-button>
                                <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)"
                                    v-if="scope.row.is_fetch == 2">
                                    自提信息
                                </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleLogistics(scope.$index, scope.row)">
                                    物流信息
                                </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleShipments(scope.$index, scope.row)">
                                    发货
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

        <el-dialog title="收货信息" :visible.sync="dialogOrder" width="50%" center>
            <div class="box">
                <el-card class="box-card" v-if="is_fetch == 1">
                    <div slot="header" class="clearfix">
                        <span>配送信息</span>
                    </div>
                    <div class="text item">
                        {{'订单ID: ' + orderData.order_id }}
                    </div>
                    <div class="text item">
                        {{'姓名: ' + orderData.name }}
                    </div>
                    <div class="text item">
                        {{'手机: ' + orderData.phone }}
                    </div>
                    <div class="text item">
                        {{'地址: ' + orderData.address }}
                    </div>
                    <div class="text item">
                        {{'创建时间: ' + orderData.created_at }}
                    </div>
                </el-card>
                <el-card class="box-card" v-if="is_fetch == 2">
                    <div slot="header" class="clearfix">
                        <span>到店自取信息</span>
                    </div>
                    <div class="text item">
                        {{'订单ID: ' + orderData.order_id }}
                    </div>
                    <div class="text item">
                        {{'核销码: ' + orderData.code }}
                    </div>
                    <div class="text item">
                        {{'商家名称: ' + merchant_name }}
                    </div>
                    <div class="text item">
                        {{'商家地址: ' + merchant_address }}
                    </div>
                    <div class="text item">
                        {{'创建时间: ' + orderData.created_at }}
                    </div>
                </el-card>
            </div>
            <!-- <div class="block">
                <el-pagination @current-change="orderCurrentChange" :current-page.sync="orderCurrent"
                    :page-sizes="[10, 20, 30, 40, 50]" :page-size="orderSize" layout="sizes, prev, pager, next, jumper"
                    :total="orderTotal" @size-change="orderSizeChange"></el-pagination>
            </div> -->
        </el-dialog>

        <!-- 发货 -->
        <el-dialog :visible.sync="dialogShipments" title="发货" width="50%" align="center" :close-on-click-modal="false">
            <el-form :model="issueForm" label-width="50px">
                <el-form-item label="用户">
                    <el-input placeholder="请输入快递订单号" v-model="issueForm.orderNum" class="input-with-select input">
                    </el-input>
                </el-form-item>
                <el-form-item label="物流">
                    <div class="ipt-box">
                        <el-input v-model="logistics_name" placeholder="请输入物流名" class="input-with-select"
                            @keyup.enter.native="searchLogistics(logistics_name)"
                            style="width: 300px; margin-right: 20px">
                            <el-button slot="append" icon="el-icon-search" @click="searchLogistics(logistics_name)">
                            </el-button>
                        </el-input>
                        <el-select v-model="issueForm.logistics_id" filterable placeholder="请选择物流"
                            style="width: 500px;">
                            <el-option v-for="item in logisticsData" :label="item.name" :value="item.id" :key="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-form>
            <span>
                <el-button type="primary" @click="toConfirm">确定</el-button>
                <el-button type="danger" @click="dialogShipments = false">取消</el-button>
            </span>
        </el-dialog>

        <el-dialog title="物流信息" :visible.sync="dialogLogistics" width="50%" center>
            <div class="box">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>物流信息</span>
                    </div>
                    <div class="text item">
                        {{'物流运单号: ' + logisticsList.LogisticCode }}
                    </div>
                    <div class="text item">
                        {{'快递公司编号: ' + logisticsList.ShipperCode }}
                    </div>
                    <div class="text item" v-if="logisticsList.State == 0">
                        {{'物流状态: ' + '暂无物流信息' }}
                    </div>
                    <div class="text item" v-if="logisticsList.State == 1">
                        {{'物流状态: ' + '已取件' }}
                    </div>
                    <div class="text item" v-if="logisticsList.State == 2">
                        {{'物流状态: ' + '在途中' }}
                    </div>
                    <div class="text item" v-if="logisticsList.State == 3">
                        {{'物流状态: ' + '已签收' }}
                    </div>
                </el-card>
                <el-timeline>
                    <el-timeline-item v-for="(item, index) in logisticsList.Traces" :key="index"
                        :timestamp="item.AcceptTime">
                        {{item.AcceptStation}}
                    </el-timeline-item>
                </el-timeline>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import API from "@/api/index.js";

    export default {
        inject: ["reload"],

        data() {
            return {
                loading: true,
                tableData: [],

                current: 1, // 分页
                total: 0,
                size: 10,

                name: '',
                is_fetch: '',
                order_id: '',
                dialogOrder: false,
                orderData: [],
                merchant_name: '',
                merchant_address: '',
                // orderCurrent: 1, // 分页
                // orderTotal: 0,
                // orderSize: 10,

                dialogShipments: false,

                orderStatus: '',
                statusList: [{
                        value: 0,
                        label: '全部'
                    }, {
                        value: 1,
                        label: "待支付",
                    },
                    {
                        value: 2,
                        label: "待发货",
                    },
                    {
                        value: 3,
                        label: "待收货",
                    },
                    {
                        value: 4,
                        label: "已收货",
                    },
                    {
                        value: 5,
                        label: "取消",
                    },
                ],

                keyword: '',
                issueForm: {
                    orderNum: '',
                    logistics_id: ''
                },
                logistics_name: '',
                logisticsData: [],
                logisticsList: [],
                logisticsText: '',
                dialogLogistics: false

            }
        },

        mounted() {
            this.permissionData = localStorage.getItem("permissions").split(",");
            this.getOrderList(this.current, this.size);
        },

        methods: {
            searchLogistics() {
                var self = this;
                const loading = this.$loading({
                    lock: true,
                    text: 'loading...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                API.logistics(1, 10, self.logistics_name).then(res => {
                    self.logisticsData = res.result.data;
                    loading.close()
                }).catch(err => {
                    loading.close()
                })
            },
            getOrderList(cur, list, status, no, good_id) {
                var self = this;
                self.loading = true;
                API.userOrder(cur, list, status, no, good_id)
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
                if (self.orderStatus) {
                    self.getOrderList(val, self.size, self.orderStatus);
                } else if (self.keyword) {
                    self.getOrderList(val, self.size, self.orderStatus, self.keyword);
                } else {
                    self.getOrderList(val, self.size);
                }
            },
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                self.current = 1;
                if (self.orderStatus) {
                    self.getOrderList(1, val, self.orderStatus);
                } else if (self.keyword) {
                    self.getOrderList(1, val, self.orderStatus, self.keyword);
                } else {
                    self.getOrderList(1, val);
                }
            },

            stateChange(val) {
                var self = this;
                self.loading = true;
                self.current = 1;
                self.keyword = ''
                if (self.orderStatus == 0) {
                    self.getOrderList(self.current, self.size);
                } else {
                    self.getOrderList(self.current, self.size, self.orderStatus);
                }
            },

            search() {
                var self = this;
                self.loading = true;
                self.current = 1;
                self.orderStatus = ''
                self.getOrderList(self.current, self.size, self.orderStatus, self.keyword);
            },

            handleDetail(index, row) {
                var self = this;
                self.is_fetch = row.is_fetch;
                self.order_id = row.id;
                if (self.permissionData.includes("distributionMer")) {
                    self.dialogOrder = true;
                    if (row.is_fetch == 1) {
                        API.shopingpInfo(self.order_id, 2).then(res => {
                            console.log(self.orderData);
                            self.orderData = res.result;
                            self.$message.success("获取数据成功");
                        })
                    } else if (row.is_fetch == 2) {
                        API.recaptionInfo(self.order_id, 2).then(res => {
                            self.orderData = res.result;
                            self.merchant_name = res.result.merchant.name;
                            self.merchant_address = res.result.merchant.address
                            console.log(self.orderData.merchant.name);

                            self.$message.success("获取数据成功");
                        })
                    }
                } else {
                    self.$message.warning("无权操作");
                }

            },


            handleShipments(index, row) {
                var self = this;
                self.order_id = row.id;
                self.logistics_id = row.logistics_id;
                if (self.permissionData.includes("sendGoodMer")) {
                    if (row.status == 2) {
                        self.dialogShipments = true;
                    } else {
                        self.$message.warning("无效操作");
                    }
                } else {
                    self.$message.warning("无权操作");
                }

            },

            inputOrderNum(val) {
                var self = this;
                self.orderNum = val;
            },

            toConfirm() {
                var self = this;
                var orderNum = self.issueForm.orderNum;
                var logistics_id = self.issueForm.logistics_id;
                if (orderNum && logistics_id) {
                    API.confirmShipments(self.order_id, 2, orderNum, logistics_id).then(res => {
                        self.$message.success("发货成功");
                        self.dialogShipments = false;
                        self.getOrderList(self.current, self.size);
                    })
                } else {
                    self.$message.warning("请输入订单号");
                }
            },

            // 物流信息
            handleLogistics(index, row) {
                var self = this;
                var orderNum = row.express_no;
                var logistics_id = row.logistics_id;
                if (self.permissionData.includes("logisticsGoodMer")) {
                    if (logistics_id > 0) {
                        self.dialogLogistics = true;
                        API.OrderInquire(orderNum, logistics_id).then(res => {
                            self.logisticsList = res.result;
                            self.logisticsText = res.result.Reason
                        })
                    } else {
                        self.$message.warning('暂无物流信息');
                    }

                } else {
                    self.$message.warning("无权操作");
                }
            },

            // 刷新
            refresh() {
                this.reload();
            },

        },
    }
</script>

<style lang="scss" scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .input {
        margin-bottom: 20px;
    }

    .ipt-box {
        display: flex;
    }
</style>