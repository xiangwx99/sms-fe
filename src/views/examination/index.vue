<template>
  <div class="exam-center">
    <el-scrollbar class="exam-mannagement-scroll">
      <div>
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
import { queryExam } from "../../network/exam";
import localstorage from "../../function/localstorage";
import ExamItem from "views/examManagement/childComponents/ExamItem";
import { notifyError, notifySuccess } from "function/utils";
export default {
  name: "index",
  components: {
    ExamItem,
  },
  async mounted() {
    this.tea_id = JSON.parse(localstorage.getLocalStorage("userInfo"))._id;
    let res = await queryExam(this.tea_id);
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
