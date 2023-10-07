<template>
  <el-descriptions class="margin-top" title="" border :column="2">
    <el-descriptions-item label="连接A" width="100">
      添加至房间：roomA
    </el-descriptions-item>
    <el-descriptions-item label="连接B" width="100">
      添加至房间：roomA
    </el-descriptions-item>

    <el-descriptions-item label="输入信息" width="100">
      <el-input
        v-model="Cinput_A1"
        width="100px"
        placeholder="请输入内容"
      ></el-input>
    </el-descriptions-item>
    <el-descriptions-item label="输入信息" width="100">
      <el-input
        v-model="Cinput_B1"
        width="100px"
        placeholder="请输入内容"
      ></el-input>
    </el-descriptions-item>
    <el-descriptions-item label="接收信息(roomA)"
      >{{ S_A1 }}
    </el-descriptions-item>
    <el-descriptions-item label="接收信息(roomA)"
      >{{ S_B1 }}
    </el-descriptions-item>

    <el-descriptions-item label="推送信息"
      ><el-button type="primary" @click="sendA">推送</el-button>
    </el-descriptions-item>
    <el-descriptions-item label="推送信息"
      ><el-button type="primary" @click="sendB">推送</el-button>
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
  onBeforeUnmount,
} from "vue";

import { io } from "socket.io-client";

let socket_connectA = null as any;
let socket_connectB = null as any;
let Cinput_A1 = ref("");
let Cinput_B1 = ref("");
let S_A1 = ref("");
let S_B1 = ref("");
// socket连接令牌
let token_str = ref("token-yogoo");
// socket连接地址
// FastAPI: http://172.168.0.217:7000
// Flask: http://127.0.0.1:5000
const ws_url = ref("http://172.168.0.217:7000");

// 指定传输方式，如WebSocketautoConnect: true, // 是否自动连接reconnection: true, // 是否自动重新连接reconnectionAttempts: 3, // 重新连接尝试次数reconnectionDelay: 1000, // 重新连接延迟时间（毫秒）
socket_connectA = io(ws_url.value, {
  transports: ["websocket"],
  query: { token: token_str.value },
});

// 建立连接的事件
socket_connectA.on("connect", () => {
  socket_connectA.emit("join", { room: "roomA", user: "wagnyf" });
  console.log(
    "connect: websocket 连接成功！连接状态：",
    socket_connectA.connected
  );
});

socket_connectA.on("message", (res) => {
  S_A1.value = res;
  console.log("message数据接收成功！", res);
});

// 关闭连接的事件
socket_connectA.on("disconnect", () => {
  console.log("disconnect: websocket 连接关闭！");
});

// 提交按钮的点击事件处理函数
const sendA = () => {
  console.log("发送！");
  // 向服务器发送消息
  var params_str = {
    data: Cinput_A1.value,
    room: "roomA",
  };
  // socket.emit("message", input_1.value);
  socket_connectA.emit("send", params_str);
};

// 指定传输方式，如WebSocketautoConnect: true, // 是否自动连接reconnection: true, // 是否自动重新连接reconnectionAttempts: 3, // 重新连接尝试次数reconnectionDelay: 1000, // 重新连接延迟时间（毫秒）
socket_connectB = io(ws_url.value, {
  transports: ["websocket"],
  query: { token: token_str.value },
});

// 建立连接的事件
socket_connectB.on("connect", () => {
  socket_connectB.emit("join", { room: "roomA", user: "wagnyf" });
  console.log(
    "connect: websocket 连接成功！连接状态：",
    socket_connectB.connected
  );
});

socket_connectB.on("message", (res) => {
  S_B1.value = res;
  console.log("message数据接收成功！", res);
});

// 关闭连接的事件
socket_connectB.on("disconnect", () => {
  console.log("disconnect: websocket 连接关闭！");
});

// 提交按钮的点击事件处理函数
const sendB = () => {
  console.log("发送！");
  // 向服务器发送消息
  var params_str = {
    data: Cinput_B1.value,
    room: "roomA",
  };
  // socket.emit("message", input_1.value);
  socket_connectA.emit("send", params_str);
};

// 组件被销毁之前，清空 sock 对象
onBeforeUnmount(() => {
  // 关闭连接
  socket_connectA.close();

  // 销毁 websocket 实例对象
  socket_connectA = null;

  // 关闭连接
  socket_connectB.close();

  // 销毁 websocket 实例对象
  socket_connectB = null;
});
</script>

<style lang="less" scoped></style>
