import { IAccountMenuItem, IAccountMenuParam,ITest } from './api-type';
import { httpService, IDataWithError } from '@/utils/http/httpService';


import request from '@/utils/http/index'



// /** 表格数据 */
export function GetESInfoData(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/es_info', param);
}

export function GetLogstashInfoData(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/logstash_info', param);
}

export function GetBeatInfoData(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/beat_info', param);
}

export function GetESIDData(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/get_es_id', param);
}

export function GetESIOChartsData(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/es_iocharts', param);
}


export function GETDiagnoseItems(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/diagnose_items', param);
}
export function GETDiagnoseRun(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/diagnose_run', param);
}

export function GETDiagnoseCancelTask(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/cancel_task', param);
}

export function GETDiagnoseGetTask(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/diagnose_get_task', param);
}

export function GETDiagnoseSwitchAuto(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/switch_auto', param);
}

export function GETDiagnoseAutoSettings(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/auto_settings', param);
}

export function GETDiagnoseReport(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/report', param);
}

export function GETDiagnoseHistoryRuntime(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/history_runtime', param);
}

export function GETDiagnoseRisksTrends(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/diagnose_risks_trends', param);
}
export function GETDiagnoseLast7d(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/diagnose_last_7d', param);
}

export function GETIOLogstashData(param: any): Promise<IDataWithError<ITest[]>> {
  return httpService.post('/api/data/io_logstash_data', param);
}