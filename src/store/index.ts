import {observable, observe, action} from 'mobx';
export default class Store {
  @observable currentRouteName = '首页222'
  @observable themeClassName = 'default'

  @action
  setTheme(themeName) {
    this.themeClassName = themeName
  }
}