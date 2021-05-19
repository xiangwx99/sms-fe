<template>
  <div class="review-table">
    <el-row style="margin-bottom: 20px;">
      <el-row
        style="margin-bottom: 15px; font-size: 14px; line-height: 24px; height: 24px"
        class="flex"
      >
        <div style="margin-right: 5px">筛选项:</div>
        <div v-for="(item, index) in filterOptions" :key="index">
          <div
            style="background-color: #F1F2F2; margin: 0 5px; border-radius: 4px"
            v-if="item.value.length > 0"
          >
            <span style="padding: 0 5px; color: #999">{{ item.label }}:</span>
            <span v-for="item in item.value" :key="item">
              <span style="margin: 0 3px">{{ item }}</span>
            </span>
          </div>
        </div>
        <div>
          <el-button
            style="color: #19AAF8; padding: 0px; border: none"
            @click="clearFilter"
            >清除所有</el-button
          >
        </div>
      </el-row>
      <el-col class="left flex select" :span="18">
        <el-select
          v-model="filterOptions[0].value"
          multiple
          placeholder="试卷名"
          @change="$_request"
        >
          <el-option
            v-for="item in filterOptions[0].options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="filterOptions[1].value"
          multiple
          placeholder="专业"
          @change="$_request"
        >
          <el-option
            v-for="item in filterOptions[1].options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-scrollbar class="course-table-scroll" v-loading="loading">
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
import {
  queryAssignExamByTeaId,
  queryAssignExamByCondition,
} from "network/assignExam";
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
      loading: true,
      courseName: null,
      showStyle: true,
      tableData: [],
      filterOptions: [
        {
          label: "试卷名",
          options: [],
          value: [],
        },
        {
          label: "专业",
          options: [],
          value: [],
        },
      ],
    };
  },
  methods: {
    // 清除所有筛选项
    clearFilter() {
      this.filterOptions.forEach((item) => (item.value = []));
      this.queryReviewData();
    },
    // 根据筛选项来请求数据
    async $_request() {
      this.tableData = [];
      let id = JSON.parse(localStorage.getLocalStorage("userInfo"))?._id;
      let { data } = await queryAssignExamByCondition(
        id,
        this.filterOptions[0].value,
        this.filterOptions[1].value
      );
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

    // 获取所有参与该教师考试的学生数据
    // 获取所有该教师的试卷
    async queryReviewData() {
      this.tableData = [];
      this.filterOptions[0].options = [];
      this.filterOptions[1].options = [];
      let id = JSON.parse(localStorage.getLocalStorage("userInfo"))?._id;
      let { data, success } = await queryAssignExamByTeaId(id);
      if (success) {
        this.loading = false;
      }
      data.forEach((item) => {
        item.totalScore = this.totalScore(item.content);
        let majorObj = {},
          examNameObj = {};

        if (this.status === "all") {
          majorObj.value = item.major;
          majorObj.label = item.major;
          examNameObj.label = item.content.examName;
          examNameObj.value = item.content.examName;
          this.filterOptions[0].options.push(examNameObj);
          this.filterOptions[1].options.push(majorObj);
          this.tableData.push(item);
        } else if (this.status === "finished" && item.status === "finished") {
          majorObj.value = item.major;
          majorObj.label = item.major;
          examNameObj.label = item.content.examName;
          examNameObj.value = item.content.examName;
          this.filterOptions[0].options.push(examNameObj);
          this.filterOptions[1].options.push(majorObj);
          this.tableData.push(item);
        } else if (this.status === "other" && item.status !== "finished") {
          majorObj.value = item.major;
          majorObj.label = item.major;
          examNameObj.label = item.content.examName;
          examNameObj.value = item.content.examName;
          this.filterOptions[0].options.push(examNameObj);
          this.filterOptions[1].options.push(majorObj);
          this.tableData.push(item);
        }
        let obj = {};
        this.filterOptions.forEach((item, index) => {
          this.filterOptions[index].options = this.filterOptions[
            index
          ].options.reduce((defaultArr, next) => {
            obj[next.label]
              ? ""
              : (obj[next.label] = true && defaultArr.push(next));
            return defaultArr;
          }, []);
        });
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
    height: calc(100vh - 280px)
    .el-scrollbar__wrap
      overflow-x: hidden
    th
      background-color: #e8f7ff
      color: #666
</style>
