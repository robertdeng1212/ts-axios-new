/*
 * @Descripttion: 
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-09 16:48:45
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-09 18:10:12
 */

import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

// 使用工厂函数创建 axios 实例
function createInstance(): AxiosInstance {
  const content = new Axios()
  // 继承 axios 原型上的方法和属性
  const instance = Axios.prototype.request.bind(content)

  extend(instance, content)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios