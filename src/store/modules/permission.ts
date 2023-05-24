// 权限相关store文件 
import type { AppRouteRecordRaw, Menu } from "@/router/types";
import { defineStore } from "pinia";

import {
  flatMultiLevelRoutes,
  transformObjToRoute,
} from "@/utils/helper/routeHelper";

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from "@/router/routes/basic";

interface PermissionState {
  // Permission code list
  // permCodeList: string[] | number[];

  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean;

  // 菜单内路由地址列表
  InsideRouterList: string[];
  InsideParentRouterDict: {};
}

export const usePermissionStore = defineStore({
  id: "app-permission",
  state: (): PermissionState => ({
    // permCodeList: [],
    // 内部路由地址列表
    InsideRouterList: [],
    // 内部路由父级地址字典
    InsideParentRouterDict: [],
    // 是否添加为动态路由 
    isDynamicAddedRoute: false,
  }),
  getters: {
    // getPermCodeList(): string[] | number[] {
    //     return this.permCodeList;
    // },
    // 获取内部路由地址列表
    getInsideRouterList(): any[] {
      return this.InsideRouterList;
    },

    // 获取内部路由父级路由地址字典
    getInsideParentRouterDict(): {} {
      return this.InsideParentRouterDict;
    },

    // 获取添加动态路由状态 
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    // setPermCodeList(codeList: any) {
    //     this.permCodeList = codeList;
    // },
    // 设置内部路由地址列表
    setInsideRouterList(insideRouterList: any) {
      this.InsideRouterList = insideRouterList;
    },
    // 内部路由地址增加
    addInsideRouterList(insideRouter: any) {
      this.InsideRouterList.push(insideRouter);
    },

    // 设置内部路由父级路由地址字典
    setInsideParentRouterDict(InsideParentRouterDict: any) {
      this.InsideParentRouterDict = InsideParentRouterDict;
    },
    // 内部路由父级路由地址字典增加
    addInsideParentRouterDict(InsideParentRouter: any, InsideRouter: any) {
      this.InsideParentRouterDict[InsideParentRouter] = InsideRouter;
    },

    // 设置添加动态路由状态 
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },

    resetState(): void {
      // this.permCodeList = [];
      // 置空
      this.InsideRouterList = [];
      this.InsideParentRouterDict = {};
    },

    // 更新菜单权限code列表
    // async changePermissionCode() {
    //     const systemPermission = await getPermCode('userid');
    //     // console.log("=======systemPermission======",systemPermission["data"]);
    //     this.setPermCodeList(systemPermission["data"]);
    //
    // },

    //更新内部路由列表
    async changeInsideRouterList() {
      this.setInsideRouterList([]);
    },
    async buildRoutesAction(data?: any): Promise<AppRouteRecordRaw[]> {
      // 更新操作权限
      // this.changeInsideRouterList();

      let routes: AppRouteRecordRaw[] = [];
      let routeList: AppRouteRecordRaw[] = data;

      // 将后台json数据转化为路由格式
      routeList = transformObjToRoute(routeList);

      // 路由等级提升
      // routeList = flatMultiLevelRoutes(routeList);

      routes = [PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE, ...routeList];

      return routes;
    },
  },
});

// 需要在设置之外使用
// export function usePermissionStoreWithOut() {
//     return usePermissionStore();
// }
