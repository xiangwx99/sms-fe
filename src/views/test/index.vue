<template>
  <div class="test">
    <div class="clear-fix">
      <div class="nav_top left">考试</div>
      <div
        class="right"
        style="width: 10%; line-height: 40px; text-align: center; background: #409EFF; cursor: pointer; color: #fff"
        @click="finishTest"
      >
        交卷
      </div>
    </div>
    <!-- <div class="title">期末考试-计算机网络</div> -->
    <div
      class="wrap"
      style="width: 1100px; margin: 0 auto; height: calc(100vh - 40px)"
    >
      <div class="head_top clear-fix">
        <div class="left" style="padding: 20px 0 0 30px; color: #181E33;">
          <h2>{{ exam.examName }}</h2>
          <div style="line-height: 32px; font-size: 14px; color: #A8A8B3;">
            题量：{{ countNum }} 总分：{{ countTest }}
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
                    countCompletion
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
                <el-col style="margin-top: 16px">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    placeholder="请输入内容，多个空格使用‘&$&’分割开来"
                    v-model="exam.completionQuestion[activeIndex].replyAnswer"
                  >
                  </el-input>
                </el-col>
              </el-row>
              <!-- 简答题 -->
              <el-row v-if="activeType === '简答题'">
                <el-row
                  style="color: #181E33; font-weight: 500; margin-bottom: 30px"
                  v-show="exam.shortAnswerQuestions.length > 0"
                  >简答题（共{{ exam.shortAnswerQuestions.length }}题，{{
                    countShortAnswer
                  }}分）</el-row
                >
                <div>
                  <div
                    style="color: #181E33; font-size: 14px; line-height: 20px"
                  >
                    <span>{{ activeIndex + 1 }}.</span>
                    <span style="color: #A8A8B3;"
                      >({{
                        exam.shortAnswerQuestions[activeIndex].type +
                          "，" +
                          exam.shortAnswerQuestions[activeIndex].score +
                          "分"
                      }})</span
                    >
                    <span>{{
                      exam.shortAnswerQuestions[activeIndex].question
                    }}</span>
                  </div>
                </div>
                <el-col style="margin-top: 16px">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    placeholder="请输入答案"
                    v-model="exam.shortAnswerQuestions[activeIndex].replyAnswer"
                  >
                  </el-input>
                </el-col>
              </el-row>
            </el-row>
          </el-scrollbar>
        </div>
        <div class="serial_number">
          <el-scrollbar class="scroll">
            <el-row v-show="exam.choiceQuestion.length > 0">
              <el-col class="serial">单选题（{{ countChoice }}分）</el-col>
              <ul class="clear-fix" style="padding: 0 20px">
                <li
                  v-for="(item, index) in exam.choiceQuestion"
                  :key="index"
                  :class="{
                    'serial_btn left': true,
                    active: activeIndex === index && activeType === '单选题',
                    finished: exam.choiceQuestion[index].replyAnswer,
                  }"
                  @click="handleClick(index, '单选题')"
                >
                  {{ index + 1 }}
                </li>
              </ul>
            </el-row>
            <el-row v-show="exam.issueQuestion.length > 0">
              <el-col class="serial">判断题（{{ countIssue }}分）</el-col>
              <ul class="clear-fix" style="padding: 0 20px">
                <li
                  v-for="(item, index) in exam.issueQuestion"
                  :key="index"
                  :class="{
                    'serial_btn left': true,
                    active: activeIndex === index && activeType === '判断题',
                    finished: exam.issueQuestion[index].replyAnswer,
                  }"
                  @click="handleClick(index, '判断题')"
                >
                  {{ index + 1 }}
                </li>
              </ul>
            </el-row>
            <el-row v-show="exam.completionQuestion.length > 0">
              <el-col class="serial">填空题（{{ countCompletion }}分）</el-col>
              <ul class="clear-fix" style="padding: 0 20px">
                <li
                  v-for="(item, index) in exam.completionQuestion"
                  :key="index"
                  :class="{
                    'serial_btn left': true,
                    active: activeIndex === index && activeType === '填空题',
                    finished: exam.completionQuestion[index].replyAnswer,
                  }"
                  @click="handleClick(index, '填空题')"
                >
                  {{ index + 1 }}
                </li>
              </ul>
            </el-row>
            <el-row v-show="exam.shortAnswerQuestions.length > 0">
              <el-col class="serial">简答题（{{ countShortAnswer }}分）</el-col>
              <ul class="clear-fix" style="padding: 0 20px">
                <li
                  v-for="(item, index) in exam.shortAnswerQuestions"
                  :key="index"
                  :class="{
                    'serial_btn left': true,
                    active: activeIndex === index && activeType === '简答题',
                    finished: exam.shortAnswerQuestions[index].replyAnswer,
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
import $ from "jquery";
import {
  queryAssignExamById,
  updateAssignExamById,
} from "../../network/assignExam";
import { notifyError, notifySuccess } from "function/utils";
export default {
  name: "Test",
  async mounted() {
    this.id = this.$route.query._id;
    await this.queryExamById(this.id);

    // 屏蔽鼠标右键
    document.oncontextmenu = function() {
      return false;
    };
    let blurNum = 1;
    let that = this;
    // $(window).on("blur resize", function() {
    //   if (blurNum > 3) {
    //     alert("你已经违规3次，考试结束！");
    //     that.$router.push("/");
    //   } else {
    //     alert("考试中切换窗口违规" + blurNum + "次！");
    //   }
    //   blurNum++;
    // });

    // $(window).on("beforeunload", function() {
    //   return "离开此页面将退出考试!";
    // });
  },
  data() {
    return {
      id: null,
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
        examName: "考试",
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
        ],
        completionQuestion: [
          {
            type: "填空题",
            score: "3",
            question: "四大名著有____,____,_____,______?",
            questionHtml: "",
            // 答案以及解析
            answer: "",
            answerdDetail: "",
            answerdDetailHTML: "",
            // 学生解答相关
            replyScore: 0,
            replyAnswer: "",
            replyAnswerHtml: "",
          },
        ],
        shortAnswerQuestions: [
          {
            type: "简答题",
            score: "2",
            question: "什么情况下🐴会吃掉翔？",
            questionHtml: "",
            // 答案
            answer: "",
            // 解析
            answerdDetail: "",
            answerdDetailHTML: "",
            // 学生解答相关
            replyScore: 0,
            replyAnswer: "",
            replyAnswerHtml: "",
          },
        ],
      },
      examInfo: null,
    };
  },
  methods: {
    // 试卷数据
    async queryExamById(id) {
      let res = await queryAssignExamById(id);
      this.exam = res.data.content;
      this.examInfo = res.data;
      this.curStartTime = new Date(res.data.time[1]);
      this.countTime();
    },
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
    // 交卷
    async finishTest() {
      this.exam.choiceQuestion.forEach((item, index) => {
        if (item.answer == item.replyAnswer) {
          this.exam.choiceQuestion[index].replyScore = item.score;
        }
      });
      this.exam.issueQuestion.forEach((item, index) => {
        if (item.answer == item.replyAnswer) {
          this.exam.issueQuestion[index].replyScore = item.score;
        }
      });
      this.examInfo.content = this.exam;
      // 试卷需要教师审批之后才可以变为完成状态
      // pending => 初始
      // half => 学生提交 => 此时学生不可以观看试卷答题情况
      // finished => 完成
      this.examInfo.status = "half";
      let res = await updateAssignExamById(
        this.examInfo._id,
        this.examInfo.status,
        this.examInfo.content
      );
      if (res.success) {
        notifySuccess(this.$message, "试卷提交成功");
      } else {
        notifyError(this.$message, "试卷提交失败");
      }
      this.$router.push("/examination");
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
    // 填空题总分
    countCompletion() {
      let total = 0;
      this.exam.completionQuestion.forEach((obj) => {
        total += obj.score * 1;
      });
      return total;
    },
    // 简答题总分
    countShortAnswer() {
      let total = 0;
      this.exam.shortAnswerQuestions.forEach((obj) => {
        total += obj.score * 1;
      });
      return total;
    },
    // 总分
    countTest() {
      return (
        this.countChoice +
        this.countIssue +
        this.countCompletion +
        this.countShortAnswer
      );
    },
    countNum() {
      return (
        this.exam.choiceQuestion.length +
        this.exam.issueQuestion.length +
        this.exam.completionQuestion.length +
        this.exam.shortAnswerQuestions.length
      );
    },
  },
  beforeDestroy() {
    $(window).off("blur resize beforeunload");
  },
};
</script>

<style lang="sass">
.test
  .nav_top
    height: 40px
    background: #3A4357
    text-align: center
    line-height: 40px
    color: #fff
    width: 90%
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
      position: relative
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
  .finished:before
    position: absolute
    content: '',
    display: inline-block
    width: 4px
    height: 4px
    border-radius: 50%
    background-color: #4cd137
    top: -4px
    right: -4px
</style>
