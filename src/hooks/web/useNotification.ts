import { ElNotification, messageTypes } from "element-plus";

enum typeEnum {
  SUCCESS = "success",
  WARNING = "warning",
  INFO = "info",
  ERROR = "error",
}

/**
 * 消息提示封装
 * @param message 消息内容
 * @param type 消息类型
 * @param showClose 是否显示关闭按钮
 */

const msgNotification = (
  message: string,
  type: typeEnum,
  showClose: boolean = false,
  title?: string,
  duration?: number
) => {
  ElNotification({
    title: title,
    message: message,
    type: type,
    showClose: showClose,
    duration: duration,
  });
};

/**
 * 统一消息通知
 * ,支持四种类型：信息、成功、警告、错误
 */
export class Notification {
  /**
   * 信息提示
   * @param title 标题
   * @param content 消息内容
   * @param showClose 是否显示关闭按钮
   * @param duration 显示时间
   * @returns
   */
  static info = (title:string, content: string, showClose: boolean = false, duration: number = 4500) => {
    msgNotification(content, typeEnum.INFO, showClose, title,duration);
  };
  /**
   * 成功提示
   * @param title 标题
   * @param content 消息内容
   * @param showClose 是否显示关闭按钮
   * @param duration 显示时间
   */
  static success = (title:string, content: string, showClose: boolean = false, duration: number = 4500) => {
    msgNotification(content, typeEnum.SUCCESS, showClose, title,duration);
  };
  /**
   * 警告提示
   * @param title 标题
   * @param content 消息内容
   * @param showClose 是否显示关闭按钮
   * @param duration 显示时间
   */
  static warning = (title:string, content: string, showClose: boolean = false, duration: number = 4500) => {
    msgNotification(content, typeEnum.WARNING, showClose, title,duration);
  };
  /**
   * 错误提示
   * @param title 标题
   * @param content 消息内容
   * @param showClose 是否显示关闭按钮
   * @param duration 显示时间
   */
  static error = (title:string, content: string, showClose: boolean = false, duration: number = 4500) => {
    msgNotification(content, typeEnum.ERROR, showClose, title,duration);
  };
}
