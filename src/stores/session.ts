import Taro from "@tarojs/taro"
class Session {

  get(key) {
    return Taro.getStorageSync(key)
  }

  set(key, value) {
    Taro.setStorageSync(key, value)
  }

  keyExist(key): Boolean {
    return !!Taro.getStorageSync(key)
  }
}

const session = new Session()

export default session