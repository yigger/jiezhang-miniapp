import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'

// import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.styl'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View className=''>
          <View>距离下个结算日剩余 21 天</View>
          <View>默认账单本月支出</View>
        </View>
        <View>
          本月预算
        </View>
        <View>
          我的账单
        </View>
      </View>
    )
  }
}
