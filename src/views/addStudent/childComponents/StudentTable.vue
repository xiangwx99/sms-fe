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
          v-model="filterOptions[0].value"
          placeholder="请选择学生性别"
          multiple
        >
          <el-option
            v-for="item in filterOptions[0].options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="filterOptions[1].value"
          multiple
          placeholder="请选择学生班级"
        >
          <el-option
            v-for="item in filterOptions[1].options"
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
            <el-button type="text">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="学号/账号" align="center">
        </el-table-column>
        <el-table-column prop="password" label="密码" align="center">
        </el-table-column>
        <el-table-column prop="gender" label="性别" align="center">
        </el-table-column>
        <el-table-column prop="department" label="院系" align="center">
        </el-table-column>
        <el-table-column prop="major" label="专业" align="center">
        </el-table-column>
        <el-table-column prop="class" label="班级" align="center">
        </el-table-column>
      </el-table>
      <pagination @changeShowStyle="changeShowStyle" />
    </el-scrollbar>
    <AddDialog ref="AddDialog" />
  </div>
</template>

<script>
import InputSearch from "components/inputSearch/InputSearch";
import Pagination from "components/pagination/Pagination";
import AddDialog from "./AddDialog";
export default {
  name: "CourseTable",
  components: {
    InputSearch,
    Pagination,
    AddDialog,
  },
  data() {
    return {
      courseName: null,
      loading: false,
      filterOptions: [
        {
          label: "性别",
          options: [
            { value: "女", label: "女" },
            { value: "男", label: "男" },
          ],
          value: [],
        },
        {
          label: "班级",
          options: [
            { value: "一班", label: "一班" },
            { value: "二班", label: "二班" },
          ],
          value: [],
        },
      ],
      showStyle: true,
      tableData: [
        {
          phoneNumber: "13281880960",
          password: "12345678",
          gender: "男",
          name: "Kobe",
          department: "计算机科学学院",
          major: "网络工程",
          class: "1班",
        },
      ],
    };
  },
  methods: {
    searchByCourseName(val) {
      console.log(this.courseName === val);
      console.log(val);
    },
    clearFilter() {
      this.filterOptions[1].value = [];
      this.filterOptions[0].value = [];
    },
    changeShowStyle(val) {
      this.showStyle = val;
    },
    handleAddStu(val) {
      this.$refs.AddDialog.open(val);
    },
  },
};
</script>

<style lang="sass">
.course-table
  button:focus
    background-color: transparent
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
