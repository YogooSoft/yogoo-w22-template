import type {
  RouteLocationNormalized,
  RouteLocationRaw,
  Router,
} from "vue-router";

import { toRaw, unref, ref } from "vue";
import { defineStore } from "pinia";
import { store } from "@/store";

import { useGo, useRedo } from "@/hooks/web/usePage";
import { Persistent } from "@/utils/cache/persistent";

import { PageEnum } from "@/enums/pageEnum";
import { PAGE_NOT_FOUND_ROUTE } from "@/router/routes/basic";
import { MULTIPLE_TABS_KEY } from "@/enums/cacheEnum";

import { usePermissionStore } from "@/store/modules/permission";

const usePermission = usePermissionStore();

export interface MultipleTabState {
  cacheTabList: Set<string>;
  //tabList: RouteLocationNormalized[];
  tabList: any[];
  lastDragEndIndex: number;
}

export const useMultipleTabStore = defineStore({
  id: "app-multiple-tab",
  state: (): MultipleTabState => ({
    // 需要缓存的选项卡
    cacheTabList: new Set(),
    // 多选项卡列表
    tabList: Persistent.getLocal(MULTIPLE_TABS_KEY),
    // 上次移动的选项卡的索引
    lastDragEndIndex: 0,
  }),
  getters: {
    getTabList(): any {
      return this.tabList;
    },
    getCachedTabList(): string[] {
      return Array.from(this.cacheTabList);
    },
    getLastDragEndIndex(): number {
      return this.lastDragEndIndex;
    },
  },
  actions: {
    async setTabList(tabList: any) {
      this.tabList = tabList;
      Persistent.setLocal(MULTIPLE_TABS_KEY, tabList);
    },
    // async addTab(route: RouteLocationNormalized) {
    //   this.tabList.push(route);
    //   Persistent.setLocal(MULTIPLE_TABS_KEY, this.tabList);
    // },
    async closeAllTab(router: Router) {
      // this.tabList = this.tabList.filter((item) => item?.meta?.affix ?? false);
      this.resetState();
      //this.clearCacheTabs();
      this.goToPage(router);
    },
    /**
     * 刷新 tabs 页
     */
    async refreshPage(router: Router) {
      const { currentRoute } = router;
      const route = unref(currentRoute);
      const name = route.name;
      const findTab = this.getCachedTabList.find((item) => item === name);
      if (findTab) {
        this.cacheTabList.delete(findTab);
      }
      const redo = useRedo(router);
      await redo();
      // 解决只有一级菜单时，选项卡刷新页面空白问题
      router.push(route.path);
    },
    /**
     * 关闭 tabs 页
     */
    async closePage(router: Router, tag:any) {
      const  { currentRoute } = router;
      const route = unref(currentRoute);
      let route_path = "";
      // 获取当前关闭的菜单路由path
      if(tag.path===undefined || tag.path===route.path){
        // tag不传值，route_path为当前页面的路由path
        route_path = route.path
      }else{
        // tag传值，route_path为当前要关闭的路由path
         route_path = tag.path
      }

      // 此部分解决菜单内路由情况下，关闭标签页，找到内部路由的父级路由
      // 获取内部路由列表
      const tagList = usePermission.getInsideRouterList;
      // 获取内部路由的父级路由字典
      const parentDict = usePermission.getInsideParentRouterDict;
      // 当前路由为 菜单内部路由时，将route.path赋值为父级路由的path
      if (tagList.includes(router.currentRoute.value.fullPath)) {
        // 与父级路由做比较
         route_path = parentDict[router.currentRoute.value.fullPath];
      }

      const index = this.tabList.findIndex((item: any) => {
        return item.path === route_path;
      });
      this.tabList.splice(index, 1);

      if (this.tabList.length > 0) {
        // 取当前所在位置上一个的位置
        const current = this.tabList[index - 1];
        if(tag.path===undefined || tag.path===route.path || tagList.includes(router.currentRoute.value.fullPath)){
          router.push(current.path);

        }else{
          router.push(route.path);
        }


      } else {
        this.goToPage(router);
      }


      // console.log("==route.path===",route.path)



    },
    /**
     * 关闭其他 tabs 页
     */
    async closeOtherTabs(router: Router) {
      const { currentRoute } = router;
      const route = unref(currentRoute);

      // 获取内部路由列表
      const tagList = usePermission.getInsideRouterList;
      // 获取内部路由的父级路由字典
      const parentDict = usePermission.getInsideParentRouterDict;

      if (tagList.includes(router.currentRoute.value.fullPath)) {
            // 与父级路由做比较
        route.path = parentDict[router.currentRoute.value.fullPath];
      }
      const path = route.path;
      let activeTag = this.tabList.filter((item) => {
        return item.path === path || item.hideclose === true
      });
      // 重置缓存
      this.setTabList(activeTag);

      const redo = useRedo(router);
      await redo();
      router.push(route.path);
    },
    /**
     * 清除 tabs 缓存
     */
    clearCacheTabs(): void {
      this.cacheTabList = new Set();
    },
    /**
     * 重置 tabs
     */
    resetState(): void {
      this.tabList = [];
      Persistent.setLocal(MULTIPLE_TABS_KEY, []);
      this.clearCacheTabs();
    },
    /**
     * 跳转至页面
     * @param router router
     */
    goToPage(router: Router) {
      const go = useGo(router);
      const len = this.tabList.length;
      const { path } = unref(router.currentRoute);
      let toPath: PageEnum | string = PageEnum.BASE_HOME;
      if (len > 0) {
        const page = this.tabList[len - 1];
        const p = page.fullPath || page.path;
        if (p) {
          toPath = p;
        }
      }
      // 跳转到当前页面并报告错误
      path !== toPath && go(toPath as PageEnum, true);
    },
  },
});

// 需要在设置之外使用
export function useMultipleTabWithOutStore() {
  return useMultipleTabStore(store);
}
