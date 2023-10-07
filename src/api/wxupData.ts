import { IAccountMenuItem, IAccountMenuParam, ITest } from "./api-type";
import { httpService, IDataWithError } from "@/utils/http/httpService";

import request from "@/utils/http/index";

// 微信公众号配置数据
export function GetWxupWechatListData(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/wxup_wechat_data", param);
}

// 微信公众号关注人数趋势数据
export function GetWxupFollowEchartsData(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/wxup_follow_echarts_data", param);
}

// 微信公众号浏览趋势数据
export function GetWxupReadEchartsData(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/wxup_read_echarts_data", param);
}

// 微信公众号文章列表数据
export function GetWxupArticleData(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/wxup_articles_data", param);
}

// 微信公众号素材列表数据
export function GetWxupCoversData(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/wxup_covers_data", param);
}

// 微信公众号资金账号绑定数据
export function GetWxupAccountData(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/wxup_account_echarts_data", param);
}
