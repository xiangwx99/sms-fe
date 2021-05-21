<template>
  <el-container class="layout">
    <el-header height="60px" style="margin-left: 200px; lineHeight: 60px">
      <el-row style="padding: 14px 0; line-height: 32px;">
        <el-row class="left">
          <div class="options">
            <span
              class="el-iconprofilefill"
              style="margin-right: 10px; color: #19AAF8"
            ></span>
            <span>{{ curOption ? curOption : "选择操作" }}</span>
          </div>
        </el-row>
        <el-row class="right flex">
          <el-button
            class="el-iconmessage icon message"
            @click="choosePath('/messages', '查看消息')"
          >
            <span
              v-show="showDot"
              style="position: absolute; width: 6px; height: 6px; border-radius: 50%; background: red; right: -3px"
            ></span>
          </el-button>
          <el-dropdown class="right">
            <div style="cursor: pointer">
              <span
                style="font-weight: 700; margin-right: 35px; margin-top: 3px; color: #19AAF8"
                >{{ name ? name : phoneNumber }}</span
              >
            </div>
            <el-dropdown-menu>
              <el-dropdown-item
                v-if="this.status === 'stu'"
                @click.native="choosePath('profile', '个人中心')"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item @click.native="choosePath('/loginout')"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-row>
    </el-header>
    <el-container>
      <el-aside
        width="200px"
        style="height: 100vh; margin-top: -60px; backgroundColor: #19AAF8"
      >
        <div class="head_portrait">
          <div class="banner_img">
            <img
              :src="bannerUrl"
              alt="学校头像"
              style="width: 60px; height: 60px"
            />
          </div>
          <div
            style="font-size: 18px; font-weight: 800; padding: 10px 0; text-align: center; line-heigt: 30px; color: #ffffff"
          >
            西南石油大学
          </div>
        </div>
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-menu"></i
              ><span style="color: #fff">考试管理</span></template
            >
            <el-menu-item-group>
              <el-menu-item
                v-if="this.status === 'stu'"
                index="1-1"
                @click.native="choosePath('/examination', '考试中心')"
                ><i class="el-icon-reading" style="color: #fff"></i
                >考试中心</el-menu-item
              >
              <el-menu-item
                index="1-2"
                @click.native="choosePath('/grade', '成绩查询')"
                ><i class="el-icon-document" style="color: #fff"></i
                >成绩管理</el-menu-item
              >

              <el-menu-item
                index="1-4"
                v-if="this.status === 'tea'"
                @click.native="choosePath('/examManagement', '试卷管理')"
                ><i class="el-icon-suitcase" style="color: #fff"></i
                >考试管理</el-menu-item
              >
              <el-menu-item
                index="1-6"
                v-if="this.status === 'tea'"
                @click.native="choosePath('/review', '试卷批阅')"
                ><i class="el-icon-folder-checked" style="color: #fff"></i
                >试卷批阅</el-menu-item
              >
              <el-menu-item
                v-if="this.status === 'tea'"
                index="1-3"
                @click.native="choosePath('/addstudent', '学生录入')"
                ><i class="el-icon-folder-opened" style="color: #fff"></i
                >考生录入</el-menu-item
              >
              <el-menu-item
                index="1-5"
                @click.native="choosePath('/messages', '消息通知')"
                ><i class="el-icon-chat-dot-square" style="color: #fff"></i
                >消息通知</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-s-tools"></i
              ><span style="color: #fff">系统管理</span></template
            >
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
import localStorage from "function/localstorage";
export default {
  name: "Layout",
  mounted() {
    this.status = localStorage.getLocalStorage("status");
    this.name = JSON.parse(localStorage.getLocalStorage("userInfo"))?.name;
    this.phoneNumber = JSON.parse(
      localStorage.getLocalStorage("userInfo")
    )?.phoneNumber;
  },
  created() {
    this.initWebSocket();
    window.websocketsend = this.websocketsend;
    window.websocketonmessage = this.websocketonmessage;
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  data() {
    return {
      showDot: false,
      websock: null,
      status: "tea",
      name: "",
      phoneNumber: "",
      curOption: null,
      bannerUrl: require("../assets/img/swpu_logo.jpg"),
    };
  },

  methods: {
    choosePath(path, options) {
      if (path === "/messages") {
        this.showDot = false;
      }
      if (path === "/loginout") {
        localStorage.removeAllLocalStorage();
        this.$router.push("/login");
      } else {
        this.$router.push(path);
        this.curOption = options;
      }
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://127.0.0.1:8000/addMessages";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log("开始建立连接...");
      //连接建立之后执行send方法发送数据
      // let actions = { test: "成功建立连接!" };
      // this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      //连接建立失败重连
      console.log("===> 连接建立失败");
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
      if (redata.success) {
        this.showDot = true;
        this.$message({
          type: "success",
          message: "你添加的内容是: " + redata.data,
        });
      } else if (!redata.success) {
        this.$message({
          message: "😭服务器崩溃了",
          type: "error",
        });
      } else {
        this.$message({
          message: "😭webscoket连接崩溃了",
          type: "error",
        });
      }
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接😭");
    },
  },
};
</script>

<style lang="sass">
.layout
  .el-submenu__title
    display: none
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
    position: relative
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
    color: #fff
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
  .el-card__body
    height: 100%
  .el-menu-item-group__title
    padding: 0
  .el-card__body
    padding-top: 0
  .el-main
    padding: 16px
</style>
