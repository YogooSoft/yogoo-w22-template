import { IAccountMenuItem, IAccountMenuParam,ITest } from './api-type';
import { httpService, IDataWithError } from '@/utils/http/httpService';


/** 账户栏菜单 */
export function accountMenu(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.get('/api/user/error', param);
}


