import { Component, useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import BasePage from '@/components/common/BasePage'
import { Tabs } from '@/src/common/components'
import jz from '@/jz'

const tabs = [
  { id: 1, title: '支出' },
  { id: 2, title: '收入' }
]

function List ({
  data
}) {
  return (
    <View>
      {
        data.map((item) => {
          return (
            <View className='d-flex flex-between flex-center jz-border-bottom-1 p-2'>
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
          )
        })
      }
    </View>
  )
}

export default function AssetSetting () {
  const [currentTab, setCurrentTab] = useState(1)
  const [listData, setListData] = useState([])
  const [type, setType] = useState('expend')
  useEffect(() => {
    jz.api.categories.getSettingList({ type: type }).then((res) => {
      setListData(res.data.categories)
    })
  }, [type])
  console.log(listData)

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
      <View>
        <List
          data={listData}
        />
      </View>
    </BasePage>
  )
}