import { Component, useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import BasePage from '@/components/common/BasePage'

import jz from '@/jz'
import AssetBanner from '@/components/AssetBanner'
import Statements from '@/components/Statements'

const StatementFlow: React.FC = () => {
  const [firstColumn, setFirstColumn] = useState({})
  const [secColumn, setSecColumn] = useState({})
  const [thirdColumn, setThirdColumn] = useState({})
  const [statementRow, setStatementRow] = useState([])

  const getTimes = async () => {
    const {data} = await jz.api.superStatements.getTime()
    setFirstColumn({
      title: '结余',
      amount: data.data.header.left
    })
    setSecColumn({
      title: '收入',
      amount: data.data.header.income
    })
    setThirdColumn({
      title: '支出',
      amount: data.data.header.expend
    })
    setStatementRow(data.data.statements)
    console.log(data)
  }

  const getAssetStatements = async (index: number, year: number, month: number) => {
    const { data } = await jz.api.superStatements.getStatements({ year: year, month: month })
    setStatementRow(prevTimelines => {
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

  useEffect(() => {
    getTimes()
  }, [])

  return (
    <BasePage
      headerName='流水'
    >
      <View>
        <AssetBanner
          firstColumn={firstColumn}
          secColumn={secColumn}
          thirdColumn={thirdColumn}
        ></AssetBanner>

        <View>
          <View className='jz-pages-assets-flow__index'>
              {
                statementRow.map((row, index) => {
                  return (
                    <View>
                      <View className="jz-pages-assets-flow__item d-flex flex-between p-2" onClick={() => getAssetStatements(index, row.year, row.month)}>
                        <View className="d-flex">
                          <View className="d-flex mr-2 flex-column text-align-right">
                            <Text>{ row.month }月</Text>
                            <Text>{ row.year }年</Text>
                          </View>
                          <View className='d-flex flex-column'>
                            <Text className="col-income">收入： { row.income_amount }</Text>
                            <Text className="col-expend">支出： { row.expend_amount }</Text>
                          </View>
                        </View>
                        <View className="d-flex col-text-mute text-align-right">
                          <View>
                            <View>{ row.surplus }</View>
                            <View>结余</View>
                          </View>
                          <View className={`iconfont fs-24 mt-2 mb-2 ${row.hidden ? 'jcon-arrow-right' : 'jcon-arrow-down' }`}></View>
                        </View>
                      </View>
                      { row.hidden === false && 
                        <View className='statements pl-4 pr-4'>
                          <Statements statements={row.statements}></Statements>
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

export default StatementFlow