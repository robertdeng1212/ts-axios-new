/*
 * @Descripttion: 配置合并
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-10 17:34:42
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-10 18:37:58
 */
import defaults from '../defaults'
import { isPlainObject, deepMerge } from '../helpers/util'
import { AxiosRequestConfig } from '../types'

// 合并对象 map
const strats = Object.create(null)

/**
 * 默认合并策略
 *
 * @param {*} val1
 * @param {*} val2
 * @return {*}  {*}
 */
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 复杂对象合并策略(深度合并)
function deeepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    // 深拷贝
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deeepMergeStrat
})

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  // 创建空对象，类型为 any
  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    // 策略模式
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}