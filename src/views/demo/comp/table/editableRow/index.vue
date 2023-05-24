<template>
  <page-wrapper title="可编辑行" content="">
    <collapse-container
      class="cl-mb-10"
      title="可编辑行"
      :can-expan="true"
      help-message="可编辑行"
    >

      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
          <template #default="scope">
            <el-input class="item" v-model="scope.row.date" placeholder="请输入日期"></el-input>
          </template>

        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
          <template #default="scope">
            <el-input class="item" v-model="scope.row.name" placeholder="请输入姓名"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
          <template #default="scope">
            <el-input class="item" v-model="scope.row.address" placeholder="请输入地址"></el-input>
          </template>
        </el-table-column>


        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="handleDelete(scope.$index, tableData)"
            >删除
            </el-button>

          </template>
        </el-table-column>
      </el-table>
      <el-button class="el-icon-circle-plus-outline" @click="add_row"
                 style="width: 100%;color: #409EFF !important; height: 36px">
        &nbsp;新增
      </el-button>

    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
  import {defineComponent, computed, ref} from "vue";
  import {PageWrapper} from "@/components/Page";
  import {CollapseContainer} from "@/components/Container/index";

  export default defineComponent({
    name: "table-editableRow",
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
      handleDelete(index, rows) {
        console.log(index);
        rows.splice(index, 1);
      },
      add_row() {
        this.tableData.push(
          {
            date: '2016-05-07',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }
        );
      },
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
