import React, { useContext, useState } from 'react'
import Root from '@/components/common/Root'
import { RootContext } from '@/src/context/RootContext'
import Index from '../index'
import Statistic from '../statistic'

const tabs = [
  {
    page: 'index',
    name: '首页',
    icon: 'jcon-home-fill1'
  },
  {
    page: 'statistic',
    name: '统计',
    icon: 'jcon-piechart-circle-fil'
  },
  {
    page: 'asset',
    name: '资产',
    icon: 'jcon-accountbook-fill'
  },
  {
    page: 'profile',
    name: '我的',
    icon: 'jcon-account-fill'
  }
]

export default function Home() {
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (<>
    <Root
      withTabBar
      tabs={tabs}
      headerName={activeTab.name}
      activeTab={activeTab}
      switchTab={({ page }) => setActiveTab(page)}
    >
      { activeTab.page === 'index' && <Index /> }
      { activeTab.page === 'statistic' && <Statistic /> }
    </Root>
  </>)
}