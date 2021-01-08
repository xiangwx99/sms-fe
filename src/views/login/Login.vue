<template>
  <div class="login" :style="banner">
    <el-card class="box-card">
      <el-row >
        <div class="head-portrait"><img :src="imgUrl" alt=""></div>
      </el-row>
      <el-row style="font-size: 24px">{{title}}</el-row>
      <el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号：" prop="phoneNumber">
            <el-input v-model="ruleForm.phoneNumber" placeholder="请输入账号"/>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="$_submit" style="width: 100%;" >{{option}}</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-row class="clear-fix">
              <a class="right" @click="changeOption">{{options}}</a>
            </el-row>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { loginStudent, addStudent } from 'network/students'
import md5 from 'blueimp-md5'
export default {
  name: 'Login',
  data() {
    return {
      title: "用户登录",
      option: "登录",
      options: "注册账号?",
      ruleForm: {
        phoneNumber: null,
        password: null,
      },
      rules: {
        phoneNumber: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ]
      },
      banner: {
        backgroundImage: 'url(' + require('../../assets/img/login_banner.jpg') + ')',
        backgroundRepe: 'norepeat',
        backgroundSize: '100% 100%',
        opacity: .8
      },
      imgUrl: require('../../assets/img/swpu_logo.jpg')
    }
  },

  mounted() {
    if(this.$route.path === '/login') {
      let that = this
      document.onkeydown = function(e){
        if(e.keyCode === 13) {
          that.$_submit()
        } else {
          return
        }
      }
    }
  },


  methods: {
    submitForm(formName) {
      let issue = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return true
        } else {
          issue = false
          return false;
        }
      });
      return issue
    },

    changeOption() {
      this.resetForm('ruleForm')
      if(this.title === '用户登录') {
        this.title = '用户注册'
        this.option = "注册"
        this.options = '登录'
      } else {
        this.title = '用户登录'
        this.options = '注册账号?'
        this.option = "登录"
      }
    },

    resetForm(formName) {
        this.$refs[formName].resetFields();
    },

    async $_submit() {
      let issue = this.submitForm('ruleForm')
      if(issue) {
        if(this.title === '用户登录') {
          console.log('登录');
          let ret = await loginStudent(this.ruleForm.phoneNumber, md5(md5(this.ruleForm.password)))
          if(ret.err_code === 1) {
            this.$router.push('/')
          } else if(ret.err_code === 3) {
            this.$notify.error({
              title: '登录失败',
              message: '账号或者密码错误'
            })
          }
        } else {
          let ret = await addStudent(this.ruleForm.phoneNumber, md5(md5(this.ruleForm.password)))
          if(ret.err_code === 1) {
            this.$notify.error({
              title: '添加成功',
              type: 'success'
            })
          } else if(ret.err_code === 2) {
            this.$notify.error({
              title: '注册失败',
              message: '该账号已存在'
            })            
          }
        }
      }
    },
  }
}

</script>

<style lang="sass">
.login
  height: 100vh
  width: 100vw
  .box-card
    position: absolute
    background-color: #F3F4F6
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 30%
  .el-row
    text-align: center
  img, .head-portrait
    width: 60px
    height: 60px
    border-radius: 50%
    overflow: hidden
  .head-portrait
    margin: 0 auto
    margin-bottom: 24px
  .el-form-item__label
    padding: 0
    padding-right: 10px
  .el-form-item__label:before
    content: '' !important
  form.el-form.demo-ruleForm
    padding: 20px 20px 0 2px
  .clear-fix a
    color: #409EFF
  .el-form-item:nth-child(4)
    margin-bottom: 0
</style>>
