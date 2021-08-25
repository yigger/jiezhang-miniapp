
import React from 'react'
import { View } from '@tarojs/components'

export const Tabs = ({
  tabs,
  current,
  onChange
}) => {
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