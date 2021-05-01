import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import jz from '@/jz'
import Statements from '@/components/Statements'
import Root from '@/components/common/Root'

function Budget () {
  return (
    <View>预算设置</View>
  )
}

function Header ({ header }) {
  return (
    <View className="jz-pages__index-header p-relative">
      <Image src={header.bg_avatar}></Image>
      <View className="p-absolute p-bottom-0 p-left-0 col-pure-white w-100 pl-4 pr-4">
        <View className="mb-4">
          <View className='fs-18'>{header.position_1_human_name}</View>
          <View className='fs-18 text-bold'>{header.position_1_amount}</View>
        </View>
        <View className="d-flex flex-between w-100 mb-4">
          <View>{header.position_2_human_name} {header.position_2_amount}</View>
          <View>{header.position_3_human_name} {header.position_3_amount}</View>
        </View>
      </View>
    </View>
  )
}

function StatementList ({ statements }) {
  return (
    <View>
      <View className='header-with-color-bottom'>今日消费</View>
      <Statements statements={statements}></Statements>
    </View>
  )
}

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
        "position_3_amount": "0.00",
        "position_3_human_name": "预算剩余",
        "show_notice_bar": false
      },
      "statements": []
    }
  }

  async componentDidMount () {
    const [headerSt, statementSt] = await Promise.all([jz.api.main.header(), jz.api.main.statements()])
    if (headerSt.isSuccess) {
      this.setState({header: headerSt.data})
    }
    if (statementSt.isSuccess) {
      this.setState({statements: statementSt.data})
    }
  }

  render () {
    return (
      <Root
        header-title='首页'
      >
        <View className='jz-pages__index'>
          <Header header={this.state.header}></Header>
          <Budget></Budget>
          <StatementList statements={this.state.statements}></StatementList>
        </View>
      </Root>
    )
  }
}
