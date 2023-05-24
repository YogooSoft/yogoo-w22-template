<template>
  <page-wrapper title="流体高度" content="">
    <collapse-container
      class="cl-mb-10"
      title="流体高度"
      :can-expan="true"
      help-message="流体高度"
    >

      <el-table
        :data="tableData"
        style="width: 100%"
        border
        max-height="250">
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template  #default="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </collapse-container>
  </page-wrapper>
</template>


<script lang="ts">
  import {defineComponent, computed, ref} from "vue";
  import {PageWrapper} from "@/components/Page";
  import {CollapseContainer} from "@/components/Container/index";

  export default defineComponent({
    name: "table-maxHight",
    components: {CollapseContainer, PageWrapper},

    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },

    setup(props) {


      return {};
    },
  });
</script>


<style lang="less" scoped>
  :deep( .el-table .warning-row) {
    background: oldlace;
  }

  :deep( .el-table .success-row) {
    background: #f0f9eb;
  }

  .flex-1 {
    flex: 1;
  }

  .flex-2 {
    margin-bottom: 10px;
  }

  .cl-mb-10 {
    margin-bottom: 10px;
  }

  .cl-mb-10-top {
    margin-top: 10px;
  }

  .el-alert {
    margin-bottom: 10px;
  }
</style>
