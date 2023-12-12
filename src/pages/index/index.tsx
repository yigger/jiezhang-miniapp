import React, { useEffect, useState, useContext } from 'react'
import { useDidShow } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import jz from '@/jz'
import Statements from '@/components/Statements'
import { Button } from '@/src/common/components'
import { AtProgress } from 'taro-ui'
import { HomeStoreContext } from "@/src/stores";
import { observer } from 'mobx-react';

const Index = observer(() => {
  const store: HomeStoreContext = useContext(HomeStoreContext);

  useEffect(() => {
    store.initHomeData()
  }, [])

  return (
    <View className='jz-pages__index'>
      {/* <AtNoticebar>这是 NoticeBar 通告栏</AtNoticebar> */}
      <Header header={store.indexHeader}></Header>
      <Button
        title='记一笔'
        onClick={() => {
          jz.router.navigateTo({ url: '/pages/statement/form' })
        }}
      />
      <StatementList statements={store.statements}></StatementList>
    </View>
  )
})

function Header ({ header }) {
  return (
    <View className="jz-pages__index-header p-relative">
      {/* < 本月 > 左右允许切换上月，下月 */}

      <View className='row-item d-flex flex-between m-4'>
        <View className='row-content-block'>
          <View className='p-2'><Text>￥</Text><Text className='amount-item'>{header['today_expend']}</Text></View>
          <View className='fs-12 col-text-mute'>今日支出</View>
        </View>

        <View className='row-content-block'>
          <View className='p-2'><Text>￥</Text><Text className='amount-item'>{header['month_expend']}</Text></View>
          <View className='fs-12 col-text-mute'>本月支出</View>
        </View>
      </View>

      <View className='budget-item m-4'>
        <View className='fs-14 col-text-mute'>预算剩余</View>
        <View className='mt-1 mb-1'><AtProgress percent={header['use_pencentage']}/></View>
        <View className='d-flex col-text-mute flex-between'>
          <View>已用：{header['month_expend']}</View>
          <View>总额：{header['month_budget']}</View>
        </View>
      </View>
    </View>
    
  )
}

function StatementList ({ statements }) {
  return (
    <View className='m-3'>
      <View className='d-flex flex-between'>
        <View className='header-with-color-bottom'>账单列表</View>
        {/* <View className='remark-statement-btn fs-12 d-flex flex-center' onClick={() => {
          jz.router.navigateTo({ url: '/pages/statement/form' })
        }}>+ 记一笔</View> */}
      </View>
      <Statements statements={statements}></Statements>
    </View>
  )
}

export default Index