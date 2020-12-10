/*
 * @Descripttion: 
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-10 23:27:08
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-10 23:33:55
 */
import { AxiosTransformer } from '../types'

export default function transform(data: any, headers: any, fns?: AxiosTransformer | AxiosTransformer[]): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    // 强制转换成数组
    fns = [fns]
  }
  // js 常用技巧
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}