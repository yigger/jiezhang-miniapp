import Taro from "@tarojs/taro"

import { Api } from './api'
import { observable } from 'mobx'
import Router from './router'
class Jz {
  private _appid: string
  private _baseUrl: string
  private _apiUrl: string
  private _api: Api
  // 路由，全站的跳转都必须经过此路由
  private _router: Router
  
  systemInfo: any

  @observable accessToken: string

  bootstrap ({
    appid = '',
    baseUrl = '',
    apiUrl = ''
  }) {
    this._appid = appid
    this._baseUrl = baseUrl
    this._apiUrl = apiUrl
    this._api = new Api(this.apiUrl, this.appId)
    this._router = new Router()
    this.systemInfo = Taro.getSystemInfoSync()
  }

  async initialize () {
    await this.authCode()
  }

  async authCode () {
    // 先检查是否存在
    const token = await this.api.authAccessToken()
    if (token) {
      this.accessToken = token
      // console.log(this.accessToken)
    } else {
      // 换取 accessToken 失败，提示用户

    }
  }

  toastError(content, duration = 1500, icon = 'none') {
    Taro.showToast({
      title: content,
      icon: icon,
      duration: duration
    })
  }

  confirm(text, title='提示', payload={}) {
    return new Promise((resolve, reject) => {
      Taro.showModal({
        title: title,
        content: text,
        showCancel: true,
        success: res => {
          if (res.confirm) {
            resolve(payload);
          } else if (res.cancel) {
            reject(payload);
          }
        },
        fail: res => {
          reject(payload);
        }
      });
    })
  }

  get router(): Router {
    return this._router
  }

  get baseUrl(): string {
    return this._baseUrl
  }

  set baseUrl(url: string) {
    this._baseUrl = url
  }

  get apiUrl(): string {
    return this._apiUrl
  }

  get appId(): string {
    return this._appid
  }

  get api(): Api {
    return this._api
  }
}

const jz = new Jz()
export default jz