import { Component, useEffect, useState } from 'react'
import { useDidShow } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import jz from '@/jz'
import AssetBanner from '@/components/AssetBanner'

export default function Index () {
  const [assetList, setAssetList] = useState([])
  const [firstColumn, setFirstColumn] = useState({})
  const [secColumn, setSecColumn] = useState({})
  const [thirdColumn, setThirdColumn] = useState({})

  const getAssetList = async () => {
    const { data } = await jz.api.finances.index()
    setAssetList(data.list)
    setFirstColumn({
      title: '净资产',
      amount: data.header.net_worth
    })
    setSecColumn({
      title: '总资产',
      amount: data.header.total_asset
    })
    setThirdColumn({
      title: '总负债',
      amount: data.header.total_liability
    })
  }

  useEffect(() => {
    getAssetList()
  }, [])

  useDidShow(() => jz.router.prev_routes.length > 0 && getAssetList())

  return (
    <View className='jz-pages__finance'>
      
      <AssetBanner
        firstColumn={firstColumn}
        secColumn={secColumn}
        thirdColumn={thirdColumn}
      ></AssetBanner>

      {/* 资产列表 */}
      <View className='jz-pages__finance-list'>
        {
          assetList.map((asset) => {
            return (
              <View className='jz-pages__finance-list__item m-4'>
                <View className='jz-pages__finance__child-total'>{asset.name}：￥{asset.amount}</View>
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
                        <View>￥{item.amount}</View>
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