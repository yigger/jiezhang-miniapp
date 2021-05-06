import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import React from 'react'
import {observer} from "mobx-react"
import jz from '@/jz'

function RootHeader({ title }) {
  return (
    <View className='page-root__header-component'>
      <View className='header-title fs-16'>
        { title }
      </View>
    </View>
  )
}

function RootTabBar() {
  const headers = [
    {
      name: '首页',
      icon: 'jcon-home-fill1',
      active: true,
      redirectTo: '/pages/index/index'
    },
    {
      name: '统计',
      icon: 'jcon-piechart-circle-fil',
      active: false,
      redirectTo: '/pages/statistic/index'
    },
    {
      name: '资产',
      icon: 'jcon-accountbook-fill',
      active: false,
      redirectTo: '/pages/statistic/index'
    },
    {
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
              onClick={() => {
                Taro.redirectTo({ url: header.redirectTo })
              }}
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
@observer
class Root extends React.Component {
  private withHeader: boolean = true
  private withTabBar: boolean = false

  constructor(props) {
    super(props)
    if (typeof props.withHeader !== 'undefined') {
      this.withHeader = props.withHeader
    }
    this.withTabBar = !!props?.withTabBar
  }

  render () {
    return (
      <View className={`jz-theme-${jz.store.themeClassName}`}>
        <View className='page-root-component'>
          { this.withHeader
            && (<RootHeader
                  title={jz.store.currentPageName}
                />)
          }
          <View className='page-root__main-content'>
            {this.props.children}
          </View>
          { this.withTabBar && <RootTabBar /> }
        </View>
      </View>
    )
  }
}

export default Root