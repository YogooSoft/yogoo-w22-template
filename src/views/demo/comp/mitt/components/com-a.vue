<template>
  <el-descriptions class="margin-top" title="子组件页面A" border :column="3">
    <template #extra>
      <el-button type="primary" @click="onclick">发送数据</el-button>
      <el-button type="primary" @click="onclickprint"
        >控制台打印(侦听B)</el-button
      >
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
import { getCurrentInstance, onBeforeMount } from "vue";
const { Bus } = getCurrentInstance().appContext.config.globalProperties;

let input_A1 = ref("");
let input_B1 = ref("");
let input_C1 = ref("");

let receive_A1 = ref("");
let receive_B1 = ref("");
let receive_C1 = ref("");

// 取消订阅
const onclickoff = () => {
  Bus.off("EventC");
};

// 控制台打印 侦听B 值
const onclickprint = () => {
  console.log("receive_C1==", receive_B1.value.value);
};

// 发送值
const onclick = () => {
  Bus.emit("EventA", input_A1);
  Bus.emit("EventB", input_B1);
  Bus.emit("EventC", input_C1);
};

// 侦听：EventA
Bus.on("EventA", (res) => {
  // res 就是emit传过来的数据
  receive_A1.value = res;
  console.log("子组件A-EventA传过来的数据==", receive_A1.value);
});
// 侦听：EventB
Bus.on("EventB", (res) => {
  // res 就是emit传过来的数据
  receive_B1.value = res;
  console.log("子组件AEventB传过来的数据==", receive_B1.value);
});
// 侦听：EventC
Bus.on("EventC", call_back_C_com1);

// 侦听所有事件
Bus.on("*", (type, res) => {
  // AAAA 就是emit传过来的数据
  // console.log("组件A页面接收的所有数据==", type, res);
});

function call_back_C_com1(res) {
  receive_C1.value = res;
  console.log("子组件AEventC传过来的数据==", receive_C1.value);
}

onUnmounted(() => {
  // Bus.off("EventB");
  // 关闭后取消订阅所有监听
  Bus.all.clear();
  console.log("取消订阅", Bus.all);
});
</script>

<style lang="less" scoped></style>
