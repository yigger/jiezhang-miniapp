import { Component } from 'react'
import './app.styl'
import jz from './jz'

class App extends Component {

  componentDidMount () {
    jz.setup({
      appid: 'appid',
      baseUrl: 'http://jz.com',
      apiUrl: 'http://localhost:3000/api'
    })

    const p1 = new Promise(function(resolve, reject) {
      jz.api.get('heartbeat')
      resolve(1)
    })
    
    const p2 = new Promise(function(resolve, reject) {
      jz.api.get('heartbeat')
      resolve(2)
    })

    const p3 = new Promise(function(resolve, reject) {
      jz.api.get('heartbeat')
      resolve(3)
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
