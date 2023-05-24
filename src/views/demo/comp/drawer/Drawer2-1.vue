<template>
    <yui-drawer
      v-bind="$attrs"
      @register="register"
      title="Drawer 内层抽屉"
      width="30%"
    >
      <template #default>
        <collapse-container
          class="cl-mb-10"
          :show-title="false"
          :can-expan="false"
          help-message=""
        >
          <div>
            <el-button
              type="primary"
              style="margin-left: 16px"
              @click="closeDrawer"
            >
              关闭
            </el-button>
          </div>
        </collapse-container>
      </template>
      <template #footer>
        <div class="drawer-footer">
          <el-button type="primary" @click="">确定</el-button>
          <el-button @click="closeDrawer">关闭</el-button>
        </div>
      </template>
    </yui-drawer>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  import { CollapseContainer } from "@/components/Container/index";
  import { YuiDrawer, useDrawerInner } from "@/components/Drawer";
  export default defineComponent({
    components: { YuiDrawer, CollapseContainer },
    setup() {
      const [register, { closeDrawer }] = useDrawerInner();
      return { register, closeDrawer };
    },
  });
  </script>
  
  <style lang="less" scoped>
  .cl-mb-10 {
    margin-bottom: 10px;
  }
  
  .drawer-footer {
    width: 100%;
    right: 10px;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 10px;
  }
  </style>
  