<template>
  <ExamManagementTable />
</template>

<script>
import ExamManagementTable from "./childComponents/ExamManagementTable";
export default {
  name: "ExamManagement",
  components: {
    ExamManagementTable,
  },
  data() {
    return {
      tab: "tab-1",
    };
  },
};
</script>

<style></style>
