<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </div>
    </div>
    <el-table :data="tableData" border :header-cell-style="{background:'#f0f0f0'}">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="账号"></el-table-column>
      <el-table-column prop="role" label="角色名"></el-table-column>
      <!-- <el-table-column prop="community" label="社区"></el-table-column> -->
      <el-table-column prop="enable" label="状态">
        <template slot-scope="scope">
          <span v-text="scope.row.enable == '1' ? '启用' : '禁用'"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="handleReset(scope.$index, scope.row)">重置密码</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogDel" title="删除用户" width="20%" align="center" :close-on-click-modal="false">
      <div style="font-size: 20px; margin-bottom: 30px;">是否删除</div>
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

    <el-dialog :title="isAdd ? '添加用户' : '编辑'" center :visible.sync="dialogUser" width="60%" :close-on-click-modal="false">
      <div class="box">
        <el-form :model="form" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="输入密码">
            <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="选择角色">
            <el-select v-model="form.role" placeholder="请选择角色">
              <el-option v-for="item in rolesList" :key="item.title" :label="item.name" :value="item.title"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门">
            <el-select v-model="form.merchant_id" placeholder="选择部门">
              <el-option v-for="item in merchantList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择状态">
            <el-select v-model="form.enable" placeholder="请选择状态">
              <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="submit">
            <el-form-item>
              <el-button type="primary" @click="newUser">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" center :visible.sync="dialogResetPassWord" width="500px" :close-on-click-modal="false">
      <div class="box">
        <el-form :model="pwdForm" label-width="120px">
          <el-form-item label="账号">
            <el-input v-model="pwdForm.username"></el-input>
          </el-form-item>
          <el-form-item label="旧密码">
            <el-input v-model="pwdForm.former_password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="pwdForm.new_password"></el-input>
          </el-form-item>
          <el-form-item label="再次确认新密码">
            <el-input v-model="pwdForm.confirm_password"></el-input>
          </el-form-item>
          <div class="submit">
            <el-form-item>
              <el-button type="primary" @click="changePassword">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import API from "@/api//index.js";

  export default {
    data() {
      return {
        loading: true,
        dialogUser: false,
        form: {
          id: "",
          username: "",
          password: "",
          enable: "",
          role: "",
          merchant_id: ''
        },
        stateList: [{
            label: "启用",
            value: 1,
          },
          {
            label: "禁用",
            value: 2,
          },
        ],
        rolesList: [],
        merchantList: [],

        tableData: [],

        dialogResetPassWord: false, // 修改密码
        pwdForm: {
          username: "",
          new_password: "",
          former_password: "",
          confirm_password: "",
          id: "",
        },

        dialogDel: false,
        id: "", // 删除id

        // 分页
        current: 1,
        size: 10,
        total: 0,
        isAdd: false
      };
    },
    mounted() {
      this.permissionData = localStorage.getItem("permissions").split(",");
      this.getUsers(this.current, this.size);
      this.getRoles();
      this.getMerchants();
    },
    methods: {
      getRoles() {
        var self = this;
        API.roles(1, 100)
          .then((res) => {
            self.loading = false;
            self.rolesList = res.result.data;
          })
          .catch((err) => {
            self.loading = false;
          });
      },
      getUsers(cur, list) {
        var self = this;
        API.users(cur, list).then((res) => {
          self.loading = false;
          self.tableData = res.result.data;
          self.total = res.result.total;
        }).catch((err) => {
          self.loading = false;
        });
      },
      // 分页
      currentChange(val) {
        var self = this;
        self.current = val;
        self.loading = true;
        self.getUsers(val, self.size);
      },
      // 每页多少条
      sizeChange(val) {
        var self = this;
        self.size = val;
        self.loading = true;
        self.getUsers(1, val);
        self.current = 1;
      },

      // 获取商家
      getMerchants() {
        var self = this;
        API.merchants(1, 100).then(res => {
          // console.log('getMerchants', res);
          self.merchantList = res.result.data;
        })
      },


      addUser() {
        var self = this;
        self.isAdd = true;
        if (self.permissionData.includes("manageAdd")) {
          self.dialogUser = true;
          self.form = {
            id: "",
            username: "",
            password: "",
            enable: "",
            role: "",
            merchant_id: ''
          };
        } else {
          self.$message.warning("无权操作");
        }
      },
      newUser() {
        var self = this;
        if (self.form.username && self.form.password && self.form.enable && self.form.role) {
          API.createUser(self.form).then((res) => {
            self.dialogUser = false;
            self.$message.success("提交成功");
            self.getUsers(self.current, self.size);
            self.form = {};
          });
        } else {
          self.$message.warning("请补充完整信息");
        }
      },

      // 操作
      handleEdit(index, row) {
        var self = this;
        self.isAdd = false;
        if (self.permissionData.includes("manageEdit")) {
          self.dialogUser = true;
        } else {
          self.$message.warning("无权操作");
        }
        // console.log(row);
        self.form = {
          id: row.id,
          username: row.name,
          password: "",
          enable: row.enable,
          role: row.role,
          merchant_id: row.id
        };
      },
      // 重置密码
      handleReset(index, row) {
        var self = this;
        if (self.permissionData.includes("manageResetPwd")) {
          self.dialogResetPassWord = true;
        } else {
          self.$message.warning("无权操作");
        }
        self.pwdForm.id = row.id;
      },
      changePassword() {
        var self = this;
        if (self.pwdForm.new_password && self.pwdForm.confirm_password && self.pwdForm.former_password && self.pwdForm
          .username) {
          if (self.pwdForm.new_password === self.pwdForm.confirm_passwor) {
            API.resetPassword(self.pwdForm).then((res) => {
              self.dialogResetPassWord = false;
              self.$message.success("修改成功");
              self.getUsers(self.current, self.size);
              self.pwdForm = {};
            });
          } else {
            self.$message.error("新密码与确认密码不一致");
          }
        } else {
          self.$message.warning("请补充完整信息");
        }
      },

      handleDel(index, row) {
        var self = this;
        if (self.permissionData.includes("manageDel")) {
          self.dialogDel = true;
        } else {
          self.$message.warning("无权操作");
        }
        self.id = row.id;
      },
      toDel() {
        var self = this;
        API.delUser(self.id).then((res) => {
          self.$message.success("删除成功");
          self.dialogDel = false;
          self.getUsers(self.current, self.size);
        });
      },
    },
  };
</script>

<style scoped>
  .permission {
    display: flex;
    flex-wrap: wrap;
  }

  .permission-item {
    margin: 10px;
    padding: 0 10px;
  }
</style>