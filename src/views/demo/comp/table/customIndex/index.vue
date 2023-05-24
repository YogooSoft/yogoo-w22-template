<template>
  <page-wrapper title="自定义索引" content="">
    <collapse-container
      class="cl-mb-10"
      title="自定义索引"
      :can-expan="true"
      help-message="自定义索引"
    >

      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <!-- 通过给 type=index 的列传入 index 属性，可以自定义索引。该属性传入数字时，将作为索引的起始值。-->
        <!-- 也可以传入一个方法，它提供当前行的行号（从 0 开始）作为参数，返回值将作为索引展示-->
        <el-table-column
          type="index"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
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
    name: "table-customIndex",
    components: {CollapseContainer, PageWrapper},

    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333,
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333,
          tag: '公司'
        }],
      }
    },
    methods: {
      indexMethod(index) {
        // 通过给 type=index 的列传入 index 属性，可以自定义索引。该属性传入数字时，将作为索引的起始值。
        // 也可以传入一个方法，它提供当前行的行号（从 0 开始）作为参数，返回值将作为索引展示
        return index;
      }
    },

    setup(props) {


      return {};
    },
  });
</script>

<style lang="less" scoped>
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
