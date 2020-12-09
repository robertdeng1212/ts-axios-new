/*
 * @Descripttion: 错误信息增强 AxiosError 类
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-09 16:27:54
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-09 16:40:24
 */
import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // 解决 axios 的坑
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

// 使用工厂函数创建 error
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  const error = new AxiosError(message, config, code, request, response)
  return error
}