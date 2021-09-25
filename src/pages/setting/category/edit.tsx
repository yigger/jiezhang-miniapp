import { Component, useEffect, useState } from 'react'
import { View, Image, Picker } from '@tarojs/components'
import BasePage from '@/components/common/BasePage'
import jz from '@/jz'
import { AtInput, AtList, AtListItem, AtToast } from 'taro-ui'
import { Button } from '@/src/common/components'

import "taro-ui/dist/style/components/input.scss"
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/toast.scss";

function IconList({
  showMask = false,
  setShowMask,
  handleSelect
}) {
  const [iconList, setIconList] = useState([])
  useEffect(() => {
    jz.api.categories.getCategoryIcon().then((res) => {
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

export default function EditCategory () {
  const params = jz.router.getParams()
  const [category, setCategory] = useState({
    id: 0,
    name: '',
    parent_id: Number.parseInt(params.parentId) || 0,
    type: params.type,
    parent_name: '',
    icon_id: 0
  })
  const [showIconList, setShowIconList] = useState(false)
  
  useEffect(() => {
    if (params.id) {
      jz.api.categories.getCategoryDetail(params.id).then((res) => {
        setCategory(res.data)
      })
    }

    jz.api.categories.getSettingList({ type: params.type }).then((res) => {
      const data = res.data.categories.find((item) => item.id === Number.parseInt(params.parentId))
      if (data) {
        setCategory({...category, parent_name: data.name})
      }
    })
  }, [])

  const handleSubmit = async () => {
    const data = {
      name: category.name,
      parent_id: category.parent_id,
      icon_id: category.icon_id
    }

    let st
    if (category.id) {
      st = await jz.api.categories.updateCategory(category.id, { category: data })
    } else {
      st = await jz.api.categories.create({ category: { ...data, type: category.type }})
    }

    if (st.data.status === 200) {
      jz.router.navigateBack()
    } else {
      console.log(st)
    }
  }

  function handleIconSelect(icon) {
    setCategory(Object.assign(category, { icon_url: icon.url, icon_id: icon.id }))
  }

  return (
    <BasePage
      headerName={category.id === 0 ? `新增${category.type === 'income' ? '收入' : '支出'}分类` : `修改${category.type === 'income' ? '收入' : '支出'}分类`}
    >
      { category.id === 0 && category.parent_id > 0 && <View className='p-2'>在【{category.parent_name}】下创建子分类</View> }
      <View>
        <AtInput
          title='分类名称'
          type='text'
          placeholder='输入分类名称'
          value={category.name}
          onChange={(value) => {
            setCategory(Object.assign(category, {name: value}))
          }}
        />

        <View className='d-flex p-4 flex-center'>
          <View className='at-input__title'>图标</View>
          <View className='flex-1' onClick={() => setShowIconList(!showIconList)}>
            <View className='jz-image-icon'>
              <Image src={category.icon_url}></Image>
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