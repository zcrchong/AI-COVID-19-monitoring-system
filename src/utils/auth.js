import Cookies from 'js-cookie'

const TokenKey = 'zuoChaoRan'
const timeKey = 'token-timestamp'  // 定义一个时间戳key
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 获取时间戳
export function getTimeStamp() {
    return Cookies.get(timeKey)
}
// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(timeKey, new Date().getTime())
}
