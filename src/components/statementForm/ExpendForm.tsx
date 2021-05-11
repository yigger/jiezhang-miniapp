import React, { useState } from 'react'
import { View, Input, Picker } from '@tarojs/components'
import { Button } from '@/src/common/components'
import CategorySelect from './CategorySelect'
import jz from '@/jz'

export default function ExpendForm() {
  // 提交的表单数据
  const [form, setForm] = useState({
    type: 'expend',
    amount: '0',
    category_id: 0,
    asset_id: 0
  })
  const [categoryName, setCategoryName] = useState('请选择分类')
  const [assetName, setAssetName] = useState('请选择资产')
  const [categorySelectActive, setCategorySelectActive] = useState(false)
  const [assetSelectActive, setAssetSelectActive] = useState(false)
  const [selectLoading, setSelectLoading] = useState(false)
  const [categoryList, setCategoryList] = useState({
    frequent: [],
    data: []
  })
  const [assetList, setAssetList] = useState({
    frequent: [],
    data: []
  })

  // 选中分类后的 callback
  function handleCategoryItemClick (e, item) {
    console.log(item)
    setCategoryName(item.name)
    setForm(Object.assign(form, { category_id: item.id }))
    setCategorySelectActive(false)
  }

  // 选中资产后的 callback
  function handleAssetItemClick (e, item) {
    console.log(item)
    setAssetName(item.name)
    setForm(Object.assign(form, { asset_id: item.id }))
    setAssetSelectActive(false)
  }

  async function getCategories() {
    setCategorySelectActive(true)
    setSelectLoading(true)
    const st = await jz.api.statements.categoriesWithForm()
    if (st.isSuccess) {
      setCategoryList({ frequent: st.data.frequent, data: st.data.categories })
      setSelectLoading(false)
    }
  }

  async function  getAssets() {
    setAssetSelectActive(true)
    setSelectLoading(true)
    const st = await jz.api.statements.assetsWithForm()
    if (st.isSuccess) {
      setAssetList({ frequent: st.data.frequent, data: st.data.categories })
      setSelectLoading(false)
    }
  }

  return (
    <View>
      <View>
        <View className='statement-form__expend-form'>
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>金额</View>
              <View><Input type='text' value={form.amount} onInput={({ detail }) => { setForm(Object.assign(form, { amount: detail.value })) }} placeholder='0.00'></Input></View>
            </View>
          </View>
    
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>分类</View>
              <View onClick={getCategories}>{categoryName}</View>
            </View>
            <View className='statement-form__quick-select'>
              <View className='ui label'>日常用品</View>
              <View className='ui label'>一日三餐</View>
              <View className='ui label'>游戏</View>
            </View>
          </View>
    
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>资产</View>
              <View onClick={getAssets}>{assetName}</View>
            </View>
            <View className='statement-form__quick-select'>
              <View className='ui label'>建设银行</View>
              <View className='ui label'>微信支付</View>
              <View className='ui label'>支付宝</View>
            </View>
          </View>
    
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>日期</View>
              <View>
                <Picker mode='date'>
                  <View className='picker'>
                    2021-05-04
                  </View>
                </Picker>
              </View>
            </View>
          </View>
    
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>时间</View>
              <View>
                <Picker mode='time'>
                  <View className='picker'>
                    21:16
                  </View>
                </Picker>
              </View>
            </View>
          </View>

          <View>
            <Button title='提交'></Button>
          </View>
        </View>
      </View>

      {
        categorySelectActive && 
        (<CategorySelect
           title='分类选择'
           handleClick={handleCategoryItemClick}
           frequent={categoryList.frequent}
           data={categoryList.data}
           setActive={setCategorySelectActive}
           loading={selectLoading}
         />)
      }

      {
        assetSelectActive && 
        (<CategorySelect
           title='资产选择'
           handleClick={handleAssetItemClick}
           frequent={assetList.frequent}
           data={assetList.data}
           setActive={setAssetSelectActive}
           loading={selectLoading}
         />)
      }
    </View>
  )
}
