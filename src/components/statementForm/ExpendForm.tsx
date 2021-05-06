import React from 'react'
import { View, Input, Picker } from '@tarojs/components'
import { Button } from '@/src/common/components'

const form = {
  type: 'expend',
  amount: 0,
}

export default class ExpendForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: form,
      modalActive: null
    }
  }

  render () {
    return (
      <View className='statement-form__expend-form'>
        <View className='f-column d-flex flex-between flex-center text-align-right p-4'>
          <View>金额</View>
          <View><Input type='text' value={this.state.form.amount} placeholder='0.00'></Input></View>
        </View>
  
        <View className='f-column d-flex flex-between flex-center text-align-right p-4'>
          <View>分类</View>
          <View>请输入分类</View>
        </View>
  
        <View className='f-column d-flex flex-between flex-center text-align-right p-4'>
          <View>资产</View>
          <View>请输入资产</View>
        </View>
  
        <View className='f-column d-flex flex-between flex-center text-align-right p-4'>
          <View>日期</View>
          <View>
            <Picker mode='date'>
              <View className='picker'>
                {/* {this.state.dateSel} */}
                2021-05-04
              </View>
            </Picker>
          </View>
        </View>
  
        <View className='f-column d-flex flex-between flex-center text-align-right p-4'>
          <View>时间</View>
          <View>
            <Picker mode='time'>
              <View className='picker'>
                21:16
              </View>
            </Picker>
          </View>
        </View>

        <View>
          <Button title='提交'></Button>
        </View>
      </View>
    )
  }
}