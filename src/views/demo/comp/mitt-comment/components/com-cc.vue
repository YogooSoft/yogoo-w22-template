<template>
  <el-descriptions class="margin-top" title="" border :column="2">
    <el-descriptions-item label="定义侦听名称"
      ><el-input
        v-model="input_A3"
        width="100px"
        placeholder="请输入内容"
      ></el-input
    ></el-descriptions-item>
    <el-descriptions-item label="创建侦听"
      ><el-button type="primary" @click="create_even"
        >创建侦听</el-button
      ></el-descriptions-item
    >

    <el-descriptions-item label="侦听名称"
      ><el-input
        v-model="input_B3"
        width="100px"
        placeholder="outLine"
      ></el-input
    ></el-descriptions-item>
    <el-descriptions-item label="创建侦听"
      ><el-button type="primary" @click="create_even2"
        >创建侦听</el-button
      ></el-descriptions-item
    >
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

const { customEmit, customOn, customOff, customAll, customOnGB } =
  useEventbus();

let input_A3 = ref("");
let input_B3 = ref("");
let input_C3 = ref("");

let receive_A1 = ref("");
let receive_B1 = ref("");
let receive_C1 = ref("");

// 注册侦听
const create_even = () => {
  customOn(input_A3.value, call_back_A3);
};

// 注册侦听
const create_even2 = () => {
  customOn(input_B3.value, call_back_A3);
};

// 发送值
const onclick = () => {
  customEmit("EventA", input_A1.value);
  customEmit("EventB", input_B1.value);
  customEmit("EventC", input_C1.value);
};

// 侦听：EventA3
function call_back_A3(res) {
  receive_A1.value = res;
  console.log("==receive_A1==", receive_A1.value);
}
</script>

<style lang="less" scoped></style>
