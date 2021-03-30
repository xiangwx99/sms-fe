<template>
  <div class="add-exam">
    <div class="header">
      <div style="flex: 1; backgroundColor: #3A4357">新建试卷</div>
      <div class="finished" @click="addExam()">完成</div>
    </div>
    <div class="content">
      <el-card class="content-top">
        <el-input type="text" v-model="examName" @change="changeExamName" />
      </el-card>
      <el-row class="clear-fix">
        <el-card class="content-left left"><ExamTitle /></el-card>
        <div style="height: 1109px" class="content-right right">
          <ExamContent />
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import ExamContent from "./addExamComponents/ExamContent";
import ExamTitle from "./addExamComponents/ExamTitle";
export default {
  name: "AddExam",
  components: {
    ExamContent,
    ExamTitle,
  },
  data() {
    return {
      examName: "数据结构期末测试",
    };
  },
  methods: {
    addExam() {
      console.log("===> 完成");
    },
    changeExamName() {
      console.log("====> 改变试卷名:" + this.examName);
    },
  },
};
</script>

<style lang="sass">
.add-exam
  .el-card__body
    padding: 0
  .header
    line-height: 40px
    text-align: center
    display: flex
    color: #fff
    .finished
      width: 100px
      background-color: #409EFF
      cursor: pointer
  .content
    width: 1200px
    margin: 0 auto
  .content-shadow
    box-shadow: 0px 2px 10px 0px rgb(237 238 240 / 50%)
    border-radius: 8px
  .content-top
    border-radius: 8px
    padding: 24px
    margin: 20px 0
    .el-input__inner
      color: #000
      border: none
    .el-input__inner:hover
      border: 1px solid #C0C4CC
  .content-left
    width: 25%
    margin-right: 20px
    min-height: 1269px
    padding: 12px 0 0 16px
  .content-right
    width: 73%
</style>
