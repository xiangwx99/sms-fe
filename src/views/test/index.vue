<template>
  <div class="test">
    <div class="nav_top">考试</div>
    <!-- <div class="title">期末考试-计算机网络</div> -->
    <div
      class="wrap"
      style="width: 1100px; margin: 0 auto; height: calc(100vh - 40px)"
    >
      <div class="head_top clear-fix">
        <div class="left" style="padding: 20px 0 0 40px; color: #181E33;">
          <h2>{{ exam.examName }}</h2>
          <div style="line-height: 32px; font-size: 14px; color: #A8A8B3;">
            题量：{{ 1 }} 总分：{{ 2 }}
          </div>
        </div>
        <div class="right">
          <div class="clock">
            <i class="el-icon-alarm-clock" style="font-size: 24px"></i>
            <span
              ><span style="font-size: 20px">倒计时：</span
              >{{ day > 0 ? day : ""
              }}<span style="font-size: 20px">{{ day > 0 ? "天" : "" }}</span
              >{{ hour }}:{{ min }}:{{ second }}</span
            >
          </div>
        </div>
      </div>
      <div style="display: flex; height: calc(100vh - 140px)">
        <div class="content">
          <el-scrollbar class="scroll">
            <!-- <div style="height: 1000px"></div> -->
            <el-row style="padding: 30px 20px 0 24px">
              <!-- 单选题 -->
              <el-row v-if="activeType === '单选题'">
                <el-row
                  style="color: #181E33; font-weight: 500; margin-bottom: 30px"
                  v-show="exam.choiceQuestion.length > 0"
                  >单选题（共{{ exam.choiceQuestion.length }}题，{{
                    countChoice
                  }}分）</el-row
                >
                <div>
                  <div
                    style="color: #181E33; font-size: 14px; line-height: 20px"
                  >
                    <span>{{ activeIndex + 1 }}.</span>
                    <span style="color: #A8A8B3;"
                      >({{
                        exam.choiceQuestion[activeIndex].type +
                          "，" +
                          exam.choiceQuestion[activeIndex].score +
                          "分"
                      }})</span
                    >
                    <span>{{ exam.choiceQuestion[activeIndex].question }}</span>
                  </div>
                  <ul class="choose_list" style="margin-top: 16px">
                    <li
                      v-for="(item, index) in exam.choiceQuestion[activeIndex]
                        .options"
                      :key="index"
                      class="clear-fix"
                      style="margin: 5px 0 10px 0"
                    >
                      <div
                        class="left"
                        style="line-height: 38px; margin-right: 10px; width: 40px"
                      >
                        <el-radio
                          v-model="exam.choiceQuestion[activeIndex].replyAnswer"
                          :label="item.label"
                        >
                          {{ item.label }}
                        </el-radio>
                      </div>
                      <div
                        class="right"
                        style="line-height: 38px; font-size: 14px; color: #181E33; text-align: left; width: calc(100% - 50px)"
                      >
                        {{ item.value }}
                      </div>
                    </li>
                  </ul>
                </div>
              </el-row>
              <!-- 判断题 -->
              <el-row v-if="activeType === '判断题'">
                <el-row
                  style="color: #181E33; font-weight: 500; margin-bottom: 30px"
                  v-show="exam.issueQuestion.length > 0"
                  >判断题（共{{ exam.issueQuestion.length }}题，{{
                    countChoice
                  }}分）</el-row
                >
                <div>
                  <div
                    style="color: #181E33; font-size: 14px; line-height: 20px"
                  >
                    <span>{{ activeIndex + 1 }}.</span>
                    <span style="color: #A8A8B3;"
                      >({{
                        exam.issueQuestion[activeIndex].type +
                          "，" +
                          exam.issueQuestion[activeIndex].score +
                          "分"
                      }})</span
                    >
                    <span>{{ exam.issueQuestion[activeIndex].question }}</span>
                  </div>
                  <ul class="choose_list" style="margin-top: 16px">
                    <li
                      v-for="(item, index) in exam.issueQuestion[activeIndex]
                        .options"
                      :key="index"
                      class="clear-fix"
                      style="margin: 5px 0 10px 0"
                    >
                      <div
                        class="left"
                        style="line-height: 38px; margin-right: 10px; width: 40px"
                      >
                        <el-radio
                          v-model="exam.issueQuestion[activeIndex].replyAnswer"
                          :label="item.label"
                        >
                          {{ item.label }}
                        </el-radio>
                      </div>
                      <div
                        class="right"
                        style="line-height: 38px; font-size: 14px; color: #181E33; text-align: left; width: calc(100% - 50px)"
                      >
                        {{ item.value }}
                      </div>
                    </li>
                  </ul>
                </div>
              </el-row>
              <!-- 填空题 -->
              <el-row v-if="activeType === '填空题'">
                <el-row
                  style="color: #181E33; font-weight: 500; margin-bottom: 30px"
                  v-show="exam.completionQuestion.length > 0"
                  >填空题（共{{ exam.completionQuestion.length }}题，{{
                    countIssue
                  }}分）</el-row
                >
                <div>
                  <div
                    style="color: #181E33; font-size: 14px; line-height: 20px"
                  >
                    <span>{{ activeIndex + 1 }}.</span>
                    <span style="color: #A8A8B3;"
                      >({{
                        exam.completionQuestion[activeIndex].type +
                          "，" +
                          exam.completionQuestion[activeIndex].score +
                          "分"
                      }})</span
                    >
                    <span>{{
                      exam.completionQuestion[activeIndex].question
                    }}</span>
                  </div>
                </div>
              </el-row>
            </el-row>
          </el-scrollbar>
        </div>
        <div class="serial_number">
          <el-scrollbar class="scroll">
            <el-row v-show="exam.choiceQuestion.length > 0">
              <el-col class="serial">单选题（{{ 20 }}分）</el-col>
              <ul class="clear-fix" style="padding: 0 20px">
                <li
                  v-for="(item, index) in exam.choiceQuestion"
                  :key="index"
                  :class="{
                    'serial_btn left': true,
                    active: activeIndex === index && activeType === '单选题',
                  }"
                  @click="handleClick(index, '单选题')"
                >
                  {{ index + 1 }}
                </li>
              </ul>
            </el-row>
            <el-row v-show="exam.issueQuestion.length > 0">
              <el-col class="serial">判断题（{{ 20 }}分）</el-col>
              <ul class="clear-fix" style="padding: 0 20px">
                <li
                  v-for="(item, index) in exam.issueQuestion"
                  :key="index"
                  :class="{
                    'serial_btn left': true,
                    active: activeIndex === index && activeType === '判断题',
                  }"
                  @click="handleClick(index, '判断题')"
                >
                  {{ index + 1 }}
                </li>
              </ul>
            </el-row>
            <el-row v-show="exam.completionQuestion.length > 0">
              <el-col class="serial">填空题（{{ 20 }}分）</el-col>
              <ul class="clear-fix" style="padding: 0 20px">
                <li
                  v-for="(item, index) in exam.completionQuestion"
                  :key="index"
                  :class="{
                    'serial_btn left': true,
                    active: activeIndex === index && activeType === '填空题',
                  }"
                  @click="handleClick(index, '填空题')"
                >
                  {{ index + 1 }}
                </li>
              </ul>
            </el-row>
            <el-row v-show="exam.shortAnswerQuestions.length > 0">
              <el-col class="serial">简答题（{{ 20 }}分）</el-col>
              <ul class="clear-fix" style="padding: 0 20px">
                <li
                  v-for="(item, index) in exam.shortAnswerQuestions"
                  :key="index"
                  :class="{
                    'serial_btn left': true,
                    active: activeIndex === index && activeType === '简答题',
                  }"
                  @click="handleClick(index, '简答题')"
                >
                  {{ index + 1 }}
                </li>
              </ul>
            </el-row>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  mounted() {
    let time = new Date().getTime() + 1000 * this.exam.lengthOfExamination * 60;
    this.curStartTime = new Date(time);
    this.countTime();
  },
  data() {
    return {
      activeType: "单选题",
      activeIndex: 0,
      // 倒计时相关
      curStartTime: new Date(),
      day: "0",
      hour: "00",
      min: "00",
      second: "00",
      // 试卷内容
      exam: {
        examName: "数据结构期末考试",
        lengthOfExamination: 90,
        choiceQuestion: [
          {
            type: "单选题",
            score: "5",
            question: "1+1等于多少?",
            questionHtml: "",
            options: [
              {
                label: "A",
                value: "1",
                valueHTML: "",
              },
              { label: "B", value: "2", valueHTML: "" },
              { label: "C", value: "3", valueHTML: "" },
              { label: "D", value: "4", valueHTML: "" },
            ],
            // 答案以及解析
            answer: "A",
            answerdDetail: "",
            answerdDetailHTML: "",
            // 学生解答相关
            replyScore: 0,
            replyAnswer: "A",
            replyAnswerHtml: "",
          },
          {
            type: "单选题",
            score: "10",
            question: "1+2等于多少?",
            questionHtml: "",
            options: [
              {
                label: "A",
                value: "1",
                valueHTML: "",
              },
              { label: "B", value: "66", valueHTML: "" },
              { label: "C", value: "77", valueHTML: "" },
              { label: "D", value: "4", valueHTML: "" },
            ],
            // 答案以及解析
            answer: "A",
            answerdDetail: "",
            answerdDetailHTML: "",
            // 学生解答相关
            replyScore: 0,
            replyAnswer: "A",
            replyAnswerHtml: "",
          },
        ],
        issueQuestion: [
          {
            type: "判断题",
            score: "12",
            question: "'我思故我在'是著名哲学家笛卡尔说的话。",
            questionHtml: "",
            options: [
              { label: "A", value: "对" },
              { label: "B", value: "错" },
            ],
            // 答案以及解析
            answer: "A",
            answerdDetail: "",
            answerdDetailHTML: "",
            // 学生解答相关
            replyScore: 0,
            replyAnswer: "",
            replyAnswerHtml: "",
          },
          {
            type: "判断题",
            score: "2",
            question: "1+1等于3。",
            questionHtml: "",
            options: [
              { label: "A", value: "对" },
              { label: "B", value: "错" },
            ],
            // 答案以及解析
            answer: "A",
            answerdDetail: "",
            answerdDetailHTML: "",
            // 学生解答相关
            replyScore: 0,
            replyAnswer: "",
            replyAnswerHtml: "",
          },
          {
            type: "判断题",
            score: "3",
            question: "3+3等于6+6-9。",
            questionHtml: "",
            options: [
              { label: "A", value: "对" },
              { label: "B", value: "错" },
            ],
            // 答案以及解析
            answer: "A",
            answerdDetail: "",
            answerdDetailHTML: "",
            // 学生解答相关
            replyScore: 0,
            replyAnswer: "",
            replyAnswerHtml: "",
          },
        ],
        completionQuestion: [{}, {}, {}, {}, {}, {}],
        shortAnswerQuestions: [{}, {}, {}, {}, {}, {}],
      },
    };
  },
  methods: {
    // 倒计时
    countTime() {
      // 获取当前时间
      let date = new Date();
      let now = date.getTime();
      // 设置截止时间
      let endDate = new Date(this.curStartTime); // this.curStartTime需要倒计时的日期
      let end = endDate.getTime();
      // 时间差
      let leftTime = end - now;
      // 定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        // 天
        this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        // 时
        let h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.hour = h < 10 ? "0" + h : h;
        // 分
        let m = Math.floor((leftTime / 1000 / 60) % 60);
        this.min = m < 10 ? "0" + m : m;
        // 秒
        let s = Math.floor((leftTime / 1000) % 60);
        this.second = s < 10 ? "0" + s : s;
      } else {
        this.day = 0;
        this.hour = "00";
        this.min = "00";
        this.second = "00";
      }
      // 等于0的时候不调用
      if (
        Number(this.hour) === 0 &&
        Number(this.day) === 0 &&
        Number(this.min) === 0 &&
        Number(this.second) === 0
      ) {
        console.log("==========>考试结束");
        return;
      } else {
        // 递归每秒调用countTime方法，显示动态时间效果,
        setTimeout(this.countTime, 1000);
      }
    },
    // active
    handleClick(index, type) {
      this.activeType = type;
      this.activeIndex = index;
      console.log(index, type);
    },
  },
  computed: {
    // 选择题总分
    countChoice() {
      let total = 0;
      this.exam.choiceQuestion.forEach((obj) => {
        total += obj.score * 1;
      });
      return total;
    },
    // 判断题总分
    countIssue() {
      let total = 0;
      this.exam.issueQuestion.forEach((obj) => {
        total += obj.score * 1;
      });
      return total;
    },
  },
};
</script>

<style lang="sass">
.test
  .title
  .nav_top
    height: 40px
    background: #3A4357
    text-align: center
    line-height: 40px
    color: #fff
  .wrap
    .head_top
      height: 100px
      padding-bottom: 20px
      border: 1px solid rgb(242, 242, 242)
      border-width: 0 0 1px 0
      border-bottom: 1px solid #F2F2F2
      .right
        width: 25%
      .clock
        text-align: left
        width: 100%
        padding-top: 20px
        padding-left: 12px
        line-height: 48px
        font-size: 24px
        color: #646873
        font-weight: 500
    .content
      width: 75%
      // background: #ececec
      border-right: 1px solid #F2F2F2
    .serial_number
      width: 25%
      // background: #ececec
    .scroll
      height: calc(100vh - 140px)
      .el-scrollbar__wrap
        overflow-x: hidden
    .serial
      padding: 20px
      line-height: 20px
      color: #181E33
    .serial_btn
      width: 32px
      height: 32px
      line-height: 32px
      border-radius: 5px
      border: 1px solid #94C1FF
      text-align: center
      color: #3A8BFF
      margin: 0 12px 12px 0
      cursor: pointer
    .serial_btn.active
      color: #fff
      background-color: #3A8BFF
  .el-radio__inner
    width: 36px
    height: 36px
  .choose_list
    position: relative
  .el-radio__label
    position: absolute
    left: 3px
    top: 12px
    color: #646873
  .el-radio__input.is-checked .el-radio__inner
    background: #fff
  .is-checked
    .el-radio__label
      color: #409EFF
</style>
