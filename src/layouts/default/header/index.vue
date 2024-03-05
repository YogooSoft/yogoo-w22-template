<template>
  <el-row>
    <div :class="navbarClass">
      <!-- 顶部菜单 -->
      <div class="header_menu" v-if="menuShowType == 'top'">
        <top-menus
          :my_menu_show="my_menu_show"
          @get_main_menu_show="get_main_menu_show"
          :key="new Date().getTime()"
        />
      </div>

      <!-- 侧边菜单 -->
      <!-- 菜单折叠汉堡按钮 -->
      <hamburger
        v-if="menuShowType == 'left'"
        id="hamburger-container"
        :is-active="!getIsCollapseFn"
        class="hamburger-container"
        @toggleClick="setIsCollapse"
      />
      <!-- 面包屑导航组件 -->
      <breadcrumb
        v-if="menuShowType == 'left'"
        id="breadcrumb-container"
        class="breadcrumb-container"
      />
      <div class="right-menu">
        <!-- 搜索 -->
        <!-- <div class="right-menu-item hover-effect"> -->
        <!-- <svg-icon
            class="svg-button"
            icon-name="search"
            :element-icons=true
          /> -->
        <app-search
          :class="`${prefixCls}-action__item right-menu-item hover-effect`"
        />
        <!-- 我的业务全景 -->
        <el-link
          v-if="menuShowType == 'top'"
          class="my_menu"
          :underline="false"
          @click="my_menu_click"
          style="
            display: inline;
            color: #fff;
            background-color: #1c418e;
            margin-top: 10px;
            margin-bottom: 10px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 20px;
            font-size: 12px;
            line-height: 32px;
          "
        >
          我的业务全景
        </el-link>
        <!-- </div> -->
        <!-- 消息中心 -->
        <div class="right-menu-item hover-effect">
          <el-badge :is-dot="isDot" class="item">
            <svg-icon
              class="svg-msg-button"
              icon-name="BellFilled"
              :element-icons="true"
            />
          </el-badge>
        </div>
        <!-- 全屏组件 -->
        <screen-full id="screenfull" class="right-menu-item hover-effect" />
        <!-- 刷新组件 -->
        <div class="right-menu-item hover-effect">
          <svg-icon
            class="svg-button"
            icon-name="Refresh"
            :element-icons="true"
            @click="refreshFrame"
          />
        </div>
        <!-- 下拉菜单 -->
        <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          trigger="click"
        >
          <div class="avatar-wrapper">
            <!-- <img src="@/assets/logo.png" class="user-avatar" /> -->
            <span class="el-dropdown-link">
              <svg-icon icon-name="user" class="user-avatar" />
              <span class="user-name"> {{ userinfo.realname }}</span>
              <i class="el-icon-caret-bottom" />
            </span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="Tools">个人中心</el-dropdown-item>
              <!-- <el-dropdown-item >Action 2</el-dropdown-item>
              <el-dropdown-item >Action 3</el-dropdown-item> -->
              <!-- <el-dropdown-item icon="Lock" disabled>锁定屏幕</el-dropdown-item> -->
              <el-dropdown-item icon="Bell" @click="GB_push"
                >广播推送</el-dropdown-item
              >
              <el-dropdown-item icon="Lock" @click="LockScreenFn"
                >锁定屏幕</el-dropdown-item
              >
              <el-dropdown-item
                icon="Top"
                v-if="menuShowType == 'left'"
                @click="setMenuShowTypeFn('top')"
                >顶部菜单</el-dropdown-item
              >
              <el-dropdown-item
                icon="Back"
                v-if="menuShowType == 'top'"
                @click="setMenuShowTypeFn('left')"
                >左侧菜单</el-dropdown-item
              >
              <el-dropdown-item icon="switch-button" divided @click="logout"
                >退出系统</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-row>
  <!-- 锁屏组件 -->
  <lock-screen id="lockscreen" class="icon-size-menu" />
  <topMenusbox
    :key_num="key_num"
    :key="new Date().getTime()"
    class="menus_box"
    v-if="drawer === true"
    @get_router_click="get_router_click"
  ></topMenusbox>
</template>
<script lang="ts">
var { appVersion, appMenuShowType } = require("@/config");
import topMenus from "./comment/index.vue";
import topMenusbox from "./comment/src/top-menus-box.vue";

import {
  defineComponent,
  computed,
  ref,
  inject,
  reactive,
  onBeforeMount,
  onMounted,
} from "vue";
import { ElMessage } from "element-plus";
import Hamburger from "@/components/Hamburger/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import screenFull from "@/components/Screenfull/index.vue";
import LockScreen from "@/components/LockScreen/index.vue";
import { messageBox } from "@/hooks/web/useMessageBox";
import { AppSearch } from "@/components/Application";

import { useRootSetting } from "@/hooks/setting/useRootSetting";
import { useMultipleTabStore } from "@/store/modules/multipleTab";
import { useUserStore } from "@/store/modules/user";
import { Persistent } from "@/utils/cache/persistent";
import { useLockStore } from "@/store/modules/lock";
import { useRouter } from "vue-router";
import type { LockInfo } from "#/store";
import { useDesign } from "@/hooks/web/useDesign";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useEventbus } from "@/components/Mitt";
// import { getCurrentInstance, onBeforeMount } from "vue";

export default defineComponent({
  name: "HeaderModal",
  components: {
    Hamburger,
    Breadcrumb,
    screenFull,
    LockScreen,
    AppSearch,
    SvgIcon,
    topMenus,
    topMenusbox,
  },
  props: ["MenuShowTypeFn"],
  setup(props, { emit }) {
    const version = appVersion;
    const { getIsCollapse, setIsCollapse } = useRootSetting();

    const router = useRouter();
    const userStore = useUserStore();
    const userinfo = reactive(userStore.getUserInfo);

    const lockStore = useLockStore();
    const LockStore = reactive(lockStore.getLockInfo);

    const { prefixCls } = useDesign("layout-header");
    const isDot = ref(true);
    const drawer = ref(false);
    const key_num = ref(0);
    const my_menu_show = ref(false);

    // 菜单显示类型
    const menuShowType = ref("");
    if (userinfo.menuPosition) {
      menuShowType.value = userinfo.menuPosition.toString();
      emit("MenuShowTypeFn", menuShowType.value);
    } else {
      menuShowType.value = appMenuShowType.toString();
      // const menuShowType = ref(appMenuShowType);
      emit("MenuShowTypeFn", menuShowType.value);
    }
    // 写入storage 切换时重新写sotrage加载页面
    const navbarClass = ref("navbar" + menuShowType.value.toString());
    console.log("==navbarClass==", navbarClass.value);
    console.log("==menuShowType==", menuShowType.value);

    // MITT组件
    const {
      customEmit,
      customOn,
      customOff,
      customAll,
      toOutLine,
      reOutLine,
      customEmitGB,
      customOnGB,
    } = useEventbus();
    // const { Bus } = getCurrentInstance().appContext.config.globalProperties;
    function GB_push() {
      // let t = new Date();

      let t = parseInt(new Date().getTime() / 1000) + "";
      customEmitGB("EventGB_A", "这是一条广播信息：" + t.toString());
      // toOutLine();
    }

    // customOn("EventB", GBCF_out);
    reOutLine(GBCF_out);

    function GBCF_out() {
      userStore.logout(true);
    }

    /**
     * 获取是否折叠
     */
    const getIsCollapseFn = computed(() => {
      return getIsCollapse.value;
    });
    /**
     * 设置是否折叠
     */
    const setIsCollapseFn = setIsCollapse.value;
    /**
     * 刷新框架
     */
    const myFn = inject<any>("reload");
    /**
     * 刷新框架按钮
     */
    function refreshFrame() {
      myFn();
    }
    /**
     * 锁屏
     */
    const LockScreenFn = () => {
      const lockInfo: LockInfo = {
        isLock: true,
        pwd: "222222",
      };

      lockStore.setLockInfo(lockInfo);
    };
    //const lockStoreFn = lockStore.unLock();

    const quit = () => {
      messageBox
        .confirm("您确认要退出系统吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        })
        .then(() => {
          // 退出系统 清除缓存 并跳转到登录页面
          userStore.logout(true);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    /**
     * 退出系统
     */
    function logout() {
      quit();
    }

    // 我的业务全景菜单
    function my_menu_click() {
      my_menu_show.value = false;
      if (drawer.value) {
        drawer.value = false;
        key_num.value = 0;
      } else {
        key_num.value = 9999;
        drawer.value = true;
        my_menu_show.value = true;
      }
    }
    function get_main_menu_show(params) {
      console.log("父组件的方法被触发了one", params);
      if (params) {
        drawer.value = false;
      }
    }
    function get_router_click(params) {
      console.log("父组件的方法被触发了one", params);
      if (!params) {
        drawer.value = false;
      }
    }
    // 顶部菜单样式
    const setMenuShowTypeFn = (typeStr) => {
      emit("MenuShowTypeFn", typeStr);
      navbarClass.value = "navbar" + typeStr.toString();
      // console.log("===", navbarClass.value);
      menuShowType.value = typeStr;
      // 将新的菜单显示位置写入store
      userinfo.menuPosition = typeStr;
    };

    return {
      version,
      userinfo,
      getIsCollapseFn,
      setIsCollapse,
      refreshFrame,
      logout,
      LockScreenFn,
      GB_push,
      prefixCls,
      isDot,
      drawer,
      my_menu_click,
      key_num,
      my_menu_show,
      get_main_menu_show,
      get_router_click,
      setMenuShowTypeFn,
      menuShowType,
      navbarClass,
    };
  },
});
</script>

<style lang="less" scoped>
.navbarleft {
  height: 50px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background-color 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    display: flex;
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .avatar-container {
      // 距离右边框的距离
      margin-right: 0px;

      .avatar-wrapper {
        //line-height: 46px;
        margin-top: 5px;
        position: relative;
        height: 20px;
        vertical-align: 10px;

        .user-avatar {
          cursor: pointer;
          width: 20px;
          height: 20px;
          border-radius: 10px;
        }
        .user-name {
          padding: 0px 3px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.navbartop {
  height: 50px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #1d2d4e;
  box-shadow: 0 1px 1px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background-color 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    display: flex;
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    // 5a5e66
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .avatar-container {
      // 距离右边框的距离
      margin-right: 0px;

      .avatar-wrapper {
        //line-height: 46px;
        margin-top: 5px;
        position: relative;
        height: 20px;
        vertical-align: 10px;

        .user-avatar {
          cursor: pointer;
          width: 20px;
          height: 20px;
          border-radius: 10px;
        }
        .user-name {
          padding: 0px 3px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.el-dropdown-link {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 2px;
  padding-right: 2px;
  font-size: 12px;
}

.icon-size-menu {
  font-size: 16px;
  padding: 0px 10px;
}
.el-button {
  height: inherit;
  margin-left: 0;
  border: none;
}

.svg-button {
  cursor: pointer;
  fill: #5a5e66;
}

.svg-msg-button {
  // height: 10px;
  // border: -1px 0 0 0 ;
  cursor: pointer;
  fill: #5a5e66;
}

.item {
  // height: 100%;
  line-height: 50%;
  max-height: 10px;
  position: relative;
  margin-bottom: 10px;
}
.header_menu {
  display: flex;
  float: left;
  width: 70%;
}
</style>
