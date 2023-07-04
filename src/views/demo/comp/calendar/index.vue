<template>
  <page-wrapper title="日历示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message=""
    >
      <el-calendar v-model="value" />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义内容"
      :can-expan="true"
      help-message="通过设置名为 date-cell 的 scoped-slot 来自定义日历单元格中显示的内容。 在 scoped-slot 可以获取到 date（当前单元格的日期）, data（包括 type，isSelected，day 属性）。 详情解释参考下方的 API 文档。"
    >
      <el-calendar>
        <template #dateCell="{ data }">
          {{ show(data) }}
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split("-").slice(1).join("-") }}
            {{ data.isSelected ? "✔️" : "" }}
          </p>
        </template>
      </el-calendar>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="范围"
      :can-expan="true"
      help-message="设置 range 属性指定日历的显示范围。 开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。"
    >
      <el-calendar :range="[new Date(2019, 2, 4), new Date(2019, 2, 24)]" />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义日历头部"
      :can-expan="true"
      help-message=""
    >
      <el-calendar ref="calendar">
        <template #header="{ date }">
          <span class="content">自定义页眉内容</span>
          <span class="content">{{ date }}</span>
          <el-button-group>
            <el-button size="small" @click="selectDate('prev-year')">
              Previous Year
            </el-button>
            <el-button size="small" @click="selectDate('prev-month')">
              Previous Month
            </el-button>
            <el-button size="small" @click="selectDate('today')"
              >Today</el-button
            >
            <el-button size="small" @click="selectDate('next-month')">
              Next Month
            </el-button>
            <el-button size="small" @click="selectDate('next-year')">
              Next Year
            </el-button>
          </el-button-group>
        </template>
      </el-calendar>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

export default defineComponent({
  name: "calendar",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const value = ref(new Date());
    const calendar = ref();
    const show = (val: string) => {
      console.log(val);
    };
    const selectDate = (val: string) => {
      calendar.value.selectDate(val);
    };
    return { value, selectDate, calendar, show };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

:deep(.is-selected) {
  color: #1989fa;
}

.content {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
