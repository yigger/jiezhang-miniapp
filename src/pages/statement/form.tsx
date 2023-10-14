import React from 'react'
import { View } from '@tarojs/components'
import BasePage from '@/components/common/BasePage'
import ExpendForm from '@/components/statementForm/ExpendForm'
import IncomeForm from '@/components/statementForm/IncomeForm'
import TransferForm from '@/components/statementForm/TransferForm'
import RepaymentForm from '@/components/statementForm/RepaymentForm'
import { Tabs } from '@/src/common/components'

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
        // { id: 5, title: '借贷' },
        // { id: 6, title: '报销' },
        // { id: 7, title: '代付' }
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
          <RepaymentForm />
        )
        break;
      }
    }

    return (
      <BasePage
        headerName='记一笔'
      >
        <Tabs
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