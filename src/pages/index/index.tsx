import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'

// import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.styl'

export default class Index extends Component {

  componentDidMount () {
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        hello, world
      </View>
    )
  }
}
