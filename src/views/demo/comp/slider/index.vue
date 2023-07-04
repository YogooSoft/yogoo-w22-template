<template>
  <page-wrapper title="滑块示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="滑块示例"
      :can-expan="false"
      help-message="示例"
    >
    <div style="width: 800px;">
      <div class="slider-demo-block">
        <span class="demonstration">Default value</span>
        <el-slider v-model="value1" />
      </div>
      <div class="slider-demo-block">
        <span class="demonstration">Customized initial value</span>
        <el-slider v-model="value2" />
      </div>
      <div class="slider-demo-block">
        <span class="demonstration">Hide Tooltip</span>
        <el-slider v-model="value3" :show-tooltip="false" />
      </div>
      <div class="slider-demo-block">
        <span class="demonstration">Format Tooltip</span>
        <el-slider v-model="value4" :format-tooltip="formatTooltip" />
      </div>
      <div class="slider-demo-block">
        <span class="demonstration">Disabled</span>
        <el-slider v-model="value5" disabled />
      </div>
    </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="尺寸"
      :can-expan="false"
      help-message=""
    >
    <div style="width: 800px;">
      <el-slider
        v-model="value"
        show-input
        size="large"
        style="margin: 0 0 10px 10px; --el-slider-main-bg-color:red;"
      />
      <el-slider v-model="value" show-input style="margin: 0 0 10px 10px" />
      <el-slider v-model="value" show-input size="small" style="margin: 10px "/>
    </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="离散值"
      :can-expan="false"
      help-message=""
    >
    <div style="width: 800px;">
      <div class="slider-demo-block">
        <span class="demonstration">Breakpoints not displayed</span>
        <el-slider v-model="value1" :step="10" />
      </div>
      <div class="slider-demo-block">
        <span class="demonstration">Breakpoints displayed</span>
        <el-slider v-model="value2" :step="10" show-stops />
      </div>
    </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="选择范围"
      :can-expan="false"
      help-message=""
    >
      <div class="slider-demo-block">
        <el-slider v-model="value6" range show-stops :max="10" />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="显示标记"
      :can-expan="false"
      help-message=""
    >
      <div class="slider-demo-block">
        <el-slider v-model="value7" range :marks="marks" />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="垂直模式"
      :can-expan="false"
      help-message=""
    >
      <div class="slider-demo-block">
        <el-slider v-model="value" vertical height="200px" />
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref, reactive } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import type { CSSProperties } from "vue";

export default defineComponent({
  name: "demo_Slider",
  components: {
    PageWrapper,
    CollapseContainer,
  },

  setup() {
    const value = ref(0);
    const value1 = ref(0);
    const value2 = ref(0);
    const value3 = ref(0);
    const value4 = ref(0);
    const value5 = ref(0);
    const value6 = ref([4, 8]);

    interface Mark {
      style: CSSProperties;
      label: string;
    }

    type Marks = Record<number, Mark | string>;

    const value7 = ref([30, 60]);
    const marks = reactive<Marks>({
      0: "0°C",
      8: "8°C",
      37: "37°C",
      50: {
        style: {
          color: "#1989FA",
        },
        label: "50%",
      },
    });

    const formatTooltip = (val: number) => {
      return val / 100;
    };

    return {
      value,
      value1,
      value2,
      value3,
      value4,
      value5,
      value6,
      value7,
      marks,
      formatTooltip,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 34px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
</style>
