import { Component, useEffect, useState } from 'react'
import { View, Image, Picker } from '@tarojs/components'
import BasePage from '@/components/common/BasePage'
import jz from '@/jz'
import { AtInput, AtForm, AtSwitch, AtList, AtListItem } from 'taro-ui'
import { Button } from '@/src/common/components'

import "taro-ui/dist/style/components/input.scss"
import "taro-ui/dist/style/components/switch.scss";
import "taro-ui/dist/style/components/list.scss";


// 图标选择器
function IconSelect() {
  return (
    <View>
      图标
    </View>
  )
}

export default function EditCategory () {
  const params = jz.router.getParams()
  const [category, setCategory] = useState({
    id: 0,
    name: '',
    parent_id: 0,
    type: params.type,
    parent_name: ''
  })
  const [showParentSelect, setShowParentSelect] = useState(category.parent_id === 0)
  const [parentSelect, setParentSelect] = useState([])
  
  useEffect(() => {
    jz.api.categories.getCategoryDetail(params.id).then((res) => {
      console.log(res.data)
      setCategory(res.data)
      setShowParentSelect(res.data.parent_id === 0)
    })

    jz.api.categories.getSettingList({ type: params.type }).then((res) => {
      setParentSelect(res.data.categories.map((item) => item.name))
    })
  }, [])

  function handleSubmit() {
    console.log(category)
  }
  

  return (
    <BasePage
      headerName='编辑'
    >
      <View>
      <AtForm
        onSubmit={handleSubmit}
      >
        <AtInput
          title='分类名称'
          type='text'
          placeholder='输入分类名称'
          value={category.name}
          onChange={(value) => {
            setCategory(Object.assign(category, {name: value}))
          }}
        />

        <AtSwitch title='是否一级分类' checked={showParentSelect} onChange={() => setShowParentSelect(!showParentSelect)} />
        
        {
          !showParentSelect && (<Picker mode='selector'
            range={parentSelect}
            // onChange={(e) => setParentSelect()}
          >
            <AtList>
              <AtListItem
                title='选择一级分类'
                extraText={category.parent_name}
              />
            </AtList>
          </Picker>)
        }

        <IconSelect></IconSelect>

        <Button
          title='保存'
          onClick={handleSubmit}
        />

      </AtForm>
      </View>
    </BasePage>
  )
}