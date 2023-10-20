import { Component, useContext } from 'react'
import { View } from '@tarojs/components'
import jz from '@/jz'
import { useEffect } from 'react'
import { useState } from 'react'
import { differenceInDays } from 'date-fns'
import { Image } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import { Picker } from '@tarojs/components'
import { BasePageContext } from '@/src/context/BasePageContext'

import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";

function UserInfo ({
  userInfo
}) {
  return (
    <View className='user-info d-flex flex-center p-4'>
      <View className='jz-image-normal radius'>
        <Image src={userInfo.avatar_url}></Image>
      </View>

      <View className='username-and-desc flex-1 ml-2'>
        <View>{userInfo.name}</View>
        <View className='fs-14 col-text-mute'>
          今天是你记账的第 {differenceInDays(new Date(), new Date(userInfo.created_at))} 天，累计记账共 {userInfo.persist} 笔
        </View>
      </View>
    </View>
  )
}

function Feature() {
  return (
    <View className='d-flex p-2'>
      <View className='flex-1 text-align-center' onClick={() => { jz.router.navigateTo({url: '/pages/setting/search/search'}) }}>
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
  // const []

  const themeContext = useContext(BasePageContext)
  // console.log(themeContext)

  useEffect(() => {
    // jz.api.account_books.getAccountBooks().then((res) => {
    //   console.log(res)
    // })

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
    console.log(theme.value)
    themeContext.actions.setTheme(theme.value)
  }

  return (
    <View className='jz-pages__profile'>
      <View>
        <UserInfo userInfo={userInfo}/>
        <Feature />
        <View style='height: 20PX; background: #F4F4F4'></View>

        <AtList>
          
          {/* <AtListItem title='我的账本' extraText='默认账本' arrow='right' /> */}
          {/* <AtListItem title='家人共享' extraText='正与 1 人共享' arrow='right' /> */}
          <AtListItem title='预算管理' arrow='right' />
          {/* <AtListItem title='账单图库' arrow='right' /> */}
          <AtListItem title='资产分类管理' arrow='right' onClick={() => jz.router.navigateTo({url: '/pages/setting/asset/index'})}/>
          <AtListItem title='账单分类管理' arrow='right' onClick={() => jz.router.navigateTo({url: '/pages/setting/category/index'})}/>
          <AtListItem title='意见反馈' arrow='right' />
          <Picker
            mode='selector'
            range={jz.store.themes.map((theme) => theme.name)}
            onChange={setTheme}
          >
            <AtListItem title='主题设置' extraText={themeName} />
          </Picker>
          <AtListItem title='关于洁账' extraText={version} />
        </AtList>
      </View>

    </View>
  )
}