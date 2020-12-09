<template>
  <el-container class="layout">
    <el-header height="60px" style="margin-left: 200px; lineHeight: 60px">
      <el-row style="padding: 14px 0; line-height: 32px;">
        <el-row class="left">
          <div class="options">
            <span class="el-iconprofilefill" style="margin-right: 10px; color: #19AAF8"></span>
            <span>{{"选择操作"}}</span>
          </div>
        </el-row>
        <el-row class="right flex">
          <span style="font-weight: 700; margin-right: 35px; margin-top: 3px; color: #19AAF8">吴彦祖</span>
          <el-button class="el-iconmessage icon message"></el-button>
          <el-dropdown class="right">
            <div style="width: 32px; height: 32px; border-radius: 50%; overflow: hidden; backgroundColor: pink; cursor: pointer">
              <img src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3163479695,2609507199&fm=26&gp=0.jpg" alt="" style="width: 32px; height: 32px;"/>
            </div>
            <el-dropdown-menu>
              <el-dropdown-item @click.native="personDetail">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
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
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i><span style="color: #fff">导航一</span></template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title"><span style="color: #fff">选项4</span></template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i><span style="color: #fff">导航二</span></template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
      </el-aside>
      <el-main style="height: calc(100vh - 60px); backgroundColor: #F3F4F6">
        <el-card style="height: 100%">
          <router-view></router-view>
        </el-card>
      </el-main>
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
  },

  methods: {
    personDetail() {
      this.$router.push('/profile')
    },
    loginOut() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="sass" >
.layout
  .head_portrait
    margin: 50px 0px 35px
    .banner_img
      margin: 0 auto
      width: 60px 
      height: 60px
      border-radius: 50%
      overflow: hidden
  .options
    color: #333
    font-weight: 700
    font-size: 16px
  .message
    margin-right: 35px
    color: #666666
    padding: 0
    border: none
  .message:focus
    background-color: #ffffff
  ul.el-menu
    width: 100%
    background-color: #19AAF8
    color: #fff
    border-color: #19AAF8
  .el-submenu
    .el-icon-message
      color: #fff
    .el-icon-menu
      color: #fff
    .el-icon-setting
      color: #fff
    i.el-submenu__icon-arrow.el-icon-arrow-down
      color: #fff
    div
      color: #fff !important
  li
    color: #fff
    background-color: #19AAF8 
  .el-submenu__title i
    color: red
  .el-submenu__title:hover:hover
    background-color: rgba(0, 0, 0, .1)
  .el-menu-item:hover
    background-color: rgba(0, 0, 0, .1)
  .el-menu-item:focus
    background-color: rgba(0, 0, 0, .1)
    color: #fff
  .el-menu-item.is-active
    color: #fff
    background-color: rgba(0, 0, 0, .1)
</style>>