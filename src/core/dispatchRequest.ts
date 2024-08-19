import { AxiosResponse, AxiosResquestConfig } from "../types"
import { buildURL } from "../helpers/url"
import xhr from "./xhr"
import { trasnformResquest, transformResponse } from "../helpers/data"
import { processHeaders, parseHeaders } from "../helpers/headers"
export default function dispatchRequest(config: AxiosResquestConfig) {
  processConfig(config)
  return xhr(config).then((res) => transformResponseData(res))
}

function processConfig(config: AxiosResquestConfig) {
  config.url = trasnformURL(config)
  config.headers = trasnformHeaders(config)
  config.data = trasnformResquestData(config)
}

function trasnformURL(config: AxiosResquestConfig) {
  const { url, params } = config
  return buildURL(url, params)
}

function trasnformResquestData(config: AxiosResquestConfig) {
  return trasnformResquest(config.data)
}

function trasnformHeaders(config: AxiosResquestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): any {
  res.data = transformResponse(res.data)
  //   res.headers = parseHeaders(res.headers)
  return res
}
