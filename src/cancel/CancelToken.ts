import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
// 注意：Cancel 不能以 types 引用，因为types 只能当做类型，不能当做值，而类既能当做类型，也能当做值
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

// 取消请求功能类
export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    // 利用 promise 实现异步分离
    // 此时为 pending 状态的 promise
    this.promise = new Promise<Cancel>(resolve => { 
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      // 调用以下代码，将 this.promise 从 pending 状态变成 resolve 状态，
      // 然后执行 xhr.ts 中的 canceToken.promise.then 中的 request.abort 取消请求
      resolvePromise(this.reason)
    })
  }

  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  // 类似于工厂方法
  static source(): CancelTokenSource {
    // cancel! 强制推断不为空
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}