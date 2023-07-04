<template>
  <yui-drawer
    v-bind="$attrs"
    @register="register"
    title="Drawer 外层抽屉"
    width="50%"
  >
    <template #default>
      <collapse-container
        class="cl-mb-10"
        :show-title="false"
        :can-expan="false"
        help-message="抽屉组件使用示例"
      >
        <div>
          <el-button type="primary" style="margin-left: 16px" @click="openDrawerLoading(DrawerEnum.RIGHT)">
            open
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
  <Drawer1 @register="register1" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { CollapseContainer } from "@/components/Container/index";
import { YuiDrawer, useDrawerInner } from "@/components/Drawer";
import Drawer1 from "./Drawer2-1.vue";
import { useDrawer } from "@/components/Drawer";
import { DrawerEnum } from "@/enums/drawerEnum";

export default defineComponent({
  components: { YuiDrawer, CollapseContainer, Drawer1 },
  setup() {
    const [register1, { openDrawer: openDrawer1, setDrawerProps }] =
      useDrawer();
    const [register, { closeDrawer }] = useDrawerInner();

    function openDrawerLoading(
      direction: DrawerEnum,
      showFooter: boolean = false
    ) {
      openDrawer1();
      setDrawerProps({
        // loading: true,
        placement: direction,
        showFooter: showFooter,
      });
      setTimeout(() => {
        setDrawerProps({ loading: false });
      }, 2000);
    }

    return { register, register1, closeDrawer, openDrawerLoading, DrawerEnum };
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
