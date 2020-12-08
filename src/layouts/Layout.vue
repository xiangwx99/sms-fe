<template>
  <el-container>
    <el-header height="60px" style="margin-left: 200px; lineHeight: 60px">
      <el-row style="padding-top: 12px; height: 100%">
        <el-dropdown class="right">
          <div style="width: 32px; height: 32px; border-radius: 50%; overflow: hidden; backgroundColor: pink"></div>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" style="height: 100vh; margin-top: -60px; backgroundColor: #19AAF8">
        <div class="head_portrait">
          <div class="banner_img"><img :src="bannerUrl" alt="学校头像" style="width: 60px; height: 60px"/></div>
          <div style="font-size: 18px; font-weight: 800; padding: 10px 0; text-align: center; line-heigt: 30px; color: #ffffff">
            西南石油大学
          </div>
        </div>
      </el-aside>
      <el-main style="height: calc(100vh - 60px); backgroundColor: #F3F4F6">main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      bannerUrl: require('../assets/img/swpu_logo.jpg')
    }
  }
}
</script>

<style lang="sass" scoped>
.head_portrait
  margin: 50px 0px 35px
  .banner_img
    margin: 0 auto
    width: 60px 
    height: 60px
    border-radius: 50%
    overflow: hidden
</style>>