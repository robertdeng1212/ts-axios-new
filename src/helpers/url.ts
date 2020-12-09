/*
 * @Descripttion: 处理请求 url 参数
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-08 23:05:41
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-09 00:11:33
 */

// 注意引入路劲要使用相对路径，如使用 util 表示引用是 node_modules 模块
import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  // replace 处理特殊字符, 编码，replace 将编码后的特殊字符转换回来
  return encodeURIComponent(val)
    .replace(/%40/g,'@')
    .replace(/%3A/ig, ':')
    .replace(/24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+') // 空格
    .replace(/%5B/ig, '[') // 带字母的都要加 i，不区分大小写
    .replace(/%5D/ig, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  // 定义键值对数组
  const parts: string[] = []

  Object.keys(params).forEach((key) => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      // 跳到下次循环
      return 
    }
    let values = []
    // 参数为数组形式
    if (Array.isArray(val)) {
      values = val
      // get?bar[]=test&hot[]=yes
      key += '[]'
    } else {
      // 统一成数组
      values = [val]
    }
    values.forEach((val) => {
      if(isDate(val)) {
        // util 中使用类型谓词，保护 val 的类型为 Date 类型
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  
  // 序列化
  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      // 去掉 url 中的 #
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}