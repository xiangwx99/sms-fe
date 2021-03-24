<template>
  <div>
    <el-card style="padding: 18px 30px">
      <span style="color: #A8A8B3; fontSize: 14px; marginRight: 15px">添加题目</span>
      <el-button v-for="item in subjectType" 
                 :key="item.value" 
                 style="marginRight: 15px"
                 @click.stop="addSubject(item.value)"
                 round>
        {{item.label}}
      </el-button>
    </el-card>
    <el-card style="height: 1009px; marginTop: 20px; padding: 20px"> 
      <mavonEditor :toolbars="toolbars" v-model="subjectDetail"/>
    </el-card>
  </div>
</template>

<script>
import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "ExamContent",
  components: {
    mavonEditor
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
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            code: true, // code
            table: true, // 表格
            fullscreen: false, // 全屏编辑
            readmodel: false, // 沉浸式阅读
            htmlcode: false, // 展示html源码
            help: true, // 帮助
            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空
            save: true, // 保存（触发events中的save事件）
            navigation: false, // 导航目录
            alignleft: true, // 左对齐
            aligncenter: true, // 居中
            alignright: true, // 右对齐
            subfield: true, // 单双栏模式
            preview: false // 预览
      },
      subjectType: [
        {label: '单选题', value: 's-choice-questions'},
        {label: '判断题', value: 'issue-questions'},
        {label: '填空题', value: 'completion'},
        {label: '简答题', value: 'short-answer-questions'},
      ],
      subjectContent: {},
      subjectDetail: "",
    }
  },
  methods: {
    addSubject(type) {
      if(this.subjectContent[type]) {
        this.subjectContent[type].push({})
      } else {
        this.subjectContent[type] = [{}]
      }
      this.$EventBus.$emit('addSubjects', this.subjectContent)
    }
  }
};
</script>

<style></style>
