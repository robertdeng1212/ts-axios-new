/*
 * @Descripttion: 
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-08 22:26:05
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-09 17:07:06
 */

// 字符串字面量类型，为了让 method 只能传入合法的字符串
export type Method = 'get' | 'GET'
| 'delete' | 'Delete'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number // 超时，单位毫秒
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {

}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// 扩展接口 - 接口类型定义，描述 axios 类中的公共方法
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}