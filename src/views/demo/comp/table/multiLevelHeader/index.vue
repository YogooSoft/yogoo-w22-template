<template>
  <page-wrapper title="多级表头【前端】" content="">
    <collapse-container
      class="cl-mb-10"
      title="多级表头【前端】"
      :can-expan="true"
      help-message="多级表头【前端】"
    >

      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column label="配送信息">
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column label="地址">
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
          </el-table-column>
        </el-table-column>
      </el-table>

    </collapse-container>
  </page-wrapper>

  <page-wrapper title="多级表头【后端】" content="">
    <collapse-container
      class="cl-mb-10"
      title="多级表头【后端】"
      :can-expan="true"
      help-message="多级表头【后端】"
    >

      <dynamic-table
        :table-data="tableData"
        :table-header="tableConfig"
      ></dynamic-table>

    </collapse-container>
  </page-wrapper>
</template>


<script lang="ts">
  import {defineComponent, computed, ref} from "vue";
  import {PageWrapper} from "@/components/Page";
  import {CollapseContainer} from "@/components/Container/index";

  import DynamicTable from "./component/DynamicTable.vue";

  export default defineComponent({
    name: "table-multiLevelHeader",
    components: {CollapseContainer, PageWrapper, DynamicTable},

    data() {
      return {
        tableData: [
          {
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
          }],
        tableData2: [
          {
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
          }],

        tableConfig: [
          {
            id: 100,
            label: "日期",
            prop: "date",
            width: "150",
          },
          {
            id: 200,
            label: "配送信息",
            prop: "",
            children: [
              {
                id: 210,
                label: "姓名",
                prop: "name",
                width: "120",
              },
              {
                id: 200,
                label: "地址",
                prop: "",
                children: [
                  {
                    id: 210,
                    label: "省份",
                    prop: "province",
                    width: "120",
                  },
                  {
                    id: 220,
                    label: "城市",
                    prop: "city",
                    width: "120",
                  },
                  {
                    id: 230,
                    label: "详细地址",
                    prop: "address",
                    width: "300",
                  },
                  {
                    id: 240,
                    label: "邮编",
                    prop: "zip",
                    width: "120",
                  },
                ],
              },
            ],
          },
        ],
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
