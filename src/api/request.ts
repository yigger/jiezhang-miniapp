import Taro from "@tarojs/taro";
import { getTokenInterceptor } from './interceptor'

class Request {
  
  private _endpoint: string
  private _appid: string

  constructor (endpoint: string, appid: string) {
    this._endpoint = endpoint  
    this._appid = appid
  }

  get endpoint(): string {
    return this._endpoint
  }

  get appid(): string {
    return this._appid
  }

  get (path, data?, options = {}) {
    return this.request('GET', path, data, options)
  }

  post (path, data, options = {}) {
    return this.request('POST', path, data, options)
  }

  put (path, data, options = {}) {
    return this.request('PUT', path, data, options)
  }

  delete (path, data, options = {}) {
    return this.request('DELETE', path, data, options)
  }

  async request (method, path: string, data, options = {}) {
    const requestUrl = `${this.endpoint}/${path}`
    const header = Object.assign({
      'content-type': 'application/json'
    }, options['header'])

    return new Promise(function(resolve, reject) {
      // 拦截器，往 request.headers 追加 access_token
      Taro.addInterceptor(getTokenInterceptor)

      // 进行方法请求
      Taro.request({
        method: method,
        url: requestUrl,
        data: data,
        header: header,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })

    })
  }
}

export default Request