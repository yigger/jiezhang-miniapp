import Taro from '@tarojs/taro'
export default class Router {
  private _routes: Array<string>
  // private _names: Array<string>

  constructor () {
    this._routes = []
  }

  getParams() {
    return Taro.getCurrentInstance().router.params
  }

  navigateTo ({ url, name = '' }) {
    this._routes.push(url)
    Taro.navigateTo({ url })
  }

  redirectTo ({ url }) {
    this._routes = []
    Taro.redirectTo({ url })
  }

  navigateBack () {
    if (this.prevExist) {
      this._routes.pop()
      Taro.navigateBack()
    } else {
      console.error('没有上一级页面')
    }
  }

  prevExist () {
    return this._routes.length > 0
  }

  get routes () {
    return this._routes
  }
}