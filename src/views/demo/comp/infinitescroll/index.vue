<template>
  <page-wrapper title="无限滚动示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="无限滚动示例"
      :can-expan="true"
      help-message="滚动至底部时，加载更多数据。"
    >
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
      </ul>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="禁用加载"
      :can-expan="true"
      help-message="滚动至底部时，加载更多数据。"
    >
      <div class="infinite-list-wrapper" style="overflow: auto">
        <ul
          v-infinite-scroll="load1"
          class="list"
          :infinite-scroll-disabled="disabled1"
        >
          <li v-for="i in count1" :key="i" class="list-item">{{ i }}</li>
        </ul>
        <p v-if="loading1">Loading...</p>
        <p v-if="noMore1">No more</p>
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
    const count = ref(0);
    const load = () => {
      count.value += 2;
    };

    const count1 = ref(10);
    const loading1 = ref(false);
    const noMore1 = computed(() => count.value >= 20);
    const disabled1 = computed(() => loading1.value || noMore1.value);
    const load1 = () => {
      loading1.value = true;
      setTimeout(() => {
        count.value += 2;
        loading1.value = false;
      }, 2000);
    };

    return {
      count,
      load,
      count1,
      loading1,
      noMore1,
      disabled1,
      load1,
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

.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

.infinite-list-wrapper {
  height: 300px;
  text-align: center;
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
</style>
