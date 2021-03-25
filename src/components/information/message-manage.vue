<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="addMessageMs">添加资讯</el-button>
      </div>
    </div>

    <el-table :data="tableDate" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
      <el-table-column prop="id" label="资讯ID"></el-table-column>
      <el-table-column prop="type_text" label="资讯类型"></el-table-column>
      <el-table-column prop="img" label="资讯缩略图">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="max-width:180px;max-height:80px;" />
        </template>
      </el-table-column>
      <!-- <el-table-column prop="page_view" label="资讯浏览量"></el-table-column> -->
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
      <el-pagination @current-change="currentChange" :current-page.sync="current" :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="size" layout="sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="dialogMessageMs" :title="isAdd ? '添加资讯' : '编辑'" center width="60%" @close="close">
      <el-form label-width="80px" :model="form">
        <el-form-item label="资讯类型">
          <el-select v-model="form.document_type" placeholder="请选择资讯分类" @change="typeChange">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资讯标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.is_show">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="资讯封面">
          <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="1"
            :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
            :file-list='files' :on-exceed="handleExceed" list-type="picture-card" :on-change="handleChange"
            :auto-upload="true">
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="资讯内容">
          <quill-editor ref="myQuillEditor" v-model="form.content" :options="editorOption"
            style="height:430px;margin:0 0 60px 0;"></quill-editor>
          <el-upload class="avatar-uploader quill-img" action="https://api.fengniaotuangou.cn/api/upload"
            :before-upload="beforeUpload" :on-success="quillImgSuccess" style="display: none">
            <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <div class="submit">
          <el-form-item>
            <el-button type="primary" @click="newMessageMs">提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog :visible.sync="dialogDel" title="删除资讯" width="20%" align="center" :close-on-click-modal="false">
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
  import {
    quillEditor
  } from "vue-quill-editor";
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";
  import "quill/dist/quill.bubble.css";
  import {
    log
  } from "util";
  let loading;

  export default {
    name: "messagems",
    components: {
      quillEditor,
    },
    data() {
      return {
        loading: true,
        hasNewImage: false,
        disabled: false,
        dialogMessageMs: false,
        dialogDel: false,
        form: {
          document_type: "",
          title: "",
          content: "",
          img: '',
          is_show: 1,
        },
        title: "",
        typeList: [],
        editorOption: {
          placeholder: "请输入文档内容",
          theme: "snow",
          modules: {
            toolbar: {
              container: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{
                  direction: "rtl",
                }, ],
                [{
                  size: ["small", false, "large", "huge"],
                }, ],
                [{
                  header: [1, 2, 3, 4, 5, 6, false],
                }, ],
                [{
                    color: [],
                  },
                  {
                    background: [],
                  },
                ],
                [{
                  font: [],
                }, ],
                [{
                  align: [],
                }, ],
                ["clean"],
                ["link", "image"],
              ],
              handlers: {
                image: function (value) {
                  if (value) {
                    document.querySelector(".quill-img input").click();
                  } else {
                    this.quill.format("image", false);
                  }
                },
              },
            },
          },
        },

        tableDate: [],

        current: 1,
        total: 0,
        size: 10,
        imageUrl: "",
        is_show: 2,
        name: "",
        files: [],
        is_show: false,
        isAdd: false
      };
    },
    mounted() {
      this.getMessageType();
      this.getMessages(this.current, this.size);
    },
    methods: {
      // 获取资讯类型
      getMessageType() {
        var self = this;
        API.documentType().then((res) => {
          console.log(res);
          self.typeList = res.result;
        });
      },
      // 获取资讯内容
      getMessages(currentPage, perPage, document_type) {
        var self = this;
        API.document(currentPage, perPage, document_type)
          .then((res) => {
            self.loading = false;
            res.result.data.forEach(item => {
              // console.log(item);
              item.is_show == 1 ? item.is_show = true : item.is_show = false;
            })
            self.tableDate = res.result.data;
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
        self.getMessages(val, self.size);
      },
      // 每页多少条
      sizeChange(val) {
        var self = this;
        self.size = val;
        self.loading = true;
        self.getMessages(1, val);
        self.current = 1;
      },

      // 添加资讯文档
      addMessageMs() {
        var self = this;
        self.dialogMessageMs = true;
        self.hasNewImage = false;
        self.form = {
          document_type: "",
          title: "",
          content: "",
          img: '',
          is_show: 1,
        }
        self.isAdd = true;
        if (self.$refs.upload) {
          self.$refs.upload.clearFiles();
        }
      },
      close() {
        var self = this;
        self.files = []
      },
      typeChange(val) {
        this.form.document_type = val;
      },
      // 提交文档
      newMessageMs() {
        var self = this;
        if (self.form.document_type && self.form.title && self.form.img && self.form.content) {
          API.createDocument(self.form).then((res) => {
            self.$message.success("提交成功");
            self.dialogMessageMs = false;
            self.getMessages(self.current, self.size);
            self.form = {};
          });
        } else {
            self.$message.warning("请填写完整信息");
        }
      },
      handleEdit(index, row) {
        var self = this;
        self.dialogMessageMs = true;
        self.isAdd = false;
        if (Number(row.is_show) == 0) {
          self.form = {
            id: row.id,
            document_type: row.document_type,
            title: row.title,
            content: row.content,
            img: row.img,
            is_show: 2
          };
        } else {
          self.form = {
            id: row.id,
            document_type: row.document_type,
            title: row.title,
            content: row.content,
            img: row.img,
            is_show: 1
          };
        }
        let urlStr = self.form.img.split(",");
        urlStr.forEach(item => {
          let obj = new Object();
          obj.url = item;
          self.files.push(obj);
        });
      },

      notifyChange(val, index, row) {
        var self = this;
        console.log(row);
        if (val == true) {
          self.form = {
            id: row.id,
            document_type: row.document_type,
            title: row.title,
            content: row.content,
            img: row.img,
            is_show: 1
          }
          API.createDocument(self.form).then(res => {
            self.$message.success("提交成功");
            self.getMessages(self.current, self.size);
          })
        } else {
          self.form = {
            img: row.img,
            id: row.id,
            document_type: row.document_type,
            title: row.title,
            content: row.content,
            img: row.img,
            is_show: 2
          }
          API.createDocument(self.form).then(res => {
            self.$message.success("提交成功");
            self.getMessages(self.current, self.size);
          })
        }
      },

      handleDelete(index, row) {
        var self = this;
        self.dialogDel = true;
        self.id = row.id;
      },
      toDel() {
        var self = this;
        API.delDocument(self.id).then((res) => {
          self.$message.success("删除成功");
          self.dialogDel = false;
          self.getMessages(self.current, self.size);
        });
      },

      // 富文本选择图片时的事件
      beforeUpload() {
        // 显示加载动画
        loading = this.$loading({
          lock: true,
          text: "图片上传中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
      },
      // 富文本插入图片时上传图片
      quillImgSuccess(res, file) {
        let quill = this.$refs.myQuillEditor.quill;
        // 关闭动画
        loading.close();
        if (res.data) {
          let length = quill.getSelection().index;
          quill.insertEmbed(length, "image", res.data);
          quill.setSelection(length + 1);
        } else {
          this.$message.error("图片插入失败");
        }
      },
      handleRemove(file, fileList) {
        //移除图片
        var self = this;
        self.files = fileList
        self.form.img = ''
      },
      beforeAvatarUpload(file) {
        //文件上传之前调用做一些拦截限制
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //     this.$message.error("上传图片大小不能超过 2MB!");
        // }
        const isLt2M = 300 * 1024;
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过300KB");
        }
        return isLt2M;
      },
      handleAvatarSuccess(res, file) {
        //图片上传成功
        var self = this;
        self.form.img = file.response.data;
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
  };
</script>

<style scoped>
  .pic-box {
    max-width: 100%;
    height: 200px;
  }
</style>