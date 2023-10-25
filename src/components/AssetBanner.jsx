import React from 'react'
import { View } from '@tarojs/components'

export default function AssetBanner({
  firstColumn={},
  secColumn={},
  thirdColumn={}
}) {
  return (
    <View className='asset-banner-component'>
      <View className='header p-4 m-4'>
        <View>
          <View className='fs-12'>{firstColumn['title']}</View>
          <View className='pt-2'>￥{firstColumn['amount']}</View>
        </View>
        <View className='d-flex fs-12 pt-4 pb-4 flex-between'>
          <View>{secColumn['title']} ￥{secColumn['amount']}</View>
          <View>{thirdColumn['title']} ￥{thirdColumn['amount']}</View>
        </View>
      </View>
    </View>
  )
}
