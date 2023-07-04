import type { AppRouteRecordRaw, AppRouteModule } from "@/router/types";
import { PAGE_NOT_FOUND_ROUTE,REDIRECT_ROUTE } from "@/router/routes/basic";
import { mainOutRoutes } from "./mainOut";
import { PageEnum } from '@/enums/pageEnum';

// const modules = import.meta.globEager('./modules/**/*.ts');

const files = require.context("./modules", true, /\.ts$/);
const modules: any = [];
files.keys().forEach((key) => {
  if (key === "./index.ts") {
    return;
  }
  modules[key.replace(/(\.\/|\.ts)/g, "")] = files(key).default;
});

//export default modules;

// 取消前端路由 20221008
// const routeModuleList: AppRouteModule[] = [];
//
// Object.keys(modules).forEach((key) => {
//   // const mod = modules[key].default || {};
//   const mod = modules[key] || {};
//   const modList = Array.isArray(mod) ? [...mod] : [mod];
//   //console.log("-------路由跟踪--1--------", modList);
//   routeModuleList.push(...modList);
// });
// 取消前端路由 20221008
// export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE,REDIRECT_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/login/index.vue"),
  meta: {
    title: "login",
    hideTab: true
  },
};

// Basic routing without permission
// 基本路由，无角色区别
export const basicRoutes = [
  RootRoute,
  LoginRoute,
  ...mainOutRoutes,
  // 取消取文件路由 
  // ...asyncRoutes,
    PAGE_NOT_FOUND_ROUTE,
    REDIRECT_ROUTE,
];

//console.log("-------跟踪路由--------", basicRoutes);
