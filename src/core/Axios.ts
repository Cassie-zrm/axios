import type {
  AxiosResquestConfig,
  AxiosResponse,
  AxiosPromise,
  Method,
  ResolveFn,
  RejectedFn,
} from "../types"
import dispatchRequest from "./dispatchRequest"
import InstanceManager from "./interceptorManager"
interface Interceptors {
  requset: InstanceManager<AxiosResquestConfig>
  response: InstanceManager<AxiosResponse>
}
interface PromiseChain<T> {
  resolved: ResolveFn<T> | ((config: AxiosResquestConfig) => AxiosPromise)
  rejected?: RejectedFn
}
export default class Axios {
  public insterceptors: Interceptors

  constructor() {
    this.insterceptors = {
      requset: new InstanceManager<AxiosResquestConfig>(),
      response: new InstanceManager<AxiosResponse>(),
    }
  }
  public requset(config: AxiosResquestConfig): AxiosPromise {
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined,
      },
    ]
    // 后添加限制性 unshift
    this.insterceptors.requset.forEach((interceptor: any) => {
      console.log(2, interceptor)
      chain.unshift(interceptor)
    })
    // 先添加限制性 unshift
    this.insterceptors.response.forEach((interceptor: any) => {
      console.log(1, interceptor)
      chain.push(interceptor)
    })
    let promise = Promise.resolve(config)
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      console.log("resolved", chain.shift())
      promise = promise.then(resolved, rejected)
    }
    // ���式调用
    return promise as unknown as AxiosPromise
  }

  public get(url: string, config?: AxiosResquestConfig): AxiosPromise {
    return this._requsetMethodWithOutData("get", url, config)
  }
  public post(
    url: string,
    data?: any,
    config?: AxiosResquestConfig
  ): AxiosPromise {
    return this._requsetMethodWithData("post", url, data, config)
  }
  public put(
    url: string,
    data?: any,
    config?: AxiosResquestConfig
  ): AxiosPromise {
    return this._requsetMethodWithData("put", url, data, config)
  }
  public delete(url: string, config?: AxiosResquestConfig): AxiosPromise {
    return this._requsetMethodWithOutData("delete", url, config)
  }
  public head(url: string, config?: AxiosResquestConfig): AxiosPromise {
    return this._requsetMethodWithOutData("head", url, config)
  }
  public options(url: string, config?: AxiosResquestConfig): AxiosPromise {
    return this._requsetMethodWithOutData("options", url, config)
  }
  public patch(
    url: string,
    data?: any,
    config?: AxiosResquestConfig
  ): AxiosPromise {
    return this._requsetMethodWithData("patch", url, data, config)
  }

  private _requsetMethodWithOutData(
    method: Method,
    url: string,
    config?: AxiosResquestConfig
  ): AxiosPromise {
    return this.requset({ ...config, method, url })
  }

  //post put
  private _requsetMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosResquestConfig
  ): AxiosPromise {
    return this.requset({
      ...config,
      method,
      url,
      data,
    })
  }
}
