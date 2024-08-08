import { isDate } from "./utils"

function encode(url: string) {
  return encodeURIComponent(url)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]")
}
export function buildURL(url: string, params?: any) {
  // 如果params 空，直接返回url
  if (!params) {
    return url
  }

  const parts: string[] = [] // 存放结果
  Object.keys(params).forEach((key) => {
    const val = params[key]
    // 去除空值
    if (val === null || typeof val === "undefined") {
      return
    }
    let values: any[] = []
    if (Array.isArray(val)) {
      values = val
      key += "[]"
    } else {
      values = [val]
    }
    console.log(key, values)
    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString() // utc 格式
      } else if (typeof val === "object") {
        val = JSON.stringify(val)
      }
      parts.push(encode(key) + "=" + encode(val))
      console.log(parts)
    })
  })
  let serializedParams = parts.join("&")
  // 去掉#
  if (serializedParams) {
    const markIndex = url.indexOf("#")
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams
    return url
  }
}
