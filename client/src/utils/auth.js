//关于权限的一些方法
import Cookies from 'js-cookie'
const TokenKey = 'client-Token'
const username = 'client-usraname'


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

export function getusername() {
  return Cookies.get(username)
}
export function setusername(name) {
  return Cookies.set(username, name)
}
export function removeusername() {
  return Cookies.remove(username)
}