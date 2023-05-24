<template>
  <page-wrapper title="固钉示例" content="将页面元素固定在特定可视区域。">
    <collapse-container
      class="cl-mb-10"
      title="固钉示例"
      :can-expan="true"
      help-message="固钉默认固定在页面顶部。"
    >
      <el-affix :offset="120">
        <el-button type="primary">Offset top 120px</el-button>
      </el-affix>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="指定容器"
      :can-expan="true"
      help-message="通过设置 target 属性，让固钉始终保持在容器内， 超过范围则隐藏。"
    >
      <div class="affix-container">
        <el-affix target=".affix-container" :offset="80">
          <el-button type="primary">Target container</el-button>
        </el-affix>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="固定位置"
      :can-expan="true"
      help-message="Affix 组件提供 2 个固定的位置参数 top 和 bottom。"
    >
      <el-affix position="bottom" :offset="20">
        <el-button type="primary">Offset bottom 20px</el-button>
      </el-affix>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

export default defineComponent({
  name: "affix",
  components: { CollapseContainer, PageWrapper },

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

.affix-container {
  text-align: center;
  height: 300px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
}
</style>
