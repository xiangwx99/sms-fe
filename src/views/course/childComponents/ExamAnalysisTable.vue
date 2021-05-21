<template>
  <div class="course-table">
    <el-row style="margin-bottom: 20px;" v-if="status === 'tea'">
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
            <span v-if="Array.isArray(item.value)">
              <span v-for="obj in item.value" :key="obj">
                <span style="margin: 0 3px">{{ obj }}</span>
              </span>
            </span>
            <span v-else>
              {{ item.value }}
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
          placeholder="院系"
          @change="changeMajor"
        >
          <el-option
            v-for="item in departmentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-select
          v-model="filterOptions[2].value"
          placeholder="专业"
          @change="$_request"
        >
          <el-option
            v-for="item in majorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-select
          v-model="filterOptions[3].value"
          placeholder="年级"
          @change="$_request"
        >
          <el-option
            v-for="item in filterOptions[3].options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="filterOptions[4].value"
          multiple
          placeholder="班级"
          @change="$_request"
        >
          <el-option
            v-for="item in filterOptions[4].options"
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
        v-if="showResult"
      >
        <el-table-column prop="classes" label="班级" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="totalScore" label="总分" align="center">
        </el-table-column>
        <el-table-column prop="choiceCount" label="选择题总分" align="center">
        </el-table-column>
        <el-table-column prop="issueCount" label="判断题总分" align="center">
        </el-table-column>
        <el-table-column
          prop="completionCount"
          label="填空题总分"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="shortCount" label="简答题总分" align="center">
        </el-table-column>
      </el-table>
      <div
        v-show="!showResult && status === 'tea'"
        style="text-align: center; color: #dcdde1; line-height: 80px; font-size: 14px; font-weight: 500"
      >
        请选择试卷名，院系，专业，年级
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import InputSearch from "components/inputSearch/InputSearch";
import Pagination from "components/pagination/Pagination";
import dataOptions from "mixins/getNation";
import localStorage from "function/localstorage";
import {
  queryAssignExamByTeaId,
  queryAnalysis,
  analysisStu,
} from "network/assignExam";
export default {
  name: "ExamAnalysisTable",
  mixins: [dataOptions],
  components: {
    InputSearch,
    Pagination,
  },
  mounted() {
    this.status = localStorage.getLocalStorage("status");
    if (this.status === "tea") {
      this.queryReviewData();
    } else {
      this.$_request_stu();
    }
  },
  data() {
    return {
      status: "stu",
      courseName: null,
      loading: false,
      showResult: false,
      showStyle: true,
      tableData: [],
      majorOptions: [],
      filterOptions: [
        {
          label: "试卷名",
          options: [],
          value: "",
        },
        {
          label: "院系",
          options: [],
          value: "",
        },
        {
          label: "专业",
          options: [],
          value: [],
        },
        {
          label: "年级",
          options: [
            { value: "2017级", label: "2017级" },
            { value: "2018级", label: "2018级" },
            { value: "2019级", label: "2019级" },
            { value: "2020级", label: "2020级" },
          ],
          value: "",
        },
        {
          label: "班级",
          options: [
            { value: "1班", label: "1班" },
            { value: "2班", label: "2班" },
            { value: "3班", label: "3班" },
            { value: "4班", label: "4班" },
          ],
          value: [],
        },
      ],
    };
  },
  methods: {
    clearFilter() {
      this.showResult = false;
      this.majorOptions = [];
      this.filterOptions.forEach((item) => {
        if (Array.isArray(item.value)) {
          item.value = [];
        } else {
          item.value = "";
        }
      });
      this.$_request();
    },
    changeMajor() {
      this.showResult = false;
      this.filterOptions[2].value = "";
      this.departmentOptions.forEach((item, index) => {
        if (item.value === this.filterOptions[1].value) {
          this.majorOptions = this.departmentOptions[index].majorOptions;
        }
      });
    },
    async $_request() {
      this.showResult = true;
      for (let i in this.filterOptions) {
        if (
          this.filterOptions[i].value.length <= 0 &&
          i < this.filterOptions.length - 1
        ) {
          this.showResult = false;
          break;
        }
      }
      if (this.showResult) {
        let id = JSON.parse(localStorage.getLocalStorage("userInfo"))?._id;
        let examName = this.filterOptions[0].value;
        let department = this.filterOptions[1].value;
        let major = this.filterOptions[2].value;
        let grade = this.filterOptions[3].value;
        let classes = this.filterOptions[4].value;
        let { data } = await queryAnalysis(
          id,
          examName,
          department,
          major,
          grade,
          classes
        );
        data.forEach((item) => {
          let res = this.totalScore(item.content);
          item.totalScore = res[0];
          item.choiceCount = res[1];
          item.issueCount = res[2];
          item.completionCount = res[3];
          item.shortCount = res[4];
        });
        this.tableData = data;
      }
    },
    // 学生端查看
    async $_request_stu() {
      this.showResult = true;
      let id = JSON.parse(localStorage.getLocalStorage("userInfo"))?._id;
      let { data } = await analysisStu(id);

      data.forEach((item) => {
        let res = this.totalScore(item.content);
        item.totalScore = res[0];
        item.choiceCount = res[1];
        item.issueCount = res[2];
        item.completionCount = res[3];
        item.shortCount = res[4];
      });
      this.tableData = data;
    },
    // 计算总分
    totalScore(content) {
      let sum = 0,
        choiceCount = 0,
        completionCount = 0,
        issueCount = 0,
        shortCount = 0;
      if (content.choiceQuestion?.length > 0) {
        content.choiceQuestion.forEach((item) => {
          choiceCount += item.replyScore;
        });
      }
      if (content.completionQuestion?.length > 0) {
        content.completionQuestion.forEach(
          (item) => (completionCount += item.replyScore)
        );
      }
      if (content.issueQuestion?.length > 0) {
        content.issueQuestion.forEach(
          (item) => (issueCount += item.replyScore)
        );
      }
      if (content.shortAnswerQuestions?.length > 0) {
        content.shortAnswerQuestions.forEach(
          (item) => (shortCount += item.replyScore)
        );
      }
      sum = choiceCount + issueCount + completionCount + shortCount;
      return [sum, choiceCount, issueCount, completionCount, shortCount];
    },
    // 获取所有该教师的试卷
    async queryReviewData() {
      this.tableData = [];
      this.filterOptions[0].options = [];
      let id = JSON.parse(localStorage.getLocalStorage("userInfo"))?._id;
      let { data } = await queryAssignExamByTeaId(id);

      data.forEach((item) => {
        let examNameObj = {};
        examNameObj.label = item.content.examName;
        examNameObj.value = item.content.examName;
        this.filterOptions[0].options.push(examNameObj);
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
    height: calc(100vh - 276px)
    .el-scrollbar__wrap
      overflow-x: hidden
    th
      background-color: #e8f7ff
      color: #666
</style>
