import React from 'react'
import { View, Image } from '@tarojs/components'
import { Loading } from '@/src/common/components'

export default function CategorySelect({
  title,
  data,
  frequent,
  handleClick,
  setActive,
  loading
}) {

  return (
    <View className='statement-form__category-select'>
      {/* 蒙板 */}
      <View className='category-select__mask' onClick={() => setActive(false)}></View>
      
      <View className='category-select__main'>
        <View className='category-select__main-title'>
          { title }
        </View>
        <View className='category-select__main-content'>
          {
            loading ? <Loading active={true} /> : (
              <>
                {
                  frequent 
                    && frequent.length > 0 
                    &&  <CategoryContent
                          title='常用分类'
                          data={frequent}
                          handleClick={handleClick}
                        />
                }

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
              </>
            )
          }
        </View>
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
            <View className='category-list__item' onClick={(e) => { handleClick(e, item) }}>
              <View><Image src={item.icon_path}></Image></View>
              <View>{item.name}</View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
