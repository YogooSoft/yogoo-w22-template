<template>
  <el-row>
    <div class="navbar">
      <!-- 菜单折叠汉堡按钮 -->
      <hamburger
        id="hamburger-container"
        :is-active="!getIsCollapseFn"
        class="hamburger-container"
        @toggleClick="setIsCollapse"
      />
      <!-- 面包屑导航组件 -->
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
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
              <el-dropdown-item icon="Lock" @click="LockScreenFn"
                >锁定屏幕</el-dropdown-item
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
</template>
<script lang="ts">
var { appVersion } = require("@/config");

import { defineComponent, computed, ref, inject, reactive,onBeforeMount,onMounted } from "vue";
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

export default defineComponent({
  name: "HeaderModal",
  components: {
    Hamburger,
    Breadcrumb,
    screenFull,
    LockScreen,
    AppSearch,
    SvgIcon,
  },



  setup() {
    const version = appVersion;
    const { getIsCollapse, setIsCollapse } = useRootSetting();

    const router = useRouter();
    const userStore = useUserStore();
    const userinfo = reactive(userStore.getUserInfo);

    const lockStore = useLockStore();
    const LockStore = reactive(lockStore.getLockInfo);

    const { prefixCls } = useDesign("layout-header");

    const isDot = ref(true);

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

    return {
      version,
      userinfo,
      getIsCollapseFn,
      setIsCollapse,
      refreshFrame,
      logout,
      LockScreenFn,
      prefixCls,
      isDot,
    };
  },
});
</script>

<style lang="less" scoped>
.navbar {
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
</style>
