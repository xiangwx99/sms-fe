<template>
  <el-scrollbar class="message-table">
    <el-button
      type="primary"
      round
      v-show="status === 'tea'"
      @click="addMessage"
      style="margin-bottom: 20px"
      >发送通知</el-button
    >
    <el-table
      :border="showStyle"
      :data="tableData"
      style="width: 100%; margin-top: 5px"
    >
      <el-table-column prop="createdAt" label="日期" align="center" width="220">
      </el-table-column>
      <el-table-column prop="content" label="内容" align="center">
      </el-table-column>
    </el-table>
    <pagination
      @changeShowStyle="changeShowStyle"
      @refetch="refetch"
      :total="total"
    />
  </el-scrollbar>
</template>

<script>
import Pagination from "components/pagination/Pagination";
import localStorage from "function/localstorage";
import { addMessages, queryMessages } from "../../../network/messages";
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
      this.$prompt("请输入通知内容", "添加通知消息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          if (value.trim().length > 0) {
            addMessages(value).then((res) => {
              if (res.err_code === 1) {
                this.$message({
                  type: "success",
                  message: "你添加的内容是: " + value,
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
  },
};
</script>

<style lang="sass">
.message-table
  height: calc(100vh - 194px)
  .el-scrollbar__wrap
    overflow-x: hidden
</style>
