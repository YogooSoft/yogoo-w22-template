<template>
  <div class="check-day">
    <el-card
      class="card_box"
      shadow="hover"
      :body-style="{ padding: '0px', height: '100%' }"
    >
      <span class="card_title">近7天巡检结果累积分布</span>
      <span class="card_des"
        >近7天累计巡检
        <span style="font-weight: bold">{{
          last_7d_list["pop"]["count"]
        }}</span>
        次</span
      >

      <el-table
        class="card_table"
        :data="last_7d_list['pop']['risks']"
        ref="table"
        height="180"
        size="small"
        :cell-style="{ padding: '0' }"
        :row-style="{ height: '0' }"
        :header-cell-style="{ color: '#909399', fontWeight: 400 }"
      >
        <el-table-column prop="name" label="巡检项名称" min-width="80">
        </el-table-column>
        <el-table-column
          prop="high_count"
          label="高风险"
          min-width="40"
          sortable
        >
          <template #default="scope">
            <span
              style="color: #f56c6c"
              v-if="scope.row.high_count >= 1"
              class="table-center"
              >{{ scope.row.high_count }}
            </span>
            <span v-else-if="scope.row.high_count == 0" class="table-center"
              >0
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="low_count"
          label="低风险"
          min-width="40"
          sortable
        >
          <template #default="scope">
            <span
              style="color: #e7a442"
              v-if="scope.row.low_count >= 1"
              class="table-center"
              >{{ scope.row.low_count }}
            </span>
            <span v-else-if="scope.row.low_count == 0" class="table-center"
              >0
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  computed,
  ref,
  reactive,
  onMounted,
  toRefs,
} from "vue";

const last_7d_list = reactive({
  pop: {
    count: "",
    risks: [],
  },
});

function check_day_show(data) {
  last_7d_list["pop"] = data;
}

// 暴露方法
defineExpose({
  check_day_show,
});
</script>

<style scoped lang="less">
.card_box {
  height: 250px;
  overflow: scroll;
  padding-left: 10px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  // padding-left: 15px;
  // padding-right: 10px;
  color: #606266;
}

.card_title {
  font-size: 14px;
  display: block;
  padding-top: 10px;
}

.card_des {
  font-size: 12px;
  display: block;
  padding-top: 6px;
  padding-bottom: 4px;
}

.card_table {
  width: 100%;
  height: 175px;
}
</style>
