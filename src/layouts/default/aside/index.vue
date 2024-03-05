<template>
  <el-menu
    :default-active="router.currentRoute.value.path"
    class="el-menu-vertical"
    :router="true"
    :collapse="isCollapse"
    :unique-opened="true"
    background-color="#212738"
    active-text-color="#ffffff"
    text-color="#ffffff"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
  >
    <!-- logo的显示 -->
    <div class="logo" v-show="!isCollapse">
      <img src="@/assets/images/logo@3x.png" alt="" />
    </div>
    <div class="logo-mini" v-show="isCollapse">
      <img src="@/assets/images/logo-mini@2x.png" alt="" />
    </div>
    <!-- 需要优化， 缩小后会出现 >" -->
    <el-scrollbar class="scrollbar">
      <!-- 菜单组件 -->
      <!-- <c-menus v-for="i in menus" :key="i.path" :menus="i" /> -->
      <c-menus :menus="menus"></c-menus>
    </el-scrollbar>
  </el-menu>
  <!-- </div> -->
</template>
<script lang="ts">
var { appVersion } = require("@/config");

import { defineComponent, computed, ref } from "vue";
import { useRootSetting } from "@/hooks/setting/useRootSetting";
import cMenus from "./src/c-menus.vue";
import { useRouter } from "vue-router";

import { GetUserMenuInfo, GetUserMenuInfo_new } from "@/api/menu";
import { hideAsideMenu } from "@/utils/helper/menuHelper";
import { useUserStore } from "@/store/modules/user";

const handleOpen = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath);
};
const handleSelect = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath);
};

export default defineComponent({
  name: "Aside",
  components: { cMenus },
  setup() {
    const router = useRouter();
    const menus: any = ref([]);
    GetUserMenuInfo_new("userid").then((res: any) => {
      // 正常返回权限菜单数据>>>渲染菜单，加载路由
      if (res.meta.code == "0") {
        // 处理菜单渲染数据
        menus.value = hideAsideMenu(res.data);
        // const userStore = useUserStore();
        // userStore.afterLoadAction(res.data);
      } else {
        // 未正常返回权限菜单数据>>登陆界面
        router.push("/Login");
      }
    });

    const version = appVersion;
    const { getIsCollapse } = useRootSetting();
    //const isCollapse = getIsCollapse.value;
    const { setUserMenu } = useRootSetting();
    setUserMenu.value(menus);

    const isCollapse = computed(() => {
      return getIsCollapse.value;
    });

    return {
      version,
      isCollapse,
      handleOpen,
      handleClose,
      handleSelect,
      menus,
      router,
    };
  },
});
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/variables.less";

.el-menu-vertical:not(.el-menu--collapse) {
  width: @sideBarWidth;
  min-height: 400px;
  height: 100%;
}
.el-menu-vertical {
  // width: @sideBarWidth;
  display: flex;
  flex-direction: column;
}
.el-menu {
  height: 100%;
}

.el-sub-menu .el-menu-item {
  background-color: @subMenuBg !important;
  &:hover {
    background-color: @subMenuHover !important;
  }
}

// .el-menu--collapse {
//   width: 55px;
// }
.el-sub-menu.el-submenu__title {
  height: 44px;
  line-height: 44px;
}
.back {
  height: 100%;
}
.logo {
  width: 100%;
  height: 53px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 7px 10px 5px 10px;
  padding: 10px 10px 10px 10px;
  //background-color: #ffffff;
}
.logo > img {
  // text-align: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 5px 0px 5px;
}
.logo-mini {
  display: flex;
  justify-content: center;
}
.logo-mini > img {
  padding: 10px 0;
  width: 25px;
}
.el-menu-item-background-color {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
.el-menu-item.is-active {
  // background-color: rgba(64, 158, 255, 1) !important;
  background-color: #4165d7 !important;
}
.secondSubmenu.el-submenu__title {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.scrollbar {
  // width: 100%;//宽度需要为具体的大小
  height: 100%;
}
</style>
