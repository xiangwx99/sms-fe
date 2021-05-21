<template>
  <div class="exam-center">
    <el-scrollbar class="exam-mannagement-scroll">
      <div class="exam-list">
        <ExamItem
          v-for="(item, index) in examList"
          :key="index"
          :examData="item"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { queryAssignExam } from "../../network/assignExam";
import localstorage from "../../function/localstorage";
import ExamItem from "views/examManagement/childComponents/ExamItem";
import { notifyError, notifySuccess } from "function/utils";
export default {
  name: "index",
  components: {
    ExamItem,
  },
  async mounted() {
    this.stu_id = JSON.parse(localstorage.getLocalStorage("userInfo"))._id;
    let res = await queryAssignExam(this.stu_id);
    this.examList = res.data ? res.data : [];
  },
  data() {
    return {
      examList: [],
    };
  },
};
</script>

<style lang="sass">
.exam-center
  padding-top: 20px
  .exam-list
    width: 100%
    display: grid
    justify-content: space-between
    grid-template-columns: repeat(auto-fill, 240px)
    grid-gap: 0 32px
  .exam-mannagement-scroll
    height: calc(100vh - 140px)

    width: 100%
    .el-scrollbar__wrap
      width: 100%
      overflow-x: hidden
  .el-scrollbar__view > div
    width: 100%
  .wrap:hover .close
    display: none
  .is-vertical
    display: none
  .exam-item
    cursor: pointer
  .exam-item:hover
    .more
      display: none
.el-message-box
  border-radius: 10px
</style>
