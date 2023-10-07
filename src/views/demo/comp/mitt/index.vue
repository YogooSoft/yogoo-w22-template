<template>
  <page-wrapper title="MITT总线示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="MITT总线示例"
      :can-expan="true"
      help-message=""
    >
      <!-- <button @click="onclick">按钮</button> -->

      <el-descriptions class="margin-top" title="这是主菜单" border :column="3">
        <template #extra>
          <el-button type="primary" @click="create_on">注册侦听</el-button>
          <el-button type="primary" @click="onclick">发送数据</el-button>
          <el-button type="primary" @click="onclickoff">取消C事件</el-button>
          <el-button type="primary" @click="onclickoffall"
            >取消所有事件</el-button
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
      <!-- <div class="com_box">
        <com-b />
      </div> -->
      <!-- <div>d= {{ receive_D }} e= {{ receive_E }}</div> -->
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts" setup>
import { defineComponent, computed, ref, unref, onUnmounted } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
// import { ElDescriptions, ElDescriptionsItem, ElTag } from "element-plus";
import { getCurrentInstance, onBeforeMount } from "vue";

// 字组件页面
import ComA from "./components/com-a.vue";
import ComB from "./components/com-b.vue";
import { func } from "vue-types";

// import { useRouter } from "vue-router";
// const router = useRouter();
// console.log("==当前路由==", router.currentRoute.value.path);

let input_A = ref("");
let input_B = ref("");
let input_C = ref("");

let receive_A = ref("");
let receive_B = ref("");
let receive_C = ref("");
let receive_D = ref("");
let receive_E = ref("");

const { Bus } = getCurrentInstance().appContext.config.globalProperties;
const onclickoffall = () => {
  console.log("all取消订阅前1", Bus.all);
  console.log("all取消订阅前2", Bus.all.keys());
  Bus.all.clear();
  // Bus.all.clear();
  console.log("all取消订阅后", Bus.all);
  // Bus.all.clear();
};

const onclickoff = () => {
  console.log("取消订阅前1", Bus.all);
  console.log("取消订阅前2", Bus.all.keys());
  Bus.off("EventC", call_back_C_main);
  // Bus.all.clear();
  console.log("取消订阅后1", Bus.all);
  console.log("取消订阅后2", Bus.all.values());
  // Bus.all.clear();
};

// 发送侦听
const onclick = () => {
  // receive_D.value = input_A.value;
  // receive_E.value = input_A;
  let a = {
    a: input_A.value,
  };
  console.log("发送侦听前", Bus.all);
  Bus.emit("EventA", a);
  Bus.emit("EventB", input_B);
  Bus.emit("EventC", input_C.value);
  console.log("发送侦听后", Bus.all);
};

function create_on() {
  // 侦听：EventA
  Bus.on("EventA", (res) => {
    // res 就是emit传过来的数据
    receive_A.value = res;
    console.log("主页面侦听A==", res);
  });
  // 侦听：EventB
  Bus.on("EventB", (res) => {
    // res 就是emit传过来的数据
    receive_B.value = res;
    console.log("主页面侦听B==", res);
  });
  // 侦听：EventC
  Bus.on("EventC", call_back_C_main);

  // 侦听所有事件
  Bus.on("*", (type, res) => {
    // res 就是emit传过来的数据
    console.log("所有信息：", type, res);
  });
}

function call_back_C_main(res) {
  receive_C.value = res;
  console.log("主页面侦听C==", res);
}

onUnmounted(() => {
  // 关闭后取消订阅所有监听
  Bus.all.clear();
  console.log("取消订阅", Bus.all);
});

// import mitt from "mitt";
// type Events = {
//   foo: string;
//   bar?: number;
// };

// const emitter: Emitter<Events> = mitt<Events>();
// // const emitter = mitt<Events>(); // inferred as Emitter<Events>

// emitter.on("EventC", (e) => {
//   receive_C.value = e;
//   console.log("res TtttttttttttttttttttttS Event2传过来的数据==", e);
// }); // 'e' has inferred type 'string'
</script>

<style lang="less" scoped>
.com_box {
  margin-top: 10px;
}
</style>
