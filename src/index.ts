/*
 * @Descripttion: 
 * @version: 
 * @Author: dengweiyi
 * @Date: 2020-12-08 22:23:44
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-09 16:54:10
 */
// 此文件代码为原来的 axios.ts ，为方便外部文件使用其他模块文件，如：AxiosError
// import axios, { AxiosError } from '../../src/index'

import axios from './axios'

// 导出类型定义
export * from './types'

export default axios