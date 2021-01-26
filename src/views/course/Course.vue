<template>
  <el-tabs v-model="tab" @tab-click="handleClick">
    <el-tab-pane label="个人选课" name="tab-1"><CourseTable /></el-tab-pane>
    <el-tab-pane label="选课结果" name="tab-2">选课结果</el-tab-pane>
    <el-tab-pane label="退课管理" name="tab-3">退课管理</el-tab-pane>
  </el-tabs>
</template>

<script>
  import CourseTable from "./childComponents/CourseTable";
  export default {
    name: "Course",
    components: {
      CourseTable
    },
    mounted() {
      this.tab = `tab-${this.tabs}`
    },
    data() {
      return {
        tab: 'tab-1',
        tabSelect: null
      }
    },
    watch: {
      tab(val) {
        if(val, val.length > 4) {
          const id = val.substring(4)
          const query = Object.assign({}, this.$route.query || {})
          query.tab = id
          this.$router.replace({query})
        }
      },
      '$route.query'(to, from) {
        this.tabSelect = {
          to: to.tab,
          from: from.tab
        }
      }
    },
    computed: {
      tabs() {
        return this.$route.query.tab || '1'
      }
    },
    methods: {
      handleClick(tab, event) {
      }
    }
  }
</script>

<style scoped>

</style>