<template>
  <div class="_tag">
    <el-scrollbar style="margin-right: 6px">
      <div class="left">
        <el-tag
          v-for="tag in tags"
          :key="tag.name"
          :closable="!tag.hideclose"
          :type="isActive(tag.name)"
          :disable-transitions="false"
          @close="closeCurrent(tag)"
        >
          <router-link :to="tag.path" class="tag-title">
            {{ tag.name }}</router-link
          >
        </el-tag>
      </div>
    </el-scrollbar>
    <div class="tools">
      <!-- 工具栏：标签关闭-->
      <el-dropdown>
        <el-button
          plain
          icon="ArrowDown"
          size="small"
          class="icon-size-menu"
        ></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              icon="RefreshRight"
              @click="refreshTabsPage"
              class="el-button-menu"
              >重新加载</el-dropdown-item
            >
            <el-dropdown-item
              icon="Wallet"
              @click="closeOther"
              class="el-button-menu"
              divided
              >关闭其它标签页</el-dropdown-item
            >
            <el-dropdown-item
              icon="MoreFilled"
              @click="closeAll"
              class="el-button-menu"
              >关闭全部标签页</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 工具栏：标签页全屏-->
      <el-button
        plain
        icon="FullScreen"
        size="small"
        class="icon-size-menu"
        @click="setTabsFullScreen"
      ></el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, unref, onUnmounted, watch } from "vue";
import { useFullscreen } from "@vueuse/core";
import { useRouter } from "vue-router";
import type {
  RouteLocationNormalized,
  RouteLocationRaw,
  Router,
} from "vue-router";
import { REDIRECT_NAME } from "@/router/constant";
import { useMultipleTabStore } from "@/store/modules/multipleTab";
import { usePermissionStore } from "@/store/modules/permission";
import { PageEnum } from "@/enums/pageEnum";
import { useTabs } from "@/hooks/web/useTabs";
// import console, { Console } from "console";

interface tabs {
  name: string;
  type: string;
  hideclose: boolean;
  path: string;
}

export default defineComponent({
  name: "Tags",
  components: {},
  props: ["tabsFullScreen"],
  setup(props, { emit }) {
    const router = useRouter();

    const { getTabList, setTabList, goToPage, refreshPage, closeAll, closeCurrent,closeOther } =
      useTabs();
    const domRef = ref<Nullable<HTMLElement>>(null);
    const { enter, toggle, exit, isFullscreen } = useFullscreen();
    const { toggle: toggleDom } = useFullscreen(domRef);
    const tabStore = useMultipleTabStore();
    //const tags: any = ref(tabStore.getTabList) || ref(<any>[]);
    const tags: any = ref(getTabList()) || ref(<any>[]);
    const usePermission = usePermissionStore();

    // 无用暂时保留
    const init = () => {
      if (tags.value.length === 0) {
        //tags.value = tabStore.getTabList;
        tags.value = getTabList();
      }
    };

    //init();
    /**
     * 设置 Tabs 标签页全屏
     */
    const setTabsFullScreen = () => {
      emit("tabsFullScreen");
    };

    /**
     * 设置标签页(入口)
     */
    const setTags = (route: any) => {
      // 同步 tags
      // tags.value = tabStore.getTabList;
      tags.value = getTabList();

      const { name } = route;
      if (name === REDIRECT_NAME || !route || route.meta.hideTab) {
        return;
      }

      // 解决首页tab标题为PageNotFound问题 
      // if(PageEnum.BASE_HOME == route.fullPath){
      //   route.name = '首页'
      // }

      const tagList = usePermission.getInsideRouterList;
      const isExsit = tags.value.some((item: any) => {
        // 当前路由为内部路由，则不增加tab标签页页
        if (tagList.includes(route.fullPath)) {
          return true;
        }
        // 防止出现PageNotFound页面
        if (tagList.length == 0 && name == "PageNotFound") {
          return true;
        }
        // 解决首页tab标题为PageNotFound问题 
        // if (item.path == route.fullPath && item.name == 'PageNotFound') {
        //     item.name = route.name;
        //     return true
        // }

        return item.path === route.fullPath;
      });

      if (isExsit == false) {
        const tag = {
          name: route.name,
          type: "",
          hideclose: route.meta.hideclose,
          path: route.path,
        };
        tags.value.push(tag);
        setTabList(tags.value);
      }
    };


    /**
     * 获取不关闭标签页
     */
    const getNoCloseTabs = () => {
      let noCloseList = tags.value.filter((item: any) => {
        return item.hideclose == true;
      });
      return noCloseList;
    };

    /**
     * 刷新标签页
     */
    const refreshTabsPage = () => {
      refreshPage(router);
    };

    /**
     * 是否选中，用于控制 Tabs 标签选中样式
     * @param tag 标签页
     */
    const isActive = (tag: string) => {
      if (tag == "Tag 1") {
        return "";
      } else {
        return "info";
      }
    };

    // 监听路由变化
    watch(
      () => router.currentRoute.value.path,
      (toPath) => {
        //要执行的方法
        setTags(router.currentRoute.value);
      },
      { immediate: true, deep: true }
    );

    return {
      tags,
      isActive,
      closeAll,
      closeOther,
      refreshTabsPage,
      toggleDom,
      setTabsFullScreen,
      closeCurrent,
    };
  },
});
</script>

<style lang="less" scoped>
._tag {
  // border: 1px solid green;
  flex: 0 0 40px;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #d8dce5;
  justify-content: space-between;
  //box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  //flex-direction: column;
  align-items: flex-end;

  .left {
    display: flex;
    height: 30px;
    align-items: center;
    .el-tag {
      margin-left: 0px;
      height: 30px;
      border-radius: 0;
      line-height: 27px;
      background-color: #fff;
      border-color: #e6e6e6;
      border-left: none;
      border-bottom: none;
      .tag-title {
        font-size: 13px;
        color: #606266;
        padding: 5px 2px;
        text-align: center;
        text-decoration: none;
      }
      .router-link-active {
        // color: #409eff;
        color: #4165d7;
        font-weight: 600;
      }
      // router-link-active router-link-exact-active tag-title
    }
  }
  ._dropdown {
    width: 40px;
    float: right;
    height: 30px;
    display: flex;
    align-items: center;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) -3px 0px 15px 3px;
    padding: 0 5px;
  }
}
// .el-dropdown-link {
//   //height: inherit;
//   height: 30px;
//   display: inline;
//   //align-items: center;
//   // padding-left: 5px;
//   // padding-right: 5px;
//   padding: 0 5px;
//   font-size: 16px;
// }

// .el-dropdown-link:hover {
//   background-color: rgba(246, 246, 246, 1);
// }
// .el-dropdown-link img {
//   width: 100%;
//   margin-right: 5px;
// }
// .el-dropdown-link i {
//   margin-left: 1px;
// }
// .el-dropdown-menu： {
//   margin-right: 0;
// }
.el-button-menu:hover {
  background-color: rgba(246, 246, 246, 1);
  color: #000;
}

.tools {
  float: right;
  display: flex;
  border: none;
}
.icon-size-menu {
  float: right;
  margin-right: 5px;
  font-size: 17px;
  padding: 0px 3px;
}
.el-button {
  //height: inherit;
  height: 28px;
  margin-left: 0;
  border: none;
}
</style>
