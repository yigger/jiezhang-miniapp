import { Component } from 'react'
import { View } from '@tarojs/components'
import Root from '@/components/common/Root'

export default class Index extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Root header-title='统计'>
        <View className='jz-pages__statistic'>
          新页面
        </View>
      </Root>
    )
  }
}
