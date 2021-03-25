<template>
  <div class="pagination-wrap clear-fix">
    <el-pagination
      class="pagination right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 50, 70, 100]"
      :page-size="size"
      layout="total, sizes, prev, next, jumper"
      :total="total"
    >
    </el-pagination>
    <div class="right show-style">
      <el-select v-model="showStyle" placeholder="请选择">
        <el-option
          v-for="item in showOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      typeof: Number,
      default: 0,
    },
  },
  data() {
    return {
      page: 1,
      size: 10,
      showStyle: true,
      showOptions: [
        { label: "无", value: false },
        { label: "田", value: true },
      ],
    };
  },

  watch: {
    showStyle(val) {
      this.$emit("changeShowStyle", val);
      this.$emit("refetch", { page: this.page, size: this.size });
    },
    page(val) {
      this.$emit("refetch", { page: this.page, size: this.size });
    },
    size() {
      this.$emit("refetch", { page: this.page, size: this.size });
    },
  },

  methods: {
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
  },
};
</script>

<style lang="sass">
.pagination-wrap
  margin-top: 20px
  .pagination
    li
      color: #606266
      background-color: #fff
  .show-style
    line-height: 32px
    input
      padding: 0
      margin-top: -5px
      border: none
      width: 50px
    .el-input__inner
      padding: 0
</style>
