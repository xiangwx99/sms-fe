<template>
  <el-dialog
    title="分发试卷"
    :visible.sync="show"
    width="40%"
    :close-on-click-modal="false"
    class="assign_dialog"
  >
    <el-row>
      <el-row style="text-align: center; color: #8A8B99">
        <el-form
          :model="assignInfo"
          :rules="assignRules"
          ref="assignForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-col :span="11">
            <el-form-item label="院系" prop="department" class="title">
              <el-select
                v-model="assignInfo.department"
                placeholder="请选择"
                @change="changeMajor"
              >
                <el-option
                  v-for="item in departmentOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业" prop="major" class="title">
              <el-select v-model="assignInfo.major" placeholder="请选择">
                <el-option
                  v-for="item in majorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="年级" prop="major" class="title">
              <el-select v-model="assignInfo.grade" placeholder="请选择">
                <el-option
                  v-for="item in gradeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级" prop="classes" class="title">
              <el-select v-model="assignInfo.classes" placeholder="请选择">
                <el-option
                  v-for="item in classOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="17">
            <el-form-item label="考试时间" prop="time" class="title">
              <el-date-picker
                v-model="assignInfo.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="left"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="assignExam">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import localStorage from "function/localstorage";
import { notifyError, notifySuccess } from "function/utils";
import { assignExam } from "../../../network/assignExam";
import dataOptions from "mixins/getNation";

const $_init = () => {
  return {
    major: "",
    classes: "",
    department: "",
    grade: "",
    time: "",
  };
};
export default {
  name: "AddDialog",
  mixins: [dataOptions],
  data() {
    return {
      examId: null,
      show: false,
      content: null,
      majorOptions: [],
      gradeOptions: [
        { value: "2017级", label: "2017级" },
        { value: "2018级", label: "2018级" },
        { value: "2019级", label: "2019级" },
        { value: "2020级", label: "2020级" },
      ],
      classOptions: [
        { label: "1班", value: "1班" },
        { label: "2班", value: "2班" },
        { label: "3班", value: "3班" },
        { label: "4班", value: "4班" },
      ],

      assignInfo: $_init(),
      assignRules: {
        department: [
          { required: true, message: "请选择院系", trigger: "blur" },
        ],
        major: [{ required: true, message: "请选择专业", trigger: "blur" }],
        classes: [{ required: true, message: "请选择班级", trigger: "blur" }],
        time: [{ required: true, message: "请选择开始及结束时间" }],
      },
    };
  },
  methods: {
    open(id, content) {
      this.examId = id;
      this.content = content;
      this.show = true;
      this.assignInfo = $_init();
    },
    changeMajor() {
      if (this.assignInfo.department) {
        this.assignInfo.major = "";
        this.departmentOptions.forEach((item, index) => {
          if (item.value === this.assignInfo.department) {
            this.majorOptions = this.departmentOptions[index].majorOptions;
          }
        });
      }
    },
    async assignExam() {
      this.$refs["assignForm"].validate((val) => {
        if (val) {
          let exam_id = this.examId;
          let tea_id = JSON.parse(localStorage.getLocalStorage("userInfo"))
            ?._id;
          assignExam(this.assignInfo, tea_id, exam_id, this.content).then(
            (resolve) => {
              this.show = false;
              if (resolve.success) {
                notifySuccess(
                  this.$message,
                  `成功为${resolve.count}人分配试卷!`
                );
              } else {
                notifyError(this.$message, "试卷分配失败!");
              }
            }
          );
        }
      });
    },
  },
};
</script>

<style lang="sass">
.assign_dialog
  .el-dialog
    width: 672px !important
    margin-top: 30vh !important
  .el-dialog
    border-radius: 10px
  .el-button
    border-radius: 42px
  .el-dialog__body
    padding: 16px
    padding-bottom: 0
  .title
    .el-form-item__label
      text-align: right
      padding-right: 12px
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner
    width: 500px
</style>
