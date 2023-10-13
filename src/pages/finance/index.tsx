import { Component, useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import jz from '@/jz'

export default function Index () {
  const [headerData, setHeaderData] = useState({})
  const [assetList, setAssetList] = useState([])

  const getAssetList = async () => {
    const { data } = await jz.api.finances.index()
    console.log(data)
    setHeaderData(data.header)
    setAssetList(data.list)
  }

  useEffect(() => {
    getAssetList()
  }, [])

  return (
    <View className='jz-pages__finance'>
      
      <View className='jz-pages__finance-header'>
        <View>净资产：{headerData.net_worth}</View>
        <View>总资产：{headerData.total_asset}</View>
        <View>总负债：{headerData.total_liability}</View>  
      </View>

      {/* 资产列表 */}
      <View className='jz-pages__finance-list'>
        {
          assetList.map((asset) => {
            return (
              <View className='jz-pages__finance-list__item'>
                <View className='jz-pages__finance__child-total'>{asset.name}：{asset.amount}</View>
                {asset.childs.map(item => {
                  return (
                    <View className='p-3 jz-pages__finance__child-list d-flex flex-between '>
                      <View className='d-flex flex-center'>
                        <View className='mr-2 icon-image'>
                          <Image src={item.icon_path}></Image>
                        </View>
                        <View>{item.name}</View>
                      </View>
                      <View className='d-flex flex-center'>
                        <View>{item.amount}</View>
                      </View>
                    </View>
                  )
                })}
              </View>
            )
          })
        }
        


      </View>
    </View>
  )
}