import React from 'react'
import { View, Image } from '@tarojs/components'

export default function CategorySelect({
  data,
  frequent,
  handleClick
}) {
  return (
    <View className='statement-form__category-select'>
      <View className='category-select__main'>
        {/* 常用分类 */}
          <CategoryContent
            title='常用分类'
            data={frequent}
            handleClick={handleClick}
          />

          {/* 分类列表 */}
          { 
            data.map((item) => {
              return(
                <CategoryContent
                  title={item.name}
                  data={item.childs}
                  handleClick={handleClick}
                />
              )
            })
          }
      </View>
    </View>
  )
}

function CategoryContent({ title, data, handleClick }) {
  return (
    <View className='category-select__content'>
      <View className='category-select__header'>{title}（{data.length}）</View>
      <View className='category-select__category-list'>
        {data.map((item) => {
          return (
            <View className='category-list__item' onClick={() => { handleClick(item) }}>
              <View><Image src={item.icon_path}></Image></View>
              <View>{item.name}</View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
