<template>
  <page-wrapper title="示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础柱状图"
      :can-expan="true"
      help-message="基础柱状图"
    >
      <base-bar />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="坐标轴刻度与标签对齐"
      :can-expan="true"
      help-message="坐标轴刻度与标签对齐"
    >
      <bar-zbzdq />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="柱状图排序"
      :can-expan="true"
      help-message="柱状图排序"
    >
      <bar-zzpxt />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义单个柱子颜色"
      :can-expan="true"
      help-message="自定义单个柱子颜色"
    >
      <bar-dydgzzys />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="交错正负轴标签"
      :can-expan="true"
      help-message="交错正负轴标签"
    >
      <bar-jczfzbq />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="堆叠柱状图"
      :can-expan="true"
      help-message="堆叠柱状图"
    >
      <bar-ddzzt />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="堆叠条形图"
      :can-expan="true"
      help-message="堆叠条形图"
    >
      <bar-ddtxt />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="数据集"
      :can-expan="true"
      help-message="数据集"
    >
      <bar-sjj />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="折柱混合"
      :can-expan="true"
      help-message="折柱混合"
    >
      <bar-zzhh />
    </collapse-container>
  </page-wrapper>
</template>

<!-- 使用setup语法糖的写法 -->
<script lang="ts" setup>
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

import BaseBar from "./components/base-bar.vue";
import BarZbzdq from "./components/bar-zbzdq.vue";
import BarDydgzzys from "./components/bar-dydgzzys.vue";
import BarJczfzbq from "./components/bar-jczfzbq.vue";
import BarDdzzt from "./components/bar-ddzzt.vue";
import BarDdtxt from "./components/bar-ddtxt.vue";
import BarZzpxt from "./components/bar-zzpxt.vue";
import BarSjj from "./components/bar-sjj.vue";
import BarZzhh from "./components/bar-zzhh.vue";
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
