<template>
  <page-wrapper title="排序【普通】" content="">
    <collapse-container
      class="cl-mb-10"
      title="排序【普通】"
      :can-expan="true"
      help-message="排序【普通】"
    >
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="date" label="日期" sortable width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="age" label="年龄" sortable="age">
        </el-table-column>
      </el-table>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="排序【带单位文本】"
      :can-expan="true"
      help-message="排序【带单位文本】"
    >
      <el-table
        :data="tableData2"
        style="width: 100%"
        @sort-change="sort_change"
        border
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="date" label="日期" sortable width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          #default="scope"
          sortable="age"
        >
          <span slot-scope="scope">{{ scope.row["age"] }}</span>
        </el-table-column>
      </el-table>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

export default defineComponent({
  name: "table-sort",
  components: { CollapseContainer, PageWrapper },

  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          age: "10岁",
          age_num: "10",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          age: "115岁",
          age_num: "115",
        },
        {
          date: "2016-05-01",
          name: "张大虎",
          address: "上海市普陀区金沙江路 1519 弄",
          age: "20岁",
          age_num: "20",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          age: "22岁",
          age_num: "22",
        },
      ],

      tableData2: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          age: "10岁",
          age_num: "10",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          age: "115岁",
          age_num: "115",
        },
        {
          date: "2016-05-01",
          name: "张大虎",
          address: "上海市普陀区金沙江路 1519 弄",
          age: "20岁",
          age_num: "20",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          age: "22岁",
          age_num: "22",
        },
      ],
    };
  },

  methods: {
    sort_change(column) {
      this.tableData2 = this.tableData2.sort(
        this.sortFun(column.prop, column.order === "ascending")
      );
      console.log(this.tableData2);
    },

    // 排序函数
    sortFun(attr, rev) {
      console.log(attr);
      //第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
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
