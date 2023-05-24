import type { UserInfo, TokenInfo } from "#/store";
import { useRootSetting } from "@/hooks/setting/useRootSetting";
import {ref,unref} from "vue";
import {
  usePreferredDark,
  useLocalStorage,
  useSessionStorage,
  Status,
  useStorage,
  timestamp,
  TimestampOptions,
} from "@vueuse/core";
import type { RouteLocationNormalized } from "vue-router";

import {
  TOKEN_KEY,
  LOCALE_KEY,
  USER_INFO_KEY,
  ROLES_KEY,
  LOCK_INFO_KEY,
  PROJ_CFG_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  MULTIPLE_TABS_KEY,
} from "@/enums/cacheEnum";

// 缓存持久化结构
interface Structure {
  value: BasicStore;
  // 时间戳
  time: number;
  // 是否过期
  expire: number;
}

// 基础存储类型
interface BasicStore {
  // 令牌
  [TOKEN_KEY]: TokenInfo;    //string | number | null | undefined;
  // 标签页
  //[MULTIPLE_TABS_KEY]: RouteLocationNormalized[];
  [MULTIPLE_TABS_KEY]: {};
}

// // 缓存存储类型
// interface Cache {
//   // 值
//   value?: string;
//   // 时间戳
//   time?: number;
//   // 活动状态
//   alive?: number;
// }

const { getVersion } = useRootSetting();

//缓存文件名： 全局程序短名称__运行模式__版本号__本地缓存文件名
export const localStoreName: string = `${
  process.env.VUE_APP_GLOB_APP_SHORT_NAME
}${`__${process.env.NODE_ENV}`}${`__${getVersion.value}`}${`__${APP_LOCAL_CACHE_KEY}`}`.toUpperCase();

export const sessionStoreName: string = (
`${
  process.env.VUE_APP_GLOB_APP_SHORT_NAME
}${`__${process.env.NODE_ENV}`}${`__${getVersion.value}`}${`__${APP_SESSION_CACHE_KEY}`}`).toUpperCase();


type LocalStore = BasicStore;
type LocalKeys = keyof LocalStore;

const baseStore: BasicStore = {} as BasicStore;

const tokenInfo: TokenInfo = {} as TokenInfo;
tokenInfo.value = "";
tokenInfo.time = timestamp();
tokenInfo.alive = timestamp();
// cache.value = "text";
// cache.time = timestamp();
// cache.alive = timestamp();

baseStore[TOKEN_KEY] = tokenInfo;
baseStore[MULTIPLE_TABS_KEY] = [];

const structure: Structure = {} as Structure;
structure.value = baseStore;
structure.time = timestamp();
structure.expire = structure.time + + 1000 * 60 * 60 * 24 * 7;

// 初始化缓存
const structureNull: Structure = structure;



/**
 * 持久化 LocalStorage 缓存读写方法
 */
export const localStore: any = useLocalStorage(localStoreName, structure,);
/**
 * 持久化 SessionStorage 缓存读写方法
 */
export const sessionStore: any = useSessionStorage(sessionStoreName, structure);


export const resetlocalStore = () => {
  //const { value } = localStore;
  // let a : BasicStore = {} as BasicStore;
  const nullStructure:Nullable<Structure> = structureNull;
  localStore.value = nullStructure;
}

// export const storeA: any = useLocalStorage("my-storageA", {
//   name: "Apple",
//   color: "red",
//   tabs: [{ field: "1" }, { field: "2" }, { field: "3" }],
// });

// export const storeB: any = useLocalStorage("my-storage", []);

