<template>
  <page-wrapper title="进度条示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="进度条示例"
      :can-expan="false"
      help-message="示例"
    >
      <div class="demo-progress-box">
        <div class="progress-box">基础</div>
        <div class="progress-box">动画进度条</div>
      </div>
      <div class="demo-progress-box">
        <div class="demo-progress">
          <el-progress :percentage="50" />
          <el-progress :percentage="100" :format="format" />
          <el-progress :percentage="100" status="success" />
          <el-progress :percentage="100" status="warning" />
          <el-progress :percentage="50" status="exception" />
        </div>
        <div style="margin: 0 60px"></div>
        <div class="demo-progress">
          <el-progress :percentage="50" :indeterminate="true" />
          <el-progress
            :percentage="100"
            :format="format"
            :indeterminate="true"
          />
          <el-progress
            :percentage="100"
            status="success"
            :indeterminate="true"
            :duration="5"
          />
          <el-progress
            :percentage="100"
            status="warning"
            :indeterminate="true"
            :duration="1"
          />
          <el-progress
            :percentage="50"
            status="exception"
            :indeterminate="true"
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="进度条内显示百分比"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-progress">
        <el-progress :text-inside="true" :stroke-width="26" :percentage="70" />
        <el-progress
          :text-inside="true"
          :stroke-width="24"
          :percentage="100"
          status="success"
        />
        <el-progress
          :text-inside="true"
          :stroke-width="22"
          :percentage="80"
          status="warning"
        />
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="50"
          status="exception"
        />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义进度条的颜色"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-progress">
        <el-progress :percentage="percentage" :color="customColor" />

        <el-progress :percentage="percentage" :color="customColorMethod" />

        <el-progress :percentage="percentage" :color="customColors" />
        <el-progress :percentage="percentage" :color="customColors" />
        <div>
          <el-button-group>
            <el-button :icon="Minus" @click="decrease" />
            <el-button :icon="Plus" @click="increase" />
          </el-button-group>
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="环形"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-progress">
        <el-progress type="circle" :percentage="0" />
        <el-progress type="circle" :percentage="25" />
        <el-progress type="circle" :percentage="100" status="success" />
        <el-progress type="circle" :percentage="70" status="warning" />
        <el-progress type="circle" :percentage="50" status="exception" />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="仪表盘形"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-progress">
        <el-progress
          type="dashboard"
          :percentage="percentage"
          :color="colors"
        />
        <el-progress
          type="dashboard"
          :percentage="percentage2"
          :color="colors"
          style="margin: 0 15px"
        />
        <div>
          <el-button-group>
            <el-button :icon="Minus" @click="decrease" />
            <el-button :icon="Plus" @click="increase" />
          </el-button-group>
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-progress">
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="50"
          status="exception"
        >
          <span>Content</span>
        </el-progress>
        <el-progress type="circle" :percentage="100" status="success">
          <el-button type="success" :icon="Check" circle />
        </el-progress>
        <el-progress type="dashboard" :percentage="80">
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span>
            <span class="percentage-label">Progressing</span>
          </template>
        </el-progress>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { Minus, Plus } from "@element-plus/icons-vue";
import { Check } from '@element-plus/icons-vue'

export default defineComponent({
  name: "demo_Progress",
  components: {
    PageWrapper,
    CollapseContainer,
    Minus,
    Plus,
    Check
  },

  setup() {
    const format = (percentage) =>
      percentage === 100 ? "Full" : `${percentage}%`;

    const percentage = ref(20);
    const percentage2 = ref(0);
    const customColor = ref("#409eff");

    const colors = [
      { color: "#f56c6c", percentage: 20 },
      { color: "#e6a23c", percentage: 40 },
      { color: "#5cb87a", percentage: 60 },
      { color: "#1989fa", percentage: 80 },
      { color: "#6f7ad3", percentage: 100 },
    ];

    const customColors = [
      { color: "#f56c6c", percentage: 20 },
      { color: "#e6a23c", percentage: 40 },
      { color: "#5cb87a", percentage: 60 },
      { color: "#1989fa", percentage: 80 },
      { color: "#6f7ad3", percentage: 100 },
    ];

    const customColorMethod = (percentage: number) => {
      if (percentage < 30) {
        return "#909399";
      }
      if (percentage < 70) {
        return "#e6a23c";
      }
      return "#67c23a";
    };
    const increase = () => {
      percentage.value += 10;
      if (percentage.value > 100) {
        percentage.value = 100;
      }
    };
    const decrease = () => {
      percentage.value -= 10;
      if (percentage.value < 0) {
        percentage.value = 0;
      }
    };
    onMounted(() => {
      setInterval(() => {
        percentage2.value = (percentage2.value % 100) + 10;
      }, 500);
    });

    return {
      format,
      percentage,
      percentage2,
      colors,
      customColor,
      customColors,
      customColorMethod,
      Minus,
      Plus,
      increase,
      decrease,
      onMounted,
      Check
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}

.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.demo-progress-box {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;
  // border: 1px solid #000;
  // margin: 0px;
  .progress-box {
    width: 460px;
    margin: 0px 10px 10px 0px;
  }

  .progress-box-bottom {
    width: 340px;
    margin: 0px 10px 0px 0px;
  }
}
</style>
