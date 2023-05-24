import { defineStore } from "pinia";

var { appVersion, title, loginPageTitle } = require("@/config");

interface AppState {
  title: string;
  LoginPageTitle: string;
  version: string;
  isCollapse: boolean;
}
export const useTodoStore = defineStore({
  id: "todo",
  state: (): AppState => ({
    title: title,
    LoginPageTitle: loginPageTitle,
    version: appVersion,
    isCollapse: false,
  }),
  getters: {
    getTitle(): string {
      return this.title;
    },
    getLoginPageTitle(): string {
      return this.LoginPageTitle;
    },
    getVersion(): string {
      return this.version;
    },
    getIsCollapse(): boolean {
      return this.isCollapse;
    },
  },
  actions: {
    setTitle(title: string): void {
      this.title = title;
    },
    setIsCollapse(): void {
      this.isCollapse = !this.isCollapse;
    },
  },
});
