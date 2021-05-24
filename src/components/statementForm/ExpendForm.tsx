import React, { useEffect, useState } from 'react'
import { View, Input, Picker, Text } from '@tarojs/components'
import { Button, Calculator } from '@/src/common/components'
import CategorySelect from './CategorySelect'
import jz from '@/jz'
import { format } from 'date-fns'

export default function ExpendForm() {
  // 提交的表单数据
  const [form, setForm] = useState({
    type: 'expend',
    amount: '0',
    category_id: 0,
    asset_id: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    time: format(new Date(), 'hh:mm'),
  })
  const [categoryName, setCategoryName] = useState('请选择分类')
  const [assetName, setAssetName] = useState('请选择资产')
  const [categorySelectActive, setCategorySelectActive] = useState(false)
  const [assetSelectActive, setAssetSelectActive] = useState(false)
  const [selectLoading, setSelectLoading] = useState(false)
  const [calculatorActive, setCalculatorActive] = useState(false)
  const [categoryList, setCategoryList] = useState({
    frequent: [],
    data: []
  })
  const [assetList, setAssetList] = useState({
    frequent: [],
    data: []
  })
  const [categoryFrequent, setCategoryFrequent] = useState([])
  const [assetFrequent, setAssetFrequent] = useState([])

  useEffect(() => {
    // 初始化常用资产
    jz.api.statements.assetFrequent().then((res) => {
      console.log(res.data)
      setAssetFrequent(res.data)
    })
    // 初始化常用分类
    jz.api.statements.categoryFrequent().then((res) => {
      setCategoryFrequent(res.data)
    })
  }, [])

  // 选中分类后的 callback
  const handleCategoryItemClick = (e, item) => {
    console.log(item)
    setCategoryName(item.name)
    setForm({ ...form, category_id: item.id })
    setCategorySelectActive(false)
  }

  // 选中资产后的 callback
  const handleAssetItemClick = (e, item) => {
    console.log(item)
    setAssetName(item.name)
    setForm({ ...form, asset_id: item.id })
    setAssetSelectActive(false)
  }

  const getCategories = async () => {
    setCategorySelectActive(true)
    setSelectLoading(true)
    const st = await jz.api.statements.categoriesWithForm()
    if (st.isSuccess) {
      setCategoryList({ frequent: st.data.frequent, data: st.data.categories })
      setSelectLoading(false)
    }
  }

  const getAssets = async () => {
    setAssetSelectActive(true)
    setSelectLoading(true)
    const st = await jz.api.statements.assetsWithForm()
    if (st.isSuccess) {
      setAssetList({ frequent: st.data.frequent, data: st.data.categories })
      setSelectLoading(false)
    }
  }

  // 计算器的过程回调
  const calculatorProcess = (process) => {
    setForm({...form, amount: process})
  }

  const calculatorSubmit = (result) => {
    console.log(result)
    setForm({...form, amount: result})
    setCalculatorActive(false)
  }

  const submit = () => {

  }

  return (
    <View>
      <View>
        <View className='statement-form__expend-form'>
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center' onClick={() => setCalculatorActive(true)}>
              <View>金额</View>
              <View>{form.amount}</View>
            </View>
          </View>
    
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>分类</View>
              <View onClick={getCategories}>{categoryName}</View>
            </View>
              {
                categoryFrequent.length > 0 ? 
                (<View className='statement-form__quick-select'>
                  <Text className='col-text-mute'>快捷筛选：</Text>
                  {
                    categoryFrequent.map((item) => {
                      return <View className='ui label' onClick={(e) => handleCategoryItemClick(e, item)}>{item.name}</View>
                    })
                  }
                </View>) : null
              }
          </View>
    
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>资产</View>
              <View onClick={getAssets}>{assetName}</View>
            </View>
            {
              assetFrequent.length > 0 ? 
              (<View className='statement-form__quick-select'>
                <Text className='col-text-mute'>快捷筛选：</Text>
                {
                  assetFrequent.map((item) => {
                    return <View className='ui label' onClick={(e) => handleAssetItemClick(e, item)}>{item.name}</View>
                  })
                }
              </View>) : null
            }
          </View>
    
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>日期</View>
              <View>
                <Picker
                  mode='date'
                  value={form.date}
                  onChange={({detail}) => setForm({ ...form, date: detail.value })}
                >
                  <View className='picker'>
                    { form.date }
                  </View>
                </Picker>
              </View>
            </View>
          </View>
    
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>时间</View>
              <View>
                <Picker
                  mode='time'
                  value={form.time}
                  onChange={({detail}) => setForm({ ...form, time: detail.value })}
                >
                  <View className='picker'>
                    { form.time }
                  </View>
                </Picker>
              </View>
            </View>
          </View>

          <View>
            <Button title='提交' onClick={submit}></Button>
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

      {
        calculatorActive && 
        <Calculator
          setActive={setCalculatorActive}
          submitCallback={calculatorSubmit}
          processCallback={calculatorProcess}
          defaultNum={form.amount}
        />
      }
    </View>
  )
}
