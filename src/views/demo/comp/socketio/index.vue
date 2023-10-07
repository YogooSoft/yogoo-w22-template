<template>
  <page-wrapper title="SocketIO示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础示例"
      :can-expan="true"
      help-message=""
    >
      <el-descriptions class="margin-top" title="" border :column="1">
        <el-descriptions-item label="输入信息" width="100">
          <el-input
            v-model="input_1"
            width="100px"
            placeholder="请输入内容"
          ></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="接收信息(message_A)"
          >{{ input_A }}
        </el-descriptions-item>
        <el-descriptions-item label="接收信息(message_B)"
          >{{ input_B }}
        </el-descriptions-item>
        <el-descriptions-item label="接收信息(wagnyf@bitian.cn)"
          >{{ input_R }}
        </el-descriptions-item>
        <el-descriptions-item label="推送信息"
          ><el-button type="primary" @click="send">推送</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </collapse-container>

    <collapse-container
      class="cl-mb-10"
      title="房间分组示例"
      :can-expan="true"
      help-message=""
    >
      <room-a />
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts" setup>
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import {
  defineComponent,
  computed,
  ref,
  unref,
  onUnmounted,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { message } from "@/hooks/web/useMessage";
import { useEventbus } from "@/components/Mitt";
const { toOutLine } = useEventbus();
import RoomA from "./components/roomA.vue";

import { io } from "socket.io-client";

let socket = null as any;
let input_1 = ref("");
let input_A = ref("");
let input_B = ref("");
let input_R = ref("");
// socket连接令牌
let token_str = ref("token-yogoo");
// socket连接地址
// FstAPI: http://172.168.0.217:7000
// Flask: http://127.0.0.1:5000
// 指定传输方式，如WebSocketautoConnect: true, // 是否自动连接reconnection: true, // 是否自动重新连接reconnectionAttempts: 3, // 重新连接尝试次数reconnectionDelay: 1000, // 重新连接延迟时间（毫秒）
const ws_url = ref("http://172.168.0.217:7000");
socket = io(ws_url.value, {
  transports: ["websocket"],
  query: { token: token_str.value },
});

// 建立连接的事件
socket.on("connect", () => {
  socket.emit("join", { room: "wagnyf@bitian.cn", user: "wagnyf" });
  console.log(
    "connect: websocket 连接成功(index)！连接状态：",
    socket.connected
  );
});
// 创建客户端 websocket 的实例message
socket.on("message_A", (res) => {
  input_A.value = res;
  console.log("数据接收成功(index)！", res);
});
// 创建客户端 websocket 的实例
socket.on("message_B", (res) => {
  input_B.value = res;
  console.log("数据接收成功(index)！", res);
});
// 接收消息
socket.on("message", (res) => {
  input_R.value = res;
  // 如果接收到"outLine" 触发MITT下线函数
  if (res == "outLine") {
    toOutLine();
  }

  console.log("message数据接收成功(index)！", res);
});
// 关闭连接的事件
socket.on("disconnect", () => {
  console.log("disconnect: websocket 连接关闭(index)！");
});

onMounted(() => {});

// 组件被销毁之前，清空 sock 对象
onBeforeUnmount(() => {
  // 关闭连接
  socket.close();
  // 销毁 websocket 实例对象
  socket = null;
});

// // 接收到消息的事件
// socket.on("message", (msg) => console.log(msg));

// 发送按钮的点击事件处理函数
const send = () => {
  console.log("发送！");
  var params_str = {
    data: input_1.value,
    room: "wagnyf@bitian.cn",
  };
  // 向事件 "send" 推送消息
  socket.emit("send", params_str);
  // 向事件 "message_A" 推送消息
  socket.emit("message_A", params_str);
  socket.send("message", params_str);
};
</script>

<style lang="less" scoped></style>
