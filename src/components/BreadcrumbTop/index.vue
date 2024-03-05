<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
    v-if="breadcrumbList[0]['meta']['title'] !== '双融业务全景'"
  >
    <div
      style="
        display: inline-block;
        line-height: 20px;
        float: left;
        font-size: 16px;
        font-weight: 600;
        color: #222222;
        margin-right: 10px;
      "
      v-for="(item, index) in breadcrumbList"
    >
      <span
        v-if="
          item.redirect === 'noRedirect' || index == breadcrumbList.length - 1
        "
      >
        {{ item.meta.title }}
      </span>
    </div>
    <transition-group name="breadcrumb">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="item.path"
      >
        <span
          v-if="
            item.redirect === 'noRedirect' || index == breadcrumbList.length - 1
          "
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a style="color: #999999" v-else @click.prevent="handleLink(item)">{{
          item.meta.title
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  watch,
  reactive,
  watchEffect,
} from "vue";
import { useRouter } from "vue-router";

import * as pathToRegexp from "path-to-regexp/dist";

import { router } from "@/router/index";

export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const breadcrumb_show = ref(true);
    const { currentRoute } = useRouter();
    // computed(() => appStore.getTitle);
    const breadcrumbList: any = computed(() => getBreadcrumb());
    // console.log("-===breadcrumbList==", breadcrumbList);

    if (currentRoute.value.path === "/businessPanorama") {
      breadcrumb_show.value = false;
    } else {
      breadcrumb_show.value = true;
    }
    // console.log("==currentRoute.value==", currentRoute.value);

    function getBreadcrumb() {
      let matched = currentRoute.value.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];

      // if (!isDashboard(first)) {
      //   matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
      // }

      return matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );

      //console.log("=======getBreadcrumb==========" , breadcrumbList);
    }

    function isDashboard(route: any) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    }

    function pathCompile(path: string) {
      const { params } = currentRoute.value;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    }

    function handleLink(item: any) {
      let { redirect, path } = item;
      if (redirect) {
        router.push(redirect);
        return;
      }
      router.push(pathCompile(path));
    }

    //getBreadcrumb();

    // watch(currentRoute, (newVal, oldVal) => {
    //   console.log(newVal.path + ":=================" + oldVal.path);
    //   getBreadcrumb();
    // });

    return {
      breadcrumbList,
      handleLink,
      breadcrumb_show,
    };
  },
});
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 10px;
  // color: #666666 !important;
  // margin-left: 8px;

  .no-redirect {
    color: #999999;
    cursor: text;
  }
}
:deep(.el-breadcrumb__separator) {
  margin: 0 4px !important;
}
</style>
