import React from 'react'
import { View } from '@tarojs/components'
import Statement from './Statement'

export default function Statements({ statements }) {
  return (
    <View>
      { statements.map((statement) => <Statement statement={statement}></Statement>) }
    </View>
  )
}