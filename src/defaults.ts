/*
 * @Descripttion: 合并配置 - 默认配置
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-10 17:14:50
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-10 23:53:45
 */
import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResonse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return transformResonse(data)
    }
  ]
}

// 为使得方便书写对象过多的属性，可使用以下遍历数组的技巧
const methdosNoData = ['delete', 'get', 'head', 'options']

methdosNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-type': 'application/x-www-form-urlencoded'
  }
})

export default defaults