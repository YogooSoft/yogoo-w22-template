<template>
  <page-wrapper title="标签页操作示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="标签页操作示例"
      :can-expan="true"
      help-message=""
    >
      <div class="flex-1">
        <span>
          <el-button :plain="true" @click="closeCurrentTabA"
            >关闭当前</el-button
          >
          <el-button :plain="true" @click="refreshPageA">刷新当前</el-button>
          <el-button :plain="true" @click="closeOtherA">关闭其他</el-button>
          <el-button :plain="true" @click="closeAllTab()">关闭所有</el-button>
          <el-button :plain="true" @click="setIsCollapseFn">菜单收起/展开</el-button>
        </span>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { useMultipleTabStore } from "@/store/modules/multipleTab";
import { useRouter } from "vue-router";
import { useTabs } from "@/hooks/web/useTabs";
import { useRootSetting } from "@/hooks/setting/useRootSetting";
import type {
  RouteLocationNormalized,
  RouteLocationRaw,
  Router,
} from "vue-router";

export default defineComponent({
  name: "session-timeout",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const { getCurrentTab, refreshPage, closeCurrent, closeAll, closeOther } =
      useTabs();
    const router = useRouter();
    const tabStore = useMultipleTabStore();
    const { getIsCollapse, setIsCollapse } = useRootSetting();

    /**
     * 设置是否折叠
     */
    const setIsCollapseFn = setIsCollapse.value;

    async function closeCurrentTabA() {
      closeCurrent(router);
    }

    async function refreshPageA() {
      refreshPage(router);
    }

    async function closeAllTab() {
      closeAll(router);
    }

    async function closeOtherA() {
      closeOther(router);
    }

    async function getCurrentTabA() {
      let currentTab = getCurrentTab();
      console.log("-----------currentTab------------", currentTab);
    }

    return {
      closeAllTab,
      getCurrentTabA,
      refreshPageA,
      closeCurrentTabA,
      closeOtherA,
      setIsCollapseFn
    };
  },
});
</script>

<style lang="less" scoped>
.flex-1 {
  flex: 1;
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
