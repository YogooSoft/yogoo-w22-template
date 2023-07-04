import { router } from "@/router";
import { message } from "@/hooks/web/useMessage";
import axiosRetry from "axios-retry";
import { getToken } from "@/utils/auth";
import NProgress from "nprogress";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

var { appVersion, publicPath } = require("@/config");
import { checkStatus } from '@/utils/http/checkStatus';

export interface IDataWithError<T> {
  data: T;
  code: number;
  msg: string;
}

NProgress.configure({
  easing: "ease",
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
});

class HttpService {
  private http!: AxiosInstance;

  constructor() {
    axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
    this.http = axios.create({
      baseURL: publicPath, //authUtils.getBaseURL(),
      timeout: 60000,
    });

    axiosRetry(this.http, {
      retries: 3,
      shouldResetTimeout: true,
      // 重复请求延迟
      retryDelay: (retryCount: number) => {
        return retryCount * 1000;
      },
      retryCondition: (error: AxiosError) => {
        if (error.message.includes("timeout")) {
          return true;
        }

        return !error.response || error.response.status !== 401;
      },
    });

    this.addInterceptors(this.http);
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.handleErrorWrapper<T>(this.http.get(url, config));
  }

  post<T>(url: string, param: unknown, config?: AxiosRequestConfig) {
    return this.handleErrorWrapper<T>(this.http.post(url, param, config));
  }

  postDownload<T>(url: string, param: unknown) {
    return this.handleErrorWrapper<T>(
      this.http.post(url, param, { responseType: "arraybuffer" })
    );
  }

  put<T>(url: string, param: unknown, config?: AxiosRequestConfig) {
    return this.handleErrorWrapper<T>(this.http.put(url, param, config));
  }

  delete<T>(url: string, param: unknown, config?: AxiosRequestConfig) {
    return this.handleErrorWrapper<T>(
      this.http.delete(url, { data: param, ...config })
    );
  }

  private addInterceptors(http: AxiosInstance) {
    // 一、请求拦截器
    http.interceptors.request.use( config => {
      NProgress.start();
      // 1、添加 token   
      const token: any = getToken();
      // console.log("-----------token-----------", token.value);
      if (token.value != null) {
        //config.headers.Authorization = `Bearer ${token}`;
        config.headers!["Authorization"] = `Bearer ${token.value}`;
      }
      // 2、验证请求状态码，http status code 判断 ，如果不是200，则抛出异常，提示用户，并跳转到登录页面
      config.validateStatus = (status: any) => {
        // console.log("-----------config.validateStatus------------" ,config);
        switch (status) {
          case 401:
            // token失效
              const instance = message.error("用户信息过期，请重新登录");
              setTimeout(() => {
                //instance.close();
                router.push("/login");
              }, 2000);
            break;
          case 403:
            // 没有权限
            break;
          case 500:
            // 服务端错误
            break;
          case 503:
            // 服务端错误
            break;
          default:
            //console.warn(`status= ${status}`);
            break;
        }
        return status >= 200 && status < 400;
      };
      // console.log("----------config-----------", config);
      return config;
    });

    // 二、响应拦截器
    http.interceptors.response.use(
      (response: AxiosResponse) => {
        NProgress.done();

        // console.log("------响应拦截器----http.interceptors.response-----------",response.data.meta.code);

        checkStatus(response.data.meta.code,"");
        return response;
      },
      (error) => {
        NProgress.done();
        return Promise.reject(error);
      }
    );
  }

  private setToken(config: AxiosRequestConfig): void {
    const token: any = getToken();
    if (token) {
      config.headers!['token'] = token;
    }
  }

  private async handleErrorWrapper<T>(
    p: AxiosPromise
  ): Promise<IDataWithError<T>> {
    return p
      .then((response) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return {
          ...error.response?.data,
        };
      });
  }
}

export const httpService = new HttpService();
