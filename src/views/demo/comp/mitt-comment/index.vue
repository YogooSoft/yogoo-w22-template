<template>
  <page-wrapper title="父子组件间传值" content="">
    <collapse-container
      class="cl-mb-10"
      title="父子组件间传值"
      :can-expan="true"
      help-message=""
    >
      <!-- <button @click="onclick">按钮</button> -->

      <el-descriptions class="margin-top" title="这是主菜单" border :column="3">
        <template #extra>
          <el-button type="primary" @click="create_on">注册侦听</el-button>
          <el-button type="primary" @click="onclick">发送数据</el-button>
          <el-button type="primary" @click="onclickoff">取消侦听</el-button>
          <el-button type="primary" @click="getAll"
            >获取当前所有的事件</el-button
          >
        </template>
        <el-descriptions-item label="侦听A：发送"
          ><el-input
            v-model="input_A"
            width="100px"
            placeholder="请输入内容"
          ></el-input
        ></el-descriptions-item>
        <el-descriptions-item label="侦听B：发送"
          ><el-input
            v-model="input_B"
            width="100px"
            placeholder="请输入内容"
          ></el-input
        ></el-descriptions-item>
        <el-descriptions-item label="侦听C：发送"
          ><el-input
            v-model="input_C"
            width="100px"
            placeholder="请输入内容"
          ></el-input
        ></el-descriptions-item>

        <el-descriptions-item label="侦听A：接收">{{
          receive_A
        }}</el-descriptions-item>
        <el-descriptions-item label="侦听B：接收">{{
          receive_B
        }}</el-descriptions-item>
        <el-descriptions-item label="侦听C：接收">{{
          receive_C
        }}</el-descriptions-item>
      </el-descriptions>

      <div class="com_box">
        <com-a />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="页面间传值"
      :can-expan="true"
      help-message=""
    >
      <com-b />

      <!-- <div>广播：{{ receive_GB_A }}</div> -->
    </collapse-container>

    <collapse-container
      class="cl-mb-10"
      title="侦听限制"
      :can-expan="true"
      help-message=""
    >
      <com-c />

      <!-- <div>广播：{{ receive_GB_A }}</div> -->
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  computed,
  ref,
  unref,
  onUnmounted,
  onBeforeUnmount,
} from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { useEventbus } from "@/components/Mitt";
// import { ElDescriptions, ElDescriptionsItem, ElTag } from "element-plus";
import { getCurrentInstance, onBeforeMount } from "vue";
// import { useEventbus } from "@/hooks/mitt";

const { customEmit, customOn, customOff, customAll, customOnGB, pageClear } =
  useEventbus();

// 字组件页面
import ComA from "./components/com-aa.vue";
import ComB from "./components/com-bb.vue";
import ComC from "./components/com-cc.vue";

// import { useRouter } from "vue-router";
// const router = useRouter();

let input_A = ref("");
let input_B = ref("");
let input_C = ref("");

let receive_A = ref("");
let receive_B = ref("");
let receive_C = ref("");
let receive_GB_A = ref("");
let receive_E = ref("");

function getAll() {
  let a = customAll();
  console.log("当前所有订阅：", a);
}

const onclickoff = () => {
  console.log("取消订阅前");
  customOff("EventA", call_back_A);
  customOff("EventB", call_back_B);
  customOff("EventC", call_back_C);
  console.log("取消订阅后");
};

// 发送侦听
const onclick = () => {
  let a = {
    a: input_A.value,
  };
  customEmit("EventA", a);
  customEmit("EventB", input_B.value);
  customEmit("EventC", input_C.value);
};

function create_on() {
  // console.log("==当前路由==", router.currentRoute.value.path);
  // 侦听：EventA
  customOn("EventA", call_back_A);
  // 侦听：EventB
  customOn("EventB", call_back_B);
  // 侦听：EventC
  customOn("EventC", call_back_C);
  // 侦听全局广播EventGB_A
  customOnGB("EventGB_A", call_back_GB_A);
}

// 侦听所有事件
// customOn("*", (type, res) => {
//   // res 就是emit传过来的数据
//   console.log("===所有信息==", type, res);
// });

function call_back_A(res) {
  receive_A.value = res;
  console.log("==receive_A==", receive_A.value);
}
function call_back_B(res) {
  receive_B.value = res;
  console.log("==receive_B==", receive_B.value);
}

function call_back_C(res) {
  receive_C.value = res;
  console.log("==receive_C==", receive_C.value);
}
function call_back_GB_A(res) {
  receive_GB_A.value = res;
  console.log("==receive_GB_A==", receive_GB_A.value);
}

// 销毁的事件
onBeforeUnmount(() => {
  pageClear();
});
</script>

<style lang="less" scoped>
.com_box {
  margin-top: 10px;
}
</style>
