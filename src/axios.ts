import Axios from "./core/Axios"
import type { AxiosInstance } from "./types"
import { extend } from "./helpers/utils"

// 混合
function createInstace(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.requset.bind(context)
  extend(instance, Axios.prototype)
  extend(instance, context)
  return instance as AxiosInstance
  // return context
}
const axios = createInstace()

export default axios
