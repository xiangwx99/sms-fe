<template>
    <el-scrollbar class="message-table">
      <el-table
        :border="showStyle"
        :data="tableData"
        style="width: 100%; margin-top: 5px">
        <el-table-column
          prop="date"
          label="日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="内容"
          align="center">
        </el-table-column>
        <el-table-column label="操作" align="center"  v-if="showTab === 'tab-1'">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="changeRead(scope.$index, scope.row)">标位已读</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  v-else-if="showTab === 'tab-2'">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="changeUnRead(scope.$index, scope.row)">标为未读</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination @changeShowStyle="changeShowStyle"/>
    </el-scrollbar>
</template>

<script>
import Pagination from 'components/pagination/Pagination'
export default {
  name: 'MessageTable',
  components: {
    Pagination
  },

  props: {
    showTab: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      showStyle: true,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }]
    }
  },

  methods: {
    changeRead(index, row) {
      console.log(index, row);
    },

    changeUnRead(index, row) {
      console.log(index, row);
    },

    changeShowStyle(val) {
      this.showStyle = val
    }
  }
}
</script>

<style lang="sass">
.message-table
  height: calc(100vh - 194px)
  .el-scrollbar__wrap
    overflow-x: hidden
</style>