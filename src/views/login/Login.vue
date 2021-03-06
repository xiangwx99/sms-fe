<template>
  <div class="login" :style="banner">
    <el-card class="box-card">
      <el-row>
        <div class="head-portrait"><img :src="imgUrl" alt="" /></div>
      </el-row>
      <el-row style="font-size: 24px">{{ title }}</el-row>
      <el-row>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="账号" prop="phoneNumber">
            <el-input v-model="ruleForm.phoneNumber" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="$_submit" style="width: 100%;">{{
              option
            }}</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-row class="clear-fix">
              <div class="left">
                <el-radio v-model="radio" label="stu" v-if="options !== '登录'"
                  >学生</el-radio
                >
                <el-radio v-model="radio" label="tea">教师</el-radio>
              </div>
              <a class="right" @click="changeOption">{{ options }}</a>
            </el-row>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import md5 from "blueimp-md5";
import { loginStudent, addStudent } from "network/students";
import { loginTeacher, addTeacher } from "network/teachers";
import { notifyError, notifySuccess } from "function/utils";
import localStorage from "function/localstorage";

export default {
  name: "Login",
  data() {
    return {
      title: "用户登录",
      option: "登录",
      options: "注册账号?",
      radio: "stu",
      ruleForm: {
        phoneNumber: null,
        password: null,
      },
      rules: {
        phoneNumber: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的账号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" },
        ],
      },
      banner: {
        backgroundImage: "url(" + require("../../assets/img/bg.svg") + ")",
        backgroundRepeat: "norepeat",
        backgroundSize: "100% 100%",
        opacity: 0.8,
      },
      imgUrl: require("../../assets/img/swpu_logo.jpg"),
    };
  },

  mounted() {
    if (this.$route.path === "/login") {
      let that = this;
      document.onkeydown = function(e) {
        if (e.keyCode === 13) {
          that.$_submit();
        } else {
          return;
        }
      };
    }
  },

  methods: {
    submitForm(formName) {
      let issue = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return true;
        } else {
          issue = false;
          return false;
        }
      });
      return issue;
    },

    changeOption() {
      this.resetForm("ruleForm");
      if (this.title === "用户登录") {
        this.title = "用户注册";
        this.option = "注册";
        this.options = "登录";
      } else {
        this.title = "用户登录";
        this.options = "注册账号?";
        this.option = "登录";
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    async $_submit() {
      let issue = this.submitForm("ruleForm");
      if (issue) {
        localStorage.removeAllLocalStorage();
        if (this.title === "用户登录") {
          let ret;
          /** 学生登陆 **/
          if (this.radio === "stu") {
            ret = await loginStudent(
              this.ruleForm.phoneNumber,
              md5(md5(this.ruleForm.password))
            );
          } else {
            ret = await loginTeacher(
              this.ruleForm.phoneNumber,
              md5(md5(this.ruleForm.password))
            );
          }
          if (ret.err_code === 1) {
            localStorage.putLocalStorage("token", ret.token);
            localStorage.putLocalStorage("status", this.radio);
            localStorage.putLocalStorage(
              "userInfo",
              JSON.stringify(ret.userInfo)
            );
            this.$store.commit("userInfo/updateId", ret.userInfo._id);
            this.$store.commit("userInfo/updateStatus", this.radio);
            this.$store.commit(
              "userInfo/updatePhoneNumber",
              ret.userInfo.phoneNumber
            );
            this.$store.commit("userInfo/updateName", ret.userInfo.name);

            this.$router.push("/");
          } else if (ret.err_code === 3) {
            notifyError(this.$message, "账号或者密码错误!");
          }
        } else {
          let ret;
          /** 学生注册 **/
          if (this.radio === "stu") {
            ret = await addStudent(
              this.ruleForm.phoneNumber,
              md5(md5(this.ruleForm.password))
            );
          } else {
            ret = await addTeacher(
              this.ruleForm.phoneNumber,
              md5(md5(this.ruleForm.password))
            );
          }
          if (ret.err_code === 1) {
            notifySuccess(this.$message, "注册成功!");
          } else if (ret.err_code === 2) {
            notifyError(this.$message, "账号已存在!");
          }
        }
      }
    },
  },
};
</script>

<style lang="sass">
.login
  height: 100vh
  width: 100vw
  .box-card
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 28%
    box-shadow: 0 6px 20px 5px rgb(40 120 255 / 10%), 0 16px 24px 2px rgb(0 0 0 / 5%)
    border-radius: 12px
  .el-row
    text-align: center
  img, .head-portrait
    width: 60px
    height: 60px
    border-radius: 50%
    overflow: hidden
  .head-portrait
    margin: 0 auto 24px
  .el-form-item__label
    padding: 0 10px 0 0
  .el-form-item__label:before
    content: '' !important
  form.el-form.demo-ruleForm
    text-align: left
    padding: 20px 0px 0 2px
  .clear-fix a
    color: #409EFF
  .el-form-item:nth-child(4)
    margin-bottom: 0</style
>>
