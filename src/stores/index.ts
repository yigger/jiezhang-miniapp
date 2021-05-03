import {observable, observe, action} from 'mobx';
export default class Store {

  @observable currentPageName: string = '首页'
  @observable themeClassName = 'default'

  
  setTheme(themeName) {
    this.themeClassName = themeName
  }
}