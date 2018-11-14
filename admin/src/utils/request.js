import axios from 'axios'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:3000/api', // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.state.token) {
      // 每次我们发请求都会携带着token
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response =>{
    const res = response.data
    // if(res.status)
    // console.log(response.status);
    console.log(res);
    if (res.code == 401) { // token已过期的状态码
      // 删除token
      removeToken()
      // 刷新页面
      location.reload()
    }else {
      return response.data
    }
    // //这里面可以设置自定义的返回错误
    // return response.data
  },
  error => {

    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service