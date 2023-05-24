<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
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
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";

import * as pathToRegexp from "path-to-regexp/dist";

import { router } from "@/router/index";

export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const { currentRoute } = useRouter();
    // computed(() => appStore.getTitle);
    const breadcrumbList: any = computed(() => getBreadcrumb());


    // let breadcrumbList: any = watchEffect(() => {
    //   return getBreadcrumb();
    // });

    // function getBreadcrumb() {
    //   // 面包屑导航
    //   let matched = currentRoute.value.matched;
    //   // levelList = matched.filter(
    //   //   (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
    //   // );
    //   console.log("======breadcrumbList=====",matched);
    //   breadcrumbList = matched;
    // }

    function getBreadcrumb() {
      let matched = currentRoute.value.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];

      // if (!isDashboard(first)) {
      //   matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
      // }

      return  matched.filter(
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
    };
  },
});

// export default {
//   data() {
//     return {
//       levelList: null
//     }
//   },
//   watch: {
//     $route(route) {
//       // if you go to the redirect page, do not update the breadcrumbs
//       if (route.path.startsWith('/redirect/')) {
//         return
//       }
//       this.getBreadcrumb()
//     }
//   },
//   created() {
//     this.getBreadcrumb()
//   },
//   methods: {
//     generateTitle,
//     getBreadcrumb() {
//       // only show routes with meta.title
//       let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
//       const first = matched[0]

//       if (!this.isDashboard(first)) {
//         matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
//       }

//       this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
//     },
//     isDashboard(route) {
//       const name = route && route.name
//       if (!name) {
//         return false
//       }
//       return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
//     },
//     pathCompile(path) {
//       // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
//       const { params } = this.$route
//       var toPath = pathToRegexp.compile(path)
//       return toPath(params)
//     },
//     handleLink(item) {
//       const { redirect, path } = item
//       if (redirect) {
//         this.$router.push(redirect)
//         return
//       }
//       this.$router.push(this.pathCompile(path))
//     }
//   }
// }
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
