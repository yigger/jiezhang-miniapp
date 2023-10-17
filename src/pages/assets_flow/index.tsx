import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtAccordion, AtList, AtListItem } from 'taro-ui'
import BasePage from '@/components/common/BasePage'
import jz from '@/jz'
import Statements from '@/components/Statements'
import { useDidShow } from '@tarojs/taro'

export default function AssetsFlow() {
  const [timelines, setTimelines] = useState([])
  const [headerData, setHeaderData] = useState({})
  const params = jz.router.getParams()

  useDidShow(() => {
    const asset_id = params.asset_id
    const getAssetDetail = async() => {
      const { data } = await jz.api.finances.getAssetDetail(asset_id)
      console.log(data)
      setHeaderData(data)
    }
    const getAssetTimeLine = async() => {
      const { data } = await jz.api.finances.getAssetTimeline(asset_id)
      setTimelines(data.data)
      console.log(data)
    }
    getAssetDetail()
    getAssetTimeLine()
  })

  const getAssetStatements = async (index: number, year: number, month: number) => {
    const assetId = params.asset_id
    const { data } = await jz.api.finances.getAssetStatements({ asset_id: assetId, year: year, month: month })
    setTimelines(prevTimelines => {
      const updatedTimelines = prevTimelines.map((timeline, i) => {
        if (i === index) {
          return {
            ...timeline,
            statements: data.data,
            hidden: !timeline.hidden
          };
        } else {
          return {
            ...timeline,
            hidden: true
          };
        }
      });
      return updatedTimelines;
    });
  }

  return (
    <BasePage
      headerName={headerData['name'] || '资金流水'}
    >
      <View>
        <View style='background-color: #fdfd82' className='p-4'>
          <View>余额：{headerData['surplus']}</View>
          <View className='d-flex mt-4 flex-between'>
            <View className='col-income'>总收入：{headerData['income']}</View>
            <View className='col-expend'>总支出：{headerData['expend']}</View>
          </View>
        </View>

        <View>
          <View className='jz-pages-assets-flow__index'>
            {
              timelines.map((timeline, index) => {
                return (
                  <View>
                    <View className="jz-pages-assets-flow__item d-flex flex-between p-2" onClick={() => getAssetStatements(index, timeline.year, timeline.month)}>
                      <View className="d-flex">
                        <View className="d-flex mr-2 flex-column text-align-right">
                          <Text>{ timeline.month }月</Text>
                          <Text>{ timeline.year }年</Text>
                        </View>
                        <View className='d-flex flex-column'>
                          <Text className="col-income">收入： { timeline.income_amount }</Text>
                          <Text className="col-expend">支出： { timeline.expend_amount }</Text>
                        </View>
                      </View>
                      <View className="d-flex col-text-mute text-align-right">
                        <View>
                          <View>{ timeline.surplus }</View>
                          <View>结余</View>
                        </View>
                        <View className={`iconfont fs-24 mt-2 mb-2 ${timeline.hidden ? 'jcon-arrow-right' : 'jcon-arrow-down' }`}></View>
                      </View>
                    </View>
                    { timeline.hidden === false && 
                      <View className='statements pl-4 pr-4'>
                        <Statements statements={timeline.statements}></Statements>
                      </View>
                    }
                    
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
    </BasePage>
  )
}