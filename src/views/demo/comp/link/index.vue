<template>
  <page-wrapper title="链接示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message="基础的文字链接用法。"
    >
      <div>
        <el-link href="http://www.yogoo.net" target="_blank">default</el-link>
        <el-link type="primary">primary</el-link>
        <el-link type="success">success</el-link>
        <el-link type="warning">warning</el-link>
        <el-link type="danger">danger</el-link>
        <el-link type="info">info</el-link>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="禁用状态"
      :can-expan="true"
      help-message=""
    >
      <div>
        <el-link disabled>default</el-link>
        <el-link type="primary" disabled>primary</el-link>
        <el-link type="success" disabled>success</el-link>
        <el-link type="warning" disabled>warning</el-link>
        <el-link type="danger" disabled>danger</el-link>
        <el-link type="info" disabled>info</el-link>
      </div>
    </collapse-container>

    <collapse-container
      class="cl-mb-10"
      title="下划线"
      :can-expan="true"
      help-message=""
    >
      <div>
        <el-link :underline="false">Without Underline</el-link>
        <el-link>With Underline</el-link>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="图标"
      :can-expan="true"
      help-message=""
    >
      <div>
        <el-link :icon="IconEdit">Edit</el-link>
        <el-link>
          Check<el-icon class="el-icon--right"><icon-view /></el-icon>
        </el-link>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { Edit as IconEdit, View as IconView } from "@element-plus/icons-vue";

export default defineComponent({
  name: "link",
  components: { CollapseContainer, PageWrapper, IconEdit, IconView },

  setup(props) {
    return { IconEdit, IconView };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.el-link {
  margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}

/*  .el-link.el-link--danger.is-underline {*/
/*    --el-link-text-color: red;*/
/*    --el-link-hover-text-color: green;*/
/*    --el-link-disabled-text-color:blue;*/
/*}*/
</style>
