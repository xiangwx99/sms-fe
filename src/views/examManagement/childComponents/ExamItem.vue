<template>
  <div class="wrap">
    <div>
      <a
        href="javascript:;"
        style="border-radius: 8px 8px 0 0; display: inline-block; overflow: hidden; position: relative"
      >
        <img
          :src="`${examData.bgImage ? examData.bgImage : defaultImgUrl}`"
          alt=""
          style="width: 100%; height: 170px"
        />

        <span
          class="el-icon-circle-close close"
          @click="handleDelete(examData.id)"
        ></span>
      </a>
    </div>
    <div
      style="lineHeight: 22px; fontSize: 12px; padding-left: 12px; color: #666"
    >
      <p style="fontSize: 18px; color: #000; line-height: 48px">
        {{ examData.examName }}
      </p>
      <!-- <p>{{ examData.name }}</p> -->
      <!-- <p>{{ examData.grade + " " + examData.class }}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ExamIte",
  props: {
    examData: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      defaultImgUrl: require("../../../assets/img/exam_img.jpeg"),
    };
  },
  methods: {
    handleDelete(id) {
      this.$confirm("此操作将永久删除该试卷, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(id + "===> 删除试卷接口");
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.wrap {
  width: 21%;
  background-color: #f3f3f3;
  margin-bottom: 16px;
  border-radius: 8px;
}
.close {
  color: white;
  position: absolute;
  right: 4px;
  top: 4px;
  display: none;
}
.wrap:hover {
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
}
.wrap:hover .close {
  display: inline-block;
}
</style>
