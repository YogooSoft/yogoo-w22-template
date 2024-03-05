<template>
  <div class="logo">
    <img class="logo_img" src="@/assets/images/logo_top_menu.png" alt="" />
  </div>
  <el-menu
    :ellipsis="false"
    :default-active="router.currentRoute.value.path"
    class="el-menu"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item :index="index" v-for="(item_base, index) in menu_list_top">{{
      item_base.name
    }}</el-menu-item>
    <el-dropdown trigger="click" v-if="ellipsis_status == true">
      <span class="el-dropdown-link">
        其他
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            @click="handleSelect(index + menu_list_top.length, [])"
            v-for="(menu_data, index) in menu_list_top_other"
            >{{ menu_data.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-menu>

  <topMenusbox
    :key_num="key_num"
    :key="new Date().getTime()"
    class="menus_box"
    v-if="drawer === true"
    @get_router_click="get_router_click"
  ></topMenusbox>
</template>

<script lang="ts">
var { appVersion } = require("@/config");

import { defineComponent, computed, ref, unref, watch, onMounted } from "vue";
import { useRootSetting } from "@/hooks/setting/useRootSetting";
import topMenusbox from "./src/top-menus-box.vue";

import { useRouter } from "vue-router";

import { GetUserMenuInfo_new } from "@/api/menu";

const key_num = ref(0);

export default defineComponent({
  props: {
    // 控制业务全景菜单弹窗显示
    my_menu_show: {
      type: Boolean,
      require: true,
      default: null,
    },
  },

  name: "TopMenus",
  components: { topMenusbox },
  setup(props, context) {
    // 控制菜单弹窗显示
    const drawer = ref(false);
    const router = useRouter();
    // 菜单列表-基础菜单
    const menu_list: any = ref([]);
    // 菜单列表-用于切换是否有权限展示、检索后页面展示
    let menu_list_show = ref();
    let menu_list_top: any = ref([]);
    let menu_list_top_other: any = ref([]);

    // console.log(props.my_menu_show, "=props.my_menu_show==");
    // 如果打开了业务全景、单模块菜单弹窗关闭
    if (props.my_menu_show) {
      drawer.value = false;
    }
    const ellipsis_status = ref(false);

    // 获取菜单列表
    GetUserMenuInfo_new("userid").then((res: any) => {
      // console.log("==menus.res.data==", res);
      // 正常返回权限菜单数据>>>渲染菜单，加载路由
      if (res.meta.code == "0") {
        // 处理菜单渲染数据
        menu_list.value = res.data;
        // menu_list_show.value = res.data;
        menu_list_top.value = menu_list.value;
        clientWidth();
        // const userStore = useUserStore();
        // userStore.afterLoadAction(res.data);
        // console.log("==menus.value1121==", menu_list.value);
      } else {
        // 未正常返回权限菜单数据>>登陆界面
        router.push("/Login");
      }
    });

    // 点击顶部模块菜单后触发
    const handleSelect = (key: number, keyPath: string[]) => {
      console.log("===", key, "===", keyPath);
      // console.log("==menus.value==", menu_list.value[key]);
      if (key_num.value === key) {
        key_num.value = key;
        // menu_list_show.value = menu_list.value[key];
        if (drawer.value) {
          drawer.value = false;
        } else {
          drawer.value = true;
          get_main_menu_show();
        }
      } else {
        drawer.value = false;
        key_num.value = key;
        drawer.value = true;
        get_main_menu_show();
      }
    };

    // 点击模块菜单后，触发函数 关闭我的全景菜单弹窗
    function get_main_menu_show() {
      // console.log("进来了");
      context.emit("get_main_menu_show", drawer.value);
    }

    const version = appVersion;

    const { setUserMenu } = useRootSetting();
    setUserMenu.value(menu_list);

    // 点击菜单后触发，关闭菜单弹窗
    function get_router_click(params) {
      // console.log("ttttttttttttttttt", params);
      if (!params) {
        drawer.value = false;
      }
    }

    function clientWidth() {
      // console.log("宽度", document.body.clientWidth);
      if (document.body.clientWidth <= 1700) {
        // console.log("屏幕宽度小于1700了");
        ellipsis_status.value = true;
        menu_list_top.value = menu_list.value.slice(0, 6);
        menu_list_top_other.value = menu_list.value.slice(6);
        console.log("==menu_list_top_other.value==", menu_list_top_other.value);
      } else {
        // console.log("屏幕宽度没有小于1700");
        ellipsis_status.value = false;
        menu_list_top.value = menu_list.value;
      }
    }

    onMounted(() => {
      // 实时监测鼠标滚动
      window.addEventListener("resize", () => clientWidth());
    });

    return {
      version,
      router,
      drawer,
      menu_list,
      menu_list_show,
      menu_list_top,
      menu_list_top_other,
      key_num,
      ellipsis_status,
      handleSelect,
      get_main_menu_show,
      get_router_click,
    };
  },
});
</script>

<style lang="less" scoped>
.el-menu {
  height: 50px;
  background-color: #1d2d4e !important;
  color: #ffffff !important;
  width: 70%;
  // .el-menu--collapse {
  //   width: unset;
  // }
}

.el-menu-item {
  font-size: 14px !important;
  background-color: #1d2d4e !important;
  text-align: right;
  float: right;
  color: #ffffff !important;
  height: 50px !important;
  border-bottom: 0px !important;
  padding-right: 10px;
  padding-left: 10px;

  //高亮显示
  &.is-active {
    color: #ffffff !important;
    background-color: #1c418e !important;
    height: 50px !important;
  }
  .el-menu--popup {
    .el-menu-item {
      background-color: red !important;
    }
  }
}

.menus_box {
  width: 100%;
  background-color: #fff;
  height: 80%;
  z-index: 8;
  position: fixed;
  top: 45px;
  overflow: scroll;
  box-shadow: 0 9px 24px 9px rgba(0, 0, 0, 0.15);
}
.logo_img {
  width: 200px;
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 60px;
}
.el-menu--horizontal {
  border-bottom: solid 1px #1d2d4e !important;
}
:deep(.el-sub-menu .el-icon.el-sub-menu__icon-more) {
  color: white !important;
}
:deep(.el-sub-menu) {
  .is-opend .el-sub-menu__hide-arrow {
    color: white !important;
    background-color: #1c418e !important;
  }
}
// :deep(.el-sub-menu:hover) {
//   color: white !important;
//   background-color: red !important;
// }
:deep(.el-sub-menu__title:hover) {
  color: white !important;
  background-color: #1c418e !important;
}

:deep(.el-menu--popup-bottom-start) {
  background-color: red !important;
}
:deep(.el-menu--popup) {
  background-color: red !important;
}
.el-dropdown-link {
  width: 60px !important;
}
:deep(.el-dropdown--default) {
  width: 60px !important;
}
.el-dropdown {
  font-size: 14px !important;
  background-color: #1d2d4e !important;
  text-align: right;
  float: right;
  color: #ffffff !important;
  line-height: 50px;
}
</style>
