<template>
  <div class="test">
    <div class="nav_top">考试</div>
    <!-- <div class="title">期末考试-计算机网络</div> -->
    <div
      class="wrap"
      style="width: 1100px; margin: 0 auto; height: calc(100vh - 40px)"
    >
      <div class="head_top"></div>
      <div style="display: flex; height: calc(100vh - 140px)">
        <div class="content">
          <el-scrollbar class="scroll">
            <div style="height: 1000px"></div>
          </el-scrollbar>
        </div>
        <div class="serial_number">
          <el-scrollbar class="scroll">
            <div style="height: 1000px"></div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  mounted() {},
  data() {
    return {};
  },
};
</script>

<style lang="sass">
.test
  .title
  .nav_top
    height: 40px
    background: #3A4357
    text-align: center
    line-height: 40px
    color: #fff
  .wrap
    .head_top
      height: 100px
      background: pink
      padding-bottom: 20px
      border: 1px solid rgb(242, 242, 242)
      border-width: 0 0 1px 0
      display: flex
    .content
      width: 75%
      background: skyblue
    .serial_number
      width: 25%
      background: yellow
    .scroll
      height: calc(100vh - 140px)
      .el-scrollbar__wrap
        overflow-x: hidden
</style>
