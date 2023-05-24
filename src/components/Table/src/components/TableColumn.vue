<template>
  <el-table-column :label="coloumnHeader.label" :prop="coloumnHeader.label">
    <template v-for="item in coloumnHeader.children">
      <tableColumn
        v-if="item.children && item.children.length"
        :key="item.id"
        :coloumn-header="item"
      ></tableColumn>
      <el-table-column
        v-else
        :key="item.name"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :sortable="item.sortable"
      >

      </el-table-column>
    </template>
  </el-table-column>
</template>

<script>
  export default {
    name: "tableColumn",
    props: {
      // 子列头数据
      coloumnHeader: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style scoped>
</style>