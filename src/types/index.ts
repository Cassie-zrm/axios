export type Method = "get" | "post" | "detele" | "GET" | "POST"
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
