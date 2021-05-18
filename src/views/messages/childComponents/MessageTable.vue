<template>
  <div>
    <el-scrollbar class="message-table">
      <el-button
        type="primary"
        round
        v-show="status === 'tea'"
        @click="dialogVisible = true"
        style="margin-bottom: 20px"
        >发送通知</el-button
      >
      <el-table
        :border="showStyle"
        :data="tableData"
        style="width: 100%; margin-top: 5px"
      >
        <el-table-column
          prop="createdAt"
          label="日期"
          align="center"
          width="220"
        >
        </el-table-column>
        <el-table-column prop="content" label="内容" align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="120"
          v-if="status === 'tea'"
        >
          <template slot-scope="scope">
            <el-button
              style="padding: 6px"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteMessage(scope.row._id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        @changeShowStyle="changeShowStyle"
        @refetch="refetch"
        :total="total"
      />
    </el-scrollbar>
    <el-dialog
      title="添加通知"
      :visible.sync="dialogVisible"
      width="30%"
      class="message_dialog"
    >
      <div>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入通知内容"
          v-model="message"
        >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMessage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "components/pagination/Pagination";
import localStorage from "function/localstorage";
import {
  addMessages,
  queryMessages,
  deleteMessage,
} from "../../../network/messages";
import { timeFormat } from "../../../function/utils";
export default {
  name: "MessageTable",
  components: {
    Pagination,
  },

  props: {
    showTab: {
      type: String,
      required: true,
    },
  },

  async mounted() {
    await this.queryTableData(this.page, this.size);

    this.status = localStorage.getLocalStorage("status");
  },

  data() {
    return {
      page: 1,
      size: 10,
      total: 10,
      status: "",
      showStyle: true,
      tableData: [],
      dialogVisible: false,
      message: "",
    };
  },

  methods: {
    changeShowStyle(val) {
      this.showStyle = val;
    },

    async queryTableData(page, size) {
      let { data, total } = await queryMessages(page, size);
      this.tableData = data;
      this.total = total;
      this.tableData.forEach(
        (item) =>
          (item.createdAt = timeFormat(item.createdAt, "yyyy-MM-dd hh:mm:ss"))
      );
    },

    refetch(val) {
      let { page, size } = val;
      this.queryTableData(page, size);
    },

    addMessage() {
      this.dialogVisible = false;
      if (this.message.trim().length > 0) {
        addMessages(this.message).then((res) => {
          if (res.err_code === 1) {
            this.queryTableData(this.page, this.size);
            let message = this.message;
            this.message = "";
            this.$message({
              type: "success",
              message: "你添加的内容是: " + message,
            });
          } else {
            this.$message({
              message: "😭服务器崩溃了",
              type: "error",
            });
          }
        });
      } else {
        this.$message({
          message: "😭添加内容不能为空",
          type: "error",
        });
      }
    },

    deleteMessage(info) {
      this.$confirm("确认删除该通知吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteMessage(info).then((res) => {
          if (res.success) {
            this.queryTableData(this.page, this.size);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        });
      });
    },
  },
};
</script>

<style lang="sass">
.message-table
  height: calc(100vh - 144px)
  .el-scrollbar__wrap
    overflow-x: hidden
.message_dialog
  .el-dialog__body
    padding: 16px 20px
  .el-dialog
    border-radius: 10px
    margin-top: 30vh !important
  button
    border-radius: 42px
</style>
