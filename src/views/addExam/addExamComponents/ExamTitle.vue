<template>
  <div style="color: #A8A8B3; fontSize: 14px">
    <div>
      <span style="margin-right: 8px">题量</span>
      <span>{{totalQuestions}}，</span>
      <span style="margin: 0 8px">总分</span>
      <span>{{90}}</span>
    </div>
    <div v-for="(itemx, index) in subjectType" :key="itemx">
      <div style="lineHeight: 32px; color: #181E33">
        <span>{{subjectNum(index + 1) + '、' + $t("subjectType." + itemx)}}（</span>
        <span>共{{showSubject[itemx].length}}题，10分）</span>

      </div>
      <ul>
        <li v-for="(itemy, indey) in showSubject[itemx]" 
            :key="indey" 
            style="lineHeight: 32px;">
          {{indey + 1}}{{itemy}}
        </li>
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
      totalQuestionsScore: 0  
    }
  },
  mounted() {
     this.$EventBus.$on('addSubjects', (subjectContent) => {
       this.addSubjects(subjectContent)
     })
  },
  methods: {
    addSubjects(subjectContent) {
      this.showSubject = subjectContent
      this.subjectType = Object.keys(this.showSubject)
      this.totalAboutQuestions()
      console.log(subjectContent);
    },
    subjectNum(num) {
      let serialNum = "一"
      switch (num) {
        case 2:
          serialNum = "二"
          break;
        case 3:
          serialNum = "三"
          break;
        case 4:
          serialNum = "四"
          break;
        case 5:
          serialNum = "五"
          break;
        default:
          break;
      }
      return serialNum
    },
    totalAboutQuestions() {
      this.totalQuestions = 0
      for(let key of this.subjectType) {
        this.totalQuestions += this.showSubject[key].length
        for(let j in this.showSubject[key]) {

        }
      }
    }
  }
};
</script>

<style></style>
