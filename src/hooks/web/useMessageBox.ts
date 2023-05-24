import { ElMessageBox, ElMessageBoxOptions } from "element-plus";

enum typeEnum {
  SUCCESS = "success",
  WARNING = "warning",
  INFO = "info",
  ERROR = "error",
}

enum btnEnum {
  OK = "确定",
  CANCEL = "取消",
}

/**
 * 统一消息弹出框
 */
export class messageBox {
  /**
   * alert 弹出框
   * @param content 消息内容
   * @param title  窗口标题
   * @param callBack 回调函数
   * @returns 
   */
  static alert = (content: string, title: string, callBack?: any) => {
    return ElMessageBox.alert(content, title, {
      confirmButtonText: btnEnum.OK,
      callback: () => {
        callBack();
      },
    });
  };
  /**
   * confirm 弹出框
   * @param content 消息内容
   * @param title 窗口标题
   * @param options 设置参数
   * @returns 
   */
  static confirm = (content: string, title: string, options?:ElMessageBoxOptions) => {
    const op = options || {
        confirmButtonText: btnEnum.OK,
        cancelButtonText: btnEnum.CANCEL,
        type: typeEnum.SUCCESS,
      };
   
    return ElMessageBox.confirm(content, title, op);
  };
}

