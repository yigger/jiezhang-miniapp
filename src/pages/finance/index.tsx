import { Component, useEffect, useState } from 'react'
import { useDidShow } from '@tarojs/taro'
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

  useDidShow(() => getAssetList())

  return (
    <View className='jz-pages__finance'>
      <View className='jz-pages__finance-header'>
        <View className='col-income'>净资产：{headerData.net_worth}</View>
        <View className='d-flex pt-4 pb-4 flex-between'>
          <View>总资产：{headerData.total_asset}</View>
          <View>总负债：{headerData.total_liability}</View>
        </View>
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
                    <View className='p-3 jz-pages__finance__child-list d-flex flex-between' onClick={() => { jz.router.navigateTo({ url: `/pages/assets_flow/index?asset_id=${item.id}` }) }}>
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