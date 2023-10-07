<template>
  <page-wrapper title="webSocket示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="webSocket示例"
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
        <el-descriptions-item label="接收信息"
          >{{ input_2 }}
        </el-descriptions-item>
        <el-descriptions-item label="推送信息"
          ><el-button type="primary" @click="send">推送</el-button>
        </el-descriptions-item>
      </el-descriptions>
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
import { webSocketStore } from "@/store/webSocket";
import { createWebSocket, sendSock, closeSock } from "@/utils/socket";
import { useEventbus } from "@/components/Mitt";
// MITT组件
const { toOutLine } = useEventbus();

let input_1 = ref("");
let input_2 = ref("");

// websocket的回调函数
const global_callback = (msg: any) => {
  console.log("websocket的回调函数收到服务器信息：" + msg);

  // webSocket.addMsg(mes);
  input_2.value = msg;
  if (msg == "outLine") {
    toOutLine();
  }

  // message.success(msg);
};

// 创建websocket连接
createWebSocket(global_callback);

// 发送消息函数
function send() {
  sendSock(input_1.value);
}

// 关闭连接
onUnmounted(() => {
  closeSock;
});
</script>

<style lang="less" scoped></style>
