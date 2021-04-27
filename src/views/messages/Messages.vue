<template>
  <div style="padding-top: 40px">
    <message-table showTab="tab-1" />
  </div>
</template>

<script>
import MessageTable from "views/messages/childComponents/MessageTable";
export default {
  name: "Messages",
  components: {
    MessageTable,
  },

  data() {
    return {
      tab: "tab-1",
      tabSelect: null,
    };
  },

  watch: {
    tab(val) {
      if (val && val.length > 4) {
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

  mounted() {
    this.tab = `tab-${this.tabs}`;
  },

  methods: {
    handleClick(tab, event) {
      // console.log(tab)
    },
  },
};
</script>

<style lang="sass" scoped></style>
