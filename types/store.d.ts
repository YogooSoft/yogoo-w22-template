import { ErrorTypeEnum } from "@/enums/exceptionEnum";
import { MenuModeEnum, MenuTypeEnum } from "@/enums/menuEnum";
import { RoleInfo } from "@/api/sys/model/userModel";

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface UserInfo {
  userId: string | number;
  username: string;
  realname: string;
  avatar: string;
  desc?: string;
  homePath?: string;
  roles: RoleInfo[];
  menuPosition?: string | undefined;
}

export interface TokenInfo {
  value: string;
  time?: number;
  alive?: number;
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
