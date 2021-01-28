<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addMerchants">添加部门</el-button>
            </div>
            <div class="btn">
                <el-input v-model="merchants_name" placeholder="输入部门名称" class="input-with-select"
                    @keyup.enter.native="search(merchants_name)">
                    <el-button slot="append" icon="el-icon-search" @click="search(merchants_name)"></el-button>
                    <el-button slot="append" icon="el-icon-refresh" @click="refresh"></el-button>
                </el-input>
            </div>
        </div>

        <el-table :data="tableData" border :header-cell-style="{ background: '#f0f0f0' }">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="部门名称"></el-table-column>
            <el-table-column prop="type" label="部门级别">
                <template slot-scope="scope">
                    <div v-if="scope.row.type == 1">
                        <span>一级部门</span>
                    </div>
                    <div v-if="scope.row.type == 2">
                        <span>二级部门</span>
                    </div>
                    <div v-if="scope.row.type == 3">
                        <span>三级部门</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="principal_name" label="负责人姓名"></el-table-column>
            <el-table-column prop="phone" label="负责人手机号"></el-table-column>
            <!-- <el-table-column prop="district.name" label="部门所在区域"></el-table-column> -->
            <el-table-column prop="address" label="详细地址"></el-table-column>
            <!-- <el-table-column prop="img" label="部门logo" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.img">
                        <el-popover placement="top-start" title trigger="click">
                            <img :src="scope.row.img" style="max-width: 800px; max-height: 800px" />
                            <img slot="reference" :src="scope.row.img" style="max-width: 180px; max-height: 80px" />
                        </el-popover>
                    </div>
                    <div v-else>
                        <span>--暂无图片--</span>
                    </div>
                </template>
            </el-table-column> -->
            <el-table-column prop="created_at" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="primary" @click="handleSource(scope.$index, scope.row)">
                        佣金来源</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination @current-change="currentChange" :current-page.sync="current"
                :page-sizes="[10, 20, 30, 40, 50]" :page-size="size" layout="sizes, prev, pager, next, jumper"
                :total="total" @size-change="sizeChange">
            </el-pagination>
        </div>

        <el-dialog :visible.sync="dialogMerchants" title="添加部门" width="1000px">
            <el-form label-width="120px" :model="merchantInfo">
                <el-form-item label="部门名称">
                    <el-input v-model="merchantInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="负责人姓名">
                    <el-input v-model="merchantInfo.principal_name"></el-input>
                </el-form-item>
                <el-form-item label="负责人联系方式">
                    <el-input v-model="merchantInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="上级">
                    <el-select v-model="merchantInfo.parent_id" placeholder="请选择上级(不选为添加一级部门)" @change="parentChange"
                        style="margin-right: 10px; width: 300px" clearable>
                        <el-option v-for="item in parentList" :key="item.id" :label="item.name" :value="item.id"
                            :disabled="item.type == 3">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址经纬度">
                    <div class="address-info">
                        <el-input v-model="merchantInfo.longitude" placeholder="经度显示" style="margin-right: 10px;">
                        </el-input>
                        <el-input v-model="merchantInfo.latitude" placeholder="纬度显示" style="margin-right: 10px;">
                        </el-input>
                    </div>
                </el-form-item>
                <el-form-item label="地图显示">
                    <el-switch v-model="showMap" active-color="#2a9f93">
                    </el-switch>
                    <div v-if="showMap">
                        <v-map @callback="getLoc"></v-map>
                    </div>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="merchantInfo.address"></el-input>
                </el-form-item>
                <el-form-item label="创建账号">
                    <el-switch v-model="showUser" active-color="#2a9f93">
                    </el-switch>
                </el-form-item>
                <el-form-item label="账号" v-if="showUser">
                    <el-input v-model="merchantInfo.username" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="输入密码" v-if="showUser">
                    <el-input v-model="merchantInfo.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="newMerchants">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>

        <!-- 佣金来源 -->
        <el-dialog title="佣金来源" :visible.sync="dialogRec" width="80%">
            <el-table :data="recDate" empty-text="暂无数据" border :header-cell-style="{ background: '#f0f0f0' }"
                max-height="620">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="order.no" label="订单号"></el-table-column>
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
    </div>
</template>

<script>
    import vMap from '@/components/map/map-iframe.vue'
    import API from "@/api/index.js";
    import md5 from "blueimp-md5";
    export default {
        inject: ["reload"],
        components: {
            vMap
        },
        data() {
            return {
                loading: true,
                tableData: [],
                dialogMerchants: false,
                // 分页
                current: 1,
                size: 10,
                total: 0,
                role: localStorage.getItem("role"),
                permissionData: [],
                merchantInfo: {
                    name: '',
                    type: '',
                    address: '',
                    phone: '',
                    principal_name: '',
                    parent_id: '',
                    longitude: '',
                    latitude: '',
                    username: '',
                    password: '',
                },
                stateList: [{
                    label: '是',
                    value: 1
                }, {
                    label: '否',
                    value: 2
                }],
                // files: [],
                // proList: [],
                // cityList: [],
                // areaList: [],
                // pro_id: '',
                merchants_name: '',
                parentList: [],
                showMap: false, // 地图显示
                limit: 10,
                showUser: false,
                dialogRec: false,
                recDate: [],
                recCurrent: 1,
                recSize: 10,
                recTotal: 0,
                merchant_id: '',
                username: localStorage.getItem("username"),
            }
        },

        mounted() {
            this.permissionData = localStorage.getItem("permissions").split(",");
            this.getMerchants(this.current, this.size);
            this.getParent();
        },

        methods: {
            getParent() {
                var self = this;
                API.merchantsSelect()
                    .then((res) => {
                        // console.log(res);
                        self.parentList = res.result;
                    })
            },
            // 获取部门
            getMerchants(cur, list, name) {
                var self = this;
                API.merchants(cur, list, name)
                    .then((res) => {
                        // console.log(res.result.data);
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
                if (self.merchants_name) {
                    self.getMerchants(val, self.size, self.merchants_name);
                } else {
                    self.getMerchants(val, self.size);
                }
            },
            // 每页多少条
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                if (self.merchants_name) {
                    self.getMerchants(1, val, self.merchants_name);
                } else {
                    self.getMerchants(1, val);
                }
                self.current = 1;
            },
            search() {
                var self = this;
                self.current = 1;
                self.loading = true;
                self.getMerchants(self.current, self.size, self.merchants_name);
            },

            // 获取省市区
            // getPro() {
            //     var self = this;
            //     API.areas(1, 0).then(res => {
            //         console.log(res);
            //         self.proList = res.result;
            //     })
            // },
            // getCity(val) {
            //     var self = this;
            //     API.areas(2, val).then(res => {
            //         console.log(res);
            //         self.cityList = res.result;
            //     })
            // },
            // getArea(val) {
            //     var self = this;
            //     API.areas(3, val).then(res => {
            //         self.areaList = res.result;
            //     })
            // },
            // 选择省市区
            // proChange(val) {
            //     var self = this;
            //     self.merchantInfo.city_id = '';
            //     self.merchantInfo.district_id = '';
            //     self.getCity(val);
            // },
            // cityChange(val) {
            //     var self = this;
            //     self.merchantInfo.district_id = '';
            //     self.getArea(val);
            // },

            addMerchants() {
                var self = this;
                if (self.permissionData.includes("merchantAdd")) {
                    self.dialogMerchants = true;
                } else {
                    self.$message.warning("无权操作");
                }
                if (self.showUser) {
                    self.merchantInfo = {
                        name: '',
                        type: '',
                        address: '',
                        phone: '',
                        principal_name: '',
                        parent_id: '',
                        longitude: '',
                        latitude: '',
                        username: '',
                        password: '',
                    };
                } else {
                    self.merchantInfo = {
                        name: '',
                        type: '',
                        address: '',
                        phone: '',
                        principal_name: '',
                        parent_id: '',
                        longitude: '',
                        latitude: '',
                    };
                }

            },
            parentChange(val) {
                var self = this;
                let obj = {};
                obj = this.parentList.find((item) => {
                    return item.id == val;
                });
                var type = obj.type;
                switch (type) {
                    case 1:
                        self.merchantInfo.type = 2;
                        break;
                    case 2:
                        self.merchantInfo.type = 3;
                        break;
                }
                self.merchantInfo.parent_id = val;
            },
            newMerchants() {
                var self = this;
                if (self.merchantInfo.parent_id == '') {
                    self.merchantInfo.parent_id = 0;
                    self.merchantInfo.type = 1;
                }
                if (self.merchantInfo.name && self.merchantInfo.type && self.merchantInfo.address && self.merchantInfo
                    .phone && self.merchantInfo.principal_name) {
                    API.createMerchant(self.merchantInfo).then(res => {
                        if (res.code == 10000) {
                            self.$message.success("提交成功");
                            self.dialogMerchants = false;
                            self.getMerchants(self.current, self.size);
                            self.merchantInfo = {};
                            self.merchantInfo.img = '';
                        }
                    })
                } else {
                    self.$message.warning("请填写完整信息");
                }
            },

            handleEdit(index, row) {
                var self = this;
                if (self.permissionData.includes("merchantEdit")) {
                    self.dialogMerchants = true;
                } else {
                    self.$message.warning("无权操作");
                }
                if (self.showUser) {
                    self.merchantInfo = {
                        name: row.name,
                        type: row.type,
                        address: row.address,
                        phone: row.phone,
                        principal_name: row.principal_name,
                        parent_id: row.parent_id,
                        longitude: row.longitude,
                        latitude: row.latitude,
                        username: row.username,
                        password: row.password,
                        id: row.id
                    };
                } else {
                    self.merchantInfo = {
                        name: row.name,
                        type: row.type,
                        address: row.address,
                        phone: row.phone,
                        principal_name: row.principal_name,
                        parent_id: row.parent_id,
                        longitude: row.longitude,
                        latitude: row.latitude,
                        id: row.id
                    };
                }
            },

            getLoc(mapData) {
                console.log(mapData);
                this.merchantInfo.longitude = mapData.latlng.lng;
                this.merchantInfo.latitude = mapData.latlng.lat;
                this.merchantInfo.address = mapData.poiaddress + mapData.poiname;
                this.showMap = false;
            },

            getRec(cur, list, merchant_id) {
                var self = this;
                API.merCommission(cur, list, merchant_id).then(res => {
                    self.$message.success("获取数据成功！");
                    self.recDate = res.result.data;
                    self.recTotal = res.result.total;
                })
            },

            handleSource(index, row) {
                var self = this;
                self.merchant_id = row.id;
                if (self.permissionData.includes("comSource")) {
                    self.dialogRec = true;
                    if (self.username == 'admin') {
                        self.getRec(self.recCurrent, self.recSize, self.merchant_id)
                    } else {
                        self.getRec(self.recCurrent, self.recSize)
                    }
                } else {
                    self.$message.warning("无权操作");
                }

            },

            recCurrentChange(val) {
                var self = this;
                self.recCurrent = val;
                if (self.username == 'admin') {
                    self.getRec(val, self.recSize, self.merchant_id);
                } else {
                    self.getRec(val, self.recSize);
                }
            },
            recSizeChange(val) {
                var self = this;
                self.recSize = val;
                self.recCurrent = 1;
                if (self.username == 'admin') {
                    self.getRec(1, val, self.merchant_id);
                } else {
                    self.getRec(1, val);
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
    .map {
        border: solid 1px #ccc;
    }

    .address-info {
        display: flex;
    }
</style>