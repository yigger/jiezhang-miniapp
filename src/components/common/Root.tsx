import React, { useContext } from 'react'
import jz from '@/jz'
import { View } from '@tarojs/components'
import { RootContext } from '@/src/context/RootContext'

const RootHeader: React.FC = () => {
  const context = useContext(RootContext)
  return (
    <View className='page-root__header-component'>
      <View className='header-title fs-16'>
        { context.pageTitle }
      </View>
    </View>
  )
}

const RootTabBar: React.FC = ({
  switchSection
}) => {
  const headers = [
    {
      page: 'index',
      name: '首页',
      icon: 'jcon-home-fill1',
      active: true,
      redirectTo: '/pages/index/index'
    },
    {
      page: 'statistic',
      name: '统计',
      icon: 'jcon-piechart-circle-fil',
      active: false,
      redirectTo: '/pages/statistic/index'
    },
    {
      page: 'asset',
      name: '资产',
      icon: 'jcon-accountbook-fill',
      active: false,
      redirectTo: '/pages/statistic/index'
    },
    {
      page: 'profile',
      name: '我的',
      icon: 'jcon-account-fill',
      active: false,
      redirectTo: '/pages/statistic/index'
    }
  ]

  return (
    <View className='page-root__tab-bar-component'>
      {
        headers.map((header) => {
          return (
            <View
              className={`d-flex flex-1 flex-column flex-center ${header.active ? 'active' : ''}`}
              onClick={() => switchSection(header)}
            >
              <View className={`iconfont fs-24 mt-2 mb-2 ${header.icon}`}></View>
              <View>{header.name}</View>
            </View>
          )
        })
      }
    </View>
  )
}

const Root: React.FC = ({
  children,
  switchSection,
  withHeader = true,
  withTabBar = false,
}) => {
  const baseContext = useContext(RootContext)
  return (
    <RootContext.Provider value={baseContext}>
      <View className={`jz-theme-${jz.store.themeClassName}`}>
        <View className='page-root-component'>
          { withHeader && <RootHeader /> }
          <View className='page-root__main-content'>
            {children}
          </View>
          { withTabBar && <RootTabBar switchSection={switchSection}/> }
        </View>
      </View>
    </RootContext.Provider>
  )
}

export default Root