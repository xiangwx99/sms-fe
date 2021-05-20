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
        <el-select v-model="filterOptions[0].value" placeholder="试卷名">
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

        <el-select v-model="filterOptions[2].value" placeholder="专业">
          <el-option
            v-for="item in majorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-select v-model="filterOptions[3].value" placeholder="年级">
          <el-option
            v-for="item in filterOptions[3].options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="filterOptions[4].value" multiple placeholder="班级">
          <el-option
            v-for="item in filterOptions[4].options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <div class="exam-analysis">
      <div id="bar" style="width: 600px; height: 400px;"></div>
      <div id="sector" style="width: 600px; height: 400px;"></div>
    </div>
  </div>
</template>

<script>
import dataOptions from "mixins/getNation";

export default {
  name: "Echarts",
  mixins: [dataOptions],
  mounted() {
    this.barCharts();
    this.sectorCharts();
  },
  methods: {
    changeMajor() {
      this.filterOptions[2].value = "";
      console.log(this.filterOptions[1].value);
      this.departmentOptions.forEach((item, index) => {
        if (item.value === this.filterOptions[1].value) {
          this.majorOptions = this.departmentOptions[index].majorOptions;
        }
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
            data: [5, 20, 3, 10, 100],
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
              { value: 1, name: "0-20分" },
              { value: 2, name: "20-40分" },
              { value: 3, name: "40-60分" },
              { value: 4, name: "60-80分" },
              { value: 5, name: "80-100+分" },
            ],
            label: {
              normal: {
                show: true,
                formatter: "{b}:{c}" + "\n\r" + "({d}%)",
              },
            },
            color: ["red", "#FD687A", "#F3A74C", "#36CFC9", "#51AB45"],
          },
        ],
      });
    },
    // 清除筛选
    clearFilter() {
      this.majorOptions = [];
      this.filterOptions.forEach((item) => {
        if (Array.isArray(item.value)) {
          item.value = [];
        } else {
          item.value = "";
        }
      });
    },
  },
  data() {
    return {
      majorOptions: [],
      filterOptions: [
        {
          label: "试卷名",
          options: [
            { value: "选项1", label: "黄金糕" },
            { value: "选项2", label: "双皮奶" },
          ],
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
