<template>
  <page-wrapper title="示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础饼图"
      :can-expan="true"
      help-message="基础饼图"
    >
      <base-pie />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="环形图"
      :can-expan="true"
      help-message="环形图"
    >
      <pie-hxt />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="半环形图"
      :can-expan="true"
      help-message="半环形图"
    >
      <pie-bhxt />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="南丁格尔玫瑰图"
      :can-expan="true"
      help-message="南丁格尔玫瑰图"
    >
      <pie-ndgemgt />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="嵌套环形图"
      :can-expan="true"
      help-message="嵌套环形图"
    >
      <pie-qthxt />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="分割数据到数个饼图"
      :can-expan="true"
      help-message="分割数据到数个饼图"
    >
      <pie-sjdbt />
    </collapse-container>
  </page-wrapper>
</template>

<!-- 使用setup语法糖的写法 -->
<script lang="ts" setup>
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import BasePie from "./components/base-pie.vue";
import PieHxt from "./components/pie-hxt.vue";
import PieBhxt from "./components/pie-bhxt.vue";
import PieNdgemgt from "./components/pie-ndgemgt.vue";
import PieQthxt from "./components/pie-qthxt.vue";
import PieSjdbt from "./components/pie-sjdbt.vue";
</script>

<style scoped lang="less">
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
</style>
