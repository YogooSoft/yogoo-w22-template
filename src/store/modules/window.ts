import { defineStore } from "pinia";

// var { appVersion, title} = require("@/config");

interface windowInfo {
  // Dialog 的标题
  title: string;
  // 是否显示 Dialog
  showModel: boolean;
  // 是否显示最大化按钮
  showMaximize: boolean;
  // 宽度 格式： 600px
  width: string;
}

interface windowState {
    windowInfo: Nullable<windowInfo>;
  }
const nullWindowStore: Nullable<windowInfo> = { "title": "", "showModel": false, "showMaximize": true, "width": "600px" };

export const useWindowStore = defineStore({
  id: "app-window",
  state: (): windowState => ({ 
    windowInfo: { "title": "", "showModel": false, "showMaximize": true, "width": "600px" }
}),
  getters: {
    getTitle(): string{
      return this.windowInfo!.title;
    },
    getWindowInfo(): windowInfo{
      return this.windowInfo!;
    },
    getShowMaximize(): boolean{
      return this.windowInfo!.showMaximize;
    },
    getWidth(): string{
        return this.windowInfo!.width;
    }
  },
  actions: {
    setTitle(title: string): void {
        this.windowInfo!.title = title || "";
    },
    setMaximize(value: boolean): void {
        this.windowInfo!.showMaximize = value;
    },
    setModel(value: boolean): void {
        this.windowInfo!.showModel = value;
    },
    setWidth(value: string): void {
        this.windowInfo!.width = value;
    },
    // setIsCollapse(): void {
    //   this.isCollapse = !this.isCollapse;
    // }
  },
});












