import React from 'react'
import { View, Image } from '@tarojs/components'

export default function Statement({ statement }) {
  return (
    <View className='d-flex mb-8 mt-8 ml-4 mr-4 flex-between flex-center'>
      <View className='d-flex flex-1 flex-center'>
        <View className='statement-component__icon-image'>
          <Image src={statement.icon_path}></Image>
        </View>
        <View className='flex-1 ml-6'>
          <View className='fs-28 col-text mb-1'>{statement.category}</View>
          <View className='fs-24 col-text-mute mb-1'>广东省深圳市xxx</View>
          <View className='fs-24 col-text-mute mb-1'>{statement.timeStr} {statement.asset}</View>
        </View>
      </View>
      <View className={`col-${statement.type} text-bold`}>{statement.money}</View>
    </View>
  )
}
