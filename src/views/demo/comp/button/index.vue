<template>
  <page-wrapper title="导出示例" content="根据JSON格式的数据进行导出">
    <collapse-container
      contentFullHeight
      class="cl-mb-10"
      title="按钮示例"
      :can-expan="true"
      help-message="Notification 通知"
    >
      <div class="flex-1">
        <span>
          <!-- <el-button :plain="true" @click="sessionTimeout()"
            >点击触发用户登陆过期</el-button
          > -->
          <el-row class="cl-mb-10">
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
            <el-button>中文</el-button>
          </el-row>

          <el-row class="cl-mb-10">
            <el-button plain>Plain</el-button>
            <el-button type="primary" plain>Primary</el-button>
            <el-button type="success" plain>Success</el-button>
            <el-button type="info" plain>Info</el-button>
            <el-button type="warning" plain>Warning</el-button>
            <el-button type="danger" plain>Danger</el-button>
          </el-row>

          <el-row class="cl-mb-10">
            <el-button disabled>Default</el-button>
            <el-button type="primary" disabled>Primary</el-button>
            <el-button type="success" disabled>Success</el-button>
            <el-button type="info" disabled>Info</el-button>
            <el-button type="warning" disabled>Warning</el-button>
            <el-button type="danger" disabled>Danger</el-button>
          </el-row>

          <el-row>
            <el-button :icon="Search" circle />
            <el-button type="primary" :icon="Edit" circle />
            <el-button type="success" :icon="Check" circle />
            <el-button type="info" :icon="Message" circle />
            <el-button type="warning" :icon="Star" circle />
            <el-button type="danger" :icon="Delete" circle />
          </el-row>
        </span>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="按钮尺寸"
      :can-expan="true"
      help-message="Notification 通知"
    >
      <div class="flex-1">
        <span>
          <el-row class="cl-mb-10">
            <el-button size="large">Large</el-button>
            <el-button>Default</el-button>
            <el-button size="small">Small</el-button>
            <el-button size="large" :icon="Search">Search</el-button>
            <el-button :icon="Search">Search</el-button>
            <el-button size="small" :icon="Search">Search</el-button>
          </el-row>
          <el-row class="cl-mb-10">
            <el-button :icon="Search" size="large" circle />
            <el-button :icon="Search" circle />
            <el-button :icon="Search" size="small" circle />
          </el-row>
        </span>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="加载状态按钮"
      :can-expan="true"
      help-message="Notification 通知"
    >
      <div>
        <span>
          <el-button type="primary" loading>Loading</el-button>
          <el-button type="primary" :loading-icon="Eleme" loading
            >Loading</el-button
          >
          <el-button type="primary" loading>
            <template #loading>
              <div class="custom-loading">
                <svg class="circular" viewBox="-10, -10, 50, 50">
                  <path
                    class="path"
                    d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          "
                    style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
                  />
                </svg>
              </div>
            </template>
            Loading
          </el-button>
        </span>
      </div></collapse-container
    >
    <collapse-container
      class="cl-mb-10"
      title="链接按钮"
      :can-expan="true"
      help-message="Notification 通知"
    >
      <div class="cl-mb-10">
        <span>
          <div style="margin-bottom: 16px">Basic link button</div>
          <div class="flex justify-space-between mb-4 flex-wrap gap-4 ">
            <el-button
              v-for="button in buttons"
              :key="button.text"
              :type="button.type"
              link
              >{{ button.text }}</el-button
            >
          </div>

          <p  style="margin-bottom: 16px;margin-top: 16px">Disabled link button</p>
          <div class="flex justify-space-between flex-wrap gap-4">
            <el-button
              v-for="button in buttons"
              :key="button.text"
              :type="button.type"
              link
              disabled
              >{{ button.text }}</el-button
            >
          </div>
        </span>
      </div></collapse-container
    >
    <collapse-container
      class="cl-mb-10"
      title="图标按钮"
      :can-expan="true"
      help-message="Notification 通知"
    >
      <div class="cl-mb-10">
        <span>
          <el-button type="primary" :icon="Edit" />
          <el-button type="primary" :icon="Share" />
          <el-button type="primary" :icon="Delete" />
          <el-button type="primary" :icon="Search">Search</el-button>
          <el-button type="primary">
            Upload<el-icon class="el-icon--right"><Upload /></el-icon>
          </el-button>
        </span>
      </div>
      <div>
        <span>
          <el-button :icon="Edit" />
          <el-button :icon="Share" />
          <el-button :icon="Delete" />
          <el-button :icon="Search">Search</el-button>
          <el-button>
            Upload<el-icon class="el-icon--right"><Upload /></el-icon>
          </el-button>
        </span>
      </div>
    </collapse-container>
    <collapse-container
      title="按钮组"
      :can-expan="true"
      help-message="Notification 通知"
    >
      <div class="cl-mb-10">
        <span>
          <el-button-group>
            <el-button type="primary" :icon="ArrowLeft"
              >Previous Page</el-button
            >
            <el-button type="primary">
              Next Page<el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
          </el-button-group>

          <el-button-group class="cl-ml-10">
            <el-button type="primary" :icon="Edit" />
            <el-button type="primary" :icon="Share" />
            <el-button type="primary" :icon="Delete" />
          </el-button-group>
        </span>
      </div>
      <div>
        <span>
          <el-button-group>
            <el-button :icon="ArrowLeft">Previous Page</el-button>
            <el-button>
              Next Page<el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
          </el-button-group>

          <el-button-group class="cl-ml-10">
            <el-button :icon="Edit" />
            <el-button :icon="Share" />
            <el-button :icon="Delete" />
          </el-button-group>
        </span>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { api_sessionTimeout } from "@/api/user";
import { api_login, api_logout } from "@/api/user";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  Share,
  ArrowLeft,
  Eleme,
} from "@element-plus/icons-vue";

export default defineComponent({
  name: "demoButton",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    async function sessionTimeout() {
      const res = await api_sessionTimeout();
      console.log(res);
    }
    const buttons = [
      { type: "plain", text: "plain" },
      { type: "primary", text: "primary" },
      { type: "success", text: "success" },
      { type: "info", text: "info" },
      { type: "warning", text: "warning" },
      { type: "danger", text: "danger" },
    ] as const;

    return {
      sessionTimeout,
      Check,
      Delete,
      Edit,
      Message,
      Search,
      Star,
      Share,
      ArrowLeft,
      buttons,
      Eleme,
    };
  },
});
</script>

<style lang="less" scoped>
// .cl-pd-10 {
//   padding-bottom: 2cm;
// }
.el-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}
.el-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-button-text-color);
  stroke-linecap: round;
}

.cl-mb-10 {
  margin-bottom: 10px;
}
.cl-ml-10 {
  margin-left: 10px;
}
.cl-mt-10 {
  margin-top: 10px;
}


</style>
