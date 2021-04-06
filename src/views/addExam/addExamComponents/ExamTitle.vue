<template>
  <div style="color: #A8A8B3; fontSize: 14px" class="question-list">
    <div>
      <span style="margin-right: 8px">题量</span>
      <span>{{ totalQuestions }}，</span>
      <span style="margin: 0 8px">总分</span>
      <span>{{ totalQuestionsScore }}</span>
    </div>
    <div v-for="(itemx, index) in subjectType" :key="itemx">
      <div style="lineHeight: 32px; color: #181E33">
        <span>{{ subjectNum(index + 1) + "、" + itemx }}（</span>
        <span
          >共{{ showSubject[itemx].length }}题，{{
            getSingleTotalScore(showSubject[itemx])
          }}分）</span
        >
      </div>
      <ul>
        <el-row
          class="question-item"
          v-for="(itemy, indey) in showSubject[itemx]"
          :key="indey"
          style="lineHeight: 32px;"
          @click.native="questionItemClick(itemy)"
        >
          <el-col :span="2">{{ indey + 1 }}.</el-col>
          <el-col :span="10" class="question">{{ itemy.question }}</el-col>
          <el-col :span="5">({{ itemy.score ? itemy.score : 0 }}分)</el-col>
        </el-row>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExamContent",
  data() {
    return {
      subjectType: [],
      showSubject: {},
      totalQuestions: 0,
      totalQuestionsScore: 0,
    };
  },
  mounted() {
    this.$EventBus.$on("addSubjects", (subjectContent) => {
      this.addSubjects(subjectContent);
    });
  },

  methods: {
    addSubjects(subjectContent) {
      this.showSubject = subjectContent;
      this.subjectType = Object.keys(this.showSubject);
      this.totalAboutQuestions();
    },
    subjectNum(num) {
      let serialNum = "一";
      switch (num) {
        case 2:
          serialNum = "二";
          break;
        case 3:
          serialNum = "三";
          break;
        case 4:
          serialNum = "四";
          break;
        case 5:
          serialNum = "五";
          break;
        default:
          break;
      }
      return serialNum;
    },
    getSingleTotalScore(arr) {
      let sum = 0;
      arr.forEach((el) => {
        let score = el.score ? el.score * 1 : 0;
        sum += score;
      });
      return sum;
    },
    questionItemClick(obj) {
      this.$EventBus.$emit("showQuestion", obj);
    },
    totalAboutQuestions() {
      this.totalQuestions = 0;
      this.totalQuestionsScore = 0;
      for (let key of this.subjectType) {
        this.totalQuestions += this.showSubject[key].length;
        for (let j in this.showSubject[key]) {
          let score = this.showSubject[key][j]["score"]
            ? this.showSubject[key][j]["score"] * 1
            : 0;
          this.totalQuestionsScore = score + this.totalQuestionsScore;
        }
      }
    },
  },
};
</script>

<style lang="sass">
.question-list
  .question-item
    cursor: pointer
  .question-item:hover
    background-color: #F0F6FF
    color: #3A8BFF
  .question
    width: 110px
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    margin-right: 12px
</style>
