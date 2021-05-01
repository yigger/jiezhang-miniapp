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
  return (
    <View className='page-root__tab-bar-component'>
      bottom
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