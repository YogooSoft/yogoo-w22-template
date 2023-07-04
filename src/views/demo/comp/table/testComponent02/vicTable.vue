<template>
  <el-table :data="tableData" style="width: 100%" max-height="250" border
        stripe>
    <template v-for="item in columns">
<!--  slot 使用插槽 -->
      <slot v-if="item.slot" :name="item.slot"></slot>
      <el-table-column
        v-else

        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
      </el-table-column>
    </template>
  </el-table>

  <!-- 分页 -->
<!--  <div class="page_div" style="text-align: right">-->
  <div class="page_div" :style="{textAlign: pageObj.position || 'center'}">
      <el-pagination    @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :hide-on-single-page="false" :current-page="pageObj.pageData.page" :pager-count="7"
          :page-sizes="[10, 15, 20, 30,50]" :page-size="pageObj.pageData.size" background
          layout="total,sizes,prev, pager, next" :total="pageObj.total">
      </el-pagination>
  </div>


</template>
<script>
export default {
  name: "VicTable",
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    pageObj: {
				type: Object,
				required: true
			},
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    init() {},
  },
};
</script>
<style scoped>
</style>