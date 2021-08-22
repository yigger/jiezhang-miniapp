import {observable, observe, action} from 'mobx';
export default class Store {
  themes = [
    {
      name: '默认主题',
      value: 'default'
    },
    {
      name: '纯净白',
      value: 'pure'
    },
    {
      name: '樱花粉',
      value: 'pink'
    }
  ]

  // 初始化的默认主题
  // value: default, pink, pure
  @observable currentTheme = this.themes[2]

  setTheme(theme) {
    this.currentTheme = theme
  }
}