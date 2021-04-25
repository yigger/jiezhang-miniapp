import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import jz from '@/jz'

export default class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {
      "header": {
        "bg_avatar": "",
        "has_no_read": false,
        "notice_bar_path": null,
        "notice_text": null,
        "position_1_amount": "0.00",
        "position_1_human_name": "今日支出",
        "position_2_amount": "0.00",
        "position_2_human_name": "本月支出",
        "position_3_amount": "1.00",
        "position_3_human_name": "预算剩余",
        "show_notice_bar": false
      }
    }
  }

  async componentDidMount () {
    const st = await jz.api.main.header()
    this.setState({ header: st.data })
  }

  Header () {
    return (
      <View className="jz-pages__index-header p-relative">
        <Image src={this.state.header.bg_avatar}></Image>
        <View className="p-absolute p-bottom-0 p-left-0 col-pure-white w-100 pl-4 pr-4">
          <View className="mb-4">
            <View className='fs-32'>{this.state.header.position_1_human_name}</View>
            <View className='fs-32 text-bold'>{this.state.header.position_1_amount}</View>
          </View>
          <View className="d-flex flex-between w-100 mb-4">
            <View>{this.state.header.position_2_human_name} {this.state.header.position_2_amount}</View>
            <View>{this.state.header.position_3_human_name} {this.state.header.position_3_amount}</View>
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
