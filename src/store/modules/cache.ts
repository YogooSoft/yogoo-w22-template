import { defineStore } from "pinia";

interface AppState {
  userMenu: any;
}

var userMenu: any = [];

export const useCacheStore = defineStore({
  id: "cache",
  state: (): AppState => ({ "userMenu": userMenu}),
  getters: {
    getUserMenu(): []{
      return this.userMenu;
    }
  },
  actions: {
    setUserMenu(userMenu: any): void {
      this.userMenu = userMenu;
    }
  },
});
