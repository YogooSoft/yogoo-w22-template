import type { LockInfo } from "#/store";
import { defineStore } from "pinia";
import { LOCK_INFO_KEY } from "@/enums/cacheEnum";
import { Persistent } from "@/utils/cache/persistent";
import { useUserStore } from "./user";
import { ref, toRaw } from "vue";

interface LockState {
  lockInfo: Nullable<LockInfo>;
}
const nullLockStore: Nullable<LockInfo> = { isLock: false, pwd: "" };

export const useLockStore = defineStore({
  id: "app-lock",
  state: (): LockState => ({
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY) || nullLockStore,
  }),
  getters: {
    getLockInfo(): LockInfo {
      return this.lockInfo!; 
     //   this.lockInfo; // || Persistent.getLocal(LOCK_INFO_KEY) || nullLockStore
    },
  },
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo!.isLock = info.isLock;
      this.lockInfo!.pwd = info.pwd;
      //this.lockInfo = Object.assign({}, this.lockInfo, info);
      Persistent.setLocal(LOCK_INFO_KEY, this.lockInfo);
    },
    resetLockInfo() {
      Persistent.removeLocal(LOCK_INFO_KEY);
      this.lockInfo!.isLock = false; 
      this.lockInfo!.pwd = "";
    },
    /**
     * 锁屏解锁
     * @param password
     * @returns
     */
    async unLock(password?: string) {
      const userStore = useUserStore();
      if (this.lockInfo?.pwd === password) {
        this.resetLockInfo();
        return true;
      }
      const tryLogin = async () => {
        try {
          const username = userStore.getUserInfo?.username;
          const res = await userStore.verifyLogin(
            toRaw({
              password: password!,
              username: username,
            })
          );
          if (res) {
            this.resetLockInfo();
          }
          return res;
        } catch (error) {
          return false;
        }
      };
      return await tryLogin();
    },
  },
});
