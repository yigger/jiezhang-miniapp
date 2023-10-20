import React from 'react'
import { View, Image } from '@tarojs/components'
import jz from '@/jz'

const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}

export default function Statement({ statement }) {
  

  return (
    <View className={`statement-component__item ${statement.type}`}>
      <View className='d-flex pb-3 pt-3 flex-between flex-center' onClick={() => { jz.router.navigateTo({ url: `/pages/statement_detail/index?statement_id=${statement.id}` }) }}>
        <View className='d-flex flex-1 flex-center'>
          <View className='statement-component__icon-image'>
            <Image src={statement.icon_path}></Image>
          </View>
          <View className='flex-1 ml-4'>
            <View className='fs-14 col-text pb-1'>{statement.category}</View>
            { statement.description && (<View className='fs-12 col-text-mute'>{statement.description}</View> )}
            <View className='fs-12 col-text-mute'>{isToday(statement.date) ? statement.time : statement.timeStr}</View>
          </View>
        </View>

        <View className='d-flex flex-center-center flex-column'>
          <View>{statement.money}</View>
          {/* <View className='fs-12 col-text-mute'>支出</View> */}
        </View>
      </View>
    </View>
  )
}
