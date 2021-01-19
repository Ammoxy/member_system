<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addActivity">添加活动</el-button>
            </div>
            <!-- <div class="btn">
                <el-input v-model="keyword" placeholder="请输入商品名称" class="input-with-select"
                    @keyup.enter.native="search(keyword)">
                    <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
                </el-input>
            </div> -->
        </div>

        <el-dialog :visible.sync="dialogActivity" title="添加商品" @close="close" width="1200px">
            <el-form label-width="150px" :model="activityInfo">
                <el-form-item label="是否上架">
                    <el-radio-group v-model="activityInfo.on_shelf">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="折扣">
                    <el-input v-model="activityInfo.discount" placeholder="（格式：75折 = 0.75）" style="width: 400px">
                    </el-input>
                </el-form-item>
                <el-form-item label="活动结束时间">
                    <el-date-picker v-model="activityInfo.date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"
                        style="width: 400px">
                    </el-date-picker>
                    <!-- <el-input v-model="activityInfo.date"></el-input> -->
                </el-form-item>
                <el-form-item label="商品">
                    <el-select v-model="activityInfo.good_id" multiple placeholder="请选择商品(可多选)" @change="classifyChange"
                        style="width: 400px">
                        <el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="图片">
                    <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="1"
                        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
                        :file-list='files' :on-exceed="handleExceed" list-type="picture-card" :on-change="handleChange"
                        :auto-upload="true">
                        <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="背景">
                    <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="1"
                        :before-upload="beforeAvatarUpload1" :on-remove="handleRemove1" :on-exceed="handleExceed1"
                        :auto-upload="true" :on-change="handleChange1" multiple list-type="picture-card"
                        :file-list='fileLists' :on-success="handleAvatarSuccess1">
                        <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="newActivity">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>

        <!-- 表格数据 -->
        <el-table :data="tableData" empty-text="暂无数据" border :header-cell-style="{ background: '#f0f0f0' }"
            max-height="620">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="img" label="图片" width="150">
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
            </el-table-column>
            <el-table-column prop="background" label="背景图片" width="150">
                <template slot-scope="scope">
                    <div v-if="scope.row.background">
                        <el-popover placement="top-start" title trigger="click">
                            <img :src="scope.row.background" style="max-width: 800px; max-height: 800px" />
                            <img slot="reference" :src="scope.row.background"
                                style="max-width: 180px; max-height: 80px" />
                        </el-popover>
                    </div>
                    <div v-else>
                        <span>--暂无图片--</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="on_shelf" label="是否上架">
                <template slot-scope="scope">
                    <div v-if="scope.row.on_shelf == 1">
                        <span>是</span>
                    </div>
                    <div v-if="scope.row.on_shelf == 2">
                        <span>否</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="discount" label="折扣（75折 = 0.75）" width="180"></el-table-column>
            <el-table-column prop="date" label="活动结束日期" width="180"></el-table-column>
            <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleDetail(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
            <el-pagination @current-change="currentChange" :current-page.sync="current"
                :page-sizes="[10, 20, 30, 40, 50]" :page-size="size" layout="sizes, prev, pager, next, jumper"
                :total="total" @size-change="sizeChange">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import API from "@/api/index.js";

    export default {
        inject: ["reload"],

        data() {
            return {
                loading: true,

                tableData: [], // 表格数据
                current: 1, // 分页
                size: 10,
                total: 0,

                dialogActivity: false,
                activityInfo: {
                    img: '',
                    background: '',
                    good_id: [],
                    discount: '',
                    date: '',
                    on_shelf: 1,
                },
                fileLists: [],
                files: [],
                goodsList: [],
                permissionData: []
            };
        },
        mounted() {
            this.getList(this.current, this.size);
            this.getGoods();
            this.permissionData = localStorage.getItem("permissions").split(",");
        },
        methods: {
            // 表格数据
            getList(cur, list) {
                var self = this;
                API.activities(cur, list).then(res => {
                    self.loading = false;
                    self.tableData = res.result.data;
                    self.total = res.result.total;
                }).catch(err => {
                    self.loading = false;
                })
            },
            getGoods() {
                var self = this;
                API.goods(1, 50).then(res => {
                    res.result.data.forEach(item => {
                        if (item.on_shelf == 1) {
                            self.goodsList.push(item);
                        }
                    })
                })
            },
            classifyChange(val) {
                // console.log(val);
                var self = this;
                self.activityInfo.good_id = val;
            },
            // 分页
            currentChange(val) {
                var self = this;
                self.current = val;
                self.loading = true;
                self.getList(val, self.size);
            },
            // 每页几条
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                self.current = 1;
                self.getList(1, val);
            },

            addActivity() {
                var self = this;
                if (self.permissionData.includes("activityAdd")) {
                    self.dialogActivity = true;
                    self.activityInfo = {
                        img: '',
                        background: '',
                        good_id: [],
                        discount: '',
                        date: '',
                        on_shelf: 1,
                    };
                    if (self.$refs.upload) {
                        self.$refs.upload.clearFiles();
                    }
                } else {
                    self.$message.warning("无权操作");
                }
            },

            newActivity() {
                var self = this;
                if (self.activityInfo.img && self.activityInfo.background && self.activityInfo.good_id && self
                    .activityInfo.discount && self.activityInfo.date) {
                    API.createActivity(self.activityInfo).then(res => {
                        if (res.code == 10000) {
                            self.$message.success(res.toast);
                            self.dialogActivity = false;
                            self.activityInfo = {};
                            self.getList(self.current, self.size);
                        }
                    })
                } else {
                    self.$message.warning('请填写完整信息');
                }
            },

            handleDetail(index, row) {
                var self = this;
                // self.id = row.id;
                var arr = [];
                console.log(row);
                if (self.permissionData.includes("kactivityEdit")) {
                    self.dialogActivity = true;
                    row.goods.forEach(item => {
                        arr.push(item.id)
                    })
                    self.activityInfo = {
                        img: row.img,
                        background: row.background,
                        good_id: arr,
                        discount: row.discount,
                        date: row.date,
                        on_shelf: row.on_shelf,
                        id: row.id
                    }

                    let bgStr = self.activityInfo.background.split(",");
                    bgStr.forEach(item => {
                        let obj = new Object();
                        obj.url = item;
                        self.fileLists.push(obj);
                    });

                    let urlStr = self.activityInfo.img.split(",");
                    urlStr.forEach(item => {
                        let obj = new Object();
                        obj.url = item;
                        self.files.push(obj);
                    });
                } else {
                    self.$message.warning("无权操作");
                }
            },

            close() {
                var self = this;
                self.fileLists = [];
                self.files = [];
            },

            handleRemove(file, fileList) {
                //移除图片
                var self = this;
                self.files = fileList
                self.activityInfo.img = ''
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
                self.activityInfo.img = file.response.data;
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

            handleRemove1(file, fileList) {
                //移除图片
                var self = this;
                self.files = fileList
                self.activityInfo.background = ''
            },
            beforeAvatarUpload1(file) {
                //文件上传之前调用做一些拦截限制
                const isLt2M = 300 * 1024;
                if (!isLt2M) {
                    this.$message.error("上传图片大小不能超过300KB");
                }
                return isLt2M;
            },
            handleAvatarSuccess1(res, file) {
                //图片上传成功
                var self = this;
                self.activityInfo.background = file.response.data;
            },
            handleExceed1(files, fileList) {
                //图片上传超过数量限制
                var self = this;
                self.$message.error("上传图片不能超过1张!");
            },

            handleChange1(file, fileList) {
                var self = this;
                self.fileLists = fileList;
            },
        },
    };
</script>

<style>
</style>

<style scoped>
    .service {
        display: flex;
        flex-wrap: wrap;
    }

    .service-item {
        margin: 10px;
        padding: 0 10px;
    }

    .upload-btn {
        margin-top: 10px;
    }

    .up-img {
        display: inline-block;
        margin: 10px;
    }

    .pic-box {
        max-width: 100%;
        height: 200px;
    }

    .auto-img {
        max-width: 100%;
        height: 100px;
        margin: 10px 0 10px 10px;
    }

    .tips {
        margin-bottom: 20px;
        color: red;
    }

    .bi {
        display: inline;
    }

    .wth {
        width: 100px;
    }
</style>