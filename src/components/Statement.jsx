import React from 'react'
import { View, Image } from '@tarojs/components'

export default function Statement({ statement }) {
  return (
    <View className='d-flex mb-3 mt-3 flex-between flex-center'>
      <View className='d-flex flex-1 flex-center'>
        <View className='statement-component__icon-image'>
          <Image src={statement.icon_path}></Image>
        </View>
        <View className='flex-1 ml-2'>
          <View className='fs-16 col-text'>{statement.category}</View>
          { statement.description && (<View className='fs-12 col-text-mute'>{statement.description}</View> )}
          <View className='fs-12 col-text-mute'>{statement.timeStr} {statement.asset}</View>
        </View>
      </View>
      <View className={`col-${statement.type} text-bold`}>{statement.money}</View>
    </View>
  )
}
