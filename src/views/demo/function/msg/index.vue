<template>
  <page-wrapper title="导出示例" content="根据JSON格式的数据进行导出">
    <collapse-container
      class="cl-mb-10"
      title="Alert"
      :can-expan="true"
      help-message="Alert 显示框"
    >
      <el-alert title="成功(success)提示的文案" type="success" show-icon />
      <el-alert title="警告(warning)提示的文案" type="warning" show-icon />
      <el-alert title="消息(info)提示的文案" type="info" show-icon />
      <el-alert title="错误(error)提示的文案" type="error" show-icon />
    </collapse-container>

    <collapse-container
      class="cl-mb-10"
      title="Message"
      :can-expan="true"
      help-message="Message 提示"
    >
      <div class="flex-1">
        <span>
          <el-button :plain="true" @click="message.success('this is success')"
            >success</el-button
          >
          <el-button :plain="true" @click="message.warning('this is warning')"
            >warning</el-button
          >
          <el-button :plain="true" @click="message.info('this is info')"
            >info</el-button
          >
          <el-button :plain="true" @click="message.error('this is error')"
            >error</el-button
          >
        </span>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="MessageBox"
      :can-expan="true"
      help-message="MessageBox 弹出框"
    >
      <div class="flex-1">
        <span>
          <el-button :plain="true" @click="open_alert()">alert</el-button>
          <el-button :plain="true" @click="msgBox()">confirm</el-button>
        </span>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="Notification"
      :can-expan="true"
      help-message="Notification 通知"
    >
      <div class="flex-1">
        <span>
          <el-button :plain="true" @click="open_notification('success')"
            >success</el-button
          >
          <el-button :plain="true" @click="open_notification('warning')"
            >warning</el-button
          >
          <el-button :plain="true" @click="open_notification('info')"
            >info</el-button
          >
          <el-button :plain="true" @click="open_notification('error')"
            >error</el-button
          >
        </span>
      </div>
    </collapse-container>
  </page-wrapper>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { localStore, sessionStore } from "@/utils/cache/index";
import { Persistent } from "@/utils/cache/persistent";
import { ElMessage } from "element-plus";
import { message } from "@/hooks/web/useMessage";
import { messageBox } from "@/hooks/web/useMessageBox";
import { Notification } from "@/hooks/web/useNotification";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

//store.value.name = "test"; //{name: "这个两秒后修改的值1",color:"blue"};
//store.value.color = "blue";

import { TOKEN_KEY, MULTIPLE_TABS_KEY } from "@/enums/cacheEnum";
import { accountMenu } from "@/api/test";
import { ITest } from "@/api/api-type";
import { IDataWithError } from "@/utils/http/httpService";
import { duration } from "moment";

export default defineComponent({
  name: "MessageDemo",
  components: { CollapseContainer, PageWrapper },

  setup(props) {

    const msg =
      "是“悦高软件”基于Vue3.0、Webpack、 Element Plus 、TypeScript的后台解决方案，目标是为中大型项目开发,提供现成的开箱解决方案及丰富的示例。";

    const msgBox = () => {
      messageBox
        .confirm("这是一个弹窗", "test")
        .then(() => {
          ElMessage({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    const cb = () => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    };

    const open_alert = () => {
      messageBox.alert("这是一个弹窗", "test", cb);
    };

    const open_notification = (value: string) => {
      switch (value) {
        case "info":
          Notification.info("","这是一个通知：info");
          break;
        case "success":
          Notification.success("提示","这是一个通知：success");
          break;
        case "warning":
          Notification.warning("","这是一个通知：warning");
          break;
        case "error":
          Notification.error("","这是一个通知：error");
          break;
        default:
          Notification.error("","未知的类型");
          break;
      }
    };
    return {
      message,
      messageBox,
      msgBox,
      open_alert,
      open_notification,
      msg,
    };
  },
});
</script>
<style lang="less" scoped>
.flex-1 {
  flex: 1;
  // padding: 10px;
  // margin: 10px 10px 10px 10px;
}
.flex-2 {
  margin-bottom: 10px;
}

.cl-mb-10 {
  margin-bottom: 10px;
}
.cl-mb-10-top {
  margin-top: 10px;
}
.el-alert {
  margin-bottom: 10px;
}
</style>
