import { onUnmounted } from "vue";
import mitt from "mitt";

type IUseEventbus = {
  customEmit: (eventName: string, eventData: any) => void;
  customOn: (eventName: string, callback: () => void) => void;
  toRefreshTable: () => void;
  refreshTable: (callback: () => void) => void;
};

const emitter = mitt();

/**
 * @description: 自定义触发器
 * @param {*} eventName 名称
 */
const customEmit = (eventName: string, eventData: any) => {
  console.log("====", eventName, eventData);
  emitter.emit(eventName, eventData);
};

/**
 * @description: 自定义接收器
 * @param {*} name 名称
 * @param {*} callback 回调的函数
 */
const customOn = (eventName: string, callback: () => void) => {
  emitter.on(eventName, callback);
};

/**
 * @description: 通知刷新表格数据
 */
const toRefreshTable = () => {
  emitter.emit("refreshTable");
};

/**
 * @description: 刷新表格数据
 * @param {*} callback 回调的函数
 */
const refreshTable = (callback: () => void) => {
  emitter.on("refreshTable", () => callback());
};

/**
 * @description: 导出useEventbus
 */
export const useEventbus = (): IUseEventbus => {
  // 销毁的事件
  onUnmounted(() => {
    // 清空所有的事件，避免多组件互相清理
    emitter.all.clear();
  });

  return {
    customEmit,
    customOn,
    toRefreshTable,
    refreshTable,
  };
};
