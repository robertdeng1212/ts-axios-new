/*
 * @Descripttion: 
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-09 16:48:45
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-10 23:48:43
 */

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
// import { transformRequest, transformResonse } from '../helpers/data'
// import { processHeaders, flattenHeaders } from '../helpers/headers'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return tranformResponseData(res)
  })
}

// 处理配置
function processConfig(config: AxiosRequestConfig): void {
  // 注意处理调用处理函数的顺序
  config.url = transformURL(config)
  // config.headers = transformHeaders(config)
  // config.data = tranformRequestData(config)
  // 以上注释代码重构成请求和响应数据处理方法的配置化
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 转换 url
function transformURL(config: AxiosRequestConfig): string {
  const {url, params} = config
  return buildURL(url!, params)
}

// 处理请求数据
// function tranformRequestData(config: AxiosRequestConfig) {
//   return transformRequest(config.data)
// }

// 处理请求 header
// function transformHeaders(config: AxiosRequestConfig): any {
//   // 解构赋值，如果 headers 没传，则赋值 {}
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }

function tranformResponseData(res: AxiosResponse): AxiosResponse {
  // res.data = transformResonse(res.data)
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
