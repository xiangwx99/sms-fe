<template>
  <div class="course-table">
    <el-scrollbar class="course-table-scroll">
      <el-table
        :border="showStyle"
        :data="tableData"
        style="width: 100%; margin-top: 5px"
      >
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          style="color: #409EFF"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="markPaper(scope.row._id)">{{
              scope.row.name
            }}</el-button></template
          >
        </el-table-column>
        <el-table-column prop="department" label="院系" align="center">
        </el-table-column>
        <el-table-column prop="major" label="专业" align="center">
        </el-table-column>
        <el-table-column prop="grade" label="年级" align="center">
        </el-table-column>
        <el-table-column prop="classes" label="班级" align="center">
        </el-table-column>
        <el-table-column prop="content" label="试卷名" align="center">
          <template slot-scope="scope">
            {{ scope.row.content.examName }}
          </template>
        </el-table-column>

        <el-table-column label="试卷状态" align="center">
          <template slot-scope="scope">
            <span style="color: rgb(247, 159, 31);">
              {{ scope.row.status === "half" ? "待批阅" : "" }}</span
            >
            <span style="color: rgb(0, 184, 148);">{{
              scope.row.status === "finished" ? "已完成" : ""
            }}</span>
            <span style="color: rgb(206, 214, 224);">{{
              scope.row.status === "pending" ? "未完成" : ""
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分数" align="center">
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
import { queryAssignExamByTeaId } from "network/assignExam";
import localStorage from "function/localstorage";
export default {
  name: "ReviewTable",
  mounted() {
    this.queryReviewData();
  },
  data() {
    return {
      courseName: null,
      showStyle: true,
      tableData: [],
    };
  },
  methods: {
    async queryReviewData() {
      let id = JSON.parse(localStorage.getLocalStorage("userInfo"))?._id;
      let { data } = await queryAssignExamByTeaId(id);
      this.tableData = data;
      console.log(data);
    },
    markPaper(id) {
      this.$router.push(`/mark-papers?id=${id}`);
    },
  },
};
</script>

<style lang="sass">
.course-table
  .el-select
    margin-right: 10px
  .el-select__tags
    > span
      display: block
      height: 28px
      overflow: hidden
  .el-select__tags
    i
      display: none
    .el-tag.el-tag--info
      border: none
      background-color: #ffffff
      padding: 0 4px
    .el-select__tags-text
      color: #000
  .course-table-scroll
    height: calc(100vh - 180px)
    .el-scrollbar__wrap
      overflow-x: hidden
    th
      background-color: #e8f7ff
      color: #666
</style>
