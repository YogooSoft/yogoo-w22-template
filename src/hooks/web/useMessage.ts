import { ElMessage, messageTypes } from "element-plus";

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

const msg = (
  message: string,
  type: typeEnum,
  showClose: boolean = false,
  duration: number = 3000
) => {
  ElMessage({
    message: message,
    type: type,
    showClose: showClose,
    duration: duration
  });
};

/**
 * 统一消息提示 
 * ,支持四种类型：信息、成功、警告、错误
 */
export class message {
  /**
   * 信息提示
   * @param content 消息内容
   * @param showClose 是否显示关闭按钮
   */
  static info  = (content:string, showClose: boolean = false,duration: number = 3000) => {   
    msg(content, typeEnum.INFO, showClose,duration);
  };
  /**
   * 成功提示
   * @param content 消息内容
   * @param showClose 是否显示关闭按钮
   */
  static success = (content:string, showClose: boolean = false,duration: number = 3000) => {
    msg(content, typeEnum.SUCCESS, showClose,duration);
  };
  /**
   * 警告提示
   * @param content 消息内容
   * @param showClose 是否显示关闭按钮
   */
  static warning = (content:string, showClose: boolean = false,duration: number = 3000) => {
    msg(content, typeEnum.WARNING,showClose,duration);
  };
  /**
   * 错误提示
   * @param content 消息内容
   * @param showClose 是否显示关闭按钮
   */
  static error = (content:string, showClose: boolean = false,duration: number = 3000) => {
    msg(content, typeEnum.ERROR,showClose,duration);
  };

} 
