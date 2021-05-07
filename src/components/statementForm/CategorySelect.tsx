import React from 'react'
import { View, Image } from '@tarojs/components'
import jz from '@/jz'


function CategoryContent({ title, data, onHandle }) {
  return (
    <View className='category-select__content'>
      <View className='category-select__header'>{title}（{data.length}）</View>
      <View className='category-select__category-list'>
        {data.map((item) => {
          return (
            <View className='category-list__item' onClick={() => { onHandle(item) }}>
              <View><Image src={item.icon_path}></Image></View>
              <View>{item.name}</View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default class CategorySelect extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View className='statement-form__category-select'>
        <View className='category-select__main'>
          {/* 常用分类 */}
            <CategoryContent
              title='常用分类'
              data={this.props.frequent}
              onHandle={this.props.afterClick}
            />

            {/* 分类列表 */}
            { 
              this.props.data.map((item) => {
                return(
                  <CategoryContent
                    title={item.name}
                    data={item.childs}
                    onHandle={this.props.afterClick}
                  />
                )
              })
            }


        </View>
      </View>
    )
  }
}