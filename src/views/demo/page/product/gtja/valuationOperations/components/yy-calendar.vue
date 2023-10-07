<template>
  <div class="yy-calendar-info">
    <div class="title_box">
      <span class="title_check">运营日历</span>

      <el-icon :size="20" style="float: right">
        <Operation />
      </el-icon>
    </div>
    <div class="content_box">
      <div class="mater_box">
        <span>产品信息</span>&nbsp;&nbsp;
        <el-select
          v-model="value1"
          collapse-tags
          collapse-tags-tooltip
          placeholder="选择产品"
          style="width: 200px"
        >
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <span class="mater_box_title"> 9月22日&nbsp;&nbsp;星期五</span>
        <div class="icon_box" style="text-align: center; margin-top: 100px">
          <el-icon
            :size="50"
            style="color: #999999; margin-bottom: 10px; margin: 0 auto"
            ><Box
          /></el-icon>
          <span style="display: block; color: #999999">本日没有事项</span>
        </div>
      </div>
      <div class="calendar_box">
        <el-calendar>
          <template #dateCell="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split("-").slice(2).join("-") }}
            </p>
            <span
              class="calendar_box_span"
              v-if="date_list.includes(data.day)"
              style="margin-left: 2px"
              >免</span
            >
            <span class="calendar_box_span" v-if="date_list.includes(data.day)"
              >开</span
            >
          </template>
        </el-calendar>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let date_list = ref([
  "2023-09-27",
  "2023-09-26",
  "2023-08-26",
  "2023-09-26",
  "2023-07-26",
  "2023-10-26",
  "2023-11-26",
  "2023-12-26",
  "2024-01-26",
  "2024-02-26",
  "2024-03-26",
  "2024-05-26",
]);
let value1 = ref(0);

let options1 = ref([
  {
    value: 0,
    label: "全部产品",
  },
  {
    value: 1,
    label: "SZD813_悦宏吉庆有余2号私募证券投资基金",
  },
  {
    value: 2,
    label: "YGD001_悦宏吉庆有余3号私募证券投资基金",
  },
]);
</script>

<style lang="less" scoped>
.calendar_box_span {
  background-color: #fbebed;
  color: #de4e66;
  padding: 2px;
  float: right;
  margin-top: 8px;
  margin-right: 2px;
}
.calendar_box {
  width: 60%;
  display: inline-block;
  vertical-align: top;
}
.mater_box {
  width: 40%;
  display: inline-block;
  vertical-align: top;
}
.mater_box_title {
  margin-top: 6px;
  margin-left: 6px;
  padding-left: 5px;
  font-weight: bold;
  height: 18px;

  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 5px solid #409eff;
  display: inline-block;
}
.canvas {
  padding: 0px;
  width: 100%;
  height: 320px;
  z-index: 1;
}
.title_not_check {
  color: #8e8e8e;
  font-size: 17px;

  display: inline-block;
  margin-top: 4px;
  margin-right: 20px;
}
.title_check {
  font-size: 17px;
  font-weight: bold;
  display: inline-block;
  margin-top: 4px;
  margin-right: 20px;
}
.menu_box_title {
  margin-top: 6px;
  margin-left: 6px;
  padding-left: 5px;

  width: 100px;
  height: 18px;

  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 5px solid #409eff;
  display: inline-block;
  // float: left;
  // margin-top: 3px;
}
.menu_box_button {
  // float: left;
}

.status_box {
  display: inline-block;
  width: 150px;
  height: 55px;
  border: 1px solid #409eff;
  border-radius: 2px;
  padding: 10px;
  margin-right: 10px;
}
.title_box {
  background-color: white;
  padding: 15px;
  border-bottom: 1px solid #ebeef5;
}

.yy-calendar-info {
  &__cop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38px;

    li {
      display: flex;
      list-style: none;
      flex: 1;
      color: #606266;

      .fall,
      .rise {
        display: flex;
        align-items: center;
        margin-left: 10px;
      }

      .fall {
        color: #13ae7c;
      }

      .rise {
        color: #f21e37;
      }
    }
    .info_num {
      font-size: 24px;
      margin-bottom: 18px;
    }
    .info_corner_desc {
      margin-bottom: 10px;
      margin-left: -5px;
      color: #dbddde;
    }
    .info_corner_num {
      margin-bottom: 10px;
    }
  }
}
.content_box {
  width: 100%;
  padding: 15px;
}
.content_box /deep/ .el-calendar-table .el-calendar-day {
  height: 50px;
}
.is-selected {
  color: #1989fa;
}
.content_box /deep/ .el-calendar__body {
  padding: 12px 20px 0;
}
</style>
