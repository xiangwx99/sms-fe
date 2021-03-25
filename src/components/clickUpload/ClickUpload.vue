<template>
  <input type="file" ref="file" style="display: none" @change="_on_change" />
</template>

<script>
export default {
  name: "ClickUpload",
  props: {
    verify: Function,
  },
  data() {
    return {};
  },
  methods: {
    _click_upload() {
      this.$refs.file.click();
    },
    _on_change(e, files) {
      files = Array.prototype.slice.call(files || e.target.files);
      if (!/image\/\w+/.test(files[0].type)) {
        this.$notify.error({
          title: "错误",
          message: "请选择图片文件",
        });
        return;
      }
      let file = new FormData();
      file.append("file", files[0]);
      const fileUrl = URL.createObjectURL(files[0]);

      this.$emit("getImgUrl", fileUrl, files[0]);
    },
  },
};
</script>

<style lang="sass" scoped></style>
