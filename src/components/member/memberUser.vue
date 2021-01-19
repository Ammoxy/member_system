<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-input placeholder="请输入用户名称" v-model="name" @keyup.enter.native="search(name)" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search(name)"></el-button>
        </el-input>
      </div>
    </div>
    <el-table :data="tableData" border :header-cell-style="{ background: '#f0f0f0' }" max-height="620">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="user.avatarUrl" label="头像">
        <template slot-scope="scope">
          <div v-if="scope.row.user.avatarUrl">
            <el-popover placement="top-start" title trigger="click">
              <img :src="scope.row.user.avatarUrl" style="max-width: 800px; max-height: 800px" />
              <img slot="reference" :src="scope.row.user.avatarUrl" style="max-width: 180px; max-height: 80px" />
            </el-popover>
          </div>
          <div v-else>
            <span>--暂无图片--</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="昵称"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="type" label="身份">
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
      </el-table-column>
      <!-- <el-table-column prop="name" label="名称"></el-table-column> -->
      <el-table-column prop="sex" label="性别" width="120px">
        <template slot-scope="scope">
          <span v-text="scope.row.sex == 1 ? '男' : '女'"></span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="stature" label="身高"></el-table-column>
      <el-table-column prop="weight" label="体重"></el-table-column>
      <el-table-column prop="profession" label="职业"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <!-- <el-table-column prop="mandate.created_at" label="是否已授权">
        <template slot-scope="scope">
          <span v-text="scope.row.mandate == null ? '未授权' : '已授权'"></span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="mandate.created_at" label="授权时间"></el-table-column> -->
      <!-- <el-table-column label="操作" width="120px">

      </el-table-column> -->
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination @current-change="currentChange" :current-page.sync="current" :page-size="size"
        layout="sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange"></el-pagination>
    </div>
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

        name: ''
      }
    },

    mounted() {
      this.getUserInfo(this.current, this.size);
    },

    methods: {
      getUserInfo(cur, list, name) {
        var self = this;
        self.loading = true;
        API.userInfo(cur, list, name, 2)
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
          self.getUserInfo(val, self.size, self.name);
        } else {
          self.getUserInfo(val, self.size);
        }
      },
      sizeChange(val) {
        var self = this;
        self.size = val;
        self.loading = true;
        if (self.name) {
          self.getUserInfo(1, val, self.name);
        } else {
          self.getUserInfo(1, val);
        }
        self.current = 1;
      },

      search() {
        var self = this;
        self.loading = true;
        self.current = 1;
        self.getUserInfo(self.current, self.size, self.name);
      },

    },
  }
</script>

<style lang="scss" scoped>

</style>