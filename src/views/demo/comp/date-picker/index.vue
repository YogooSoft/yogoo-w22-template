<template>
  <page-wrapper title="日期选择器示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="日期选择器"
      :can-expan="false"
      help-message="示例"
    >
      <div>
        <el-radio-group v-model="size" label="size control">
          <el-radio-button label="large">Large</el-radio-button>
          <el-radio-button label="default">Default</el-radio-button>
          <el-radio-button label="small">Small</el-radio-button>
        </el-radio-group>
      </div>
      <div class="demo-date-picker">
        <div class="block">
          <span class="demonstration">Default</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            :size="size"
          />
        </div>
        <div style="border-right: solid 1px var(--el-border-color)"></div>
        <div class="block">
          <span class="demonstration">Picker with quick options</span>
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="选择日期"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts0"
            :size="size"
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="其他日期单位"
      :can-expan="false"
      help-message="示例"
    >
      <div class="demo-date-picker">
        <div class="container">
          <div class="block">
            <span class="demonstration">Week</span>
            <el-date-picker
              v-model="value3"
              type="week"
              format="[Week] ww"
              placeholder="Pick a week"
            />
          </div>
          <div class="block">
            <span class="demonstration">Month</span>
            <el-date-picker
              v-model="value4"
              type="month"
              placeholder="Pick a month"
            />
          </div>
        </div>
        <div class="container">
          <div class="block">
            <span class="demonstration">Year</span>
            <el-date-picker
              v-model="value5"
              type="year"
              placeholder="Pick a year"
            />
          </div>
          <div class="block">
            <span class="demonstration">Dates</span>
            <el-date-picker
              v-model="value6"
              type="dates"
              placeholder="Pick one or more dates"
            />
          </div>
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="选择一段时间"
      :can-expan="false"
      help-message=""
    >
      <div>
        <el-radio-group v-model="size" label="size control">
          <el-radio-button label="large">Large</el-radio-button>
          <el-radio-button label="default">Default</el-radio-button>
          <el-radio-button label="small">Small</el-radio-button>
        </el-radio-group>
      </div>
      <div class="demo-date-picker">
        <div class="block">
          <span class="demonstration">Default</span>
          <el-date-picker
            v-model="value7"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :size="size"
          />
        </div>
        <div style="border-right: solid 1px var(--el-border-color)"></div>
        <div class="block">
          <span class="demonstration">With quick options</span>
          <el-date-picker
            v-model="value8"
            type="daterange"
            unlink-panels
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :shortcuts="shortcuts"
            :size="size"
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="选择月份范围"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-date-picker">
        <div class="block">
          <span class="demonstration">Default</span>
          <el-date-picker
            v-model="value9"
            type="monthrange"
            range-separator="To"
            start-placeholder="Start month"
            end-placeholder="End month"
          />
        </div>
        <div style="border-right: solid 1px var(--el-border-color)"></div>
        <div class="block">
          <span class="demonstration">With quick options</span>
          <el-date-picker
            v-model="value10"
            type="monthrange"
            unlink-panels
            range-separator="To"
            start-placeholder="Start month"
            end-placeholder="End month"
            :shortcuts="shortcuts1"
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义内容"
      :can-expan="false"
      help-message=""
    >
    <div class="demo-date-picker">
    <el-date-picker
      v-model="value11"
      type="date"
      placeholder="Pick a day"
      format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
    >
      <template #default="cell">
        <div class="cell" :class="{ current: cell.isCurrent }">
          <span class="text">{{ cell.text }}</span>
          <span v-if="isHoliday(cell)" class="holiday" />
        </div>
      </template>
    </el-date-picker>
  </div>
  </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

import type { AppRouteModule } from "@/router/types";
import { LAYOUT } from "@/router/constant";
import { useRouter } from "vue-router";
import { object } from "vue-types";
import { Dayjs } from "dayjs";


export default defineComponent({
  name: "demo_Radio",
  components: {
    PageWrapper,
    CollapseContainer,Dayjs
  },

  setup() {

    const size = ref<"" | "large" | "small">("");

    const value1 = ref("");
    const value2 = ref("");
    const value3 = ref("");
    const value4 = ref("");
    const value5 = ref("");
    const value6 = ref("");
    // const value7 = ref("");
    const value7 = ref<[Date, Date]>([
      new Date(2022, 10, 10, 10, 10),
      new Date(2022, 10, 11, 10, 10),
    ]);
    const value8 = ref("");
    const value9 = ref("");
    const value10 = ref("");
    //const dayjs = require("dayjs");
    //const dateTime = dayjs().format("YYYY-MM-DD");

    const value11 = ref("2022-11-17");

    const holidays = [
      "2022-11-01",
      "2022-11-02",
      "2022-11-03",
      "2022-11-04",
      "2022-11-05",
      "2022-11-06",
      "2022-11-07",
    ];

    const isHoliday = ({ dayjs }) => {
      return holidays.includes(dayjs.format("YYYY-MM-DD"));
    };

    const shortcuts0 = [
      {
        text: "当日",
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
        text: "近一周",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return date;
        },
      },
    ];

    const shortcuts1 = [
      {
        text: "当月",
        value: [new Date(), new Date()],
      },
      {
        text: "近一年",
        value: () => {
          const end = new Date();
          const start = new Date(new Date().getFullYear(), 0);
          return [start, end];
        },
      },
      {
        text: "近六月",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setMonth(start.getMonth() - 6);
          return [start, end];
        },
      },
    ];

    const shortcuts = [
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

    const disabledDate = (time: Date) => {
      return time.getTime() > Date.now();
    };

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
      value11,
      size,
      shortcuts0,
      shortcuts,
      shortcuts1,
      disabledDate,
      holidays,
      isHoliday
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  width: 450px;
  padding: 30px 0;
  text-align: center;
  // border-right: solid 1px var(--el-border-color);
  // flex: 1;
}
.demo-date-picker .demonstration {
  display: block;
  // color: var(--el-text-color-secondary);
  //font-size: 14px;
  margin-bottom: 20px;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  // color: var(--el-text-color-secondary);
  //font-size: 14px;
  margin-bottom: 20px;
}

.demo-date-picker .container {
  display: flexbox;
  // flex: 1;
  border-right: solid 1px var(--el-border-color);
}
.demo-date-picker .container .block {
  border-right: none;
}
.demo-date-picker .container .block:last-child {
  border-top: solid 1px var(--el-border-color);
}
.demo-date-picker .container:last-child {
  border-right: none;
}

.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}
.cell .text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}
.cell.current .text {
  background: #626aef;
  color: #fff;
}
.cell .holiday {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--el-color-danger);
  border-radius: 50%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
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
