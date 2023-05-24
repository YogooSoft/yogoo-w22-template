<template>
    <page-wrapper title="动态路由示例" content="">
      <collapse-container
        class="cl-mb-10"
        title="动态路由"
        :can-expan="false"
        help-message="示例"
      >
        <el-button @click="go">跳转</el-button>
        <el-button @click="insertRoute">插入路由</el-button>
        <el-button @click="removeRoute">删除路由</el-button>
      </collapse-container>
    </page-wrapper>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, ref, unref } from "vue";
  import { PageWrapper } from "@/components/Page";
  import { CollapseContainer } from "@/components/Container/index";
  
  import type { AppRouteModule } from "@/router/types";
  import { LAYOUT } from "@/router/constant";
  import { useRouter } from "vue-router";
  import { object } from "vue-types";
  
  export default defineComponent({
    name: "demo_Radio",
    components: {
      PageWrapper,
      CollapseContainer,
    },
  
    setup() {
      const router = useRouter();
  
      const yg_compPath = "demo/comp/datetime-picker/index.vue";
      
      const yg_comp = import('@/views/'+yg_compPath);
  
      const demo_datePicker = {
        path: "/comp/datetime-picker",
        name: "Datetime-picker",
        component: LAYOUT,
        redirect: "/comp/datetime-picker/index",
        meta: {
          hideChildrenInMenu: true,
          icon: "",
          title: "组件",
          orderNo: 100000,
        },
        children: [
          {
            path: "index",
            name: "日期时间选择器",
            //   component: () => import("@/views/demo/comp/date-picker/index.vue"),
            component: () => yg_comp,
            meta: {
              title: "日期时间选择器",
              icon: "",
              hideMenu: true,
              hideclose: false,
            },
          },
        ],
      };
  
      function insertRoute() {
        router.addRoute("/comp/datetime-picker", demo_datePicker);
      }
  
      function removeRoute() {
        router.removeRoute("Datetime-picker");
      }
  
      function go() {
        router.push({ path: "/comp/datetime-picker" });
      }
  
      return {
        go,
        insertRoute,
        removeRoute,
      };
    },
  });
  </script>
  
  <style lang="less" scoped>
  .cl-mb-10 {
    margin-bottom: 10px;
  }
  
  </style>
  