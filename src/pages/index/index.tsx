import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import jz from '@/jz'

export default class Index extends Component {

  componentDidMount () {
    jz.api.statements.list()
  }

  Header () {
    return (
      <View className="jz-pages__index-header p-relative">
        <Image src="http://jz.com/covers/default-17.jpg"></Image>
        <View className="p-absolute p-bottom-0 p-left-0 col-pure-white w-100 pl-4 pr-4">
          <View className="mb-4">
            <View className='fs-32'>今日支出</View>
            <View className='fs-32 text-bold'>0.00</View>
          </View>
          <View className="d-flex flex-between w-100 mb-4">
            <View>本月支出 0.00</View>
            <View>预算剩余 5,400.00</View>
          </View>
        </View>
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
      <View>
        今日消费
      </View>
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
