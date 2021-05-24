<template>
  <div class="analysis-wrap">
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
    <div class="wrap">
      <div class="exam-analysis" v-show="showResult">
        <div id="bar" style="width: 600px; height: 400px;"></div>
        <div id="sector" style="width: 600px; height: 400px;"></div>
      </div>
      <div
        v-show="!showResult"
        style="text-align: center; color: #dcdde1; line-height: 80px; font-size: 14px; font-weight: 500"
      >
        请选择试卷名，院系，专业，年级
      </div>
    </div>
  </div>
</template>

<script>
import dataOptions from "mixins/getNation";
import localStorage from "function/localstorage";
import { queryAssignExamByTeaId, queryAnalysis } from "network/assignExam";
export default {
  name: "Echarts",
  mixins: [dataOptions],
  mounted() {
    this.queryReviewData();
  },
  methods: {
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
        data.forEach(
          (item) => (item.totalScore = this.totalScore(item.content))
        );
        this.graphicalData = [0, 0, 0, 0, 0];
        data.forEach((item) => {
          if (item.totalScore < 20) {
            this.graphicalData[0] = this.graphicalData[0] + 1;
          } else if (item.totalScore >= 20 && item.totalScore < 40) {
            this.graphicalData[1] = this.graphicalData[1] + 1;
          } else if (item.totalScore >= 40 && item.totalScore < 60) {
            this.graphicalData[2] = this.graphicalData[2] + 1;
          } else if (item.totalScore >= 60 && item.totalScore < 80) {
            this.graphicalData[3] = this.graphicalData[3] + 1;
          } else if (item.totalScore >= 80) {
            this.graphicalData[4] = this.graphicalData[4] + 1;
          }
        });

        this.barCharts();
        this.sectorCharts();
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
    // 条形统计图
    barCharts() {
      var myChart = this.$echarts.init(document.getElementById("bar"));
      //配置图表
      var option = {
        title: {
          text: "成绩统计条形图",
        },
        tooltip: {},
        legend: {
          data: ["人数"],
        },
        xAxis: {
          data: ["0-20分", "20-40分", "40-60分", "60-80分", "80-100+分"],
        },
        yAxis: {},
        series: [
          {
            name: "人数",
            type: "bar",
            data: this.graphicalData,
          },
        ],
        color: ["#19aaf8"],
      };
      myChart.setOption(option);
    },
    // 扇形统计图
    sectorCharts() {
      var myChart = this.$echarts.init(document.getElementById("sector"));
      myChart.setOption({
        title: {
          text: "成绩扇形统计图",
        },
        series: [
          {
            name: "访问来源",
            type: "pie", // 设置图表类型为饼图
            radius: "60%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [
              // 数据数组，name 为数据项名称，value 为数据项值
              { value: this.graphicalData[0], name: "0-20分" },
              { value: this.graphicalData[1], name: "20-40分" },
              { value: this.graphicalData[2], name: "40-60分" },
              { value: this.graphicalData[3], name: "60-80分" },
              { value: this.graphicalData[4], name: "80-100+分" },
            ],
            label: {
              normal: {
                show: true,
                formatter: "{b}:{c}" + "\n\r" + "({d}%)",
              },
            },
            color: ["#2e86de", "#FD687A", "#F3A74C", "#36CFC9", "#10ac84"],
          },
        ],
      });
    },
    // 清除筛选
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
  },
  data() {
    return {
      showResult: false,
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
      graphicalData: [0, 0, 0, 0, 0],
    };
  },
};
</script>

<style lang="sass">
.analysis-wrap
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
  .exam-analysis
    display: flex
    justify-content: space-between
</style>
