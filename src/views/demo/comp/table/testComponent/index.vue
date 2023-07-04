<!--       :tree_props="{children: 'children', hasChildren: 'hasChildren'}"-->
<!--:lazy="true"-->
<!--        :load="load"-->

<!--        :row_key="'id'"          highlight-current-row-->
<!--   @handleSizeChange="handleSizeChange"-->
<!--        @handleCurrentChange="handleCurrentChangePage"-->

<template>
  <page-wrapper title="组件测试" content="">
    <collapse-container
      class="cl-mb-10"
      title="组件测试"
      :can-expan="true"
      help-message="组件测试"
    >

      <yui-table
        style="width: 50%"
        :rowData="rowData"
        :headerData="headerData"
        :controlAtrr="controlAtrr"

        :load_staus='load_staus'
        :table_size="elTableClass"
        :border="true"
        :stripe="false"
        :max_height="300"
        :highlight_current_row="true"
        :height="200"
        :show_summary="true"
        :row_class_name="tableRowClassName"
        :default_expand_all="false"
        :span_method="objectSpanMethod"
        :tree_props="{children: 'children', hasChildren: 'hasChildren'}"
        :lazy="true"
        :load="load"
        :row_key="'id'"
        :summary_method="getSummaries"

        @selection-change="handleSelectionChange"
        @current-change="handleCurrentChange"
        @sort-change="sort_change"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChangePage"

      >

        <template #expand>
          <el-table-column type="expand" fixed width="60">
            <template #default="scope">
              <span slot-scope="scope">{{scope.row}}</span>
            </template>

          </el-table-column>
        </template>

        <template #age>
          <el-table-column prop="age" label="年龄" sortable="age">
            <template #default="scope">
              <span slot-scope="scope">{{scope.row["age"]}}</span>
            </template>

          </el-table-column>
        </template>


        <!--        <el-table-column label="日期" width="180">-->
        <!--          <template #default="scope">-->
        <!--            <div style="display: flex; align-items: center">-->
        <!--              <el-icon>-->
        <!--                <timer/>-->
        <!--              </el-icon>-->
        <!--              <span style="margin-left: 10px">{{ scope.row.date }}</span>-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

      </yui-table>

    </collapse-container>
  </page-wrapper>
</template>


<script lang="ts">
  import {defineComponent, computed, ref} from "vue";
  import {PageWrapper} from "@/components/Page";
  import {CollapseContainer} from "@/components/Container/index";
  import {YuiTable} from "@/components/Table/index";
  import {
    yuiTableClass,
  } from '@/enums/tableEnum';

  import {GetTableData} from "@/api/tableData";


  // import DynamicTable from "./component/DynamicTable.vue";

  export default defineComponent({
    name: "table-multiLevelHeader",
    components: {CollapseContainer, PageWrapper, YuiTable},

    data() {
      return {
        load_staus: false,
        elTableClass: yuiTableClass.Small,
        controlAtrr: {
          pageObj: { //分页对象
            position: "left", //分页组件位置 right left
            background: false, // 带有背景色的分页 false / true
            small: false, // 小型分页 false / true
            hide_on_single_page: true, // 当只有一页时隐藏分页
            pager_count: 8, // 设置最大页码按钮数
            page_sizes: [10, 15, 20, 30, 50, 200],  // 接受一个整型数组，数组元素为展示的选择每页显示个数的选项
            layout: "total,sizes,prev, pager, next,jumper", // 表示需要显示的内容，用逗号分隔，布局元素会依次显示。
            total: 100, // 总条数
            pageData: {
              page: 1,  // 页数
              size: 10  // 每页条数
            }
          },
        },
        tableData1: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            age: '10岁',
            age_num: '10',
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            age: '115岁',
            age_num: '115',

          }, {
            date: '2016-05-01',
            name: '张大虎',
            address: '上海市普陀区金沙江路 1519 弄',
            age: '20岁',
            age_num: '20',
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            age: '22岁',
            age_num: '22',
          }],

        rowData: [
          {
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            age: '10',
            age_num: '10',
            address: '上海市普陀区金沙江路 1518 弄',
            hasChildren: true,
          }, {
            id: 2,
            date: '2016-05-04',
            name: '王大虎',
            age: '120',
            age_num: 120,
            address: '上海市普陀区金沙江路 1517 弄',

          }, {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            age: '256',
            age_num: 256,
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              age: '20',
              age_num: 20,
              address: '上海市普陀区金沙江路 1519 弄',

            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              age: '12',
              age_num: 12,
              address: '上海市普陀区金沙江路 1519 弄'
            }]
          }, {
            id: 4,
            date: '2016-05-03',
            name: '王小虎',
            age: '66',
            age_num: 66,
            address: '上海市普陀区金沙江路 1516 弄',
            hasChildren: true
          }],
        tableData3: [
          {
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',

            children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }]
          }, {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }]
          }, {
            id: 4,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
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
        headerData: [
          // {
          //   id: 100,
          //   width: "55",
          //   type: "selection",
          // },

          {slot: "expand"},

          // {
          //   id: 100,
          //   width: "55",
          //   type: "expand",
          //   fixed: true, // 固定列 true left right
          // },


          {
            id: 100,
            label: "日期",
            prop: "date",
            width: "150",
            fixed: true, // 固定列 true left right

          },
          {
            id: 210,
            label: "姓名",
            prop: "name",
            width: "120",

          },
          {
            id: 220,
            label: "地址",
            prop: "address",
            width: "300",
          },
          {slot: "age"},

        ],
        // 多级表头
        headerData2: [
          {
            id: 100,
            width: "55",
            type: "selection",
          },
          {
            id: 100,
            label: "日期",
            prop: "date",
            width: "150",
            fixed: true,
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
                fixed: true,
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
        multipleSelection: [],

        tableData: {
          rowData: [
            {
              id: 1,
              date: '2016-05-02',
              name: '王小虎',
              age: '10',
              age_num: '10',
              address: '上海市普陀区金沙江路 1518 弄',
              hasChildren: true,
            }, {
              id: 2,
              date: '2016-05-04',
              name: '王大虎',
              age: '120',
              age_num: 120,
              address: '上海市普陀区金沙江路 1517 弄',

            }, {
              id: 3,
              date: '2016-05-01',
              name: '王小虎',
              age: '256',
              age_num: 256,
              address: '上海市普陀区金沙江路 1519 弄',
              children: [{
                id: 31,
                date: '2016-05-01',
                name: '王小虎',
                age: '20',
                age_num: 20,
                address: '上海市普陀区金沙江路 1519 弄',

              }, {
                id: 32,
                date: '2016-05-01',
                name: '王小虎',
                age: '12',
                age_num: 12,
                address: '上海市普陀区金沙江路 1519 弄'
              }]
            }, {
              id: 4,
              date: '2016-05-03',
              name: '王小虎',
              age: '66',
              age_num: 66,
              address: '上海市普陀区金沙江路 1516 弄',
              hasChildren: true
            }],
          headerData: [
            // {
            //   id: 100,
            //   width: "55",
            //   type: "selection",
            // },

            {slot: "expand"},

            // {
            //   id: 100,
            //   width: "55",
            //   type: "expand",
            //   fixed: true, // 固定列 true left right
            // },


            {
              id: 100,
              label: "日期",
              prop: "date",
              width: "150",
              fixed: true, // 固定列 true left right

            },
            {
              id: 210,
              label: "姓名",
              prop: "name",
              width: "120",

            },
            {
              id: 220,
              label: "地址",
              prop: "address",
              width: "300",
            },
            {slot: "age"},

          ],
          controlAtrr: {
            pageObj: { //分页对象
              position: "left", //分页组件位置 right left
              background: false, // 带有背景色的分页 false / true
              small: false, // 小型分页 false / true
              hide_on_single_page: true, // 当只有一页时隐藏分页
              pager_count: 8, // 设置最大页码按钮数
              page_sizes: [10, 15, 20, 30, 50, 200],  // 接受一个整型数组，数组元素为展示的选择每页显示个数的选项
              layout: "total,sizes,prev, pager, next,jumper", // 表示需要显示的内容，用逗号分隔，布局元素会依次显示。
              total: 100, // 总条数
              pageData: {
                page: 1,  // 页数
                size: 10  // 每页条数
              }
            },
          },
        },

        getAllTotalData: {},
      }
    },
    methods: {

      getSummaries(param) {
        const {columns} = param;
        const sums: any[] = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';    //这里就是显示你要写的啥名字,是合计还是汇总什么
            return;
          }
          switch (column.property) {  //column.property是prop="highQuality" prop里面的东西
            case "address":
              sums[index] = '--';
              break;
            case "num":   //这是是根据prop来判断是那一列的数据
              sums[index] = this.getAllTotalData["levelOneTotal"]; //sums[index]是固定写法  指定这一列要显示的后台数据
              break;
            case "age":
              sums[index] = this.getAllTotalData["levelTwoTotal"];
              break;
            case "name":
              sums[index] = this.getAllTotalData["levelThreeTotal"];
              break;

            default:
              break;
          }
        });
        return sums;
      },

      load(tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ])
        }, 1000)
      },
      handleCurrentChange(val) {
        console.log("===handleCurrentChange===", val)
      },
      handleSelectionChange(val) {
        console.log("===handleSelectionChange===", val)
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },

      sort_change(column) {
        this.rowData = this.rowData.sort(this.sortFun(column.prop, column.order === 'ascending'));
        console.log(this.rowData)
      },
      // 排序函数
      sortFun(attr, rev) {
        //第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
        if (rev == undefined) {
          rev = 1;
        } else {
          rev = (rev) ? 1 : -1;
        }

        // 判断排序的字段，对齐纯数字字段进行排序
        if (attr == "age") {
          attr = "age_num";
          return function (a, b) {
            a = parseInt(a[attr]);
            b = parseInt(b[attr]);
            if (a < b) {
              return rev * -1;
            }
            if (a > b) {
              return rev * 1;
            }
            return 0;
          }
        } else {
          return function (a, b) {
            try {
              a = parseInt(a[attr]);
            } catch (e) {
              a = a[attr];
            }

            try {
              b = parseInt(b[attr]);
            } catch (e) {
              b = b[attr];
            }

            if (a < b) {
              return rev * -1;
            }
            if (a > b) {
              return rev * 1;
            }

            return 0;
          }
        }


      },

      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      },

      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },

      // 页码变化
      handleCurrentChangePage(e) {
        console.log("==handleCurrentChangePage===", e);
      },
      // 条数变化
      handleSizeChange(e) {
        console.log("==handleSizeChange===", e);
      },

    },

    mounted() {
      this.load_staus = true;
      GetTableData("userid").then((res: any) => {
        if (res.meta.code == "0") {
          this.rowData = res.data.rowData;
          this.headerData = res.data.headerData;
          this.controlAtrr = res.data.controlAtrr;
          this.getAllTotalData = res.data.getAllTotalData;
          this.load_staus = false;

          console.log(this.rowData)
          console.log(this.headerData)
          console.log(this.controlAtrr)
        }

      });
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
    background: #8cf9cd;
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
