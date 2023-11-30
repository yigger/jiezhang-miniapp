import React, { useEffect, useState } from 'react'
import { useDidShow } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import jz from '@/jz'
import Statements from '@/components/Statements'
import { Button } from '@/src/common/components'
import { AtNoticebar } from 'taro-ui'

export default function Index() {
  const [header, setHeader] = useState({
    "bg_avatar": "",
    "has_no_read": false,
    "notice_bar_path": null,
    "notice_text": null,
    "position_1_amount": "0.00",
    "position_1_human_name": "今日支出",
    "position_2_amount": "0.00",
    "position_2_human_name": "本月支出",
    "position_3_amount": "0.00",
    "position_3_human_name": "预算剩余",
    "show_notice_bar": false
  })
  const [statements, setStatements] = useState([])

  const initIndexData = async function() {
    const [headerSt, statementSt] = await Promise.all([jz.api.main.header(), jz.api.main.statements()])
    if (headerSt.isSuccess) {
      setHeader(headerSt.data)
    }
    if (statementSt.isSuccess) {
      setStatements(statementSt.data)
    }
  }

  useEffect(() => {
    initIndexData()
  }, [])

  // 创建完毕后，返回首页需要重新拉取账单列表.
  useDidShow(() => jz.router.prev_routes.length > 0 && initIndexData())

  return (
    <View className='jz-pages__index'>
      <AtNoticebar>这是 NoticeBar 通告栏</AtNoticebar>
      <Header header={header}></Header>
      {/* <Button
        title='记一笔'
        onClick={() => {
          jz.router.navigateTo({ url: '/pages/statement/form' })
        }}
      /> */}
      <StatementList statements={statements}></StatementList>
    </View>
  )
}

function Header ({ header }) {
  return (
    <View className="jz-pages__index-header p-relative">
      {/* < 本月 > 左右允许切换上月，下月 */}

      <View className='row-item d-flex flex-between m-3'>
        <View className='row-content-block'>
          <View className='p-2'><Text>￥</Text><Text className='amount-item'>{header.position_1_amount}</Text></View>
          <View className='fs-12'>{header.position_1_human_name}</View>
        </View>

        <View className='row-content-block'>
          <View className='p-2'><Text>￥</Text><Text className='amount-item'>{header.position_2_amount}</Text></View>
          <View className='fs-12'>{header.position_2_human_name}</View>
        </View>
      </View>

      {/* <View className='row-item d-flex flex-between m-3'>
        预算列表。没想好。
      </View> */}

    </View>
    
  )
}

function StatementList ({ statements }) {
  return (
    <View className='m-3'>
      <View className='d-flex flex-between'>
        <View className='header-with-color-bottom'>账单列表</View>
        <View className='remark-statement-btn fs-12 d-flex flex-center' onClick={() => {
          jz.router.navigateTo({ url: '/pages/statement/form' })
        }}>+ 记一笔</View>
      </View>
      <Statements statements={statements}></Statements>
    </View>
  )
}
