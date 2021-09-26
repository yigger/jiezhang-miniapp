import { useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import BasePage from '@/components/common/BasePage'
import jz from '@/jz'
import { AtInput } from 'taro-ui'
import { Button } from '@/src/common/components'

import "taro-ui/dist/style/components/input.scss"

function IconList({
  showMask = false,
  setShowMask,
  handleSelect
}) {
  const [iconList, setIconList] = useState([])
  useEffect(() => {
    jz.api.assets.getAssetIcon().then((res) => {
      setIconList(res.data)
    })
  }, [])

  if (!showMask) {
    return null
  }
  
  return (
    <View className='jz-mask__main'>
      <View className='jz-mask' onClick={() => setShowMask(!showMask)}></View>
      <View className='jz-mask__body'>
        <View className='icon-list__body'>
          {iconList.map((icon) => {
            return (
              <View className='jz-image-icon d-iblock m-4' onClick={() => {
                setShowMask(!showMask)
                handleSelect(icon)
              }}>
                <Image src={icon.url}></Image>
              </View>
            ) 
          })}
        </View>
      </View>
    </View>
  )
}

export default function EditAsset () {
  const params = jz.router.getParams()
  const [asset, setAsset] = useState({
    id: 0,
    name: '',
    amount: 0,
    parent_name: '',
    icon_id: 0
  })
  const [showIconList, setShowIconList] = useState(false)
  
  useEffect(() => {
    if (params.id) {
      jz.api.assets.getAssetDetail(params.id).then((res) => {
        setAsset(res.data)
      })
    }

    // jz.api.categories.getSettingList({ type: params.type }).then((res) => {
    //   const data = res.data.categories.find((item) => item.id === Number.parseInt(params.parentId))
    //   if (data) {
    //     setCategory({...category, parent_name: data.name})
    //   }
    // })
  }, [])

  const handleSubmit = async () => {
    // const data = {
    //   name: category.name,
    //   parent_id: category.parent_id,
    //   icon_id: category.icon_id
    // }

    // let st
    // if (category.id) {
    //   st = await jz.api.categories.updateCategory(category.id, { category: data })
    // } else {
    //   st = await jz.api.categories.create({ category: { ...data, type: category.type }})
    // }

    // if (st.data.status === 200) {
    //   jz.router.navigateBack()
    // } else {
    //   console.log(st)
    //   jz.toastError(st.data.msg)
    // }
  }

  function handleIconSelect(icon) {
    setAsset(Object.assign(asset, { icon_url: icon.url, icon_id: icon.id }))
  }

  return (
    <BasePage
      headerName={asset.id === 0 ? '新增资产' : '编辑资产'}
    >
      <View>
        <AtInput
          title='资产名称'
          type='text'
          placeholder='输入资产名称'
          value={asset.name}
          onChange={(value) => {
            setAsset(Object.assign(asset, {name: value}))
          }}
        />

        <AtInput
          title='资产余额'
          type='digit'
          placeholder='输入资产余额'
          value={asset.amount}
          onChange={(value) => {
            setAsset(Object.assign(asset, {amount: value}))
          }}
        />

        

        <View className='d-flex p-4 flex-center'>
          <View className='at-input__title'>图标</View>
          <View className='flex-1' onClick={() => setShowIconList(!showIconList)}>
            <View className='jz-image-icon'>
              <Image src={asset.icon_url}></Image>
            </View>
          </View>
        </View>

        <Button
          title='保存'
          onClick={handleSubmit}
        />

        <IconList
          showMask={showIconList}
          setShowMask={setShowIconList}
          handleSelect={handleIconSelect}
        ></IconList>
      </View>
    </BasePage>
  )
}