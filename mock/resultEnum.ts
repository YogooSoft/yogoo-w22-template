export interface Meta {
    success: boolean;
    code: string;
    message: string;
  }
  
export enum ResultEnum {
    SUCCESS = "0",
    ERROR = "1",
    // 请求超时
    TIMEOUT = "401",
    // 无效令牌
    INVALID_TOKEN = "100001",
  }
  