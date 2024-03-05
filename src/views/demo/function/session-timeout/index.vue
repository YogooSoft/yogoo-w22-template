<template>
  <page-wrapper title="" content="">
    <collapse-container
      class="cl-mb-10"
      title="登录过期示例"
      :can-expan="true"
      help-message="用户登录过期示例，不再跳转登录页，直接生成页面覆盖当前页面，方便保持过期前的用户状态！"
    >
      <div class="flex-1">
        <span>
          <el-button :plain="true" @click="sessionTimeout()"
            >点击触发用户登陆过期</el-button
          >
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

export default defineComponent({
  name: "session-timeout",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    async function sessionTimeout() {
      const res = await api_sessionTimeout();
      console.log(res);
    }

    return {
      sessionTimeout,
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
