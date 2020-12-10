/*
 * @Descripttion: 
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-09 16:48:45
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-11 00:04:06
 */

import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergConfig from './core/mergeConfig'

// 使用工厂函数创建 axios 实例
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const content = new Axios(config)
  // 继承 axios 原型上的方法和属性
  const instance = Axios.prototype.request.bind(content)

  extend(instance, content)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

// 静态方法扩展
axios.create = function create(config) {
  return createInstance(mergConfig(defaults, config))
}

export default axios