const toString = Object.prototype.toString
export const isDate = (val: any): val is Date => {
  return toString.call(val) === "[object Date]"
}

export const isObject = (val: any): val is object => {
  return toString.call(val) === "[object Object]"
}
export const extend = <T, U>(to: T, from: U): T & U => {
  console.log(1, to, 2, from)
  const keys = Object.getOwnPropertyNames(from)
  console.log(keys)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    ;(to as any)[key] = (from as any)[key]
  }
  return to as T & U
}
