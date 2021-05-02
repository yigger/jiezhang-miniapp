import { Component } from 'react'
import jz from './jz'

import './assets/fonts/index.styl'
import './assets/styl/index.styl'

class App extends Component {
  async onLaunch () {
    console.log('onLaunch')
    jz.bootstrap({
      appid: 'appid',
      baseUrl: 'http://jz.com',
      apiUrl: 'http://jz.com/api'
    })
    await jz.initialize()
  } 

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
