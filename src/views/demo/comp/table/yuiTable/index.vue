<template>
  <page-wrapper title="yuiTable组件" content="">
    <collapse-container
      class="cl-mb-10"
      title="加载效果、表格大小调整、边框线、斑马纹、行文本位置、高度、表尾合计、展开行数据、单选、排序、翻页(前端控制)"
      :can-expan="true"
    >
      <el-alert
        title="高度：设置表格固定高度和最大高度；行文本位置：表头居中、行数据居中、表尾居中；表尾合计：使用接口合计数据；展开行数据：可配置默认展开；翻页：前端控制翻页，位置居右，此处配置为当只有一页时隐藏分页；"
        type="info"
        show-icon
      />

      <yui-table
        :style="{ width: '100%' }"
        :rowData="
          rowData.length > 0
            ? rowData.slice(
                (controlAtrr['pageObj']['pageData']['page'] - 1) *
                  controlAtrr['pageObj']['pageData']['size'],
                controlAtrr['pageObj']['pageData']['page'] *
                  controlAtrr['pageObj']['pageData']['size']
              )
            : ''
        "
        :headerData="headerData"
        :controlAtrr="controlAtrr"
        :header_cell_style="{ 'text-align': 'center' }"
        :cell_style="{ 'text-align': 'center' }"
        :load_staus="load_staus"
        :table_size="elTableClass"
        :border="true"
        :stripe="true"
        :max_height="500"
        :highlight_current_row="true"
        :show_summary="true"
        :summary_method="getSummaries"
        :summary_cell_style="'center'"
        :default_expand_all="false"
        @current-change="handleCurrentChange"
        @sort-change="sort_change"
        @handleSizeChange="handleSizeChangeT1"
        @handleCurrentChange="handleCurrentChangePageT1"
      >
        <template #expand>
          <el-table-column type="expand" fixed width="60">
            <template #default="scope">
              <span slot-scope="scope">{{ scope.row }}</span>
            </template>
          </el-table-column>
        </template>

        <template #age>
          <el-table-column
            prop="age"
            label="年龄"
            sortable="age_num"
            width="100"
          >
            <template #default="scope">
              <span slot-scope="scope">{{ scope.row["age"] }}</span>
            </template>
          </el-table-column>
        </template>
      </yui-table>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="筛选、自定义列模板、自定义表头、行文本位置"
      :can-expan="true"
    >
      <el-alert
        title="筛选：建议此处使用状态、等级、性别等分类较少的简单筛选，更复杂的筛选功能在搜索区域实现；行文本位置：表头居左、行数据居中、表尾居右；"
        type="info"
        show-icon
      />

      <yui-table
        :rowData="
          rowData3.filter(
            (data) =>
              !search ||
              data.userId.toLowerCase().includes(search.toLowerCase())
          )
        "
        :headerData="headerData3"
        :controlAtrr="controlAtrr3"
        :load_staus="load_staus"
        :cell_style="{ 'text-align': 'center' }"
        :show_summary="true"
        :summary_cell_style="'right'"
        :border="true"
      >
        <template #cardType>
          <el-table-column label="证件类型">
            <el-button size="mini" #default="scope">查看</el-button>
          </el-table-column>
        </template>

        <template #operate>
          <el-table-column
            slot="operate"
            label="操作"
            align="center"
            width="300"
          >
            <template #header>
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
              />
            </template>
            <template #default="scope">
              <el-button
                size="small"
                type="warning"
                icon="Edit"
                @click="edit(scope.row)"
                >编辑
              </el-button>
              <el-button
                size="small"
                type="primary"
                icon="SuccessFilled"
                @click="startUsing(scope.row)"
                >启用
              </el-button>
            </template>
          </el-table-column>
        </template>

        <template #date>
          <el-table-column
            prop="date"
            label="日期"
            sortable
            width="180"
            column-key="date"
            :filters="filters"
            :filter-method="filterHandler"
          >
          </el-table-column>
        </template>
      </yui-table>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="带状态表格、树形结构、懒加载、多选、多级表头、固定列、翻页(后端控制)"
      :can-expan="true"
    >
      <el-alert
        title="固定列：可配置固定位置居左居右，带状态表格不对固定的列生效；翻页：后端控制翻页，位置居左，当只有一页时不隐藏分页；"
        type="info"
        show-icon
      />

      <yui-table
        :style="{ width: '50%' }"
        :rowData="rowData2"
        :headerData="headerData2"
        :controlAtrr="controlAtrr2"
        :header_cell_style="{ 'text-align': 'center' }"
        :load_staus="load_staus2"
        :border="true"
        :row_class_name="tableRowClassName"
        :tree_props="{ children: 'children', hasChildren: 'hasChildren' }"
        :lazy="true"
        :load="load"
        :row_key="'id'"
        @selection-change="handleSelectionChange"
        @handleSizeChange="handleSizeChangeT2"
        @handleCurrentChange="handleCurrentChangePageT2"
      >
        <template #age>
          <el-table-column prop="age" label="年龄" sortable="age" width="100">
            <template #default="scope">
              <span slot-scope="scope">{{ scope.row["age"] }}</span>
            </template>
          </el-table-column>
        </template>
      </yui-table>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
// 引入yui-table组件
import { YuiTable } from "@/components/Table/index";
// 引入yui-table大小样式组件
import { yuiTableClass } from "@/enums/tableEnum";
// 引入图标
import { Edit, SuccessFilled } from "@element-plus/icons-vue";

import { GetTableData, GetTableData2, GetTableData3 } from "@/api/tableData";

export default defineComponent({
  name: "yui-table-demo",
  components: { CollapseContainer, PageWrapper, YuiTable },

  data() {
    return {
      // 表头筛选项数据
      filters: [
        { text: "2016-05-02", value: "2016-05-02" },
        { text: "2016-05-03", value: "2016-05-03" },
        { text: "2016-05-04", value: "2016-05-04" },
        { text: "2016-05-05", value: "2016-05-05" },
        { text: "2016-05-06", value: "2016-05-06" },
        { text: "2016-05-07", value: "2016-05-07" },
        { text: "2016-05-08", value: "2016-05-08" },
        { text: "2016-05-09", value: "2016-05-09" },
        { text: "2016-05-10", value: "2016-05-10" },
        { text: "2016-05-11", value: "2016-05-11" },
        { text: "2016-05-12", value: "2016-05-12" },
        { text: "2016-05-13", value: "2016-05-13" },
        { text: "2016-05-14", value: "2016-05-14" },
      ],
      // 表头搜索关键字
      search: "",
      // 是否显示加载状态 true/false
      load_staus: false,
      // 是否显示加载状态 true/false
      load_staus2: false,
      // table大小样式选择yuiTableClass：Large、Medium、Small、ExtraSmall
      elTableClass: yuiTableClass.ExtraSmall,
      // 控制类组件属性
      controlAtrr: {},
      //行数据属性
      rowData: [],
      //表头属性
      headerData: [],
      // 多级表头
      headerData211: [
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
      // 控制类组件属性
      controlAtrr2: {},
      //行数据属性
      rowData2: [],
      //表头属性
      headerData2: [],
      // 控制类组件属性
      controlAtrr3: {},
      //行数据属性
      rowData3: [],
      //表头属性
      headerData3: [],
      // 尾行合计数据
      getAllTotalData: {},
    };
  },
  methods: {
    getSummaries(param) {
      const { columns } = param;
      const sums: any[] = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          // 控制显示尾行名称：合计、汇总等
          sums[index] = "合计";
          return;
        }
        //column.property prop的值
        switch (column.property) {
          //这里是根据prop来判断是哪一列的数据
          case "address":
            sums[index] = "--";
            break;
          case "num":
            //sums[index]是固定写法  指定这一列要显示的后台数据
            sums[index] = this.getAllTotalData["levelOneTotal"];
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

    // 筛选处理函数
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 懒加载处理函数
    load(tree, treeNode, resolve) {
      // 模拟从后台获取的数据，实际中这里调用接口数据
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
        ]);
      }, 1000);
    },
    //  单行数据选择变动，方法触发
    handleCurrentChange(val) {
      console.log("===handleCurrentChange===", val);
    },
    // 多选，方法触发
    handleSelectionChange(val) {
      console.log("===handleSelectionChange===", val);
    },
    // 表格className方法触发
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // 排序方法
    sort_change(column) {
      // column.column.sortable 为实际进行排序的prop 名
      this.rowData = this.rowData.sort(
        this.sortFun(
          column.column.sortable,
          column.prop,
          column.order === "ascending"
        )
      );
      console.log(this.rowData);
    },
    // 排序函数
    sortFun(prop_sortable, attr, rev) {
      //第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
      }

      // 判断排序的字段，对齐纯数字字段进行排序
      if (prop_sortable) {
        attr = prop_sortable;
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
        };
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
        };
      }
    },
    // 行合并
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    // 列合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },

    // 表1 分页
    // 页码变化
    handleCurrentChangePageT1(e) {
      // 接收页码变化 及后续操作
      console.log("点击页码：", e);
      this.controlAtrr["pageObj"]["pageData"]["page"] = e;
    },
    // 条数变化
    handleSizeChangeT1(e) {
      // 接收条数变化 及后续操作
      console.log("选择页大小：", e);
      this.controlAtrr["pageObj"]["pageData"]["size"] = e;
    },

    // 表2 分页
    // 页码变化
    handleCurrentChangePageT2(e) {
      console.log("点击页码：", e);
      // 接收页码变化 及后续操作
      var parm_data = {
        page: e,
        size: this.controlAtrr2["pageObj"]["pageData"]["size"],
      };
      this.load_staus2 = true;
      GetTableData2(parm_data).then((res: any) => {
        if (res.meta.code == "0") {
          this.rowData2 = res.data.rowData;
          this.headerData2 = res.data.headerData;
          this.controlAtrr2 = res.data.controlAtrr;
          this.load_staus2 = false;

          // console.log(this.rowData2)
          // console.log(this.headerData2)
          // console.log(this.controlAtrr2)
        }
      });
    },
    // 条数变化
    handleSizeChangeT2(e) {
      // 接收条数变化 及后续操作
      console.log("选择页大小：", e);
      // 接收页码变化 及后续操作
      var parm_data = {
        page: 1,
        size: e,
      };
      this.load_staus2 = true;
      GetTableData2(parm_data).then((res: any) => {
        if (res.meta.code == "0") {
          this.rowData2 = res.data.rowData;
          this.headerData2 = res.data.headerData;
          this.controlAtrr2 = res.data.controlAtrr;
          this.load_staus2 = false;
        }
      });
    },
  },

  mounted() {
    // 控制显示table加载中动效
    this.load_staus = true;
    this.load_staus2 = true;
    // 获取表1数据
    GetTableData("userid").then((res: any) => {
      if (res.meta.code == "0") {
        this.rowData = res.data.rowData;
        this.headerData = res.data.headerData;
        this.controlAtrr = res.data.controlAtrr;
        this.getAllTotalData = res.data.getAllTotalData;
        // 控制关闭table加载中动效
        this.load_staus = false;
        //
        // console.log(this.rowData)
        // console.log(this.headerData)
        // console.log(this.controlAtrr)
      }
    });
    // 获取表2数据
    GetTableData2({ page: 1, size: 10 }).then((res: any) => {
      if (res.meta.code == "0") {
        this.rowData2 = res.data.rowData;
        this.headerData2 = res.data.headerData;
        this.controlAtrr2 = res.data.controlAtrr;
        this.load_staus = false;
        this.load_staus2 = false;

        // console.log(this.rowData2)
        // console.log(this.headerData2)
        // console.log(this.controlAtrr2)
      }
    });
    // 获取表3数据
    GetTableData3("userid").then((res: any) => {
      if (res.meta.code == "0") {
        this.rowData3 = res.data.rowData;
        this.headerData3 = res.data.headerData;
        this.controlAtrr3 = res.data.controlAtrr;
        this.load_staus = false;

        // console.log(this.rowData3)
        // console.log(this.headerData3)
        // console.log(this.controlAtrr3)
      }
    });
  },

  setup(props) {
    return {};
  },
});
</script>

<style lang="less" scoped>
:deep(.el-table .warning-row) {
  background: oldlace;
}

:deep(.el-table .success-row) {
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
