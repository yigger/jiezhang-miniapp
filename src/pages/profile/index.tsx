import { Component } from 'react'
import { View } from '@tarojs/components'
import jz from '@/jz'
import { useEffect } from 'react'
import { useState } from 'react'
import { differenceInDays } from 'date-fns'
import { Image } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import { Picker } from '@tarojs/components'

import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";

function UserInfo ({
  userInfo
}) {
  console.log(userInfo)
  return (
    <View className='user-info d-flex flex-center p-4'>
      <View className='jz-image-normal radius'>
        <Image src={userInfo.avatar_url}></Image>
      </View>

      <View className='username-and-desc flex-1 ml-2'>
        <View>{userInfo.name}</View>
        <View className='fs-14 col-text-mute'>
          今天是你在洁账的第 {differenceInDays(new Date(), new Date(userInfo.created_at))} 天，累计记账 {userInfo.statement_count} 笔
        </View>
      </View>
    </View>
  )
}

function Feature() {
  return (
    <View className='d-flex p-2'>
      <View className='flex-1 text-align-center'>
        <View className='iconfont jcon-search1' style='font-size: 21PX'></View>
        <View>搜索</View>
      </View>
      <View className='flex-1 text-align-center'>
        <View className='iconfont jcon-transaction' style='font-size: 21PX'></View>
        <View>流水</View>
      </View>
      <View className='flex-1 text-align-center'>
        <View className='iconfont jcon-piechart' style='font-size: 21PX'></View>
        <View>报表</View>
      </View>
      <View className='flex-1 text-align-center'>
        <View className='iconfont jcon-message' style='font-size: 21PX'></View>
        <View>消息通知</View>
      </View>
    </View>
  )
}



export default function Profile () {
  const [userInfo, setUserInfo] = useState({})
  const [version, setVersion] = useState('')
  const [themeName, setThemeName] = useState(jz.store.currentTheme.name)

  useEffect(() => {
    jz.api.users.getUserInfo().then((res) => {
      const { user, version } = res.data
      setUserInfo(user)
      setVersion(version)
    })
  }, [])

  function setTheme({ detail }) {
    const theme = jz.store.themes[detail.value]
    setThemeName(theme.name)
    jz.store.setTheme(theme)
  }

  return (
    <View className='jz-pages__profile'>
      <View>
        <UserInfo userInfo={userInfo}/>
        <Feature />
        <View style='height: 20PX; background: #F4F4F4'></View>

        <AtList>
          <Picker
            mode='selector'
            range={jz.store.themes.map((theme) => theme.name)}
            onChange={setTheme}
          >
            <AtListItem title='主题设置' extraText={themeName} arrow='right' />
          </Picker>
          <AtListItem title='账单图库' arrow='right' />
          <AtListItem title='设置资产分类' arrow='right' />
          <AtListItem title='支出分类管理' arrow='right' />
          <AtListItem title='收入分类管理' arrow='right' />
        </AtList>
      </View>

    </View>
  )
}