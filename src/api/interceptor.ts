import Taro from "@tarojs/taro";
import session from '../storage/session'
import jz from '../jz'

const JWT_KEY = 'jwt_code'

export async function getTokenInterceptor (chain) {
  const requestParams = chain.requestParams
  const { method, url } = requestParams

  // check_open_id 的时候跳过
  if (url === `${jz.apiUrl}/check_openid`) {
    return chain.proceed(requestParams)
  }

  console.log(`${method} --> ${url}`)

  // 获取 access_token
  let jwtStr = ''
  if (session.keyExist(JWT_KEY)) {
    jwtStr = session.get(JWT_KEY)
  } else {
    const loginCode = await Taro.login()
    const res = await Taro.request({
      method: 'POST',
      url: `${jz.apiUrl}/check_openid`,
      header: {
        'X-WX-Code': loginCode.code
      }
    })

    if (res.statusCode === 200) {
      jwtStr = res.data.session
      session.set(JWT_KEY, jwtStr)
    }
  }

  requestParams.header['X-WX-Skey'] = jwtStr
  return chain.proceed(requestParams)
}

