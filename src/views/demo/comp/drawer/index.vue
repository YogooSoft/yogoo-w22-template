<template>
  <page-wrapper title="导出示例" content="根据JSON格式的数据进行导出">
    <collapse-container
      class="cl-mb-10"
      title="抽屉组件使用示例"
      :can-expan="false"
      help-message="抽屉组件使用示例"
    >
      <div class="flex-1">
        <span>
          <!-- <el-alert title="自适应高度/显示footer" type="info" show-icon /> -->
          <el-button
            :plain="true"
            @click="openDrawerLoading(DrawerEnum.RIGHT, false, true)"
          >
            自适应高度
          </el-button>
          <!-- <el-alert title="自适应高度/显示footer" type="info" show-icon /> -->
          <el-button
            :plain="true"
            @click="openDrawerLoading(DrawerEnum.RIGHT, true, false)"
          >
            自适应高度/显示footer
          </el-button>
        </span>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="控制"
      :can-expan="false"
      help-message=""
    >
      <div class="flex-1">
        <span>
          <!-- <el-alert title="自适应高度/显示footer" type="info" show-icon /> -->
          <el-button :plain="true" @click="openDrawerLoading(DrawerEnum.TOP)">
            上
          </el-button>
          <el-button :plain="true" @click="openDrawerLoading(DrawerEnum.RIGHT)">
            右
          </el-button>
          <el-button
            :plain="true"
            @click="openDrawerLoading(DrawerEnum.BOTTOM)"
          >
            下
          </el-button>
          <el-button :plain="true" @click="openDrawerLoading(DrawerEnum.LEFT)">
            左
          </el-button>
          <!-- rtl / ltr / ttb / btt -->
        </span>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="嵌套抽屉"
      :can-expan="false"
      help-message=""
    >
      <el-button
        :plain="true"
        @click="openDrawerLoading2(DrawerEnum.RIGHT, true)"
      >
        嵌套抽屉
      </el-button>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="嵌套抽屉"
      :can-expan="false"
      help-message=""
    >
  
    <el-button
            :plain="true"
            @click="openDrawerLoading3(DrawerEnum.RIGHT, true)"
          >
            集成功能
          </el-button>
  </collapse-container>
    <Drawer1 @register="register1" />
    <Drawer2 @register="register2" />
    <Drawer3 @register="register3" />
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref, toRefs, reactive } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { YuiDrawer } from "@/components/Drawer/index";
import { useDrawer } from "@/components/Drawer";
import Drawer1 from "./Drawer1.vue";
import Drawer2 from "./Drawer2.vue";
import Drawer3 from "./Drawer3.vue";
import { DrawerEnum } from "@/enums/drawerEnum";

export default defineComponent({
  name: "demoDrawer",
  components: { CollapseContainer, PageWrapper, YuiDrawer, Drawer1, Drawer2, Drawer3 },

  setup(props) {
    const [register1, { openDrawer: openDrawer1, setDrawerProps }] =
      useDrawer();

    const [
      register2,
      { openDrawer: openDrawer2, setDrawerProps: setDrawerProps2 },
    ] = useDrawer();

    const [
      register3,
      { openDrawer: openDrawer3, setDrawerProps: setDrawerProps3 },
    ] = useDrawer();

    function openDrawerLoading(
      direction: DrawerEnum,
      showFooter: boolean = false,
      showClose: boolean = true
    ) {
      openDrawer1();
      setDrawerProps({
        loading: true,
        placement: direction,
        showFooter: showFooter,
        showClose: showClose,
      });
      setTimeout(() => {
        setDrawerProps({ loading: false });
      }, 2000);
    }

    function openDrawerLoading2(
      direction: DrawerEnum,
      showFooter: boolean = false
    ) {
      openDrawer2();
      setDrawerProps2({
        // loading: true,
        placement: direction,
        showFooter: showFooter,
      });
      setTimeout(() => {
        setDrawerProps2({ loading: false });
      }, 2000);
    }

    
    function openDrawerLoading3(
      direction: DrawerEnum,
      showFooter: boolean = false
    ) {
      openDrawer3();
      setDrawerProps3({
        // loading: true,
        placement: direction,
        showFooter: showFooter,
      });
      setTimeout(() => {
        setDrawerProps3({ loading: false });
      }, 2000);
    }

    // rtl 右 / ltr 左 / ttb 上 / btt 下

    return {
      register1,
      register2,
      register3,
      openDrawerLoading,
      openDrawerLoading2,
      openDrawerLoading3,
      DrawerEnum,
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

.icon-size-menu {
  font-size: 16px;
  padding: 0px 10px;
}
// .el-button {
//   height: inherit;
//   margin-left: 0;
//   border: none;
// }

// :deep(.el-dialog__header) {
//  //padding: 1vh 1vw 0 1vw;
//  padding: 10px 10px 5px 10px;
// }
// :deep(.el-dialog__body) {
//   padding: 5px 10px 10px 10px;
// }

.tools {
  float: right;
  display: flex;
  border: none;
}

//需要保留
// :deep(.el-drawer) {
//   &__header {
//     padding: 5px 15px 5px 10px !important;
//     //padding:3px 15px 0px 10px !important;
//     margin-bottom: 0px !important;
//   }
//   &__body {
//     // overflow:auto;
//     margin: 0px 10px 0px 10px;
//     padding: 0px 10px 0px 0px !important;
//     width: 100%;
//     // overflow: scroll;
//     overflow: inherit;
//   }
// }

.drawer-default {
  overflow: scroll;
  width: 100%;
  top: 5px;
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
