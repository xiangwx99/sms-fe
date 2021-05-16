<template>
  <el-tabs v-model="tab" @tab-click="handleClick">
    <el-tab-pane label="所有试卷" name="tab-1"
      ><ReviewTable status="all"
    /></el-tab-pane>
    <el-tab-pane label="未完成" name="tab-3"
      ><ReviewTable status="other"
    /></el-tab-pane>
    <el-tab-pane label="已完成" name="tab-2"
      ><ReviewTable status="finished"
    /></el-tab-pane>
  </el-tabs>
</template>

<script>
import ReviewTable from "./childComponents/ReviewTable";
export default {
  name: "Course",
  components: {
    ReviewTable,
  },
  mounted() {
    this.tab = `tab-${this.tabs}`;
  },
  data() {
    return {
      tab: "tab-1",
      tabSelect: null,
    };
  },
  watch: {
    tab(val) {
      if ((val, val.length > 4)) {
        const id = val.substring(4);
        const query = Object.assign({}, this.$route.query || {});
        query.tab = id;
        this.$router.replace({ query });
      }
    },
    "$route.query"(to, from) {
      this.tabSelect = {
        to: to.tab,
        from: from.tab,
      };
    },
  },
  computed: {
    tabs() {
      return this.$route.query.tab || "1";
    },
  },
  methods: {
    handleClick(tab, event) {},
  },
};
</script>

<style scoped></style>
