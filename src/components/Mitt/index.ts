import { onUnmounted } from "vue";
import mitt from "mitt";
import { GetMittDisableEven } from "@/api/mittData";

let disable_even = [] as any;
function GetMittDisableEvenData() {
  GetMittDisableEven("userid").then((res: any) => {
    disable_even = res.data.data;
    // console.log("disable_even=", disable_even);
  });
}

type IUseEventbus = {
  // 自定义触发器
  customEmit: (eventName: string, eventData: any) => void;
  // 自定义接收器
  customOn: (eventName: string, callback: () => void) => void;
  // 自定义取消订阅
  customOff: (eventName: string, callback: () => void) => void;
  // 自定义全局触发器
  customEmitGB: (eventName: string, eventData: any) => void;
  // 自定义全局接收器
  customOnGB: (eventName: string, callback: () => void) => void;
  // 自定义全局取消订阅
  customOffGB: (eventName: string, callback: () => void) => void;
  // 获取当前所有的订阅事件
  customAll: () => void;
  // 通知下线
  toOutLine: () => void;
  // 注册触发下线事件
  reOutLine: (callback: () => void) => void;
  // 清空所有事件
  allClear: () => void;
  // 清空当前页面的侦听事件
  pageClear: () => void;
};

const emitter = mitt();
const special_use_even = ["outLine"];
const even_size = 10;

/**
 * @description: 自定义触发器
 * @param {*} eventName 名称
 * @param {*} eventData 数据
 */
const customEmit = (eventName: string, eventData: any) => {
  console.log("evenCreateCheck(eventName)==", evenCreateCheck(eventName));
  if (evenCreateCheck(eventName) === true) {
    const eventNameStr = createPrefix(eventName);
    console.log("数据推送：", eventNameStr, eventData);
    emitter.emit(eventNameStr, eventData);
  }
};

/**
 * @description: 自定义接收器
 * @param {*} name 名称
 * @param {*} callback 回调的函数
 */
const customOn = (eventName: string, callback: () => void) => {
  if (evenCreateCheck(eventName) === true) {
    const eventNameStr = createPrefix(eventName);
    console.log("注册订阅：", eventNameStr);
    emitter.on(eventNameStr, callback);
  }
};

/**
 * @description: 自定义取消订阅
 * @param {*} name 名称
 * @param {*} callback 回调的函数
 */
const customOff = (eventName: string, callback: () => void) => {
  if (evenCreateCheck(eventName) === true) {
    const eventNameStr = createPrefix(eventName);
    console.log("销毁订阅：", eventNameStr);
    emitter.off(eventNameStr, callback);
  }
};

/**
 * @description: 自定义全局触发器
 * @param {*} eventName 名称
 * @param {*} eventData 数据
 */
const customEmitGB = (eventName: string, eventData: any) => {
  if (evenCreateCheck(eventName) === true) {
    const eventNameStr = "MITTGB_" + eventName.toString();
    console.log("全局数据推送：", eventNameStr, eventData);
    emitter.emit(eventNameStr, eventData);
  }
};

/**
 * @description: 自定义全局接收器
 * @param {*} name 名称
 * @param {*} callback 回调的函数
 */
const customOnGB = (eventName: string, callback: () => void) => {
  if (evenCreateCheck(eventName) === true) {
    const eventNameStr = "MITTGB_" + eventName.toString();
    console.log("注册订阅：", eventNameStr);
    emitter.on(eventNameStr, callback);
  }
};

/**
 * @description: 自定义全局取消订阅
 * @param {*} name 名称
 * @param {*} callback 回调的函数
 */
const customOffGB = (eventName: string, callback: () => void) => {
  if (evenCreateCheck(eventName) === true) {
    const eventNameStr = "MITTGB_" + eventName.toString();
    console.log("销毁订阅：", eventNameStr);
    emitter.off(eventNameStr, callback);
  }
};

/**
 * @description: 获取当前所有的订阅事件
 */
const customAll = () => {
  return emitter.all;
};

/**
 * @description: 通知下线
 */
const toOutLine = () => {
  emitter.emit("outLine");
};

/**
 * @description: 注册触发下线事件
 * @param {*} callback 回调的函数
 */
const reOutLine = (callback: () => void) => {
  emitter.on("outLine", callback);
};

/**
 * @description: 清空事件
 */
const allClear = () => {
  console.log("销毁所有订阅");
  emitter.all.clear();
};
/**
 * @description: 清空当前页面事件
 */
const pageClear = () => {
  const eventPrefix = "MITTCD_";
  console.log("销毁当前页面事件前:", eventPrefix);
  var all_even = emitter.all;

  all_even.forEach((value, key) => {
    var key_str = key.toString();
    console.log(key.toString());
    if (key_str.includes(eventPrefix)) {
      emitter.off(key_str);
    }
  });
  console.log("销毁当前页面事件后:", emitter.all);
  // emitter.all.clear();
};

/**
 * @description: 组合侦听前缀
 */
const createPrefix = (eventName) => {
  // console.log("router：", window.location.hash);
  const path_str = window.location.hash;
  let prefix_str = path_str.replaceAll("/", "_");
  prefix_str =
    "MITTCD_" + prefix_str.substring(2).toString() + "_" + eventName.toString();
  return prefix_str;
};

const getPrefix = () => {
  // console.log("router：", window.location.hash);
  const path_str = window.location.hash;
  let prefix_str = path_str.replaceAll("/", "_");
  prefix_str = prefix_str.substring(2).toString() + "_";
  return prefix_str;
};

const evenCreateCheck = (eventName) => {
  GetMittDisableEvenData();
  console.log("noEvenName(eventName)==", noEvenName(eventName));
  if (noEvenName(eventName) === false) {
    return false;
  }
  if (sizeCheck() === false) {
    return false;
  }
  return true;
};

/**
 * @description: 禁用侦听名判断
 */
const noEvenName = (eventName) => {
  if (special_use_even.includes(eventName)) {
    console.log("该侦听名称不可操作：", eventName);
    return false;
  }
  const eventNameStr = createPrefix(eventName);
  for (let value in disable_even) {
    if (eventNameStr.includes(disable_even[value])) {
      console.log("该菜单不能进行侦听操作：", disable_even[value]);
      return false;
    }
  }

  return true;
};

/**
 * @description: 检查当前使用的注册数 emitter.all
 */
const sizeCheck = () => {
  console.log("检查当前使用的注册数:", emitter.all.size);
  if (emitter.all.size >= even_size) {
    console.log(
      "当前侦听注册数超过了限制，请合理控制侦听注册数量",
      emitter.all.size
    );
    return false;
  }
  return true;
};

/**
 * @description: 导出useEventbus
 */
export const useEventbus = (): IUseEventbus => {
  // 销毁的事件
  // onUnmounted(() => {
  //   // 清空所有的事件，避免多组件互相清理
  //   console.log("销毁所有订阅");
  //   emitter.all.clear();
  // });

  return {
    customEmit,
    customOn,
    customOff,
    customEmitGB,
    customOnGB,
    customOffGB,
    customAll,
    toOutLine,
    reOutLine,
    allClear,
    pageClear,
  };
};
