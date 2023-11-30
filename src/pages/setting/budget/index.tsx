import { Component, useContext, useState } from 'react'
import { View, Image, Button } from '@tarojs/components'
import jz from '@/jz'
import { useEffect } from 'react'
import BasePage from '@/components/common/BasePage'
import { AtProgress } from 'taro-ui'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"

export default function BudgetPage () {
  const [headerData, setHeaderData] = useState({})
  const [parentList, setParentList] = useState([])

  const getHeaderData = async () => {
    const { data } = await jz.api.budgets.getHeaderData()
    console.log(data)
    setHeaderData(data)
  }

  const getParentData = async () => {
    const { data } = await jz.api.budgets.getParentList()
    console.log(data)
    setParentList(data)
  }

  useEffect(() => {
    getHeaderData()
    getParentData()
  }, [])

  return (
    <BasePage
      headerName='预算管理'
    >
      <View className='jz-pages__budget'>
        <View className='header-banner p-4'>
          <View className='text-align-center'>
            <View>￥{headerData['amount']}</View>
            <View className='subtitle fs-12'>支出总预算</View>
          </View>

          <View className='d-flex flex-between p-4'>
            <View className='text-align-center flex-1'> <View>{headerData['used']}</View> <View className='fs-12'>当月已用</View> </View>
            <View className='text-align-center flex-1'> <View>{headerData['surplus']}</View> <View className='fs-12'>预算剩余</View> </View>
          </View>
        </View>

        <View className='content-box bg-color-fbfbfb'>
          { parentList.map((item) => {
            return (
              <View className='d-flex p-2 jz-border-bottom-1'>
                {/* 左侧 */}
                <View className='statement-component__icon-image'>
                  <Image src={item.icon_path}></Image>
                </View>
                {/* 右侧 */}
                <View className='flex-1 ml-2'>
                  <View className='d-flex flex-between col-text-mute'>
                    <View>{item['name']}</View>
                    <View>可用余额 {item['surplus']}</View>
                  </View>
                  <View className='mt-1 mb-1'><AtProgress percent={item.use_percent} isHidePercent={true}/></View>
                  <View className='col-text-mute fs-14'>支出预算 {item['amount']}</View>
                </View>
              </View>
            )
            }) 
          }
        </View>

        <AtModal isOpened>
          <AtModalHeader>标题</AtModalHeader>
          <AtModalContent>
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
          </AtModalContent>
          <AtModalAction> <Button>取消</Button> <Button>确定</Button> </AtModalAction>
        </AtModal>
      </View>

    </BasePage>
  )
}