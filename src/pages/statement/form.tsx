import React from 'react'
import { View } from '@tarojs/components'
import BasePage from '@/components/common/BasePage'
import ExpendForm from '@/components/statementForm/ExpendForm'
import IncomeForm from '@/components/statementForm/IncomeForm'

function TabBar({ tabs, current, onChange }) {
  return (
    <View className='jz-common-components__tab d-flex'>
      {tabs.map((item) => {
        return (
          <View
            className={`item d-flex flex-center-center p-2 flex-1 ${current === item.id ? 'active' : ''}`}
            onClick={() => onChange(item.id)}
          >
            {item.title}
          </View>
        )
      })}
    </View>
  )
}

function TransferForm() {
  return (<View>转账</View>)
}

function DebtForm() {
  return (<View>还债</View>)
}

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTab: 1,
      tabs: [
        { id: 1, title: '支出' },
        { id: 2, title: '收入' },
        { id: 3, title: '转账' },
        { id: 4, title: '还债' }
      ]
    }
  }

  tabChange (tabId) {
    this.setState({ currentTab: tabId })
  }

  render() {
    let formComponent = null
    switch(this.state.currentTab) {
      case 1: {
        formComponent = (
          <ExpendForm />
        )
        break;
      }
      case 2: {
        formComponent = (
          <IncomeForm />
        )
        break;
      }
      case 3: {
        formComponent = (
          <TransferForm />
        )
        break;
      }
      case 4: {
        formComponent = (
          <DebtForm />
        )
        break;
      }
    }

    return (
      <BasePage
        headerName='记一笔'
      >
        <TabBar
          tabs={this.state.tabs}
          current={this.state.currentTab}
          onChange={this.tabChange.bind(this)}
        />
        <View>
          {formComponent}
        </View>
      </BasePage>
    )
  }
}