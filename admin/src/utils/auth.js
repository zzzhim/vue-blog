//关于权限的一些方法
import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'

// cookie的一些方法
export function getToken(){
  return Cookies.get(TokenKey)
}
export function setToken(token){
  return Cookies.set(TokenKey,token)
}
export function removeToken(){
  return Cookies.remove(TokenKey)
}
