<template>
  <div class="wrap" :style="banner">
    <el-card class="box-card">
      <el-row >
        <div class="head-portrait">
          <img :src="imgUrl" alt="">
        </div>
      </el-row>
      <el-row>
        登录管理系统
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      phoneNumber: null,
      password: null,
      banner: {
        backgroundImage: 'url(' + require('../../assets/img/login_banner.jpg') + ')',
        backgroundRepe: 'norepeat',
        backgroundSize: '100% 100%',
        opacity: .8
      },
      imgUrl: require('../../assets/img/swpu_logo.jpg')
    }
  },

}
</script>

<style lang="sass" scoped>
.wrap
  height: 100vh
  width: 100vw
.box-card
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 30%
.el-row
  text-align: center
img, .head-portrait
  width: 48px
  height: 48px
  border-radius: 50%
  overflow: hidden
.head-portrait
  margin: 0 auto
  margin-bottom: 24px
</style>>
