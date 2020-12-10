/*
 * @Descripttion: 
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-08 22:26:05
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-10 16:56:58
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

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// AxiosPromise<T = any> T 在 examples/extend/app.ts getUser 中 对应 res.data，  AxiosResponse<T> 对应 AxiosResponse 中的 data: T
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

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
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  // 在 examples/extend/app.ts getUser 中，<T = any> AxiosPromise<T> 对应 ResponseData<User>
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  // 添加函数类型定义，实现函数重载
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInterceptorManager<T> {
  // 该函数定义返回的 number 给 eject 取消拦截使用
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}