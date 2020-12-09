/*
 * @Descripttion: 处理请求 header
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-09 10:09:42
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-09 14:51:01
 */
import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach((name) => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      // 将小写的 content-Type 赋值给原来大写的 Content-Type
      headers[normalizedName] = headers[name]
      // 删除小写的
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  // 将小写的 content-Type 转换成大写 Content-Type
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;chartset=utf-8'
    }
  }

  return headers
}

// 解析 headers ，将其由字符串转换成对象
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach((line) => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}