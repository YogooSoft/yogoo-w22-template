import type { UserInfo,TokenInfo } from "#/store";
import type { ErrorMessageMode, Result } from "#/axios";
import { defineStore } from "pinia";
import { store } from "@/store";
import { RoleEnum } from "@/enums/roleEnum";
import { PageEnum } from "@/enums/pageEnum";
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from "@/enums/cacheEnum";
import { getAuthCache, setAuthCache } from "@/utils/auth";
import { GetUserInfoModel, LoginParams } from "@/api/model/userModel";
import { api_login, api_logout, api_verifyLogin } from "@/api/user";
import { toRaw } from "vue";
import { router } from "@/router";
import { useMultipleTabStore } from "@/store/modules/multipleTab";
import { Persistent } from "@/utils/cache/persistent";
import { message } from "@/hooks/web/useMessage";
import { ThemeEnum } from "@/enums/appEnum";

import {usePermissionStore} from '@/store/modules/permission';
import { RouteRecordRaw} from 'vue-router';
import {  GetUserMenuInfo_new } from "@/api/menu";



interface UserState {
  userInfo: Nullable<UserInfo>;
  token?:  Nullable<TokenInfo>;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}
  
interface ResultData {
  result:boolean;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: null,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): TokenInfo {
      return this.token || getAuthCache<TokenInfo>(TOKEN_KEY) ;
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0
        ? this.roleList
        : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string) {
      const tokenInfo: TokenInfo = {} as TokenInfo;
      tokenInfo.value = info;
      tokenInfo.time = 0;
      tokenInfo.alive = 0;
      this.token = tokenInfo;
      setAuthCache(TOKEN_KEY, tokenInfo);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = null;
      this.roleList = [];
      this.sessionTimeout = false;
      this.lastUpdateTime = 0;
    },
    async login(params: LoginParams): Promise<GetUserInfoModel | null> {
      try {
        //const { ...loginParams } = params;
        const res: any = await api_login(params);
        const { meta, data, pageinfo } = res;
        // console.log("---------------login res--------------", data);
        if (data) {
          const { token } = data;
          // console.log("---------------login res token--------------", token);
          this.setToken(token);
          this.setUserInfo(data);
          // 获取并加载路由，解决登录后首页PageNotFound问题 
          await GetUserMenuInfo_new("userid").then((res: any) => {
            // 正常返回权限菜单数据>>>渲染菜单，加载路由
            if (res.meta.code == "0") {
              // 加载路由
              this.afterLoadAction(res.data)
            } else {
              // 未正常返回权限菜单数据>>登陆界面
              router.push(PageEnum.BASE_LOGIN)
            }
          });
          return res;
        }
        message.error("用户名或密码错误！");
        return Promise.reject("用户名或密码错误！");
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 用户登出
     * @param goLogin 是否跳转到登录页面
     */
    async logout(goLogin = false) {
      if (this.token) {
        try {
          await api_logout();
        } catch {
          console.log("注销Token失败");
        }
      }
      // 清楚令牌
      this.setToken("");
      this.setSessionTimeout(false);
      // 清空用户信息
      const userInfo: UserInfo = {} as UserInfo;
      this.setUserInfo(userInfo);
      // 重置状态
      this.resetState();
      // 清除缓存
      Persistent.clearAll();
      // 清除tabs选项卡
      const tabStore = useMultipleTabStore();
      tabStore.resetState();
      // 跳转到登录页
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
    /**
     * 验证登录用户名、密码是否正确
     * @param params
     * @returns
     */
    async verifyLogin(params: LoginParams): Promise<boolean> {
      let res;
      if (this.token) {
        try {
          res = await api_verifyLogin(params);

          if (res.meta.code === "0") {
            return new Promise((resolve) => {
              resolve(true);
              return;
            });
          } else {
            message.warning("密码错误！");
            return new Promise((resolve) => {
              resolve(false);
              return;
            });
          }
        } catch {
          console.log("验证用户名、密码失败!");
        }
      }
      return new Promise((resolve) => {
        resolve(false);
        return;
      });
    },

    /**
     * 登录完成处理 
     * @param data
     */
    async afterLoadAction(data?: any): Promise<any | null> {
      // data 为true 有数据时执行，否则不执行 
      if(data){
        const permissionStore = usePermissionStore();
        // 创建路由
        const routes = await permissionStore.buildRoutesAction(data);
        // console.log("===routes===",routes)
        // 加载路由
        routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
        });
        // 获取当前浏览器地址
        // var str_url_now =window.location.href.toString();
        // 获取当前url路径
        // const str_path_now =str_url_now.split('#', 2);
        // 跳转当前路径
        // router.push(str_path_now[1]);
        return routes;
      }
    },

  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
