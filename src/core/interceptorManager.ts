import type { ResolveFn, RejectedFn } from "../types"
interface interceptors<T> {
  resolved: ResolveFn<T>
  rejected?: RejectedFn
}
export default class interceptorManager<T> {
  private interceptors: Array<interceptors<T> | null>
  constructor() {
    this.interceptors = []
  }
  use(resolved: ResolveFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({ resolved, rejected })
    return this.interceptors.length - 1
  }
  // 删除拦截器
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
  forEach(fn: (interceptor: interceptors<T>) => void): void {
    this.interceptors.forEach((interceptor) => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
