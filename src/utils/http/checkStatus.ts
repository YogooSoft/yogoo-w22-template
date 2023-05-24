import type { ErrorMessageMode } from '#/axios';
import { useUserStoreWithOut } from "@/store/modules/user";
import projectSetting from '@/settings/projectSetting';
import sysMessage from '@/utils/sysMsg';
import { SessionTimeoutProcessingEnum } from "@/enums/appEnum";
import { message } from "@/hooks/web/useMessage";

const error = message.error!;

export function checkStatus(
  status: string,
  msg: string,
  errorMessageMode: ErrorMessageMode = "message"
): void {
  let errMessage = "";
  const userStore = useUserStoreWithOut();
  const stp = projectSetting.sessionTimeoutProcessing;
  
  switch (status) {
    case '400':
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case '100001':
      // 注释下行代码 处理登录过期后，循环提示登录过期问题 
      // userStore.setToken("");
      errMessage = msg || sysMessage.api[100001];
      if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
        userStore.setSessionTimeout(true);
      } else {
        userStore.logout(true);
      }
      break;
    default:
  }

  
  if (errMessage) {
    if (errorMessageMode === 'modal') {
        error("modal")
      //createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
    } else if (errorMessageMode === 'message') {
      error(errMessage);
    }
  }
}
