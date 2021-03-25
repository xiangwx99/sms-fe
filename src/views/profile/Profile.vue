<template>
  <div style="height: 100%">
    <better-scroll class="bscroll">
      <div>
        <el-row>
          <el-col class="title">用户头像</el-col>
          <el-col class="upload-wrap" @click.native="choosePicture">
            <click-upload ref="uploader" @getImgUrl="changeImg" />
            <img
              :src="
                require('/Applications/lx/learn/swpu/sms-be/assets/img/' +
                  imgUrl)
              "
              alt=""
              style="width: 88px; height: 88px"
            />
            <el-col class="upload-img">
              <div class="rows"></div>
              <div class="cols"></div>
            </el-col>
          </el-col>
        </el-row>

        <el-row style="margin: 1rem 0">
          <el-col class="title">基本资料</el-col>
          <el-col>
            <el-form :model="studentInfo" ref="studentForm">
              <el-row>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px; padding-right: 20px;"
                    >账号</el-col
                  >
                  <el-col :span="16">
                    <el-input v-model="studentInfo.phoneNumber" disabled />
                  </el-col>
                </el-col>

                <el-col :span="6">
                  <el-col style="lineHeight: 40px">所在院系</el-col>
                  <el-col :span="16">
                    <el-input
                      disabled
                      v-model="studentInfo.department"
                      placeholder="所在院系"
                    />
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px">所在专业</el-col>
                  <el-col :span="16">
                    <el-input
                      disabled
                      v-model="studentInfo.major"
                      placeholder="所在专业"
                    />
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px">姓名</el-col>
                  <el-col :span="16">
                    <el-input
                      v-model="studentInfo.name"
                      placeholder="请输入您的真实姓名"
                    />
                  </el-col>
                </el-col>
              </el-row>

              <el-row style="margin: 1rem 0">
                <el-col :span="6">
                  <el-col style="lineHeight: 40px; padding-right: 20px;"
                    >年龄</el-col
                  >
                  <el-col :span="16">
                    <el-input
                      v-model="studentInfo.age"
                      placeholder="请输入您的年龄"
                    />
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px; padding-right: 20px;"
                    >身份证</el-col
                  >
                  <el-col :span="16">
                    <el-input
                      v-model="studentInfo.idcard"
                      placeholder="请输入您的身份证号"
                    />
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px">民族</el-col>
                  <el-col :span="16">
                    <el-select
                      v-model="studentInfo.nation"
                      placeholder="请选择民族"
                    >
                      <el-option
                        v-for="item in nations"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px">性别</el-col>
                  <el-select
                    v-model="studentInfo.gender"
                    placeholder="请选择性别"
                  >
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                  </el-select>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>

        <el-row style="margin: 1rem 0">
          <el-button type="primary" @click="saveProfile">保存修改</el-button>
        </el-row>

        <el-row>
          <el-col class="title">修改密码</el-col>
          <el-col>
            <el-form :model="studentInfo" ref="studentForm">
              <el-row>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px; padding-right: 20px;"
                    >旧密码</el-col
                  >
                  <el-col :span="16">
                    <el-input
                      v-model="studentInfo.oldpassword"
                      placeholder="请输入当前密码"
                      show-password
                    />
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px">新密码</el-col>
                  <el-col :span="16">
                    <el-input
                      v-model="studentInfo.newpassword"
                      placeholder="请输入新密码"
                      show-password
                      :disabled="!studentInfo.oldpassword"
                    />
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col style="lineHeight: 40px">确认密码</el-col>
                  <el-col :span="16">
                    <el-input
                      v-model="studentInfo.confirmpassword"
                      placeholder="请确认新密码"
                      show-password
                      :disabled="
                        !studentInfo.oldpassword || !studentInfo.newpassword
                      "
                    />
                  </el-col>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>

        <el-row style="margin: 1rem 0">
          <el-button type="primary" @click="updatePassword">保存密码</el-button>
        </el-row>
      </div>
    </better-scroll>
  </div>
</template>

<script>
import nationOptions from "../../mixins/getNation";
import md5 from "blueimp-md5";
import { notifySuccess, notifyError, notifyTips } from "../../function/utils";
import ClickUpload from "components/clickUpload/ClickUpload";
import BetterScroll from "components/betterScroll/BetterScroll";
import {
  queryStudentById,
  updateStudentInfo,
  resetStudentPassword,
} from "network/students";
import { uploadFiles } from "network/uploadFiles";
import localStorage from "function/localstorage";

export default {
  name: "Profile",
  mixins: [nationOptions],
  components: {
    ClickUpload,
    BetterScroll,
  },
  async mounted() {
    let { _id } = JSON.parse(localStorage.getLocalStorage("userInfo"));
    let { data } = await queryStudentById(_id);
    Object.keys(this.studentInfo).forEach((key) => {
      if (data.hasOwnProperty(key)) {
        this.studentInfo[key] = data[key];
      }
    });
    this.imgUrl = this.studentInfo.avatar.split("img/")[1]
      ? this.studentInfo.avatar.split("img/")[1]
      : this.imgUrl;
  },
  data() {
    return {
      imgUrl: "avatar.jpeg",
      studentInfo: {
        _id: null,
        avatar: null,
        phoneNumber: null,
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
    };
  },
  methods: {
    choosePicture() {
      this.$refs.uploader._click_upload();
    },
    async changeImg(url, files) {
      let file = new FormData();
      file.append("file", files);
      let data = await uploadFiles(file);
      this.studentInfo.avatar = data.avatar;
      this.imgUrl = this.studentInfo.avatar.split("img/")[1];
    },
    async saveProfile() {
      let { success } = await updateStudentInfo(this.studentInfo);
      if (success) {
        notifySuccess(this.$message, "更改成功");
      } else {
        notifyError(this.$message, "更改失败, 请重试!");
      }
    },
    async updatePassword() {
      if (!this.studentInfo.newpassword || !this.studentInfo.confirmpassword) {
        notifyError(this.$message, "请确认新密码与确认密码是否输入!");
        return;
      } else {
        if (
          this.studentInfo.newpassword.length < 6 ||
          this.studentInfo.confirmpassword.length < 6
        ) {
          notifyTips(this.$message, "新密码长度至少六位!");
          return;
        } else if (
          this.studentInfo.newpassword !== this.studentInfo.confirmpassword
        ) {
          notifyError(this.$message, "两次输入的密码不一致!");
          return;
        }
        let oldpassword = md5(md5(this.studentInfo.oldpassword));
        let newpassword = md5(md5(this.studentInfo.newpassword));
        let { success, message } = await resetStudentPassword(
          this.studentInfo._id,
          oldpassword,
          newpassword
        );
        if (success) {
          notifySuccess(this.$message, "更改成功");
        } else {
          notifyError(this.$message, message);
        }
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.bscroll
  height: 100%
.title
  color: #333
  font-weight: 700
  margin-bottom: 1rem
  padding-top: 20px
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
