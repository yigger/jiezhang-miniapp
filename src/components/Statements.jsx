import React from 'react'
import { View } from '@tarojs/components'
import Statement from './Statement'

export default function Statements({ statements }) {
  return (
    <View className='pt-4 pb-4'>
      { statements.map((statement) => <Statement statement={statement}></Statement>) }
    </View>
  )
}