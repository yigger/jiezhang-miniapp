import Taro from "@tarojs/taro";
import session from '../storage/session'
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

  get () {

  }

  post () {

  }

  put () {

  }

  delete () {

  }

  async getJwt() {
    const jwtKey = 'jwt_code'

    if (session.keyExist(jwtKey)) {
      const jwtValue = session.get(jwtKey)
      const heartbeat = await this.heartBeatTest(jwtValue)
      if (heartbeat) {
        return jwtValue
      }
    }

    const loginCode = await Taro.login()
    const res = await Taro.request({
      method: 'POST',
      url: `${this.endpoint}/check_openid`,
      header: {
        'X-WX-Code': loginCode.code
      }
    })

    if (res.statusCode === 200) {
      const jwt = res.data.session
      session.set(jwtKey, jwt)
      return jwt
    } else {
      return ''
    }
  }

  async request (method: string, path: string) {
    // code -> jwt
    
    
    // 随后用 jwt 去换
    const result = Taro.request({
      url: '',
      header: {
        'content-type': 'application/json',
        // ''
      }
    })
  }

  // 测试 jwt 心跳
  async heartBeatTest(jwt: string): Promise<Boolean> {
    const result = await Taro.request({
      url: `${this.endpoint}/heartbeat`,
      header: {
        'content-type': 'application/json'
      }
    })

    return result.data
  }
}

export default Request