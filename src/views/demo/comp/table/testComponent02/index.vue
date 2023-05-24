<template>
  <page-wrapper title="组件测试2" content="">
    <collapse-container
      class="cl-mb-10"
      title="组件测试2"
      :can-expan="true"
      help-message="组件测试2"
    >


      <yui-table
        :rowData="rowData.filter(data => !search || data.userId.toLowerCase().includes(search.toLowerCase()))"
        :headerData="headerData"
        :controlAtrr="controlAtrr"
        :load_staus='load_staus'
        border
        stripe
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
                placeholder="输入关键字搜索"/>
            </template>
            <template #default="scope">
              <el-button
                size="small"
                type="warning"
                icon="el-icon-edit"
                @click="edit(scope.row)"
              >编辑
              </el-button>
              <el-button
                size="small"
                type="primary"
                icon="el-icon-success"
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
            :filters="[ {text: '2016-05-02', value: '2016-05-02'},{text: '2016-05-03', value: '2016-05-03'}]"
            :filter-method="filterHandler"
          >
          </el-table-column>

        </template>


      </yui-table>

    </collapse-container>
  </page-wrapper>
</template>


<script lang="ts">
  import {defineComponent, computed, ref} from "vue";
  import {PageWrapper} from "@/components/Page";
  import {CollapseContainer} from "@/components/Container/index";
  import {YuiTable} from "@/components/Table/index";

  // import vicTable from "./vicTable.vue";

  export default defineComponent({
    name: "table-multiLevelHeader",
    components: {CollapseContainer, PageWrapper, YuiTable},

    data() {
      return {
        search: '',
        pageObj: { //分页对象
          position: "right", //分页组件位置
          total: 100,
          pageData: {
            page: 1,
            size: 10
          }
        },
        controlAtrr: {
          pageObj: { //分页对象
            position: "right", //分页组件位置 right left
            background: false, // 带有背景色的分页 false / true
            hide_on_single_page:true, // 当只有一页时隐藏分页
            pager_count: 5, // 设置最大页码按钮数
            page_sizes:[10, 15, 20, 30,50],  // 接受一个整型数组，数组元素为展示的选择每页显示个数的选项
            layout:"total,sizes,prev, pager, next,jumper", // 表示需要显示的内容，用逗号分隔，布局元素会依次显示。
            total: 100,
            pageData: {
              page: 1,
              size: 10
            }
          },
        },
        headerData: [

          {slot: "date"},
          {label: "名称", prop: "userId"},
          {label: "链接", prop: "userName"},
          {slot: "cardType"},
          {label: "排序", prop: "tel"},
          {slot: "operate"},


        ], // 操作列
        rowData: [
          {
            date: '2016-05-02',
            userId: "admin",
            userName: "管理员",
            tel: "10",
            cardType: 1,
          },
          {
            date: '2016-05-03',
            userId: "Mary",
            userName: "玛丽",
            tel: "20",
            cardType: 2,
          },
        ],

        multipleSelection: [],

        tableData: {
          rowData: [
            {
              date: '2016-05-02',
              userId: "admin",
              userName: "管理员",
              tel: "10",
              cardType: 1,
            },
            {
              date: '2016-05-03',
              userId: "Mary",
              userName: "玛丽",
              tel: "20",
              cardType: 2,
            },
          ],
          headerData: [

            {slot: "date"},
            {label: "名称", prop: "userId"},
            {label: "链接", prop: "userName"},
            {slot: "cardType"},
            {label: "排序", prop: "tel"},
            {slot: "operate"},


          ], // 操作列
          controlAtrr: {
            pageObj: { //分页对象
              position: "right", //分页组件位置
              total: 100,
              pageData: {
                page: 1,
                size: 10
              }
            },
          },
        },
      }
    },

    methods: {
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      startUsing(val) {
        console.log("==startUsing==", val)
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

  :deep(.el-table .success-row) {
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
