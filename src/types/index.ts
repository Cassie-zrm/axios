// export type Method =
// export type Method =
export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
export interface AxiosResquestConfig {
  url: any
  method?: Method
  data?: any
  params?: any
  headers?: any
  timeout?: number
  withCredentials?: boolean
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosResquestConfig
  request: any
}
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}
export interface Axios {
  insterceptors: {
    requset: AxiosInstanceManager<AxiosResquestConfig>
    response: AxiosInstanceManager<AxiosResponse>
  }
  requset<T = any>(config: AxiosResquestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosResquestConfig): AxiosPromise<T>
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosResquestConfig
  ): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosResquestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosResquestConfig): AxiosPromise<T>
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosResquestConfig
  ): AxiosPromise<T>
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosResquestConfig
  ): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosResquestConfig): AxiosPromise<T>
}

export interface ResolveFn<T = any> {
  (val: T): T | Promise<T>
}
export interface RejectedFn {
  (error: any): void
}

export interface AxiosInstanceManager<T> {
  use(resolve: ResolveFn<T>, reject?: RejectedFn): number
  eject(id: number): void
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosResquestConfig): AxiosPromise<T>
}
