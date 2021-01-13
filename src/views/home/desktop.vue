<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-input placeholder="请输入用户ID/昵称" v-model="userId" @keyup.enter.native="search(userId)"
          class="input-with-select">
          <el-select v-model="type" placeholder="请选择搜索方式" slot="prepend" @change="changeType" style="width: 150px">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search(userId)"></el-button>
        </el-input>
      </div>
    </div>
    <el-table :data="tableData" border :header-cell-style="{ background: '#f0f0f0' }" max-height="620">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="avatarUrl" label="头像">
        <template slot-scope="scope">
          <div v-if="scope.row.avatarUrl">
            <el-popover placement="top-start" title trigger="click">
              <img :src="scope.row.avatarUrl" style="max-width: 800px; max-height: 800px" />
              <img slot="reference" :src="scope.row.avatarUrl" style="max-width: 180px; max-height: 80px" />
            </el-popover>
          </div>
          <div v-else>
            <span>--暂无图片--</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <!-- <el-table-column prop="name" label="名称"></el-table-column> -->
      <el-table-column prop="sex" label="性别" width="120px">
        <template slot-scope="scope">
          <span v-text="scope.row.sex == 1 ? '男' : '女'"></span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <!-- <el-table-column prop="mandate.created_at" label="是否已授权">
        <template slot-scope="scope">
          <span v-text="scope.row.mandate == null ? '未授权' : '已授权'"></span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="mandate.created_at" label="授权时间"></el-table-column> -->
      <el-table-column label="操作" width="120px">

      </el-table-column>
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

        userId: "", // 搜索用户id
        nickname: '',
        type: 1, // 选中的搜索方式
        typeList: [{
            // 搜索方式
            value: 1,
            label: "按用户ID搜索",
          },
          {
            value: 2,
            label: "按昵称搜索",
          },
        ],
        typeDisabled: false,
      }
    },

    mounted() {
      this.getWxUser(this.current, this.size);
    },

    methods: {
      getWxUser(cur, list, user_id, nickname) {
        var self = this;
        self.loading = true;
        API.wxUser(cur, list, user_id, nickname)
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
        self.getWxUser(val, self.size);
      },
      sizeChange(val) {
        var self = this;
        self.size = val;
        self.loading = true;
        self.getWxUser(1, val);
        self.current = 1;
      },
      // 选择搜索方式
      changeType(val) {
        var self = this;
        self.typeDisabled = true;
        self.userId = "";
      },
      search() {
        var self = this;
        self.loading = true;
        if (self.type == 1) {
          var user_id = self.userId;
          self.getWxUser(self.current, self.size, user_id, nickname);
        } else {
          var nickname = self.userId;
          self.getWxUser(self.current, self.size, user_id, nickname);
        }
      },

    },
  }
</script>

<style lang="scss" scoped>

</style>