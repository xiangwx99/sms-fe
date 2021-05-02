<template>
  <div class="add-exam">
    <div class="header">
      <div style="flex: 1; backgroundColor: #3A4357">新建试卷</div>
      <div class="finished" @click="addExam()">完成</div>
    </div>
    <div class="content">
      <el-card class="content-top">
        <el-input type="text" v-model="exam.examName" />
      </el-card>
      <el-row class="clear-fix">
        <el-card class="content-left left">
          <el-row style="font-size: 14px; color: #A8A8B3">{{
            questionTotal
          }}</el-row>
          <el-row v-if="exam.choiceQuestion.length > 0">
            <el-col
              style="color: #181E33; font-weight: 500; font-size: 12px; line-height: 32px"
              >单选题(共{{ exam.choiceQuestion.length }}题，共{{
                choiceCountScore
              }}分)</el-col
            >
            <el-col
              v-for="(item, index) in exam.choiceQuestion"
              :key="item.question + index"
            >
              <div
                class="flex space-between pro_list_item"
                @click.stop="editQuestion(index, item)"
              >
                <span>{{ index + 1 }}</span>
                <span class="text-ellipsis" style="width: 190px">{{
                  item.question
                }}</span>
                <span class="score">({{ item.score }}分)</span>
                <i
                  class="el-icon-delete"
                  @click.stop="deleteQuestion(index)"
                ></i>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="exam.issueQuestion.length > 0">
            <el-col
              style="color: #181E33; font-weight: 500; font-size: 12px; line-height: 32px"
              >判断题(共{{ exam.issueQuestion.length }}题，共{{
                issueCountScore
              }}分)</el-col
            >
            <el-col
              v-for="(item, index) in exam.issueQuestion"
              :key="item.question + index"
            >
              <div class="flex space-between pro_list_item">
                <span>{{ index + 1 }}</span>
                <span class="text-ellipsis" style="width: 190px">{{
                  item.question
                }}</span>
                <span>({{ item.score }}分)</span>
                <i
                  class="el-icon-delete"
                  @click.stop="deleteQuestion(index)"
                ></i>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="exam.completionQuestion.length > 0">
            <el-col
              style="color: #181E33; font-weight: 500; font-size: 12px; line-height: 32px"
              >填空题(共{{ exam.completionQuestion.length }}题，共{{
                completionCountScore
              }}分)</el-col
            >
            <el-col
              v-for="(item, index) in exam.completionQuestion"
              :key="item.question + index"
            >
              <div class="flex space-between pro_list_item">
                <span>{{ index + 1 }}</span>
                <span class="text-ellipsis" style="width: 190px">{{
                  item.question
                }}</span>
                <span>({{ item.score }}分)</span>
                <i
                  class="el-icon-delete"
                  @click.stop="deleteQuestion(index)"
                ></i>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="exam.shortAnswerQuestions.length > 0">
            <el-col
              style="color: #181E33; font-weight: 500; font-size: 12px; line-height: 32px"
              >简答题(共{{ exam.shortAnswerQuestions.length }}题，共{{
                shortAnswerCountScore
              }}分)</el-col
            >
            <el-col
              v-for="(item, index) in exam.shortAnswerQuestions"
              :key="item.question + index"
            >
              <div class="flex space-between pro_list_item">
                <span>{{ index + 1 }}</span>
                <span class="text-ellipsis" style="width: 190px">{{
                  item.question
                }}</span>
                <span>({{ item.score }}分)</span>
                <i
                  class="el-icon-delete"
                  @click.stop="deleteQuestion(index)"
                ></i>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <div style="height: 1109px;" class="content-right right">
          <el-card style="padding: 18px 30px">
            <div class="left" style="line-height: 40px; margin-right: 16px">
              添加题目
            </div>
            <div class="flex">
              <el-button
                round
                @click="addQuestion(item.value)"
                v-for="(item, index) in testType"
                :key="item.value + index"
                >{{ item.value }}</el-button
              >
            </div>
          </el-card>

          <el-card style="height: 1007px; margin-top: 24px">
            <div
              style="line-height: 48px; text-align: center; color: #A8A8B3;"
              v-if="showDefault"
            >
              点击题型按钮添加题目
            </div>
            <!-- 出题部分 -->
            <div
              v-else-if="!showDefault && !previewQuestion"
              style="padding: 20px 20px 0 20px"
            >
              <div v-show="showQuestionType === '单选题'">
                <el-row
                  style="lineHeight: 32px; margin-bottom: 16px"
                  class="score"
                >
                  <span style="margin-right:16px"
                    >{{ exam.choiceQuestion.length + 1 }}.</span
                  >
                  <span style="margin-right:16px">单选题</span>
                  <el-input-number
                    v-model="choiceQuestion.score"
                    :min="1"
                    :max="20"
                    label="单选题"
                    controls-position="right"
                  />
                </el-row>
                <el-row>
                  <mavonEditor
                    :toolbars="toolbars"
                    v-model="choiceQuestion.question"
                    @change="choiceQuestionHtml"
                  />
                </el-row>
                <el-row style="margin-top: 16px">
                  <el-row
                    v-for="(item, index) in choiceQuestion.options"
                    :key="item.label + index"
                    style="margin-bottom: 16px"
                  >
                    <!-- {{ item }} -->
                    <el-row class="choose_list clear-fix">
                      <el-col :span="1" style="margin-left: 10px">
                        <el-radio
                          v-model="choiceQuestion.answer"
                          :label="item.label"
                        >
                          {{ item.label }}
                        </el-radio>
                      </el-col>
                      <el-col :span="22" style="float: right">
                        <mavonEditor
                          :toolbars="toolbars"
                          v-model="item.value"
                          @change="choiceOptionsHtml"
                        />
                      </el-col>
                    </el-row>
                  </el-row>
                  <el-row class="clear-fix">
                    <el-col :span="2" style="color: #3A8BFF; text-align: center"
                      >解析:
                    </el-col>
                    <el-col :span="22" style="float: right">
                      <mavonEditor
                        :toolbars="toolbars"
                        v-model="choiceQuestion.answerdDetail"
                        @change="choiceDetailHtml"
                      />
                    </el-col>
                  </el-row>
                </el-row>
              </div>
              <div v-show="showQuestionType === '判断题'">
                <el-row
                  style="lineHeight: 32px; margin-bottom: 16px"
                  class="score"
                >
                  <span style="margin-right:16px"
                    >{{ exam.issueQuestion.length + 1 }}.</span
                  >
                  <span style="margin-right:16px">判断题</span>
                  <el-input-number
                    v-model="issueQuestion.score"
                    :min="1"
                    :max="20"
                    label="单选题"
                    controls-position="right"
                  />
                </el-row>
                <el-row>
                  <mavonEditor
                    :toolbars="toolbars"
                    v-model="issueQuestion.question"
                    @change="choiceQuestionHtml"
                  />
                </el-row>
                <el-row style="margin-top: 16px">
                  <el-row
                    v-for="(item, index) in issueQuestion.options"
                    :key="item.label + index"
                    style="margin-bottom: 16px"
                  >
                    <el-row class="choose_list clear-fix">
                      <el-col :span="1" style="margin-left: 10px">
                        <el-radio
                          v-model="choiceQuestion.answer"
                          :label="item.label"
                        >
                          {{ item.label }}
                        </el-radio>
                      </el-col>
                      <el-col
                        :span="22"
                        style="float: right; line-height: 36px"
                      >
                        {{ item.value }}
                      </el-col>
                    </el-row>
                  </el-row>
                  <el-row class="clear-fix">
                    <el-col
                      style="color: #3A8BFF; margin-bottom: 16px; padding-left: 12px"
                      >解析:
                    </el-col>
                    <el-col>
                      <mavonEditor
                        :toolbars="toolbars"
                        v-model="issueQuestion.answerdDetail"
                        @change="choiceDetailHtml"
                      />
                    </el-col>
                  </el-row>
                </el-row>
              </div>
              <div v-show="showQuestionType === '填空题'">
                <el-row
                  style="lineHeight: 32px; margin-bottom: 16px"
                  class="score"
                >
                  <span style="margin-right:16px"
                    >{{ exam.completionQuestion.length + 1 }}.</span
                  >
                  <span style="margin-right:16px">填空题</span>
                  <el-input-number
                    v-model="completionQuestion.score"
                    :min="1"
                    :max="20"
                    label="填空题"
                    controls-position="right"
                  />
                </el-row>
                <el-row>
                  <mavonEditor
                    :toolbars="toolbars"
                    v-model="completionQuestion.question"
                    @change="choiceQuestionHtml"
                  />
                </el-row>
                <el-row style="margin: 16px 0" class="completion">
                  <el-col
                    style="font-size:12px; color: rgba(0,0,0,.5); padding-left: 12px; margin-bottom: 10px"
                    >多个空请使用'&$&'分隔开</el-col
                  >
                  <el-col>
                    <el-input
                      v-model="completionQuestion.answer"
                      placeholder="请输入答案"
                    ></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 16px">
                  <el-row class="clear-fix">
                    <el-col
                      style="color: #3A8BFF; margin-bottom: 16px; padding-left: 12px"
                      >解析:
                    </el-col>
                    <el-col>
                      <mavonEditor
                        :toolbars="toolbars"
                        v-model="completionQuestion.answerdDetail"
                        @change="choiceDetailHtml"
                      />
                    </el-col>
                  </el-row>
                </el-row>
              </div>
              <div v-show="showQuestionType === '简答题'">
                <el-row
                  style="lineHeight: 32px; margin-bottom: 16px"
                  class="score"
                >
                  <span style="margin-right:16px"
                    >{{ exam.shortAnswerQuestions.length + 1 }}.</span
                  >
                  <span style="margin-right:16px">简答题</span>
                  <el-input-number
                    v-model="shortAnswerQuestions.score"
                    :min="1"
                    :max="20"
                    label="简答题"
                    controls-position="right"
                  />
                </el-row>
                <el-row>
                  <mavonEditor
                    :toolbars="toolbars"
                    v-model="shortAnswerQuestions.question"
                    @change="choiceQuestionHtml"
                  />
                </el-row>
                <el-row style="margin-top: 16px">
                  <el-row class="clear-fix">
                    <el-col
                      style="color: #3A8BFF; margin-bottom: 16px; padding-left: 12px"
                      >答案:
                    </el-col>
                    <el-col>
                      <mavonEditor
                        :toolbars="toolbars"
                        v-model="shortAnswerQuestions.answer"
                      />
                    </el-col>
                  </el-row>
                </el-row>
                <el-row style="margin-top: 16px">
                  <el-row class="clear-fix">
                    <el-col
                      style="color: #3A8BFF; margin-bottom: 16px; padding-left: 12px"
                      >解析:
                    </el-col>
                    <el-col>
                      <mavonEditor
                        :toolbars="toolbars"
                        v-model="shortAnswerQuestions.answerdDetail"
                        @change="choiceDetailHtml"
                      />
                    </el-col>
                  </el-row>
                </el-row>
              </div>
              <div class="clear-fix" style="margin-top: 16px">
                <div class="right">
                  <el-button round @click="resetContent">重置</el-button>
                  <el-button round @click="finished" type="primary"
                    >完成</el-button
                  >
                </div>
              </div>
            </div>
            <!-- 预览部分 -->
            <div v-else>
              <div v-show="showQuestionType === '单选题'">
                单选题1
              </div>
              <div v-show="showQuestionType === '判断题'">
                判断题1
              </div>
              <div v-show="showQuestionType === '填空题'">
                填空题1
              </div>
              <div v-show="showQuestionType === '简答题'">
                简答题1
              </div>
            </div>
          </el-card>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import { deepClone } from "function/utils";
import "mavon-editor/dist/css/index.css";
const $initChoiceQuestion = () => ({
  type: "选择题",
  score: "",
  question: "",
  questionHtml: "",
  options: [
    { label: "A", value: "", valueHTML: "" },
    { label: "B", value: "", valueHTML: "" },
    { label: "C", value: "", valueHTML: "" },
    { label: "D", value: "", valueHTML: "" },
  ],
  // 答案以及解析
  answer: "A",
  answerdDetail: "",
  answerdDetailHTML: "",
  // 学生解答相关
  replyScore: 0,
  replyAnswer: "",
  replyAnswerHtml: "",
});
const $initIssueQuestion = () => ({
  type: "判断题",
  score: "",
  question: "",
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
});
const $initCompletionQuestion = () => ({
  type: "填空题",
  score: "",
  question: "",
  questionHtml: "",
  // 答案以及解析
  answer: "",
  answerdDetail: "",
  answerdDetailHTML: "",
  // 学生解答相关
  replyScore: 0,
  replyAnswer: "",
  replyAnswerHtml: "",
});
const $initShortAnswerQuestions = () => ({
  type: "简答题",
  score: "",
  question: "",
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
});
export default {
  name: "AddExam",
  components: {
    mavonEditor,
  },
  data() {
    return {
      // 富文本编辑器
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        // header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: false, // 有序列表
        ul: false, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: false, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: false, // 展示html源码
        help: true, // 帮助
        undo: false, // 上一步
        redo: false, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        navigation: false, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: false, // 单双栏模式
        preview: false, // 预览
      },
      // 不展示添加题目
      showDefault: true,
      // 展示添加题目
      showQuestionType: "单选题",
      // 预览题目
      previewQuestion: false,
      //试题类型
      testType: [
        { label: "单选题", value: "单选题" },
        { label: "判断题", value: "判断题" },
        { label: "填空题", value: "填空题" },
        { label: "简答题", value: "简答题" },
      ],
      // 选择题
      choiceQuestion: $initChoiceQuestion(),
      // 判断题
      issueQuestion: $initIssueQuestion(),
      // 填空题
      completionQuestion: $initCompletionQuestion(),
      // 简答题
      shortAnswerQuestions: $initShortAnswerQuestions(),
      // 试题内容
      exam: {
        examName: "数据结构期末考试",
        choiceQuestion: [],
        issueQuestion: [],
        completionQuestion: [],
        shortAnswerQuestions: [],
      },
    };
  },
  computed: {
    // 题量，总分
    questionTotal() {
      let score = 0;
      let count = 0;
      count =
        this.exam.choiceQuestion.length +
        this.exam.issueQuestion.length +
        this.exam.completionQuestion.length +
        this.exam.shortAnswerQuestions.length;
      this.exam.choiceQuestion.forEach((item) => (score += item.score));
      this.exam.issueQuestion.forEach((item) => (score += item.score));
      this.exam.completionQuestion.forEach((item) => (score += item.score));
      this.exam.shortAnswerQuestions.forEach((item) => (score += item.score));
      return "题量 " + count + "，" + " 总分 " + score;
    },
    // 各种题型总分
    choiceCountScore() {
      let score = 0;
      this.exam.choiceQuestion.forEach((item) => (score += item.score));
      return score;
    },
    issueCountScore() {
      let score = 0;
      this.exam.issueQuestion.forEach((item) => (score += item.score));
      return score;
    },
    completionCountScore() {
      let score = 0;
      this.exam.completionQuestion.forEach((item) => (score += item.score));
      return score;
    },
    shortAnswerCountScore() {
      let score = 0;
      this.exam.shortAnswerQuestions.forEach((item) => (score += item.score));
      return score;
    },
  },
  methods: {
    addExam() {
      console.log("===> 完成");
    },
    // 添加考试题目
    addQuestion(type) {
      this.showDefault = false;
      this.showQuestionType = type;
    },
    // 重置题目内容
    resetContent() {
      // 选择题
      this.choiceQuestion = $initChoiceQuestion();
      // 判断题
      this.issueQuestion = $initIssueQuestion();
      // 填空题
      this.completionQuestion = $initCompletionQuestion();
      // 简答题
      this.shortAnswerQuestions = $initShortAnswerQuestions();
    },
    // 编辑问题
    editQuestion(index, obj) {},
    // 删除问题
    deleteQuestion(index) {
      this.$confirm("确认删除此题吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        switch (this.showQuestionType) {
          case "单选题":
            this.exam.choiceQuestion.splice(index, 1);
            break;
          case "判断题":
            this.exam.issueQuestion.splice(index, 1);
            break;
          case "填空题":
            this.exam.completionQuestion.splice(index, 1);
            break;
          case "简答题":
            this.exam.shortAnswerQuestions.splice(index, 1);
            break;
          default:
            break;
        }
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    // 添加完成题目
    finished() {
      this.showDefault = true;
      switch (this.showQuestionType) {
        case "单选题":
          let choiceQuestion = deepClone(this.choiceQuestion);
          this.exam.choiceQuestion.push(choiceQuestion);
          break;
        case "判断题":
          let issueQuestion = deepClone(this.issueQuestion);
          this.exam.issueQuestion.push(issueQuestion);
          break;
        case "填空题":
          let completionQuestion = deepClone(this.completionQuestion);
          this.exam.completionQuestion.push(completionQuestion);
          break;
        case "简答题":
          let shortAnswerQuestions = deepClone(this.shortAnswerQuestions);
          this.exam.shortAnswerQuestions.push(shortAnswerQuestions);
          break;
        default:
          break;
      }
      this.resetContent();
      console.log(this.exam);
    },
    // 获取问题对应markdown格式文本
    choiceQuestionHtml(value, render) {
      if (this.showQuestionType === "单选题") {
        this.choiceQuestion.questionHtml = render;
      } else if (this.showQuestionType === "判断题") {
        this.issueQuestion.questionHtml = render;
      } else if (this.showQuestionType === "填空题") {
        this.completionQuestion.questionHtml = render;
      } else if (this.showQuestionType === "简答题") {
        this.shortAnswerQuestions.questionHtml = render;
      }
    },
    // 获取问题答案对应的markdown格式的文本
    choiceDetailHtml(value, render) {
      if (this.showQuestionType === "单选题") {
        this.choiceQuestion.answerdDetailHTML = render;
      } else if (this.showQuestionType === "判断题") {
        this.issueQuestion.answerdDetailHTML = render;
      } else if (this.showQuestionType === "填空题") {
        this.completionQuestion.answerdDetailHTML = render;
      } else if (this.showQuestionType === "简答题") {
        this.shortAnswerQuestions.answerdDetailHTML = render;
      }
    },
    // 获取选择题对应的答案的markdown格式文本
    choiceOptionsHtml(value, render) {
      setTimeout(() => {
        this.choiceQuestion.options.forEach((item, index) => {
          if (item.value == value) {
            this.choiceQuestion.options[index].valueHTML = render;
          }
        });
      }, 0);
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
  .score
    .el-input-number
      width: 90px
    .el-input-number span
      display: none
    .el-input-number.is-controls-right .el-input__inner
      padding-right: 12px
  .markdown-body
    box-shadow: none !important
    border: 1px solid #E1EAF4 !important
  .v-note-show
    display: none !important
  .v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper
    width: 100% !important
    flex: 0 0 100% !important
  .v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar
    background-color: #fff
  .dropdown-item:nth-child(2)
    display: none
  .v-note-wrapper
    min-height: 106px
  .v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper
    padding: 8px
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
  .completion
    .el-input input
      height: 36px
      line-height: 36px
  .pro_list_item
    position: relative
    cursor: pointer
    border-radius: 4px
    font-size: 12px
    color: #646873
    line-height: 32px
    padding-right: 24px
    margin-right: 12px
    .el-icon-delete
      position: absolute
      top: 10px
      right: 3px
      display: none
    &:hover
      background: #F0F6FF
      color: #3A8BFF
      .el-icon-delete

        display: inline-block
        font-size: 14px
</style>
