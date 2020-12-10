/*
 * @Descripttion: Axios 类
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-09 17:09:13
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-10 16:47:53
 */
import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, ResolvedFn,  RejectedFn } from '../types'
import dispatchRequest  from './dispatchRequest'
import InterceptorManager from './InterceptorManager'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  // 拦截器链式调用实现
  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
  // request(config: AxiosRequestConfig): AxiosPromise {
  //   return dispatchRequest(config)
  // }

  // 重构以上代码，实现重载
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      // 此时，url 是配置对象
      config = url
    }

    // 拦截器链式调用实现
    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]
    
    this.interceptors.request.forEach(interceptor => {
      // 对于请求拦截器，后添加的先执行
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      // 对于响应拦截器，先添加的先执行
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      // 利用 promise 链式调用，每执行完一个拦截器，即调到下一个，实现依次执行
      promise = promise.then(resolved, rejected)
    }

    // return dispatchRequest(config)
    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }


  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }))
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }))
  }
}
