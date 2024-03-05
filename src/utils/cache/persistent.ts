// 缓存持久化
// 支持 LocalStorage, SessionStorage
import type { LockInfo, UserInfo } from "#/store";
import { ref, reactive } from "vue";
import type { ProjectConfig } from "#/config";

import type { RouteLocationNormalized } from "vue-router";
//import { useLocalStorage, useSessionStorage } from "@vueuse/core"

import {
  localStore as localMemory,
  sessionStore as sessionMemory,
  resetlocalStore,
  localStoreName,
  sessionStoreName,
} from "@/utils/cache/index";

import {
  TOKEN_KEY,
  USER_INFO_KEY,
  ROLES_KEY,
  LOCK_INFO_KEY,
  PROJ_CFG_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  MULTIPLE_TABS_KEY,
} from "@/enums/cacheEnum";

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [ROLES_KEY]: string[];
  [LOCK_INFO_KEY]: LockInfo;
  [MULTIPLE_TABS_KEY]: RouteLocationNormalized[];
  [PROJ_CFG_KEY]: ProjectConfig;
}

type LocalStore = BasicStore;
type SessionStore = BasicStore;

export type BasicKeys = keyof BasicStore;
type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;

//let localMemory:any = reactive(localStore);
//let sessionMemory:any = reactive(sessionStore);

/**
 * 持久化 LocalStorage, SessionStorage 缓存读写方法
 *
 */
export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.value.value[key];
  }

  static setLocal<T>(key: LocalKeys, value: T) {
    return (localMemory.value.value[key] = value);
  }

  static removeLocal(key: LocalKeys) {
    const { value } = localMemory;
    delete value.value[key];
    //Reflect.deleteProperty(value.value, key);
    //return (value.value.splice(0, 1));
  }

  static getSession<T>(key: LocalKeys) {
    return sessionMemory.value.value[key];
  }

  static setSession<T>(key: LocalKeys, value: T) {
    return (sessionMemory.value.value[key] = value);
  }

  static clearLocal(): void {
    //localStorage.removeItem(localStoreName);
  }

  static clearSession(): void {
    //sessionStore.removeItem(sessionStoreName);
  }

  static clearAll(): void {
    // 调用 原生方法 localStorage、sessionStorage 的 clear() 方法清除所有缓存

    //localMemory.value.value[MULTIPLE_TABS_KEY] = [] as RouteLocationNormalized[];
    //localMemory.value.value[USER_INFO_KEY] = {} as UserInfo;

    //console.log("--------localMemory.value---------",localMemory.value);
    //localStorage.removeItem(localStoreName);
    //sessionStorage.removeItem(sessionStoreName);
    resetlocalStore();
  }
}
