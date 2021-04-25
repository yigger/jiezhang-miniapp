import { Component } from 'react'
import './app.styl'
import jz from './jz'

import './assets/styl/index.styl'

class App extends Component {
  async onLaunch () {
    console.log('onLaunch')
    jz.bootstrap({
      appid: 'appid',
      baseUrl: 'http://192.168.3.2:3002',
      apiUrl: 'http://192.168.3.2:3002/api'
    })
    await jz.initialize()
  } 

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
