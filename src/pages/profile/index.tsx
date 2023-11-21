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
import commonAvatar from '@/assets/images/common-avatar.png'

import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";

const nowStr = () => {
  const now = new Date();
  const currentHour = now.getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return '早上好'
  } else if (currentHour >= 12 && currentHour < 18) {
    return '下午好'
  } else {
    return '晚上好'
  }
}


function UserInfo ({
  userInfo
}) {
  return (
    <View className='user-info m-4 p-4'>
      <View className='d-flex flex-center'>
        <View className='jz-image-normal radius'>
          <Image src={commonAvatar}></Image>
        </View>

        <View className='username-and-desc flex-1 ml-2'>
          <View className='fs-14 col-text-mute'>
            <View>{nowStr()}，今天是你记账的第 {differenceInDays(new Date(), new Date(userInfo.created_at))} 天</View>
            <View className='pt-2'>当前累计记账共 {userInfo.persist} 笔</View>
          </View>
        </View>
      </View> 

      <View className='feature d-flex mt-4 pt-4'>
        <View className='flex-1 text-align-center' onClick={() => { jz.router.navigateTo({url: '/pages/setting/search/search'}) }}>
          <View className='iconfont jcon-search1' style='font-size: 18PX'></View>
          <View className='fs-14'>搜索</View>
        </View>
        <View className='flex-1 text-align-center' onClick={() => { jz.router.navigateTo({url: '/pages/setting/statements_flow/index'}) }}>
          <View className='iconfont jcon-transaction' style='font-size: 18PX'></View>
          <View className='fs-14'>流水</View>
        </View>
        <View className='flex-1 text-align-center' onClick={() => { jz.router.navigateTo({url: '/pages/setting/chart/index'}) }}>
          <View className='iconfont jcon-piechart' style='font-size: 18PX'></View>
          <View className='fs-14'>报表</View>
        </View>
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
        

        <AtList className='fs-14'>
          
          {/* <AtListItem title='我的账本' extraText='默认账本' arrow='right' /> */}
          {/* <AtListItem title='家人共享' extraText='正与 1 人共享' arrow='right' /> */}
          <AtListItem title='预算管理' arrow='right' />
          {/* <AtListItem title='账单图库' arrow='right' /> */}
          <AtListItem title='资产管理' arrow='right' onClick={() => jz.router.navigateTo({url: '/pages/setting/asset/index'})}/>
          <AtListItem title='分类管理' arrow='right' onClick={() => jz.router.navigateTo({url: '/pages/setting/category/index'})}/>
          <AtListItem title='意见反馈' arrow='right' />
          {/* <Picker
            mode='selector'
            range={jz.store.themes.map((theme) => theme.name)}
            onChange={setTheme}
          >
            <AtListItem title='主题设置' extraText={themeName} />
          </Picker> */}
          <AtListItem title='关于洁账' extraText={version} />
        </AtList>
      </View>

    </View>
  )
}