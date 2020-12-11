<template>
  <div style="height: 100%">
    <better-scroll class="bscroll">
      <div>
        <el-row>
          <el-col class="title">用户头像</el-col>
          <el-col class="upload-wrap" @click.native="choosePicture" >
            <click-upload ref="uploader" @getImgUrl="changeImg" />
            <img :src=studentInfo.imgUrl alt="" style="width: 88px; height: 88px"/>
            <el-col class="upload-img">
              <div class="rows"></div>
              <div class="cols"></div>
            </el-col>
          </el-col>
        </el-row>

        <el-row style="margin: 1rem 0" >
          <el-col class="title">基本资料</el-col>
          <el-col>
            <el-form :model="studentInfo" ref="studentForm">
              <el-row>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px; padding-right: 20px;">账号</el-col>
                  <el-col :span="16"><el-input v-model="studentInfo.accountnumber" disabled/></el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px">姓名</el-col>
                  <el-col :span="16"><el-input v-model="studentInfo.name" placeholder="请输入您的真实姓名" /></el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px">民族</el-col>
                  <el-col :span="16">
                    <el-select v-model="studentInfo.nation" placeholder="请选择民族">
                      <el-option
                        v-for="item in nations"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px">性别</el-col>
                  <el-select v-model="studentInfo.gender" placeholder="请选择性别" >
                    <el-option label="男" value="1" />                   
                    <el-option label="女" value="0" />
                  </el-select>
                </el-col>
              </el-row>

              <el-row style="margin: 1rem 0">
                <el-col :span="6">
                  <el-col style="lineHeight: 40px; padding-right: 20px;">年龄</el-col>
                  <el-col :span="16"><el-input v-model="studentInfo.age" placeholder="请输入您的年龄" /></el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px; padding-right: 20px;">身份证</el-col>
                  <el-col :span="16"><el-input v-model="studentInfo.idcard" placeholder="请输入您的身份证号" /></el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px">所在院系</el-col>
                  <el-col :span="16">
                    <el-select v-model="studentInfo.department" >
                      <el-option
                        v-for="item in departmentOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px">所在专业</el-col>
                  <el-col :span="16">
                    <el-select v-model="studentInfo.major" >
                      <el-option
                        v-for="item in majorOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-col>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="title">修改密码</el-col>
          <el-col>
            <el-form :model="studentInfo" ref="studentForm">
              <el-row>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px; padding-right: 20px;">旧密码</el-col>
                  <el-col :span="16"><el-input v-model="studentInfo.oldpassword" placeholder="请输入当前密码" show-password /></el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px">新密码</el-col>
                  <el-col :span="16">
                    <el-input v-model="studentInfo.newpassword" placeholder="请输入新密码" show-password/>
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px">确认密码</el-col>
                  <el-col :span="16"><el-input v-model="studentInfo.confirmpassword" placeholder="请确认新密码" show-password /></el-col>
                </el-col>
              </el-row>
            </el-form>
          </el-col>      
        </el-row>

        <el-row style="margin: 1rem 0"><el-button type="primary" @click="saveProfile">保存</el-button></el-row>
      </div>
    </better-scroll>
  </div>
</template>

<script>
import nationOptions from '../../mixins/getNation'
import ClickUpload from 'components/clickUpload/ClickUpload'
import BetterScroll from 'components/betterScroll/BetterScroll'
export default {
  name: 'Profile',
  mixins: [nationOptions],
  components: {
    ClickUpload,
    BetterScroll
  },
  data() {
    return {
      studentInfo: {
        imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3163479695,2609507199&fm=26&gp=0.jpg",
        accountnumber: null,
        name: null,
        nation: null,
        gender: null,
        age: null,
        idcard: null,
        department: null,
        major: null,
        oldpassword: null,
        newpassword: null,
        confirmpassword: null,
      },
      departmentOptions: [],
      majorOptions: []
    }
  },
  methods: {
    choosePicture() {
      this.$refs.uploader._click_upload()
    },
    changeImg(url) {
      this.studentInfo.imgUrl = url
    },
    saveProfile() {
      if(this.studentInfo.oldpassword !== null) {
        // 要修改密码
        if(this.studentInfo.newpassword.length < 6) {
          console.log("新密码长度必须在6位以上");
          return
        } 
        if(this.studentInfo.newpassword === this.studentInfo.confirmpassword) {

        } else {
          console.log('两次输入的密码不统一');
          return
        }
      } else {
        // 不修改密码
        if(this.studentInfo.newpassword.length !== 0 || this.studentInfo.confirmpassword.length !== 0) {
          this.$notify.error({
            title: '修改出错',
            message: '修改密码必须输入原始密码'
          });
          return
        } else {

        }
      }
    },
    pulldown() {
      console.log("========>刷新");
    }
  }
}
</script>

<style lang="sass" scoped>
.bscroll 
  height: 100%
.title
  color: #333
  font-weight: 700
  margin-bottom: 1rem
.upload-wrap
  position: relative
  width: 88px
  height: 88px
  border-radius: 50%
  overflow: hidden
.upload-wrap:hover .upload-img 
  display: inline-block
.upload-img
  display: none
  background-color: rgba(0, 0, 0, .1)
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  border-radius: 50%
  .rows 
    margin: 39px auto
    width: 60%
    height: 6px
    background-color: #ffffff
    border-radius: 5px
  .cols
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 6px
    height: 60%
    border-radius: 5px
    background-color: #ffffff
</style>