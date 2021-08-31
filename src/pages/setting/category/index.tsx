import { Component, useEffect, useState } from 'react'
import { AtSwipeAction } from "taro-ui"
import { View, Image } from '@tarojs/components'
import BasePage from '@/components/common/BasePage'
import { Tabs } from '@/src/common/components'
import jz from '@/jz'

import "taro-ui/dist/style/components/swipe-action.scss"

const tabs = [
  { id: 1, title: '支出' },
  { id: 2, title: '收入' }
]

function List ({
  data,
  handleClick
}) {
  return (
    <View>
      {data.map((item, index) => (
          <AtSwipeAction
            key={item.id}
            areaWidth={jz.systemInfo.screenWidth}
            maxDistance={150}
            onClick={(text) => handleClick(text, item) }
            options={[
              {
                text: '编辑',
                style: {
                  backgroundColor: '#6190E8'
                }
              },
              {
                text: '删除',
                style: {
                  backgroundColor: '#FF4949'
                }
              }
          ]}>
            <View className='d-flex flex-between flex-center jz-border-bottom-1 p-2 w-100'>
              <View className='d-flex flex-center'>
                <View className='jz-image-icon'>
                  <Image src={item.icon_url}></Image>
                </View>
                <View className='pl-4'>{item.name}</View>
              </View>
              <View className={`col-${item.type}`}>
                {item.amount}
              </View>
            </View>
        </AtSwipeAction>
      ))}
    </View>
  )
}

export default function CategorySetting () {
  const [currentTab, setCurrentTab] = useState(1)
  const [listData, setListData] = useState([])
  const [type, setType] = useState('expend')
  useEffect(() => {
    jz.api.categories.getSettingList({ type: type }).then((res) => {
      setListData(res.data.categories)
    })
  }, [type])
  
  function handleClick(e, categoryItem) {
    if (e.text === '编辑') {
      jz.router.navigateTo({ url: `/pages/setting/category/edit?id=${categoryItem.id}&type=${categoryItem.type}` })
    } else if (e.text === '删除') {
      console.log('删除')
    }
  }

  return (
    <BasePage
      headerName='账单分类管理'
    >
      <Tabs
        tabs={tabs}
        current={currentTab}
        onChange={(value) => {
          setCurrentTab(value)
          setType(value === 2 ? 'income' : 'expend')
        }}
      />
      <View className='jz-pages__settings-categories'>
        <List
          data={listData}
          handleClick={handleClick}
        />
      </View>
    </BasePage>
  )
}