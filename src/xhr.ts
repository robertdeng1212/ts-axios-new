/*
 * @Descripttion:
 * @version:
 * @Author: dengweiyi
 * @Date: 2020-12-08 22:31:01
 * @LastEditors: dengweiyi
 * @LastEditTime: 2020-12-09 16:45:37
 */

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    // 新建实例
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true)

    // 监听 readystatechange 事件，获取响应数据
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return 
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const respone: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(respone)
    }

    request.onerror = function handleError() {
      // 网络错误
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      // 超时, ECONNABORIED: 网络请求术语，表示是被终止的请求
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORIED', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-Type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    // 错误出来 - 非 200 状态码
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${response.status}`, config, null, response))
      }
    }
  })
}
