import { View } from '@tarojs/components'
import React from 'react'

export const Button = ({ title }) => {
  return (
    <View className='jz-common-components__button'>
      { title }
    </View>
  )
}