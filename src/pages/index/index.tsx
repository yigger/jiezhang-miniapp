import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'

export default class Index extends Component {

  componentDidMount () {
    
  }

  Header () {
    return (
      <View className="jz-pages__index-header">
        今日支出
      </View>
    )
  }

  Budget () {
    return (
      <View>预算设置</View>
    )
  }

  StatementList () {
    return (
      <View>今日消费</View>
    )
  }

  render () {
    return (
      <View className='jz-pages__index'>
        {this.Header()}
        {this.Budget()}
        {this.StatementList()}
      </View>
    )
  }
}
