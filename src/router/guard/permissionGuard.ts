import type { Router, RouteRecordRaw } from "vue-router";
import { PageEnum } from "@/enums/pageEnum";
// import { useUserStoreWithOut } from "@/store/modules/user";
import { PAGE_NOT_FOUND_ROUTE } from "@/router/routes/basic";
import { RootRoute } from "@/router/routes";
import { getToken } from "@/utils/auth";
import { isEmpty, isNull } from "lodash";
import {usePermissionStore} from "@/store/modules/permission";
import {router} from "@/router";
import {GetUserMenuInfo_new} from "@/api/menu";
import {useUserStore} from "@/store/modules/user";

const LOGIN_PATH = PageEnum.BASE_LOGIN;
const ROOT_PATH = RootRoute.path;
const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const permissionStore = usePermissionStore();
  //   const userStore = useUserStoreWithOut();

  router.beforeEach(async (to, from, next) => {
    // if (
    //     from.path === ROOT_PATH &&
    //     to.path === PageEnum.BASE_HOME &&
    //     userStore.getUserInfo.homePath &&
    //     userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    // ) {
    //     next(userStore.getUserInfo.homePath);
    //     return;
    // }
    // console.log("-----------beforeEach-----------from", from);
    // console.log("-----------beforeEach-----------to", to);
    //
    const token: any = getToken();
    if (token.value !== "") {
      if (to.path === LOGIN_PATH) {
        next(from.path);
        return;
      }
    }
    else {
      if (to.path !== LOGIN_PATH) {
        next({ path: LOGIN_PATH });
        return;
      }
      else {
        next();
      }
    }
    // 获取是否添加动态路由状态，为true则路由存在，直接访问路径，为false则获取加载路由 
    if (permissionStore.getIsDynamicAddedRoute && to.path !== LOGIN_PATH) {
      next();
      return;
    }
    // 获取后台路由 并 加载动态路由 
    await GetUserMenuInfo_new("userid").then( (res: any) => {
      // 正常返回权限菜单数据>>>渲染菜单，加载路由
      if (res.meta.code == "0") {
        // 处理菜单渲染数据
        const userStore = useUserStore();
        userStore.afterLoadAction(res.data);
      } else {
        // 未正常返回权限菜单数据>>登陆界面
        router.push("/Login")
      }
    });

    // 设置 添加动态路由状态 为 true 
    permissionStore.setDynamicAddedRoute(true);

    // 如果 to.name === PAGE_NOT_FOUND_ROUTE.name 则 重新加载地址，防止404页面出现
    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    }


   
  });
}
