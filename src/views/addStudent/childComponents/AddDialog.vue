<template>
  <el-dialog
    title="导入学生"
    :visible.sync="dialogVisible"
    width="40%"
    :close-on-click-modal="false"
  >
    <el-row>
      <el-tabs v-model="tab">
        <el-tab-pane label="手动添加" name="tab-1">
          <el-row style="text-align: center; color: #8A8B99">
            <div style="margin: 10px 0 22px">
              <span
                class="el-icon-warning"
                style="position: relative; top: 2px; right: 4px; color: #E6A23C"
              ></span
              ><span>密码默认为: 12345678</span>
            </div>
            <el-form
              :model="stuInfo"
              :rules="stuInfoRules"
              ref="stuInfoForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-col :span="11">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="stuInfo.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="学号/手机" prop="phoneNumber">
                  <el-input v-model="stuInfo.phoneNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="院系" prop="department">
                  <el-select
                    v-model="stuInfo.department"
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
                <el-form-item label="专业" prop="major">
                  <el-select v-model="stuInfo.major" placeholder="请选择">
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
                <el-form-item label="年级" prop="major">
                  <el-select v-model="stuInfo.grade" placeholder="请选择">
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
                <el-form-item label="班级" prop="classes">
                  <el-select v-model="stuInfo.classes" placeholder="请选择">
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

              <el-col :span="11">
                <el-form-item label="性别" prop="gender">
                  <el-select v-model="stuInfo.gender" placeholder="请选择">
                    <el-option
                      v-for="item in genderOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="批量导入" name="tab-2">
          <el-row style="height: 172px; border: 1px dashed #A0B5D1">
            <div style="margin-top: 50px; text-align: center">
              <p class="el-icon-download download" @click="downloadTemplate">
                下载模板
              </p>
              <div style="margin-top: 16px">
                <el-button type="primary" round @click="uploadStu"
                  >批量导入</el-button
                >
                <input
                  ref="input"
                  style="display: none"
                  type="file"
                  @change="_on_change"
                />
              </div>
            </div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addStu">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import XLSX from "xlsx";
import md5 from "blueimp-md5";
import request from "network/request.js";
import { notifyError, notifySuccess } from "function/utils";
import dataOptions from "mixins/getNation";
import { addStudent } from "network/students";

const $_init = () => {
  return {
    name: "",
    phoneNumber: "",
    gender: "男",
    major: "",
    classes: "",
    department: "",
    grade: "",
  };
};
export default {
  name: "AddDialog",
  mixins: [dataOptions],
  data() {
    return {
      tab: "tab-1",
      dialogVisible: false,
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
      genderOptions: [
        { label: "男", value: "男" },
        { label: "女", value: "女" },
      ],
      stuInfo: $_init(),
      stuInfoRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phoneNumber: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "账号为11位",
            trigger: "blur",
          },
        ],
        department: [
          { required: true, message: "请选择院系", trigger: "blur" },
        ],
        gender: [{ required: true, message: "请设置性别", trigger: "blur" }],
        major: [{ required: true, message: "请选择专业", trigger: "blur" }],
        classes: [{ required: true, message: "请选择班级", trigger: "blur" }],
      },
      stuInfoArr: [],
    };
  },
  methods: {
    changeMajor() {
      if (this.stuInfo.department) {
        this.stuInfo.major = "";
        this.departmentOptions.forEach((item, index) => {
          if (item.value === this.stuInfo.department) {
            this.majorOptions = this.departmentOptions[index].majorOptions;
          }
        });
      }
    },
    handleClose(done) {},
    open(val) {
      this.stuInfo = $_init();
      if (val === "complex") {
        this.tab = "tab-2";
      }
      this.dialogVisible = true;
    },
    downloadTemplate() {
      request({
        url: "/downTemplate",
      }).then((res) => {
        window.open(res.fileUrl);
      });
    },
    uploadStu() {
      this.$refs.input.click();
    },
    _on_change(e) {
      let file = [].slice.call(e.target.files)[0];
      let type = file.name.split(".")[1];
      let typeArr = ["xlsx", "xls"];
      if (!typeArr.includes(type)) {
        notifyError(this.$message, "仅支持xlsx、xls格式的文件");
        return;
      }
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          const wsname = workbook.SheetNames[0];
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
          ws.forEach((obj, index) => {
            this.stuInfoArr[index] = this.formateStu(obj);
          });
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
    },
    addStu() {
      if (this.tab === "tab-1") {
        this.$refs["stuInfoForm"].validate((valid) => {
          if (valid) {
            this.stuInfo.password = md5(md5(12345678));
            addStudent([this.stuInfo]).then((res) => {
              if (res.success) {
                notifySuccess(this.$message, "添加成功");
              } else {
                notifyError(this.$message, res.message);
              }
              this.dialogVisible = false;
            });
          } else {
            return false;
          }
        });
      } else {
        addStudent(this.stuInfoArr).then((res) => {
          if (res.success) {
            notifySuccess(this.$message, res.message);
          } else {
            notifyError(this.$message, res.message);
          }
          this.dialogVisible = false;
        });
      }
    },
    formateStu(obj) {
      let res = {};
      res.password = md5(md5(12345678));
      Object.keys(obj).forEach((key) => {
        if (key === "专业") {
          res["major"] = obj[key];
        } else if (key === "姓名") {
          res["name"] = obj[key];
        } else if (key === "学号") {
          res["phoneNumber"] = obj[key];
        } else if (key === "性别") {
          res["gender"] = obj[key];
        } else if (key === "班级") {
          res["classes"] = obj[key];
        } else if (key === "院系") {
          res["department"] = obj[key];
        } else if (key === "年级") {
          res["grade"] = obj[key];
        }
      });
      return res;
    },
  },
};
</script>

<style lang="sass">
.download:hover
  cursor: pointer
</style>
