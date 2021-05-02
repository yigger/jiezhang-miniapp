import { View } from '@tarojs/components'
import React from 'react'

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
      activeIcon: 'jcon-home-fill1',
      active: true
    },
    {
      name: '统计',
      icon: 'jcon-piechart-circle-fil',
      activeIcon: 'jcon-piechart-circle-fil',
      active: false
    },
    {
      name: '资产',
      icon: 'jcon-accountbook-fill',
      active: false
    },
    {
      name: '我的',
      icon: 'jcon-account-fill',
      active: false
    }
  ]

  return (
    <View className='page-root__tab-bar-component'>
      {
        headers.map((header) => {
          return (
            <View className={`d-flex flex-1 flex-column flex-center ${header.active ? 'active' : ''}`}>
              <View className={`iconfont fs-24 mt-2 mb-2 ${header.icon}`}></View>
              <View>{header.name}</View>
            </View>
          )
        })
      }
    </View>
  )
}

export default class Root extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <View className='jz-theme-default'>
        <View className='page-root-component'>
          <RootHeader
            title={this.props['header-title']}
          />
          <View className='page-root__main-content'>
            {this.props.children}
          </View>
          <RootTabBar></RootTabBar>
        </View>
      </View>
    )
  }
}