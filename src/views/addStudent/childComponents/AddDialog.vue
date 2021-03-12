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
              输入学生姓名、手机号即可添加学生
            </div>
            <el-col
              :span="16"
              style="margin-left: 50%; transform: translate(-50%, 0);"
            >
              <el-form
                label-position="right"
                label-width="80px"
                :model="stuInfo"
              >
                <el-form-item label="姓名">
                  <el-input v-model="stuInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                  <el-input v-model="stuInfo.phoneNumber"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
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
import { notifyError, notifySuccess } from "function/utils";
export default {
  name: "AddDialog",
  data() {
    return {
      tab: "tab-1",
      dialogVisible: false,
      stuInfo: {
        name: "",
        phoneNumber: "",
      },
      stuInfoArr: [],
    };
  },
  methods: {
    handleClose(done) {},
    open(val) {
      if (val === "complex") {
        this.tab = "tab-2";
      }
      this.dialogVisible = true;
    },
    downloadTemplate() {
      console.log("===> 下载模板");
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
          console.log(this.stuInfoArr);
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
    },
    addStu() {
      if (this.tab === "tab-1") {
        if (
          this.stuInfo.name.trim().length < 0 ||
          this.stuInfo.phoneNumber.trim().length !== 11
        ) {
          notifyError(this.$message, "请输入合适的手机号或者名字");
        } else {
          console.log(" ====> 发送网络请求" + this.stuInfo);
        }
      } else {
      }
    },
    formateStu(obj) {
      let res = {};
      Object.keys(obj).forEach((key) => {
        if (key === "专业") {
          res["major"] = obj[key];
        } else if (key === "姓名") {
          res["name"] = obj[key];
        } else if (key === "学号") {
          res["phoneNumber"] = obj[key];
        } else if (key === "密码") {
          res["password"] = obj[key];
        } else if (key === "性别") {
          res["gender"] = obj[key];
        } else if (key === "班级") {
          res["class"] = obj[key];
        } else if (key === "院系") {
          res["department"] = obj[key];
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
