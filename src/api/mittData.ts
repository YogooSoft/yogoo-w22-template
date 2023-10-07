import { IAccountMenuItem, IAccountMenuParam, ITest } from "./api-type";
import { httpService, IDataWithError } from "@/utils/http/httpService";

import request from "@/utils/http/index";

// /** 表格数据 */

export function GetMittDisableEven(
  param: any
): Promise<IDataWithError<ITest[]>> {
  return httpService.post("/api/data/mitt_disable_even", param);
}
