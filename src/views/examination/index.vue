<template>
  <div class="exam-center">
    <el-scrollbar class="exam-mannagement-scroll">
      <div>
        <ExamItem
          v-for="(item, index) in examList"
          :key="index"
          :examData="item"
          @click.stop.native="joinTest(item._id)"
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
  methods: {
    joinTest(id) {
      console.log(id);
      this.$confirm(
        "离开或退出考试界面答题计时不停止，请不要中途离开考试界面。",
        "提示",
        {
          confirmButtonText: "进入考试",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        window.open(`/test?_id=${id}`, "_blank");
      });
    },
  },
};
</script>

<style lang="sass">
.exam-center
  padding-top: 20px
  .exam-mannagement-scroll
    height: calc(100vh - 200px)

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
</style>
