<template>
  <div class="exam-center">
    <el-scrollbar class="exam-mannagement-scroll">
      <div>
        <ExamItem
          v-for="(item, index) in examList"
          :key="index"
          :examData="item"
          @click.stop.native="joinTest"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import ExamItem from "views/examManagement/childComponents/ExamItem";
import { notifyError, notifySuccess } from "function/utils";
export default {
  name: "index",
  components: {
    ExamItem,
  },
  data() {
    return {
      examList: [
        {
          id: "1212121",
          examName: "英语期末测试",
          bgImage:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          name: "coderwhh",
        },
      ],
    };
  },
  methods: {
    joinTest() {
      console.log("===>");
      this.$confirm(
        "离开或退出考试界面答题计时不停止，请不要中途离开考试界面。",
        "提示",
        {
          confirmButtonText: "进入考试",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        this.$router.push("/test");
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
    display: flex
    width: 100%
    .el-scrollbar__wrap
      width: 100%
      overflow-x: hidden
  .el-scrollbar__view > div
    display: flex
    flex-wrap: wrap
    width: 100%
    justify-content: space-between
  .wrap:hover .close
    display: none
  .is-vertical
    display: none
</style>
