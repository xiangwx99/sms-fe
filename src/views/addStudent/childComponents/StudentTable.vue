<template>
  <div class="course-table">
    <el-row style="margin-bottom: 20px;">
      <el-row
        style="margin-bottom: 15px; font-size: 14px; line-height: 24px; height: 24px"
        class="flex"
      >
        <div style="margin-right: 5px">筛选项:</div>
        <div v-for="(item, index) in filterOptions" :key="index">
          <div
            style="background-color: #F1F2F2; margin: 0 5px; border-radius: 4px"
            v-if="item.value.length > 0"
          >
            <span style="padding: 0 5px; color: #999">{{ item.label }}:</span>
            <span v-for="item in item.value" :key="item">
              <span style="margin: 0 3px">{{ item }}</span>
            </span>
          </div>
        </div>
        <div>
          <el-button
            style="color: #19AAF8; padding: 0px; border: none"
            @click="clearFilter"
            >清除所有</el-button
          >
        </div>
      </el-row>
      <el-col class="left flex select" :span="18">
        <el-select
          v-for="(item, index) in filterOptions"
          :key="item.label"
          v-model="filterOptions[index].value"
          multiple
          :placeholder="item.placeholder"
          @change="$_request"
        >
          <el-option
            v-for="item in filterOptions[index].options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-dropdown>
          <el-button type="text" style="padding: 8px 12px;">
            添加学生
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-circle-plus"
              @click.native="handleAddStu('single')"
              >手动添加</el-dropdown-item
            >
            <el-dropdown-item
              icon="el-icon-folder-add"
              @click.native="handleAddStu('complex')"
              >批量导入</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="6">
        <div class="right">
          <input-search
            placeholder="请输入学生编号"
            v-model="courseName"
            @input="searchByCourseName"
          />
        </div>
      </el-col>
    </el-row>
    <el-scrollbar class="course-table-scroll" v-loading="loading">
      <el-table
        :border="showStyle"
        :data="tableData"
        style="width: 100%; margin-top: 5px"
      >
        <el-table-column label="名字" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="toPersonInfo(scope.row)">{{
              scope.row.name
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="学号/账号" align="center">
        </el-table-column>
        <el-table-column prop="gender" label="性别" align="center">
        </el-table-column>
        <el-table-column prop="department" label="院系" align="center">
        </el-table-column>
        <el-table-column prop="major" label="专业" align="center">
        </el-table-column>
        <el-table-column prop="grade" label="年级" align="center">
        </el-table-column>
        <el-table-column prop="classes" label="班级" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              style="padding: 6px"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="open(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        @changeShowStyle="changeShowStyle"
        @refetch="refetch"
        :total="total"
      />
    </el-scrollbar>
    <AddDialog ref="AddDialog" />
  </div>
</template>

<script>
import InputSearch from "components/inputSearch/InputSearch";
import Pagination from "components/pagination/Pagination";
import AddDialog from "./AddDialog";
import nationOptions from "mixins/getNation";
import { queryStudent, deleteStudent } from "network/students";
export default {
  name: "CourseTable",
  mixins: [nationOptions],
  components: {
    InputSearch,
    Pagination,
    AddDialog,
  },
  data() {
    return {
      page: 1,
      size: 10,
      total: 10,
      courseName: null,
      loading: false,
      filterOptions: [
        {
          placeholder: "请选择年级",
          label: "年级",
          options: [
            { value: "2017级", label: "2017级" },
            { value: "2018级", label: "2018级" },
            { value: "2019级", label: "2019级" },
            { value: "2020级", label: "2020级" },
          ],
          value: [],
        },
        {
          placeholder: "请选择班级",
          label: "班级",
          options: [
            { value: "1班", label: "1班" },
            { value: "2班", label: "2班" },
            { value: "3班", label: "3班" },
            { value: "4班", label: "4班" },
          ],
          value: [],
        },
      ],
      showStyle: true,
      tableData: [],
    };
  },
  methods: {
    refetch(val) {
      let { page, size } = val;
      this.page = page;
      this.size = size;
      this.$_request();
    },
    async $_request() {
      let queryArgs = {};
      queryArgs.page = this.page;
      queryArgs.size = this.size;
      queryArgs.grade = this.filterOptions[0].value;
      queryArgs.classes = this.filterOptions[1].value;
      queryArgs.phoneNumber = this.courseName;
      let { data, total } = await queryStudent(queryArgs);
      this.tableData = data;
      this.total = total;
    },
    searchByCourseName(val) {
      this.$_request();
    },
    clearFilter() {
      this.filterOptions.forEach(
        (item, index) => (this.filterOptions[index].value = [])
      );
      this.$_request();
    },
    changeShowStyle(val) {
      this.showStyle = val;
    },
    handleAddStu(val) {
      this.$refs.AddDialog.open(val);
    },
    async open(row) {
      this.$confirm("确认删除该学生吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteStudent(row._id).then((res) => {
          if (res.success) {
            this.$_request();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        });
      });
    },
    toPersonInfo(val) {
      this.$router.push({
        path: "/profile",
        query: { id: val._id },
      });
    },
  },
  async mounted() {
    await this.$_request();
  },
};
</script>

<style lang="sass">
.course-table
  .el-select
    margin-right: 10px
  .el-select__tags
    > span
      display: block
      height: 28px
      overflow: hidden
  .el-select__tags
    i
      display: none
    .el-tag.el-tag--info
      border: none
      background-color: #ffffff
      padding: 0 4px
    .el-select__tags-text
      color: #000
  .course-table-scroll
    height: calc(100vh - 260px)
    .el-scrollbar__wrap
      overflow-x: hidden
    th
      background-color: #e8f7ff
      color: #666
</style>
