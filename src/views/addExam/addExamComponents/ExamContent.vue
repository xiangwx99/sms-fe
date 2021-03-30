<template>
  <div class="make-question">
    <el-card style="padding: 18px 30px">
      <span style="color: #A8A8B3; fontSize: 14px; marginRight: 15px"
        >添加题目</span
      >
      <el-button
        v-for="item in subjectType"
        :key="item.value"
        style="marginRight: 15px"
        @click.stop="addSubject(item.value)"
        round
      >
        {{ item.label }}
      </el-button>
    </el-card>
    <el-card style="min-height: 1009px; marginTop: 20px; padding: 20px">
      <el-row v-if="showType === '单选题'">
        <el-row style="lineHeight: 32px;">
          <el-col :span="1">
            <h3>{{ choiceProblem.number }}.</h3>
          </el-col>
          <el-col :span="2">{{ choiceProblem.type }}</el-col>
          <el-col :span="2"><el-input v-model="choiceProblem.score"/></el-col>
          <el-col style="marginTop: 16px">
            <mavonEditor
              :toolbars="toolbars"
              v-model="choiceProblem.question"
              @change="choiceQuestionHtml"
            />
          </el-col>
        </el-row>
        <el-row
          style="marginTop: 20px"
          v-for="obj in choiceProblem.options"
          :key="obj.label"
        >
          <el-row>
            <el-col :span="1" style="marginRight: 10px">
              <el-radio v-model="choiceProblem.answer" :label="obj.label">
                {{ obj.label }}
              </el-radio>
            </el-col>
            <el-col :span="22">
              <mavonEditor
                :toolbars="toolbars"
                v-model="obj.value"
                @change="choiceOptionsHtml"
              />
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-col style="margin: 20px 0; color: #3A8BFF">答案解析:</el-col>
          <el-col>
            <mavonEditor
              :toolbars="toolbars"
              v-model="choiceProblem.answerdDetail"
              @change="choiceAnswerHtml"
            />
          </el-col>
        </el-row>
      </el-row>
      <el-row v-else-if="showType === '判断题'">
        <el-row style="lineHeight: 32px;">
          <el-col :span="1">
            <h3>{{ judgeProblem.number }}.</h3>
          </el-col>
          <el-col :span="2">{{ judgeProblem.type }}</el-col>
          <el-col :span="2"><el-input v-model="judgeProblem.score"/></el-col>
          <el-col style="marginTop: 16px">
            <mavonEditor
              :toolbars="toolbars"
              v-model="judgeProblem.question"
              @change="judgeQuestionHtml"
            />
          </el-col>
        </el-row>
        <el-row style="marginTop: 20px">
          <el-radio v-model="judgeProblem.answer" label="A"></el-radio
          ><span>正确</span>
        </el-row>
        <el-row style="marginTop: 20px">
          <el-radio v-model="judgeProblem.answer" label="B"></el-radio
          ><span>错误</span>
        </el-row>
        <el-row>
          <el-col style="margin: 20px 0; color: #3A8BFF">答案解析:</el-col>
          <el-col>
            <mavonEditor
              :toolbars="toolbars"
              v-model="judgeProblem.answerdDetail"
              @change="judgeAnswerHtml"
            />
          </el-col>
        </el-row>
      </el-row>
      <el-row v-else-if="showType === '填空题'">
        <el-row style="lineHeight: 32px;">
          <el-col :span="1">
            <h3>{{ fillProblem.number }}.</h3>
          </el-col>
          <el-col :span="2">{{ fillProblem.type }}</el-col>
          <el-col :span="2"><el-input v-model="fillProblem.score"/></el-col>
          <el-col style="marginTop: 16px">
            <mavonEditor
              :toolbars="toolbars"
              v-model="fillProblem.question"
              @change="fillQuestionHtml"
            />
          </el-col>
        </el-row>
        <el-row style="marginTop: 20px">
          <el-row
            v-for="(item, index) in this.fillProblem.answerTotal"
            :key="index"
            style="marginBottom: 20px"
          >
            <el-col :span="2" style="lineHeight: 32px">
              第{{ index + 1 }}空：
            </el-col>
            <el-col :span="22">
              <el-input v-model="fillProblem.answers[index]" />
            </el-col>
          </el-row>
          <el-row style="fontSize: 12px" class="add-blank">
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              @click.native="addAnswerTotal"
            ></el-button>
            <span style="color: #ccc; margin: 0 20px 0 10px">最多三个空</span>
            <el-button
              type="danger"
              icon="el-icon-minus"
              circle
              @click.native="subAnswerTotal"
            ></el-button>
            <span style="color: #ccc; marginLeft: 10px">最少一个空</span>
          </el-row>
        </el-row>
        <el-row>
          <el-col style="margin: 20px 0; color: #3A8BFF">答案解析:</el-col>
          <el-col>
            <mavonEditor
              :toolbars="toolbars"
              v-model="fillProblem.answerdDetail"
              @change="fillAnswerHtml"
            />
          </el-col>
        </el-row>
      </el-row>
      <el-row v-else-if="showType === '简答题'">
        <el-row style="lineHeight: 32px;">
          <el-col :span="1">
            <h3>{{ briefProblem.number }}.</h3>
          </el-col>
          <el-col :span="2">{{ briefProblem.type }}</el-col>
          <el-col :span="2"><el-input v-model="briefProblem.score"/></el-col>
          <el-col style="marginTop: 16px">
            <mavonEditor
              :toolbars="toolbars"
              v-model="briefProblem.question"
              @change="briefQuestionHtml"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col style="margin: 20px 0; color: #3A8BFF">答案解析:</el-col>
          <el-col>
            <mavonEditor
              :toolbars="toolbars"
              v-model="briefProblem.answerdDetail"
              @change="briefAnswerHtml"
            />
          </el-col>
        </el-row>
      </el-row>
      <el-row style="marginTop: 20px">
        <el-button type="primary" plain round>完成</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "ExamContent",
  components: {
    mavonEditor,
  },
  data() {
    return {
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
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
      showType: "单选题",
      subjectType: [
        { label: "单选题", value: "单选题" },
        { label: "判断题", value: "判断题" },
        { label: "填空题", value: "填空题" },
        { label: "简答题", value: "简答题" },
      ],
      choiceProblem: {
        number: "",
        type: "单选题",
        score: "",
        question: "",
        questionHtml: "",
        options: [
          { label: "A", value: "", valueHTML: "" },
          { label: "B", value: "", valueHTML: "" },
          { label: "C", value: "", valueHTML: "" },
          { label: "D", value: "", valueHTML: "" },
        ],
        answer: "A",
        answerdDetail: "",
        answerdDetailHTML: "",
      },
      judgeProblem: {
        number: "",
        type: "判断题",
        score: "",
        question: "",
        questionHtml: "",
        answer: "A",
        answerdDetail: "",
        answerdDetailHTML: "",
      },
      fillProblem: {
        number: "",
        type: "填空题",
        score: "",
        question: "",
        questionHtml: "",
        answer: "",
        answers: {
          1: "",
          2: "",
          3: "",
        },
        answerTotal: 1,
        answerdDetail: "",
        answerdDetailHTML: "",
      },
      briefProblem: {
        number: "",
        type: "简答题",
        answer: "",
        score: "",
        question: "",
        questionHtml: "",
        answerdDetail: "",
        answerdDetailHTML: "",
      },
      subjectContent: {},
    };
  },
  methods: {
    addSubject(type) {
      let obj = null;
      this.showType = type;
      console.log(type + "====> ");
      if (this.subjectContent[type]) {
        this.subjectContent[type].push({});
      } else {
        this.subjectContent[type] = [{}];
      }
      switch (type) {
        case "单选题":
          obj = this.choiceProblem;
          this.choiceProblem.number = this.subjectContent[type].length;
          break;
        case "判断题":
          obj = this.judgeProblem;
          this.judgeProblem.number = this.subjectContent[type].length;
          break;
        case "填空题":
          obj = this.fillProblem;
          this.fillProblem.number = this.subjectContent[type].length;
          break;
        case "简答题":
          obj = this.briefProblem;
          this.briefProblem.number = this.subjectContent[type].length;
          break;
        default:
          break;
      }
      this.subjectContent[type].splice(
        this.subjectContent[type].length - 1,
        1,
        obj
      );
      this.$EventBus.$emit("addSubjects", this.subjectContent);
    },
    // 填空题的空
    addAnswerTotal() {
      if (this.fillProblem.answerTotal < 3) {
        this.fillProblem.answerTotal = this.fillProblem.answerTotal + 1;
      }
    },
    subAnswerTotal() {
      if (this.fillProblem.answerTotal > 1) {
        this.fillProblem.answerTotal = this.fillProblem.answerTotal - 1;
      }
    },
    // 选择题问题的html
    choiceQuestionHtml(value, render) {
      this.choiceProblem.questionHtml = render;
    },
    // 选择题答案的html
    choiceOptionsHtml(value, render) {
      setTimeout(() => {
        this.choiceProblem.options.forEach((item, index) => {
          if (item.value == value) {
            this.choiceProblem.options[index].valueHTML = render;
          }
        });
      }, 0);
    },
    // 选择题解析的html
    choiceAnswerHtml(value, render) {
      this.choiceProblem.answerdDetailHTML = render;
      console.log(this.choiceProblem);
    },
    // 判断题的html
    judgeQuestionHtml(value, render) {
      this.judgeProblem.questionHtml = render;
    },
    // 判断题的解析html
    judgeAnswerHtml(value, render) {
      this.judgeProblem.answerdDetailHTML = render;
    },
    // 填空的html
    fillQuestionHtml(value, render) {
      this.fillProblem.questionHtml = render;
    },
    // 填空的解析html
    fillAnswerHtml(value, render) {
      this.fillProblem.answerdDetailHTML = render;
      console.log(this.fillProblem);
    },
    // 简答问题的html
    briefQuestionHtml(value, render) {
      this.briefProblem.questionHtml = render;
    },
    // 简答答案
    briefAnswerHtml(value, render) {
      this.briefProblem.answerdDetailHTML = render;
      console.log(this.briefProblem);
    },
  },
};
</script>

<style lang="sass">
.make-question
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
    position: relative
    width: 32px
    height: 32px
  .el-radio__label
    position: absolute
    top: 9px
    left: 1px
  .el-radio__inner::after
    width: 0
  .is-checked .el-radio__label
    color: #fff
  .el-radio
    margin-right: 10px
  .add-blank
    margin: 20px 0
    .el-button.is-circle
      padding: 4px
</style>
