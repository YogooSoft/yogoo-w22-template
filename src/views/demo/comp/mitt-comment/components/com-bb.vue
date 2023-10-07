<template>
  <el-descriptions class="margin-top" title="" border :column="1">
    <el-descriptions-item label="接收广播" width="100">
      {{ receive_GB_A }}</el-descriptions-item
    >

    <el-descriptions-item label="触发退出登录"
      ><el-button type="primary" @click="login_out">退出登录</el-button>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  computed,
  ref,
  unref,
  onUnmounted,
  onMounted,
} from "vue";

import { useEventbus } from "@/components/Mitt";

const { customEmit, customOn, customOff, customAll, customOnGB, toOutLine } =
  useEventbus();

let receive_GB_A = ref("无");

const login_out = () => {
  toOutLine();
};

// 侦听全局广播EventGB_A
customOnGB("EventGB_A", call_back_GB_A);

function call_back_GB_A(res) {
  receive_GB_A.value = res;
  console.log("==receive_GB_A==", receive_GB_A.value);
}
</script>

<style lang="less" scoped></style>
