<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addClassify">添加分类</el-button>
            </div>
            <div class="btn">
                <!-- <span>分类:</span> -->
                <el-select v-model="classifyState" placeholder="请选择分类" @change="changeClassify">
                    <el-option v-for="item in classifyList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                <el-button slot="append" icon="el-icon-refresh" @click="refresh"></el-button>
            </div>
        </div>
        <el-table :data="tableDate" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="sort" label="排序"></el-table-column>
            <el-table-column prop="name" label="商品类型"></el-table-column>
            <el-table-column prop="type" label="类型级别">
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
            </el-table-column>
            <el-table-column prop="img" label="分类图标">
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
            <el-table-column prop="is_show" label="是否显示">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.is_show" active-color="#2a9f93"
                        @change="notifyChange(scope.row.is_show, scope.$index, scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="updated_at" label="更新时间"></el-table-column>
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

        <el-dialog :visible.sync="dialogClassify" title="添加分类" width="1000px" @close="close">
            <el-form label-width="100px" :model="classifyInfo">
                <el-form-item label="名称">
                    <el-input v-model="classifyInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="上级">
                    <el-select v-model="classifyInfo.parent_id" placeholder="请选择上级(不选为添加一级分类)" @change="parentChange"
                        style="margin-right: 10px; width: 300px" clearable>
                        <el-option v-for="item in parentList" :key="item.id" :label="item.name" :value="item.id"
                            :disabled="item.type == 3">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否显示分类">
                    <el-radio-group v-model="classifyInfo.is_show">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="classifyInfo.sort"></el-input>
                </el-form-item>
                <el-form-item label="图片" v-if="have_img">
                    <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="1"
                        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
                        :on-exceed="handleExceed" :auto-upload="true" :on-change="handleChange" list-type="picture-card"
                        :file-list='files'>
                        <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="newClassify">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog :visible.sync="dialogDel" title="删除分类" width="20%" align="center" :close-on-click-modal="false">
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
        inject: ["reload"],

        data() {
            return {
                loading: true,
                tableDate: [],
                dialogClassify: false,
                dialogDel: false,
                classifyInfo: {
                    name: '',
                    img: '',
                    is_show: 1,
                    parent_id: '',
                    type: '',
                    sort: 0
                },
                files: [],

                current: 1,
                size: 10,
                total: 0,
                parentList: [],
                typeList: [],
                is_show: false,
                classifyState: '',
                state: '',
                classifyList: [{
                        value: 1,
                        label: "一级分类",
                    },
                    {
                        value: 2,
                        label: "二级分类",
                    },
                    {
                        value: 3,
                        label: "三级分类",
                    },
                ],
                have_img: false
            }
        },

        mounted() {
            this.getClassify(this.current, this.size);
            this.getClassifyList();
            this.permissionData = localStorage.getItem("permissions").split(",");
        },

        methods: {
            getClassify(cur, list, type) {
                var self = this;
                API.classifies(cur, list, type).then(res => {
                    console.log(res);
                    self.loading = false;
                    res.result.data.forEach(item => {
                        // console.log(item);
                        item.is_show == 1 ? item.is_show = true : item.is_show = false;
                    })
                    self.tableDate = res.result.data;
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
                if (self.classifyState) {
                    self.getClassify(val, self.size, self.state);
                } else {
                    self.getClassify(val, self.size);
                }
            },
            // 每页多少条
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                if (self.classifyState) {
                    self.getClassify(1, val, self.state);
                } else {
                    self.getClassify(1, val);
                }
                self.current = 1;
            },

            changeClassify() {
                var self = this;
                // console.log(self.classifyState);
                switch (self.classifyState) {
                    case 1:
                        self.state = 1;
                        self.have_img = false;
                        break;
                    case 2:
                        self.state = 2;
                        self.have_img = false;
                        break;
                    case 3:
                        self.state = 3;
                        self.have_img = true;
                }
            },
            search() {
                var self = this;
                self.current = 1;
                self.loading = true;
                self.getClassify(self.current, self.size, self.state);
            },

            addClassify() {
                var self = this;
                if (self.permissionData.includes("classifyGoodAdd")) {
                    self.dialogClassify = true;
                } else {
                    self.$message.warning("无权操作");
                }
                self.have_img = false;
                if (self.have_img) {
                    self.classifyInfo = {
                        name: '',
                        img: '',
                        is_show: 1,
                        parent_id: '',
                        type: '',
                        sort: 0
                    };
                } else {
                    self.classifyInfo = {
                        name: '',
                        is_show: 1,
                        parent_id: '',
                        type: '',
                        sort: 0
                    };
                }
            },
            close() {
                var self = this;
                self.files = [];
            },
            // 分类
            getClassifyList() {
                var self = this;
                API.seleClassify().then(res => {
                    self.parentList = res.result;
                    if (res.result.length > 0) {
                        res.result.forEach(item => {
                            if (item.type == 1) {
                                item.name = item.name + ' ' + '(一级)'
                            } else if (item.type == 2) {
                                item.name = item.name + ' ' + '(二级)'
                            } else if (item.type == 3) {
                                item.name = item.name + ' ' + '(三级)'
                            }
                        })
                    }

                })
            },
            parentChange(val) {
                var self = this;
                if (val) {
                    let obj = {};
                    obj = this.parentList.find((item) => {
                        return item.id == val;
                    });
                    var type = obj.type;
                    switch (type) {
                        case 1:
                            self.classifyInfo.type = 2;
                            self.have_img = false;
                            self.classifyInfo.img = '';
                            break;
                        case 2:
                            self.classifyInfo.type = 3;
                            self.have_img = true;
                            break;
                    }
                } else {
                    self.classifyInfo.type = 1;
                    self.have_img = false;
                }
                self.classifyInfo.parent_id = val;
            },
            newClassify() {
                var self = this;
                if (self.classifyInfo.parent_id == '') {
                    self.classifyInfo.parent_id = 0;
                    self.classifyInfo.type = 1;
                }
                if (self.classifyInfo.name) {
                    API.createClassify(self.classifyInfo).then(res => {
                        if (res.code == 10000) {
                            self.$message.success("提交成功");
                            self.dialogClassify = false;
                            self.getClassify(self.current, self.size);
                            window.location.reload();
                        }
                    })
                } else {
                    self.$message.warning("请填写分类名称");
                }
            },

            notifyChange(val, index, row) {
                var self = this;
                if (val == true) {
                    self.classifyInfo = {
                        name: row.name,
                        img: row.img,
                        is_show: 1,
                        parent_id: row.parent_id,
                        type: row.type,
                        id: row.id
                    }
                    API.createClassify(self.classifyInfo).then(res => {
                        self.$message.success("提交成功");
                        self.getClassify(self.current, self.size);
                    })
                } else {
                    self.classifyInfo = {
                        name: row.name,
                        img: row.img,
                        is_show: 2,
                        parent_id: row.parent_id,
                        type: row.type,
                        id: row.id,
                        sort: row.sort
                    }
                    API.createClassify(self.classifyInfo).then(res => {
                        self.$message.success("提交成功");
                        self.getClassify(self.current, self.size);
                    })
                }
            },

            handleEdit(index, row) {
                var self = this;
                if (self.permissionData.includes("classifyGoodEdit")) {
                    self.dialogClassify = true;
                } else {
                    self.$message.warning("无权操作");
                }
                if (row.type == 3) {
                    self.have_img = true;
                    if (Number(row.is_show) == 0) {
                        self.classifyInfo = {
                            name: row.name,
                            img: row.img,
                            is_show: 2,
                            parent_id: row.parent_id,
                            type: row.type,
                            id: row.id,
                            sort: row.sort
                        };
                    } else {
                        self.classifyInfo = {
                            name: row.name,
                            img: row.img,
                            is_show: 1,
                            parent_id: row.parent_id,
                            type: row.type,
                            id: row.id,
                            sort: row.sort
                        };
                    }
                    let urlStr = self.classifyInfo.img.split(",");
                    urlStr.forEach(item => {
                        let obj = new Object();
                        obj.url = item;
                        self.files.push(obj);
                    });
                } else {
                    self.have_img = false;
                    if (Number(row.is_show) == 0) {
                        self.classifyInfo = {
                            name: row.name,
                            is_show: 2,
                            parent_id: row.parent_id,
                            type: row.type,
                            id: row.id,
                            sort: row.sort
                        };
                    } else {
                        self.classifyInfo = {
                            name: row.name,
                            is_show: 1,
                            parent_id: row.parent_id,
                            type: row.type,
                            id: row.id,
                            sort: row.sort
                        };
                    }
                }
            },
            handleDelete(index, row) {
                var self = this;
                if (self.permissionData.includes("classifyGoodDel")) {
                    self.dialogDel = true;
                } else {
                    self.$message.warning("无权操作");
                }
                self.id = row.id;
            },
            toDel() {
                var self = this;
                API.delClassify(self.id).then((res) => {
                    self.$message.success("删除成功");
                    self.dialogDel = false;
                    self.getClassify(self.current, self.size);
                });
            },
            // 刷新
            refresh() {
                this.reload();
            },

            handleRemove(file, fileList) {
                //移除图片
                var self = this;
                self.files = fileList
                self.classifyInfo.img = ''
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
                self.classifyInfo.img = file.response.data;
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