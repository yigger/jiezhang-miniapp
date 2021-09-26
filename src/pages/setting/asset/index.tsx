import { useState } from 'react'
import { AtSwipeAction } from "taro-ui"
import { View, Image } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import BasePage from '@/components/common/BasePage'
import { Button } from '@/src/common/components'
import jz from '@/jz'

import "taro-ui/dist/style/components/swipe-action.scss"

function List ({
  data,
  handleClick
}) {
  return (
    <View>
      {data.map((item) => (
        <View>
          <View className='d-flex flex-between p-2 col-text-mute' style="background: #fffedf;">
            <View>{item.name}</View>
            <View>+新增子资产</View>
          </View>
          {item.childs.map((child) => (
            <AtSwipeAction
              key={child.id}
              areaWidth={jz.systemInfo.screenWidth}
              maxDistance={150}
              onClick={(text) => handleClick(text, child) }
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
                    <Image src={child.icon_url}></Image>
                  </View>
                  <View className='pl-4'>{child.name}</View>
                </View>
                <View className={`col-${child.type}`}>
                  {child.amount}
                </View>
              </View>
            </AtSwipeAction>
          ))}
        </View>
      ))}
    </View>
  )
}

export default function AssetSetting () {
  const [listData, setListData] = useState([])

  // 获取列表
  const getAssets = () => {
    jz.api.assets.getSettingList().then((res) => {
      setListData(res.data)
    })
  }

  useDidShow(() => {
    getAssets()
  })

  const handleClick = async (e, assetItem) => {
    if (e.text === '编辑') {
      jz.router.navigateTo({ url: `/pages/setting/asset/form?id=${assetItem.id}` })
    } else if (e.text === '删除') {
      const res = await jz.api.categories.deleteCategory(assetItem.id)
      if (res.data && res.data.status === 200) {
        const deleteIndex = listData.findIndex((item) => item.id === assetItem.id)
        if (deleteIndex !== -1) {
          const data = [...listData]
          data.splice(deleteIndex, 1)
          setListData(data)
        }
      }
    }
  }

  return (
    <BasePage
      headerName='资产管理'
    >
      <List
        data={listData}
        handleClick={handleClick}
      />

      <Button 
        title='新增资产'
        onClick={() => {
          jz.router.navigateTo({ url: `/pages/setting/asset/form` })
        }}
      />
    </BasePage>
  )
}