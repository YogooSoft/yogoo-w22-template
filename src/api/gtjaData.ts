import { IAccountMenuItem, IAccountMenuParam, ITest } from "./api-type";
import { httpService, IDataWithError } from "@/utils/http/httpService";

import request from "@/utils/http/index";

// 资产负债数据
export function GetGtjaZcfzData(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/gtja_zcfz_data", param);
}

// 单位净值图表数据
export function GetDWJZEchartsData(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/gtja_dwjz_echarts_data", param);
}

// 单位净值图表数据
export function GetDwjzData(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/gtja_dwjz_data", param);
}

// 投资者信息总览表数据
export function GetTzzxxzlData(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/gtja_tzzxxzl_data", param);
}

// 销售机构总览表数据
export function GetXsjgzlData(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/gtja_xsjgzl_data", param);
}
