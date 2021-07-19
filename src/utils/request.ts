import axios, {AxiosInstance,AxiosRequestConfig,} from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'

// 默认请求前拦截
const reqFunc = (config:any) => {
  // Add X-Access-Token header to every request, you can add other custom headers here
  if (UserModule.token) {
    config.headers['X-Access-Token'] = UserModule.token
  }
  return config
}

// 默认请求前错误拦截
const reqErrFunc = (error:any) => {
  Promise.reject(error)
}

// 默认返回拦截
const resFunc = (response:any) => {
  // Some example codes here:
  // code == 20000: success
  // code == 50001: invalid access token
  // code == 50002: already login in other place
  // code == 50003: access token expired
  // code == 50004: invalid user (user not exist)
  // code == 50005: username or password is incorrect
  // You can change this part for your own usage.
  const res = response.data
  if (res.code !== 20000) {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        UserModule.ResetToken()
        location.reload() // To prevent bugs from vue-router
      })
    }
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return response.data
  }
}

// 默认请求错误拦截
const resErrFunc = (error:any) => {
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
class Service {
  public instance:AxiosInstance
  constructor(config:AxiosRequestConfig = {baseURL: process.env.VUE_APP_BASE_API, timeout: 5000}){
    this.instance = axios.create(config)
    this.requestInterceptor()
    this.responseInterceptor()
  }
  getInstance(){
    return this.instance
  }
  requestInterceptor(reqFn = reqFunc,errFn = reqErrFunc){
    this.instance.interceptors.request.use(
      reqFn,
      errFn
    )
  }
  responseInterceptor(resFn:any = resFunc,errFn = resErrFunc){
    this.instance.interceptors.response.use(
      resFn,
      resErrFunc
    )
  }
  post(url:string,params:any){
    return this.instance({url:url,method:'post',params:params})
  }
} 




export default Service
