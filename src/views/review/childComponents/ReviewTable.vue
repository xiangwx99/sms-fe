<template>
  <div class="review-table">
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
            <el-button type="text" @click="markPaper(scope.row)">{{
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
        <el-table-column prop="totalScore" label="分数" align="center">
          <template slot-scope="scope">
            <span
              v-if="scope.row.totalScore >= 60"
              style="color: rgb(0, 148, 50);"
              >{{ scope.row.totalScore }}</span
            >
            <span v-else style="color: rgb(234, 32, 39);">{{
              scope.row.totalScore
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
import { queryAssignExamByTeaId } from "network/assignExam";
import localStorage from "function/localstorage";
import { notifyTips } from "function/utils";
export default {
  name: "ReviewTable",
  mounted() {
    this.queryReviewData();
  },
  props: {
    status: {
      type: String,
      default() {
        return "all";
      },
    },
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
      this.tableData = [];
      let id = JSON.parse(localStorage.getLocalStorage("userInfo"))?._id;
      let { data } = await queryAssignExamByTeaId(id);
      // console.log(data);
      data.forEach((item) => {
        item.totalScore = this.totalScore(item.content);
        if (this.status === "all") {
          this.tableData.push(item);
        } else if (this.status === "finished" && item.status === "finished") {
          this.tableData.push(item);
        } else if (this.status === "other" && item.status !== "finished") {
          this.tableData.push(item);
        }
      });
    },
    markPaper(obj) {
      let id = obj._id;
      console.log(obj);
      if (obj.status === "pending") {
        notifyTips(this.$message, "未作答试卷，禁止批改!");
      } else {
        this.$router.push(`/mark-papers?id=${id}`);
      }
    },
    // 计算总分
    totalScore(content) {
      let sum = 0;
      if (content.choiceQuestion?.length > 0) {
        content.choiceQuestion.forEach((item) => (sum += item.replyScore));
      }
      if (content.completionQuestion?.length > 0) {
        content.completionQuestion.forEach((item) => (sum += item.replyScore));
      }
      if (content.issueQuestion?.length > 0) {
        content.issueQuestion.forEach((item) => (sum += item.replyScore));
      }
      if (content.shortAnswerQuestions?.length > 0) {
        content.shortAnswerQuestions.forEach(
          (item) => (sum += item.replyScore)
        );
      }
      return sum;
    },
  },
};
</script>

<style lang="sass">
.review-table
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
