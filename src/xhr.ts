import { AxiosResquestConfig, AxiosResponse, AxiosPromise } from "./types"
import { parseHeaders } from "./helpers/headers"
import e from "express"
export default function xhr(config: AxiosResquestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = "GET",
      // params,
      data,
      headers,
      timeout,
      withCredentials,
      responseType,
    } = config
    const xhr = new XMLHttpRequest()
    xhr.open(method.toUpperCase(), url, true)
    if (timeout) {
      xhr.timeout = timeout
    }
    if (withCredentials) {
      xhr.withCredentials = withCredentials
    }
    if (responseType) {
      xhr.responseType = responseType
    }
    if (headers) {
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })
    }
    xhr.ontimeout = function timeout() {
      reject(new Error("timeout "))
    }
    xhr.onerror = function error() {
      reject(new Error("Network Error"))
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4) {
        return
      }
      if (xhr.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())
      console.log(xhr.response)
      const responseData =
        responseType === "text" ? xhr.responseText : xhr.response
      const response: AxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
        config,
        request: xhr,
      }
      handleResponse(response)
    }
    xhr.send(data) // 支持 text array buffer blob doucment stream
    const handleResponse = function handleResponse(response) {
      if (xhr.status >= 200 && xhr.status < 304) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${xhr.status}`))
      }
    }
  })
}
