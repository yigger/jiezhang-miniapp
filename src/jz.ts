import { Api } from './api'
import { observable } from 'mobx'
import Store from './stores'
import Router from './router'

class Jz {

  private _appid: string
  private _baseUrl: string
  private _apiUrl: string
  private _api: Api
  private _store: Store
  // 路由，全站的跳转都必须经过此路由
  private _router: Router

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
    this._store = new Store()
    this._router = new Router()
  }

  async initialize () {
    await this.authCode()
  }

  async authCode () {
    // 先检查是否存在
    const token = await this.api.authAccessToken()
    if (token) {
      this.accessToken = token
      console.log(this.accessToken)
    } else {
      // 换取 accessToken 失败，提示用户

    }
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

  get store(): Store {
    return this._store
  }
}

const jz = new Jz()
export default jz