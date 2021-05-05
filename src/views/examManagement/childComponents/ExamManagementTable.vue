<template>
  <div style="padding-top: 16px" class="exam-table">
    <el-row>
      <el-button type="primary" round @click="addExam">添加试卷</el-button>
    </el-row>
    <el-divider />
    <el-scrollbar class="exam-mannagement-scroll">
      <div class="exam-list clear-fix">
        <ExamItem
          v-for="(item, index) in examList"
          :key="index"
          :examData="item"
          @reftch="queryExamInfoList"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { queryExam } from "../../../network/exam";
import localstorage from "../../../function/localstorage";
import ExamItem from "./ExamItem";
export default {
  name: "ExamManagementTable",
  components: {
    ExamItem,
  },
  async mounted() {
    await this.queryExamInfoList();
  },
  data() {
    return {
      tea_id: null,
      examList: [],
    };
  },
  methods: {
    addExam() {
      this.$router.push("/add-exam");
    },
    async queryExamInfoList() {
      this.tea_id = JSON.parse(localstorage.getLocalStorage("userInfo"))._id;
      let res = await queryExam(this.tea_id);
      this.examList = res.data ? res.data : [];
    },
  },
};
</script>

<style lang="sass">
.exam-table
  .el-divider
    margin-top: 8px
    margin-bottom: 12px
  .exam-mannagement-scroll
    height: calc(100vh - 200px)

    width: 100%
    .el-scrollbar__wrap
      width: 100%
      overflow-x: hidden
  .el-scrollbar__view > div
    width: 100%
</style>
