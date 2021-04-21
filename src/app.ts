import { Component } from 'react'
import './app.styl'
import jz from './jz'

class App extends Component {

  componentDidMount () {
    jz.bootstrap({
      appid: 'appid',
      baseUrl: 'http://jz.com',
      apiUrl: 'http://localhost:3000/api'
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
