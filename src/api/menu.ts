import { IAccountMenuItem, IAccountMenuParam,ITest } from './api-type';
import { httpService, IDataWithError } from '@/utils/http/httpService';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";


import request from '@/utils/http/index'


export function GetUserMenuInfo(data:string) {
    return new Promise((resolve, reject) => {
        request({
                url: '/api/menu/usermenu',
                method: 'get',
                data
              }).then(res => {
            resolve(res)
        });
      })
//   return request({
//     url: '/api/menu/usermenu',
//     method: 'get',
//     data
//   })
}


// /** 账户栏菜单 */
export function GetUserMenuInfo_new(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/menu/usermenu', param);
}



//
// export const GetUserMenuInfo_new = (param: any) => {
//   return new Promise((resolve) => {
//     //为了兼容mock和接口数据
//    httpService.post('/api/menu/usermenu', param).then(res=>{
//       console.log("====res=====",res['data'])
//       if(Array.isArray(res)){
//         resolve(res)
//       }else{
//         resolve(res['data'])
//       }
//     });
//   })
// };
