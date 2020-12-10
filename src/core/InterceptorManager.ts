/*
 * @Descripttion: 拦截器管理类
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-10 14:54:55
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-10 15:47:14
 */

import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  // 存储拦截器 | null 防止 this.interceptors[id] = null 报错 
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    // 返回拦截器长度，其实就是拦截器 id
    return this.interceptors.length - 1
  }

  // 遍历拦截器
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  // 取消拦截
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}