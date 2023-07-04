<template>
  <page-wrapper title="时间选择器示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="时间选择器"
      :can-expan="false"
      help-message="示例"
    >
      <div class="example-basic">
        <el-time-picker
          v-model="value1"
          placeholder="选择任意时间"
          style="margin-right: 10px"
        />
        <el-time-picker
          v-model="value2"
          arrow-control
          placeholder="选择任意时间"
        />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="限制时间范围"
      :can-expan="false"
      help-message=""
    >
      <div class="example-basic">
        <el-time-picker
          v-model="value3"
          :disabled-hours="disabledHours"
          :disabled-minutes="disabledMinutes"
          :disabled-seconds="disabledSeconds"
          placeholder="Arbitrary time"
        />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="任意时间范围"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-range">
        <el-time-picker
          v-model="value4"
          is-range
          range-separator="To"
          start-placeholder="开始时间"
          end-placeholder="截止时间"
          style="margin-right: 10px"
        />
        <el-time-picker
          v-model="value5"
          is-range
          arrow-control
          range-separator="To"
          start-placeholder="开始时间"
          end-placeholder="截止时间"

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
  name: "demo_Radio",
  components: {
    PageWrapper,
    CollapseContainer,
  },

  setup() {
    const value1 = ref();
    const value2 = ref();

    const value3 = ref(new Date(2022, 9, 10, 18, 30));
    const value4 = ref<[Date, Date]>([
      new Date(2016, 9, 10, 8, 40),
      new Date(2016, 9, 10, 9, 40),
    ]);
    const value5 = ref<[Date, Date]>([
      new Date(2016, 9, 10, 8, 40),
      new Date(2016, 9, 10, 9, 40),
    ]);

    const makeRange = (start: number, end: number) => {
      const result: number[] = [];
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
      return result;
    };
    const disabledHours = () => {
      return makeRange(0, 16).concat(makeRange(19, 23));
    };
    const disabledMinutes = (hour: number) => {
      if (hour === 17) {
        return makeRange(0, 29);
      }
      if (hour === 18) {
        return makeRange(31, 59);
      }
    };
    const disabledSeconds = (hour: number, minute: number) => {
      if (hour === 18 && minute === 30) {
        return makeRange(1, 59);
      }
    };

    return {
      value1,
      value2,
      value3,
      value4,
      value5,
      makeRange,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}
.example-basic .el-date-editor {
  margin-right: 10px;
}
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
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
