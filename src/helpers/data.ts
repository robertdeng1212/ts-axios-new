/*
 * @Descripttion: 处理请求 body 数据
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-09 00:07:06
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-10 23:24:24
 */

import { isPlainObject } from './util'

// 转换请求数据
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 转换响应数据
export function transformResonse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }

  return data
}



