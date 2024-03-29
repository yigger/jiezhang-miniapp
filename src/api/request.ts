import Taro from "@tarojs/taro"
import HttpResult from './http-result'
import jz from '../jz'

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

  get (path, data?, options = {}): Promise<HttpResult> {
    return this.request('GET', path, data, options)
  }

  post (path, data, options = {}): Promise<HttpResult> {
    return this.request('POST', path, data, options)
  }

  put (path, data, options = {}): Promise<HttpResult> {
    return this.request('PUT', path, data, options)
  }

  delete (path, data={}, options = {}): Promise<HttpResult> {
    return this.request('DELETE', path, data, options)
  }

  async authAccessToken (): Promise<string> {
    const loginCode = await Taro.login()
    const res = await Taro.request({
      method: 'POST',
      url: `${this.endpoint}/check_openid`,
      header: {
        'X-WX-Code': loginCode.code
      }
    })

    if (res.statusCode === 200) {
      return res.data.session
    }

    return ''
  }

  async request (method, path: string, data, options = {}): Promise<HttpResult> {
    const requestUrl = `${this.endpoint}/${path}`
    const header = Object.assign({
      'content-type': 'application/json'
    }, options['header'])

    return new Promise(function(resolve, reject) {
      header['X-WX-Skey'] = jz.accessToken

      // 进行方法请求
      Taro.request({
        method: method,
        url: requestUrl,
        data: data,
        header: header,
        success: function(res) {
          const result = new HttpResult(res)
          resolve(result)
        },
        fail: function(res) {
          const result = new HttpResult(res)
          reject(result)
        }
      })

    })
  }
}

export default Request