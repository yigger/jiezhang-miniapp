import { Component } from 'react'
import jz from './jz'

import 'taro-ui/dist/style/index.scss'

import './assets/fonts/index.styl'
import './assets/styl/index.styl'


class App extends Component {
  async onLaunch () {
    // console.log('onLaunch')
    jz.bootstrap({
      appid: 'appid',
      baseUrl: 'http://192.168.1.2/',
      apiUrl: 'http://192.168.1.2/api'
    })
    await jz.initialize()
  } 

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
