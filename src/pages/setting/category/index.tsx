import { Component, useEffect, useState, useContext } from 'react'
import { AtSwipeAction } from "taro-ui"
import { View, Image } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import BasePage from '@/components/common/BasePage'
import { Tabs, Button } from '@/src/common/components'
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
      {data.map((item) => (
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
            <View className='d-flex flex-between flex-center jz-border-bottom-1 p-2 w-100' onClick={() => {
              if (item.parent_id === 0) {
                jz.router.navigateTo({ url: `/pages/setting/category/index?id=${item.id}&type=${item.type}` })
              }
            }}>
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
  const params = jz.router.getParams()
  const [currentTab, setCurrentTab] = useState(1)
  const [listData, setListData] = useState([])
  const [type, setType] = useState(params.type || 'expend')

  // 设置 parentId，首次仅展示父任务
  let parentId = 0
  if (params && params.id) {
    parentId = params.id
  }

  // 获取列表
  const getCategories = () => {
    jz.api.categories.getSettingList({ type: type, parent_id: parentId }).then((res) => {
      setListData(res.data.categories)
    })
  }

  useEffect(() => {
    getCategories()
  }, [type, parentId])
  
  // 因为 useEffect 无法在每次页面渲染的时候重新请求 API，所以只能是用 useDidShow 的方式来达到 “创建分类后重新刷新列表”
  useDidShow(() => {
    getCategories()
  })

  const handleClick = async (e, categoryItem) => {
    if (e.text === '编辑') {
      jz.router.navigateTo({ url: `/pages/setting/category/form?id=${categoryItem.id}&type=${categoryItem.type}` })
    } else if (e.text === '删除') {
      const res = await jz.api.categories.deleteCategory(categoryItem.id)
      if (res.data && res.data.status === 200) {
        const deleteIndex = listData.findIndex((item) => item.id === categoryItem.id)
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
      headerName='账单分类管理'
    >
      {/* 子分类不需要展示切换按钮 */}
      { parentId === 0 && <Tabs
          tabs={tabs}
          current={currentTab}
          onChange={(value) => {
            setCurrentTab(value)
            setType(value === 2 ? 'income' : 'expend')
          }}
        />
      }

      <View className='jz-pages__settings-categories'>
        <List
          data={listData}
          handleClick={handleClick}
        />

        {parentId > 0 && listData.length === 0 && <View className='d-flex flex-center-center'>
            当前分类下还没添加子分类，请点击下方按钮进行创建
          </View>}
      </View>

      <Button 
        title={parentId > 0 ? '新增子分类' : '新增父分类'}
        onClick={() => {
          jz.router.navigateTo({ url: `/pages/setting/category/form?type=${type}&parentId=${parentId}` })
        }}
      />
    </BasePage>
  )
}