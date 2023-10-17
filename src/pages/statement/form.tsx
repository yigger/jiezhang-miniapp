import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import BasePage from '@/components/common/BasePage'
import ExpendForm from '@/components/statementForm/ExpendForm'
import IncomeForm from '@/components/statementForm/IncomeForm'
import TransferForm from '@/components/statementForm/TransferForm'
import RepaymentForm from '@/components/statementForm/RepaymentForm'
import { Tabs } from '@/src/common/components'
import jz from '@/jz'

const tabs = [
  { id: 1, title: '支出' },
  { id: 2, title: '收入' },
  { id: 3, title: '转账' },
  { id: 4, title: '还债' }
  // { id: 5, title: '借贷' },
  // { id: 6, title: '报销' },
  // { id: 7, title: '代付' }
]

const StatementForm: React.FC = () => {
  const params = jz.router.getParams()
  const [currentTab, setCurrentTab] = useState(1)
  const [statement, setStatement] = useState({})
  

  // NOTE: 因为创建和更新共用此模块，可以通过 componentType 进行区分
  const [componentType, setComponentType] = useState('create')

  const getStatementDetail = async (statementId: number) => {
    const { data } = await jz.api.statements.getStatement(statementId)
    console.log(data)
    setStatement(data)

    if (data.type === 'expend') {
      setCurrentTab(1)
    } else if (data.type === 'income') {
      setCurrentTab(2)
    } else if (data.type === 'transfer') {
      setCurrentTab(3)
    } else if (data.type === 'repayment') {
      setCurrentTab(4)
    }
  }

  useEffect(() => {
    const statementId = params.statement_id
    if (statementId) {
      setComponentType('update')
      getStatementDetail(statementId)
    }
  }, [])

  return (
    <BasePage
      headerName={componentType === 'create' ? '记一笔' : '更新账单'}
    >
      { componentType === 'create' && 
          <Tabs tabs={tabs}
            current={currentTab}
            onChange={(tabId) => {
              setCurrentTab(tabId) 
            }}
          />
      }
      <View>
        {
          (() => {
            switch(currentTab) {
              case 1: {
                return (<ExpendForm statement={statement} />)
              }
              case 2: {
                return (<IncomeForm statement={statement} />)
              }
              case 3: {
                return (<TransferForm statement={statement} />)
              }
              case 4: {
                return (<RepaymentForm statement={statement} />)
              }
            }
          })()
        }
      </View>
    </BasePage>
  )
}

export default StatementForm