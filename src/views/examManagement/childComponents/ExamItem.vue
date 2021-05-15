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
        <span
          class="status"
          v-if="path === '/examination'"
          style="font-size: 14px; font-weight: 600"
        >
          <span v-show="status === '未完成'" style="color: #ced6e0;"
            >未完成</span
          >
          <span v-show="status === '未开始'" style="color: #747d8c"
            >未开始</span
          >
          <span v-show="status === '进行中'" style="color: #00b894"
            >进行中</span
          >
          <span v-show="status === '阅卷中'" style="color: #F79F1F"
            >阅卷中</span
          >
          <span v-show="status === '已完成'">
            <span style="color: #009432">90分</span>
            <span style="color: #EA2027">59分</span>
          </span>
        </span>
      </div>
      <AssignDialog ref="AssignDialog" />
    </div>
  </div>
</template>

<script>
import { deleteExam } from "../../../network/exam";
import { notifyError, notifySuccess, notifyTips } from "function/utils";
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
  mounted() {
    if (this.examData.time) {
      console.log(this.examData);
      let startTime = new Date(this.examData.time[0]);
      let endTime = new Date(this.examData.time[1]);
      if (new Date() < startTime) {
        this.status = "未开始";
      } else if (new Date() > endTime) {
        if (this.examData.status === "pending") {
          this.status = "未完成";
        } else if (this.examData.status === "half") {
          this.status = "阅卷中";
        } else {
          this.status = "已完成";
        }
      } else {
        if (this.examData.status === "pending") {
          this.status = "进行中";
        } else if (this.examData.status === "half") {
          this.status = "阅卷中";
        } else {
          this.status = "已完成";
        }
      }
    }
  },
  data() {
    return {
      defaultImgUrl: require("../../../assets/img/exam_img.jpeg"),
      path: this.$route.fullPath,
      status: "",
    };
  },
  methods: {
    preview(item) {
      // console.log(item);
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
          let startTime = new Date(item.time[0]);
          let endTime = new Date(item.time[1]);

          if (new Date() < startTime) {
            notifyTips(this.$message, "未到考试时间");
          } else if (new Date() > endTime) {
            if (item.status === "pending") {
              notifyTips(this.$message, "试卷未作答，禁止查看");
            } else if (item.status === "half") {
              notifyTips(this.$message, "试卷批阅中，禁止查看");
            } else {
              console.log("-====> 阅读");
            }
          } else {
            if (item.status === "pending") {
              window.open(`/test?_id=${item._id}`, "_blank");
            } else if (item.status === "half") {
              notifyTips(this.$message, "试卷已提交, 不允许查看");
            }
          }
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
      this.$refs.AssignDialog.open(this.examData._id, this.examData.content);
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

.exam-item .status {
  position: absolute;
  bottom: 0;
  right: 12px;
}
</style>
