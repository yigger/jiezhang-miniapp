import React, { useContext, useState } from 'react'
import BasePage from '@/components/common/BasePage'
import Index from '../index'
import Statistic from '../statistic'
import Profile from '../profile'

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
  const [activeTab, setActiveTab] = useState(tabs[3])
  return (<>
    <BasePage
      withTabBar
      tabs={tabs}
      headerName={activeTab.name}
      activeTab={activeTab}
      switchTab={(tab) => setActiveTab(tab)}
    >
      { activeTab.page === 'index' && <Index /> }
      { activeTab.page === 'statistic' && <Statistic /> }
      { activeTab.page === 'asset' && <Statistic /> }
      { activeTab.page === 'profile' && <Profile /> }
    </BasePage>
  </>)
}