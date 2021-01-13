<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <!-- <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </div>
    </div> -->

    <el-table :data="tableData" border :header-cell-style="{ background: '#f0f0f0' }">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="角色名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑权限</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogDel" title="删除角色" width="20%" align="center" :close-on-click-modal="false">
      <div style="font-size: 20px; margin-bottom: 30px">是否删除该角色</div>
      <span>
        <el-button type="primary" @click="toDel">删除</el-button>
        <el-button type="danger" @click="dialogDel = false">取消</el-button>
      </span>
    </el-dialog>

    <div class="block">
      <el-pagination @current-change="currentChange" :current-page.sync="current" :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="size" layout="sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange">
      </el-pagination>
    </div>

    <el-dialog title="添加角色" :visible.sync="dialogRole" width="80%" :close-on-click-modal="false">
      <div class="box">
        <el-form :model="form" label-width="120px">
          <el-form-item label="角色名称">
            <el-input v-model="form.name" placeholder="请输入角色名" :disabled="disabledRole"></el-input>
          </el-form-item>
          <el-form-item label="选择权限">
            <div v-if="role == 'admin'">
              <el-checkbox v-model="checkAll" @change="AllChange">全选</el-checkbox>
              <div class="permission" style="width: 1000px;">
                <div class="table">
                  <div class="th" style="width: 20%;">一级菜单</div>
                  <div class="th" style="width: 20%;">二级菜单</div>
                  <div class="th" style="width: 60%;">操作</div>
                </div>
                <el-checkbox-group v-model="form.permissions">
                  <div class="table">
                    <div class="tb" style="width: 20%;">
                      <div class="level1">
                        <el-checkbox label="permission" @change="oneChange">
                          <span style="font-weight: bold;">系统设置</span>
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="tb tr" style="width: 20%;">
                      <div class="level2">
                        <el-checkbox label="roles" @change="oneChange">角色管理</el-checkbox>
                      </div>
                      <div class="level2">
                        <el-checkbox label="manage" @change="oneChange">账号管理</el-checkbox>
                      </div>
                      <div class="level2">
                        <el-checkbox label="healthUser" @change="oneChange">健康专员管理</el-checkbox>
                      </div>
                    </div>
                    <div class="tb set" style="width: 60%;">
                      <div class="level2">
                        <el-checkbox label="roleAdd" @change="oneChange" class="permission-span">新增角色</el-checkbox>
                        <el-checkbox label="roleDel" @change="oneChange" class="permission-span">删除角色</el-checkbox>
                        <el-checkbox label="roleEdit" @change="oneChange" class="permission-span">编辑角色</el-checkbox>
                      </div>
                      <div class="level2">
                        <el-checkbox label="manageAdd" @change="oneChange" class="permission-span">新增账号</el-checkbox>
                        <el-checkbox label="manageDel" @change="oneChange" class="permission-span">删除账号</el-checkbox>
                        <el-checkbox label="manageEdit" @change="oneChange" class="permission-span">编辑账号</el-checkbox>
                        <el-checkbox label="manageResetPwd" @change="oneChange" class="permission-span">重置密码
                        </el-checkbox>
                      </div>
                      <div class="level2">
                        <el-checkbox label="healthUserEdit" @change="oneChange" class="permission-span">编辑</el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="table">
                    <div class="tb" style="width: 20%;">
                      <div class="level1">
                        <el-checkbox label="merchant" @change="oneChange">
                          <span style="font-weight: bold;">部门管理</span>
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="tb tr" style="width: 20%;"></div>
                    <div class="tb set" style="width: 60%;">
                      <div class="level2">
                        <el-checkbox label="merchantAdd" @change="oneChange" class="permission-span">新增商家</el-checkbox>
                        <el-checkbox label="merchantEdit" @change="oneChange" class="permission-span">编辑商家</el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="table">
                    <div class="tb" style="width: 20%;">
                      <div class="level1">
                        <el-checkbox label="information" @change="oneChange">
                          <span style="font-weight: bold;">图文管理</span>
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="tb tr" style="width: 20%;">
                      <el-checkbox label="banner" @change="oneChange" class="permission-span">轮播图管理
                      </el-checkbox>
                      <el-checkbox label="message" @change="oneChange" class="permission-span">资讯管理
                      </el-checkbox>
                    </div>
                    <div class="tb set" style="width: 60%;"></div>
                  </div>
                  <div class="table">
                    <div class="tb" style="width: 20%;">
                      <div class="level1">
                        <el-checkbox label="classify" @change="oneChange">
                          <span style="font-weight: bold;">分类管理</span>
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="tb tr" style="width: 20%;"></div>
                    <div class="tb set" style="width: 60%;"></div>
                  </div>
                  <div class="table">
                    <div class="tb" style="width: 20%;">
                      <div class="level1">
                        <el-checkbox label="commodity" @change="oneChange">
                          <span style="font-weight: bold;">商品管理</span>
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="tb tr" style="width: 20%;">
                      <div class="level2">
                        <el-checkbox label="commodityList" @change="oneChange" class="permission-span">普通商品列表
                        </el-checkbox>
                        <el-checkbox label="memberGoods" @change="oneChange" class="permission-span">会员商品列表
                        </el-checkbox>
                        <el-checkbox label="keyword" @change="oneChange" class="permission-span">关键字
                        </el-checkbox>
                        <el-checkbox label="activity" @change="oneChange" class="permission-span">活动
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="tb set" style="width: 60%;">
                      <div class="level2">
                        <el-checkbox label="commodityAdd" @change="oneChange" class="permission-span">新增普通商品
                        </el-checkbox>
                        <el-checkbox label="commodityEdit" @change="oneChange" class="permission-span">编辑</el-checkbox>
                      </div>
                      <div class="level2">
                        <el-checkbox label="memberGoodsAdd" @change="oneChange" class="permission-span">新增会员商品
                        </el-checkbox>
                        <el-checkbox label="memberGoodsEdit" @change="oneChange" class="permission-span">编辑
                        </el-checkbox>
                      </div>
                      <div class="level2">
                        <el-checkbox label="keywordAdd" @change="oneChange" class="permission-span">新增关键字</el-checkbox>
                        <el-checkbox label="keywordEdit" @change="oneChange" class="permission-span">编辑</el-checkbox>
                        <el-checkbox label="keywordDel" @change="oneChange" class="permission-span">删除</el-checkbox>
                      </div>
                      <div class="level2">
                        <el-checkbox label="activityAdd" @change="oneChange" class="permission-span">新增活动</el-checkbox>
                        <el-checkbox label="kactivityEdit" @change="oneChange" class="permission-span">编辑</el-checkbox>
                        <!-- <el-checkbox label="keywordDel" @change="oneChange" class="permission-span">删除</el-checkbox> -->
                      </div>
                    </div>
                  </div>
                  <div class="table">
                    <div class="tb" style="width: 20%;">
                      <div class="level1">
                        <el-checkbox label="user" @change="oneChange">
                          <span style="font-weight: bold;">用户列表</span>
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="tb tr" style="width: 20%;">
                      <div class="level2">
                        <el-checkbox label="attache" @change="oneChange" class="permission-span">健康专员
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="tb set" style="width: 60%;">
                      <!-- <div class="level2">
                        <el-checkbox label="commodityAdd" @change="oneChange" class="permission-span">新增普通商品
                        </el-checkbox>
                        <el-checkbox label="commodityEdit" @change="oneChange" class="permission-span">编辑</el-checkbox>
                      </div> -->

                    </div>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
            <div v-else>
              <el-checkbox v-model="checkAll" @change="AllChange">全选</el-checkbox>
              <div class="permission" style="width: 1000px;">
                <div class="table">
                  <div class="th" style="width: 20%;">一级菜单</div>
                  <div class="th" style="width: 20%;">二级菜单</div>
                  <div class="th" style="width: 60%;">操作</div>
                </div>
                <el-checkbox-group v-model="form.permissions">
                  <div class="table">
                    <div class="tb" style="width: 20%;">
                      <div class="level1">
                        <el-checkbox label="permission" @change="oneChange">
                          <span style="font-weight: bold;">权限管理</span>
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="tb tr" style="width: 20%;">
                      <div class="level2">
                        <el-checkbox label="roles" @change="oneChange">角色管理</el-checkbox>
                      </div>
                      <div class="level2">
                        <el-checkbox label="manage" @change="oneChange">账号管理</el-checkbox>
                      </div>
                    </div>
                    <div class="tb set" style="width: 60%;">
                      <div class="level2">
                        <el-checkbox label="roleAdd" @change="oneChange" class="permission-span">新增角色</el-checkbox>
                        <el-checkbox label="roleDel" @change="oneChange" class="permission-span">删除角色</el-checkbox>
                        <el-checkbox label="roleEdit" @change="oneChange" class="permission-span">编辑角色</el-checkbox>
                      </div>
                      <div class="level2">
                        <el-checkbox label="manageAdd" @change="oneChange" class="permission-span">新增账号</el-checkbox>
                        <el-checkbox label="manageDel" @change="oneChange" class="permission-span">删除账号</el-checkbox>
                        <el-checkbox label="manageEdit" @change="oneChange" class="permission-span">编辑账号</el-checkbox>
                        <el-checkbox label="manageResetPwd" @change="oneChange" class="permission-span">重置密码
                        </el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="table">
                    <div class="tb" style="width: 20%;">
                      <div class="level1">
                        <el-checkbox label="merchant" @change="oneChange">
                          <span style="font-weight: bold;">部门管理</span>
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="tb tr" style="width: 20%;"></div>
                    <div class="tb set" style="width: 60%;">
                      <div class="level2">
                        <el-checkbox label="merchantAdd" @change="oneChange" class="permission-span">新增商家</el-checkbox>
                        <el-checkbox label="merchantEdit" @change="oneChange" class="permission-span">编辑商家</el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="table">
                    <div class="tb" style="width: 20%;">
                      <div class="level1">
                        <el-checkbox label="commodity" @change="oneChange">
                          <span style="font-weight: bold;">商品管理</span>
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="tb tr" style="width: 20%;">
                      <div class="level2">
                        <el-checkbox label="commodityList" @change="oneChange" class="permission-span">普通商品列表
                        </el-checkbox>
                        <el-checkbox label="memberGoods" @change="oneChange" class="permission-span">会员商品列表
                        </el-checkbox>
                        <el-checkbox label="keyword" @change="oneChange" class="permission-span">关键字
                        </el-checkbox>
                        <el-checkbox label="activity" @change="oneChange" class="permission-span">活动
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="tb set" style="width: 60%;">
                      <div class="level2">
                        <el-checkbox label="commodityAdd" @change="oneChange" class="permission-span">新增普通商品
                        </el-checkbox>
                        <el-checkbox label="commodityEdit" @change="oneChange" class="permission-span">编辑</el-checkbox>
                      </div>
                      <div class="level2">
                        <el-checkbox label="memberGoodsAdd" @change="oneChange" class="permission-span">新增会员商品
                        </el-checkbox>
                        <el-checkbox label="memberGoodsEdit" @change="oneChange" class="permission-span">编辑
                        </el-checkbox>
                      </div>
                      <div class="level2">
                        <el-checkbox label="keywordAdd" @change="oneChange" class="permission-span">新增关键字</el-checkbox>
                        <el-checkbox label="keywordEdit" @change="oneChange" class="permission-span">编辑</el-checkbox>
                        <el-checkbox label="keywordDel" @change="oneChange" class="permission-span">删除</el-checkbox>
                      </div>
                      <div class="level2">
                        <el-checkbox label="activityAdd" @change="oneChange" class="permission-span">新增活动</el-checkbox>
                        <el-checkbox label="kactivityEdit" @change="oneChange" class="permission-span">编辑</el-checkbox>
                        <!-- <el-checkbox label="keywordDel" @change="oneChange" class="permission-span">删除</el-checkbox> -->
                      </div>
                    </div>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </el-form-item>
          <div class="submit">
            <el-form-item>
              <el-button type="primary" @click="newRole">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import API from "@/api/index.js";
  import {
    log
  } from "util";

  export default {
    data() {
      return {
        loading: true,
        dialogRole: false,
        disabledRole: false,

        form: {
          name: "",
          id: "",
          permissions: [],
          title: ''
        },
        tableData: [],
        checkAll: false,

        adminPermission: [
          "permission", // 角色管理
          "roles",
          "manage",
          "healthUser",
          "roleAdd",
          "roleDel",
          "roleEdit",
          "roleGet",
          "manageAdd",
          "manageDel",
          "manageEdit",
          "manageResetPwd",
          // "healthUserAdd",
          "healthUserEdit",
          "merchant",
          "merchantAdd",
          "merchantEdit",
          "commodity",
          "commodityList",
          "commodityAdd",
          "commodityEdit",
          "memberGoods",
          "memberGoodsAdd",
          "memberGoodsEdit",
          "keyword",
          "keywordAdd",
          "keywordEdit",
          "keywordDel",
          "activity",
          "activityAdd",
          "kactivityEdit",
          "user",
          "attache",

          "information",
          "banner",
          "message",
          "classify"
        ],
        permissionList: [
          "permission", // 角色管理
          "roles",
          "manage",
          "healthUser",
          "roleAdd",
          "roleDel",
          "roleEdit",
          "roleGet",
          "manageAdd",
          "manageDel",
          "manageEdit",
          "manageResetPwd",
          // "healthUserAdd",
          "healthUserEdit",
          "merchant",
          "merchantAdd",
          "merchantEdit",
          "commodity",
          "commodityList",
          "commodityAdd",
          "commodityEdit",
          "memberGoods",
          "memberGoodsAdd",
          "memberGoodsEdit",
          "keyword",
          "keywordAdd",
          "keywordEdit",
          "keywordDel",
          "activity",
          "activityAdd",
          "kactivityEdit",
          "attache",
          "user",

        ],

        dialogDel: false,
        id: "", // 删除id

        // 分页
        current: 1,
        size: 10,
        total: 0,
        role: localStorage.getItem("username"),
        permissionData: [],
      };
    },
    mounted() {
      this.permissionData = localStorage.getItem("permissions").split(",");
      this.getRoles(this.current, this.size);
    },
    methods: {
      getRoles(cur, list) {
        var self = this;
        API.roles(cur, list)
          .then((res) => {
            // console.log(res);
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
        self.getRoles(val, self.size);
      },
      // 每页多少条
      sizeChange(val) {
        var self = this;
        self.size = val;
        self.loading = true;
        self.getRoles(1, val);
        self.current = 1;
      },

      // addRole() {
      //   var self = this;
      //   if (self.permissionData.includes("roleAdd")) {
      //     self.dialogRole = true;
      //   } else {
      //     self.$message.warning("无权操作");
      //   }
      //   self.form = {
      //     name: "",
      //     permissions: [],
      //   };
      //   self.disabledRole = false;
      //   self.checkAll = true;
      //   if (self.checkAll === true) {
      //     if (localStorage.getItem('username') == 'admin') {
      //       self.form.permissions = self.checkAll ? self.adminPermission : [];
      //       console.log(self.form.permissions)
      //     } else {
      //       self.form.permissions = self.checkAll ? self.permissionList : [];
      //       console.log(self.form.permissions)
      //     }
      //   }
      // },
      newRole() {
        var self = this;
        console.log(self.form);
        if (self.form.name && self.form.permissions.length > 0) {
          API.createRole(self.form).then((res) => {
            // console.log(res);
            self.dialogRole = false;
            self.$message.success("提交成功");
            self.getRoles(self.current, self.size);
            // window.location.reload();
          });
        } else {
          self.$message.warning("请补充完整信息");
        }
      },
      // 操作
      handleEdit(index, row) {
        var self = this;
        if (self.permissionData.includes("roleEdit")) {
          self.dialogRole = true;
        } else {
          self.$message.warning("无权操作");
        }
        self.disabledRole = true;
        console.log(row);
        self.form.title = row.title;
        self.form.name = row.name;
        self.form.id = row.id;
        self.form.permissions = row.permissions;
        self.checkAll = row.permissions.length >= self.adminPermission.length;
        // if (self.checkAll === true) {
        //   if (localStorage.getItem('username') == 'admin') {
        //     self.form.permissions = self.checkAll ? self.adminPermission : [];
        //     console.log(self.form.permissions)
        //   } else {
        //     self.form.permissions = self.checkAll ? self.permissionList : [];
        //     console.log(self.form.permissions)
        //   }
        // }
      },
      AllChange(val) {
        var self = this;
        if (localStorage.getItem("username") == "admin" && self.form.name == "总后台") {
          self.form.permissions = val ? self.adminPermission : [];
          console.log(self.form.permissions);
        } else {
          self.form.permissions = val ? self.permissionList : [];
        }
      },
      oneChange(val) {
        var self = this;
        console.log(self.form.permissions);
        if (localStorage.getItem('username') == 'admin') {
          self.checkAll = self.form.permissions.length >= self.adminPermission.length;
        } else {
          self.checkAll = self.form.permissions.length >= self.permissionList.length;
        }
      },

      handleDel(index, row) {
        var self = this;
        if (self.permissionData.includes("roleDel")) {
          self.dialogDel = true;
        } else {
          self.$message.warning("无权操作");
        }
        self.id = row.id;
      },
      toDel() {
        var self = this;
        API.delRoles(self.id).then((res) => {
          self.$message.success("删除成功");
          self.dialogDel = false;
          self.getRoles(self.current, self.size);
        });
      },
    },
  };
</script>

<style scoped>
  .permission {

    border: 1px #ccc solid;
  }

  .table {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px #ccc solid;

    padding-left: 20px;

  }

  .th {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-weight: bold;
    /* border-right: 1px #ccc solid; */
  }

  .tb {
    padding-left: 20px;
    /* border-right: 1px #ccc solid; */
  }

  .tr {
    display: flex;
    flex-wrap: wrap;
  }

  .set {
    display: flex;
    flex-direction: column;
  }

  .level1 {

    height: 50px;
    line-height: 50px;

  }

  .level2 {
    padding-left: 20px;
    /* border-right: 1px #ccc solid; */
    /* border-bottom: 1px #ccc solid; */
    width: 100%;
  }

  .permission-item {
    margin: 10px;
    padding: 0 10px;
  }

  .permission-span {
    width: 80px;
  }
</style>