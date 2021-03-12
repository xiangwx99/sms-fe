<template>
  <div style="padding-top: 16px" class="exam-table">
    <el-row>
      <el-button type="primary" round>添加试卷</el-button>
      <el-select v-model="value" placeholder="请选择" style="margin-left: 20px">
        <el-option
          v-for="item in classOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span style="margin: 0 16px; color: #606266">状态</span>
      <el-radio-group v-model="status">
        <el-radio label="all">全部</el-radio>
        <el-radio label="start">开始</el-radio>
        <el-radio label="end">结束</el-radio>
      </el-radio-group>
    </el-row>
    <el-divider />
    <el-scrollbar
      style="height: calc(100vh - 200px); display: flex; width: 100%"
    >
      <div>
        <ExamItem v-for="item in examList" :key="item.id" :examData="item" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import ExamItem from "./ExamItem";
export default {
  name: "ExamManagementTable",
  components: {
    ExamItem,
  },
  data() {
    return {
      classOptions: [
        {
          value: "全部班级",
          label: "全部班级",
        },
        {
          value: "1班",
          label: "1班",
        },
        {
          value: "2班",
          label: "2班",
        },
      ],
      value: "全部班级",
      status: "all",
      examList: [
        {
          id: "1212121",
          examName: "英语期末测试",
          bgImage:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          name: "coderwhh",
          grade: "2017级",
          class: "1班",
        },
      ],
    };
  },
};
</script>

<style lang="sass">
.exam-table
  .el-divider
    margin: 16px 0
  .el-scrollbar__wrap
    width: 100%
  .el-scrollbar__view > div
    display: flex
    flex-wrap: wrap
    width: 100%
    justify-content: space-between
</style>
