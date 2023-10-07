import { IAccountMenuItem, IAccountMenuParam, ITest } from "./api-type";
import { httpService, IDataWithError } from "@/utils/http/httpService";

import request from "@/utils/http/index";

// 双融营业部数据
export function GetBranchListData(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/fisl_branch_list", param);
}

// 双融营业部余额数据
export function GetBranchBalanceData(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/fisl_branch_balance_data", param);
}

// 双融客户数据
export function GetAccountBalanceData(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/fisl_account_balance_data", param);
}

// 双融公司余额与市场余额数据
export function GetBalanceGSEchartsData(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/fisl_balance_GS_echarts_data", param);
}

// 双融开户数据
export function GetCustOpenEchartsData(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/fisl_cust_open_echarts_data", param);
}

// 双融利息收入走势数据
export function GetIntEchartsData(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/fisl_int_echarts_data", param);
}
