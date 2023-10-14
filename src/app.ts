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
      baseUrl: 'http://172.23.234.143:3000',
      apiUrl: 'http://172.23.234.143:3000/api'
    })
    await jz.initialize()
  } 

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
