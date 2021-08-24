import React, { useContext } from 'react'
import jz from '@/jz'
import { View } from '@tarojs/components'
import { BasePageContext, context } from '@/src/context/BasePageContext'
import { observer } from 'mobx-react';

const RootHeader: React.FC = ({
  headerName
}) => {
  const headerStyle = {
    paddingTop: jz.systemInfo.statusBarHeight,
    height: jz.systemInfo.statusBarHeight + 46
  }

  return (
    <View className='page-root__header-component' style={headerStyle}>
      { jz.router.prevExist()
         && <View onClick={() => jz.router.navigateBack()} className='iconfont fs-24 mt-2 mb-2 jcon-leftarrow'></View> }
      <View className='header-title fs-16'>
        {headerName}
      </View>
    </View>
  )
}

const RootTabBar: React.FC = ({
  switchTab,
  activeTab,
  tabs
}) => {
  return (
    <View className='page-root__tab-bar-component'>
      {
        tabs.map((header) => {
          return (
            <View
              className={`d-flex flex-1 flex-column flex-center ${header.page === activeTab.page ? 'active' : ''}`}
              onClick={() => switchTab(header)}
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

const BasePage: React.FC = observer(
  ({
  children,
  switchTab,
  headerName,
  tabs,
  activeTab,
  withHeader = true,
  withTabBar = false,
}) => {
  const pageStyle = {
    paddingTop: jz.systemInfo.statusBarHeight + 46
  }
  const val = context()
  return (
    <BasePageContext.Provider value={val}>
      <View className={`jz-theme-${val.data.theme}`}>
        <View className='page-root-component' style={pageStyle}>
          {/* 顶部 */}
          { withHeader && <RootHeader headerName={headerName} /> }
          {/* 主体内容区域 */}
          <View className='page-root__main-content'>
            {children}
          </View>
          {/* TabBar 部分 */}
          { withTabBar &&
            <RootTabBar
              tabs={tabs}
              activeTab={activeTab}
              switchTab={switchTab}
              />
          }
        </View>
      </View>
    </BasePageContext.Provider>
  )
})

export default BasePage