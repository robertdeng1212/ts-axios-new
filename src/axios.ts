/*
 * @Descripttion: 
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-09 16:48:45
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-09 17:07:56
 */

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResonse } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return tranformResponseData(res)
  })
}

// 处理配置
function processConfig(config: AxiosRequestConfig): void {
  // 注意处理调用处理函数的顺序
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = tranformRequestData(config)
}

// 转换 url
function transformURL(config: AxiosRequestConfig): string {
  const {url, params} = config
  return buildURL(url!, params)
}

// 处理请求数据
function tranformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}

// 处理请求 header
function transformHeaders(config: AxiosRequestConfig): any {
  // 解构赋值，如果 headers 没传，则赋值 {}
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function tranformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResonse(res.data)
  return res
}

export default axios