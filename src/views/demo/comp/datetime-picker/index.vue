<template>
  <page-wrapper title="日期时间选择器示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="日期时间选择器"
      :can-expan="false"
      help-message="示例"
    >
      <div class="demo-datetime-picker">
        <div class="block">
          <span class="demonstration">Default</span>
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期和时间"
          />
        </div>
        <div class="block">
          <span class="demonstration">With shortcuts</span>
          <el-date-picker
            v-model="value2"
            type="datetime"
            placeholder="选择日期和时间"
            :shortcuts="shortcuts"
          />
        </div>
        <div class="block">
          <span class="demonstration">With default time</span>
          <el-date-picker
            v-model="value3"
            type="datetime"
            placeholder="选择日期和时间"
            :default-time="defaultTime"
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="日期时间格式"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-datetime-picker">
        <div class="block">
          <span class="demonstration">Emits Date object</span>
          <div class="demonstration">Value: {{ value1 }}</div>
          <el-date-picker
            v-model="value8"
            type="datetime"
            placeholder="选择日期"
            format="YYYY/MM/DD HH:mm:ss"
          />
        </div>
        <div class="block">
          <span class="demonstration">Use value-format</span>
          <div class="demonstration">Value：{{ value2 }}</div>
          <el-date-picker
            v-model="value9"
            type="datetime"
            placeholder="选择日期"
            format="YYYY/MM/DD hh:mm:ss"
            value-format="YYYY-MM-DD h:m:s a"
          />
        </div>
        <div class="block">
          <span class="demonstration">Timestamp</span>
          <div class="demonstration">Value：{{ value3 }}</div>
          <el-date-picker
            v-model="value10"
            type="datetime"
            placeholder="选择日期"
            format="YYYY/MM/DD hh:mm:ss"
            value-format="x"
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="日期和时间范围"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-datetime-box">
        <div class="block">
          <span class="demonstration">Default</span>
          <el-date-picker
            v-model="value4"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="block">
          <span class="demonstration">With shortcuts</span>
          <el-date-picker
            v-model="value5"
            type="datetimerange"
            :shortcuts="shortcuts1"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="默认的起始与结束时刻"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-datetime-box">
        <div class="block">
          <span class="demonstration">Start and end date time 12:00:00</span>
          <el-date-picker
            v-model="value6"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="defaultTime1"
          />
        </div>
        <div class="block">
          <span class="demonstration"
            >Start date time 12:00:00, end date time 08:00:00</span
          >
          <el-date-picker
            v-model="value7"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="defaultTime2"
          />
        </div>
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
    const value1 = ref("");
    const value2 = ref("");
    const value3 = ref("");
    const defaultTime = new Date(2000, 1, 1, 12, 0, 0);
    const defaultTime1 = new Date(2000, 1, 1, 12, 0, 0); // '12:00:00'
    const defaultTime2: [Date, Date] = [
      new Date(2000, 1, 1, 12, 0, 0),
      new Date(2000, 2, 1, 8, 0, 0),
    ]; // '12:00:00', '08:00:00'

    const value4 = ref<[Date, Date]>([
      new Date(2022, 10, 10, 10, 10),
      new Date(2022, 10, 11, 10, 10),
    ]);
    const value5 = ref("");
    const value6 = ref("");
    const value7 = ref("");
    const value8 = ref("");
    const value9 = ref("");
    const value10 = ref("");

    const shortcuts1 = [
      {
        text: "近一周",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          return [start, end];
        },
      },
      {
        text: "近一月",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          return [start, end];
        },
      },
      {
        text: "近三月",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          return [start, end];
        },
      },
    ];

    const shortcuts = [
      {
        text: "今日",
        value: new Date(),
      },
      {
        text: "昨日",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          return date;
        },
      },
      {
        text: "七日",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return date;
        },
      },
    ];

    return {
      value1,
      value2,
      value3,
      value4,
      value5,
      value6,
      value7,
      value8,
      value9,
      value10,
      defaultTime,
      defaultTime1,
      defaultTime2,
      shortcuts,
      shortcuts1,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-datetime-picker .block:last-child {
  border-right: none;
}
.demo-datetime-picker .demonstration {
  display: block;
  // color: var(--el-text-color-secondary);
  // font-size: 14px;
  margin-bottom: 20px;
}

.block {
  width: 450px;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  // color: var(--el-text-color-secondary);
  // font-size: 14px;
  margin-bottom: 20px;
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
