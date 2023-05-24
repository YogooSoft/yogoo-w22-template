import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';
import { ErrorMessageMode,Result } from '#/axios';
import request from '@/utils/http/index'
import { httpService, IDataWithError } from '@/utils/http/httpService';
import { ITest } from './api-type';

//import {ILogin}  from './api-type';

enum Api {
  // 用户登录
  Login = '/api/user/login',
  // 用户登出
  Logout = '/api/user/logout',
  // 获取用户信息
  GetUserInfo = '/api/user/getUserInfo',
  GetPermCode = '/api/user/permission/getPermCode',
  // 修改密码
  passwordChange = '/api/user/passwordChange',
  // session超时
  sessionTimeout = '/api/user/sessionTimeout',
  verifyLogin = '/api/user/verifyLogin',
}

/**
 * 用户登录
 * @param data
 */
export function api_login(data: LoginParams): Promise<IDataWithError<Result>> {
  return httpService.post(Api.Login, data);
  // return request({
  //   url: Api.Login,
  //   method: 'post',
  //   data,
  // });
}

// export function api_logout() {
//   return request({
//     url: Api.Logout,
//     method: 'get',
//   });
// }

/** 账户栏菜单 */
export function api_logout(): Promise<IDataWithError<ITest[]>> {
  return httpService.post(Api.Logout,null);
}

/** 账户栏菜单 */
export function api_sessionTimeout(): Promise<IDataWithError<ITest[]>> {
  return httpService.post(Api.sessionTimeout,null);
}

export function api_verifyLogin(data: LoginParams): Promise<IDataWithError<ITest[]>> {
  return httpService.post(Api.verifyLogin,data);
}

/** 权限ID */
export function getPermCode(param: any): Promise<IDataWithError<ITest[]>> {
    let  res ;
    res = httpService.post('/sys/permission/getPermCode', param);
  return res
}