import { isObject } from "./utils"
export function trasnformResquest(data: any) {
  if (isObject(data)) {
    return JSON.stringify(data)
  }
}

export function transformResponse(data: any) {
  if (typeof data === "string") {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // do nothing
    }
  }
  return data
}
