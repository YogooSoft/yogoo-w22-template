<template>
  <page-wrapper title="时间选择器示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="时间选择器"
      :can-expan="false"
      help-message="示例"
    >
      <el-time-select
        v-model="value"
        start="08:30"
        step="00:15"
        end="18:30"
        placeholder="Select time"
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="时间格式"
      :can-expan="false"
      help-message=""
    >
      <el-time-select
        v-model="value1"
        start="00:00"
        step="00:30"
        end="23:59"
        placeholder="Select time"
        format="hh:mm A"
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="时间范围"
      :can-expan="false"
      help-message=""
    >
      <div >
        <el-time-select
          v-model="startTime"
          :max-time="endTime"
          style="margin-right: 10px;"
          placeholder="Start time"
          start="08:30"
          step="00:15"
          end="18:30"
        />
        <el-time-select
          v-model="endTime"
          :min-time="startTime"
          placeholder="End time"
          start="08:30"
          step="00:15"
          end="18:30"
        />
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

export default defineComponent({
  name: "demo_timeSelect",
  components: {
    PageWrapper,
    CollapseContainer,
  },

  setup() {
    const value = ref("");
    const value1 = ref("");

    const startTime = ref("");
    const endTime = ref("");

    return {
      value,
      value1,
      startTime,
      endTime
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.demo-datetime-box {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;
  // border: 1px solid #000;
  // margin: 0px;
  .datetime-box {
    width: 250px;
    margin: 0px 5px 0px 0px;
  }
  .datetime-box-bottom {
    width: 250px;
    margin: 0px 5px 0px 0px;
  }
}
</style>
