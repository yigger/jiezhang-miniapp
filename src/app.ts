import { Component } from 'react'
import './app.styl'
import jz from './jz'

class App extends Component {

  componentDidMount () {
    jz.bootstrap({
      appid: 'appid',
      baseUrl: 'http://192.168.3.2:3002',
      apiUrl: 'http://192.168.3.2:3002/api'
    })
    jz.api.statements.list()
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
