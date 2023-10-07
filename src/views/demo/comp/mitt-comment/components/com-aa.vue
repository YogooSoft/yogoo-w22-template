<template>
  <el-descriptions class="margin-top" title="子组件页面A" border :column="3">
    <template #extra>
      <el-button type="primary" @click="onclick">发送数据</el-button>
      <el-button type="primary" @click="onclickon">注册侦听C</el-button>
      <el-button type="primary" @click="onclickoff">取消侦听C</el-button>
    </template>
    <el-descriptions-item label="侦听A：发送"
      ><el-input
        v-model="input_A1"
        width="100px"
        placeholder="请输入内容"
      ></el-input
    ></el-descriptions-item>
    <el-descriptions-item label="侦听B：发送"
      ><el-input
        v-model="input_B1"
        width="100px"
        placeholder="请输入内容"
      ></el-input
    ></el-descriptions-item>
    <el-descriptions-item label="侦听C：发送"
      ><el-input
        v-model="input_C1"
        width="100px"
        placeholder="请输入内容"
      ></el-input
    ></el-descriptions-item>

    <el-descriptions-item label="侦听A：接收">{{
      receive_A1
    }}</el-descriptions-item>
    <el-descriptions-item label="侦听B：接收">{{
      receive_B1
    }}</el-descriptions-item>
    <el-descriptions-item label="侦听C：接收">{{
      receive_C1
    }}</el-descriptions-item>
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

let input_A1 = ref("");
let input_B1 = ref("");
let input_C1 = ref("");

let receive_A1 = ref("");
let receive_B1 = ref("");
let receive_C1 = ref("");
// 注册侦听onclickon
const onclickon = () => {
  customOn("EventC", call_back_C1);
};

// 取消订阅
const onclickoff = () => {
  customOff("EventC", call_back_C1);
};

// 发送值
const onclick = () => {
  customEmit("EventA", input_A1.value);
  customEmit("EventB", input_B1.value);
  customEmit("EventC", input_C1.value);
};

// 侦听：EventA
customOn("EventA", call_back_A1);
// 侦听：EventB
customOn("EventB", call_back_B1);
// 侦听：EventC
customOn("EventC", call_back_C1);

// 侦听：EventA
function call_back_A1(res) {
  receive_A1.value = res;
  console.log("==receive_A1==", receive_A1.value);
}
// 侦听：EventB
function call_back_B1(res) {
  receive_B1.value = res;
  console.log("==receive_B1==", receive_B1.value);
}
// 侦听：EventC
function call_back_C1(res) {
  receive_C1.value = res;
  console.log("==receive_C1==", receive_C1.value);
}
</script>

<style lang="less" scoped></style>
