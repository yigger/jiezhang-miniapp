import { Api } from './api'

class Jz {

  private _appid: string
  private _baseUrl: string
  private _apiUrl: string
  private _api: Api

  bootstrap ({
    appid = '',
    baseUrl = '',
    apiUrl = ''
  }) {
    this._appid = appid
    this._baseUrl = baseUrl
    this._apiUrl = apiUrl
    this._api = new Api(this.apiUrl, this.appId)
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

  get api(): Request {
    return this._api
  }
}

const jz = new Jz()
export default jz