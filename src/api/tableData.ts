import { IAccountMenuItem, IAccountMenuParam,ITest } from './api-type';
import { httpService, IDataWithError } from '@/utils/http/httpService';


import request from '@/utils/http/index'



// /** 表格数据 */
export function GetTableData(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/tableData', param);
}
export function GetTableData2(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/2tableData', param);
}

export function GetTableData3(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/3tableData', param);
}

