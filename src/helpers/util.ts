/*
 * @Descripttion: 工具辅助方法
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-08 23:12:10
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-09 18:07:47
 */

const toString = Object.prototype.toString

// export function isDate(val: any): boolean {
// 使用类型谓词进行参数保护
export function isDate(val: any): val is Date {
  // 缓存 Object.prototype.toString.call(val)
  // return Object.prototype.toString.call(val) === '[object Date]'
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== 'null' && typeof val === 'object'
}

// 是否为普通对象，除 FromData Blob 对象以外的
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 使用交叉类型，混合对象
export function extend<T, U>(to: T, from: U): T & U {
  for(const key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}