<template>
  <div class="wrap left" style="margin-right: 32px">
    <div class="exam-item">
      <div class="top-wrap" @click.stop="preview(examData)">
        <div class="content"></div>
      </div>
      <div style="line-height: 40px; position: relative; height: 40px">
        <span class="text-ellipsis" style="width: 200px; font-size: 14px">{{
          examData.content.examName
        }}</span>
        <div
          class="more"
          style="position: absolute; right: 0; width: 40px; height: 40px; top: 0"
        >
          <el-dropdown>
            <span class="el-dropdown-link" style="position: relative; top: 2px">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-share" @click.native="assignExam">
                指派
              </el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-delete"
                @click.native="handleDelete(examData._id)"
              >
                删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <AssignDialog ref="AssignDialog" />
    </div>
  </div>
</template>

<script>
import { deleteExam } from "../../../network/exam";
import { notifyError, notifySuccess } from "function/utils";
import AssignDialog from "./AssignDialog";
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
  components: {
    AssignDialog,
  },
  data() {
    return {
      defaultImgUrl: require("../../../assets/img/exam_img.jpeg"),
    };
  },
  methods: {
    preview(item) {
      console.log(this.$route);
      if (this.$route.fullPath === "/examination") {
        this.$confirm(
          "离开或退出考试界面答题计时不停止，请不要中途离开考试界面。",
          "提示",
          {
            confirmButtonText: "进入考试",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          window.open(`/test?_id=${item._id}`, "_blank");
        });
      } else if (this.$route.fullPath === "/examManagement") {
        window.open(`/preview?_id=${item._id}`);
      }
    },
    async handleDelete(id) {
      this.$confirm("此操作将永久删除该试卷, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await deleteExam(id);
        if (res.success) {
          notifySuccess(this.$message, "删除成功");
          this.$emit("reftch");
        } else {
          notifyError(this.$message, "服务端错误");
        }
      });
    },
    assignExam() {
      this.$refs.AssignDialog.open(this.examData._id);
    },
  },
};
</script>

<style scoped>
.exam-item {
  position: relative;
  width: 240px;
  height: 240px;
  margin-top: 28px;
  cursor: pointer;
}
.top-wrap {
  position: relative;
  width: 240px;
  height: 180px;
  background-color: #dcedff;
  border-radius: 16px;
  border-top-left-radius: 0;
}
.top-wrap:before {
  content: "";
  position: absolute;
  top: -20px;
  left: 0;
  width: 50%;
  height: 0px;
  border-bottom: 20px solid #c0ddff;
  border-left: 20px solid #c0ddff;
  border-right: 20px solid transparent;
  border-top-left-radius: 16px;
}
.content {
  opacity: 0.8;
  width: 210px;
  height: 140px;
  border-radius: 12px;
  position: absolute;
  top: 20px;
  left: 15px;
  background: url("../../../assets/img/exam-bgc.jpeg");
}
.el-icon-more:before {
  font-size: 14px;
}
.more {
  display: none;
}
.exam-item:hover .more {
  display: inline-block;
}
</style>
