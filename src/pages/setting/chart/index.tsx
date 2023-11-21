import { Component, useEffect, useState } from 'react'
import { CoverView, View, Image, Picker } from '@tarojs/components'
import jz from '@/jz'
import BasePage from '@/components/common/BasePage'
import { format } from 'date-fns'

import { useRef } from 'react'
import Echarts from 'taro-react-echarts'
import echarts from '@/assets/echarts.js'
import { getExpendLineOption, getPieOption } from '@/utils/echart_option'
import Table from 'taro3-table'

const columns = [
  {
    title: '日期',
    dataIndex: 'date',
  },

  {
    title: '支出',
    dataIndex: 'expend',
  },

  {
    title: '收入',
    dataIndex: 'income'
  },
  {
    title: '累计支出',
    dataIndex: 'total_expend'
  },
  {
    title: '累计结余',
    dataIndex: 'total_surplus'
  }
];

const formatDate = (currentDate) => {
  const regex = /(\d{4})年(\d{1,2})月/;
  const match = regex.exec(currentDate);
  return { year: match[1], month: match[2] }
}

const echartCommonStyle = {
  'position': 'relative',
  'z-index': 0
}

const ChartIndex: React.FC = () => {
  // 图表引用对象
  const echartPie = useRef(null)
  const echartLine = useRef(null)

  const [pieOption, _] = useState({})

  const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy年MM月'))
  const [header, setHeader] = useState({})
  const fetchHeader = async (params) => {
    const {data} = await jz.api.superCharts.getHeader(params)
    setHeader(data.data)
  }

  // 变更日期的回调
  const changeDateCb = (detail) => {
    const dates = detail.value.split('-')
    const dateStr = `${dates[0]}年${dates[1]}月`
    setCurrentDate(dateStr)

    const date = formatDate(dateStr)
    fetchHeader(date)
    fetchPieChart(date)
    fetchLineChart(date)
    fetchCategoriesTop(date)
    fetchTableSumary(date)
  }
  
  // 设置饼图
  const fetchPieChart = async (params) => {
    const {data} = await jz.api.superCharts.getPieData(params)
    setTimeout(() => {
      const option = getPieOption(data.data.map((item) => {
        return {
          value: item.data,
          name: item.name
        }
      }))
      echartPie.current?.setOption(option)
    }, 600)
  }

  // 设置柱状图
  const fetchLineChart = async (date) => {
    const {data} = await jz.api.superCharts.getLineData({ year: date.year })
    setTimeout(() => {
      const option = getExpendLineOption(data)
      echartLine.current?.setOption(option)
    }, 600)
  }

  const [topCategories, setTopCategories] = useState([])
  const fetchCategoriesTop = async (date) => {
    const {data} = await jz.api.superCharts.getCategoriesTop({ year: date.year, month: date.month })
    setTopCategories(data.data)
  }

  const [dataSource, setDataSource] = useState([])
  const fetchTableSumary = async (date) => {
    const {data} = await jz.api.superCharts.getTableSumary({ year: date.year, month: date.month })
    setDataSource(data.data)
    console.log(data)
  }

  useEffect(() => {
    const date = formatDate(currentDate)
    fetchHeader(date)
    fetchPieChart(date)
    fetchLineChart(date)
    fetchCategoriesTop(date)
    fetchTableSumary(date)
  }, [])

  return (
    <BasePage
      headerName='消费报表'
    >
      <View className='setting-chart-page'>
        <View>
          <Picker
            mode='date'
            fields='month'
            value={currentDate}
            onChange={({detail}) => changeDateCb(detail) }
          >
            <View className='picker p-2 text-align-center fs-16'>
              { currentDate }
            </View>
          </Picker>
        </View>

        <View className='title'>收支总览</View>
        <View className='header p-2 d-flex flex-between mb-4'>
          <View className='column text-align-center'>
            <View className='col-expend fs-14'>￥{header['expend_count']}</View>
            <View>总支出</View>
            {/* <View className={`col-${ header.expend_rise }`}>同期{ header.expend_rise == 'income' ? '增长' : '下降' } { header.expend_percent }%</View> */}
          </View>

          <View className='column text-align-center'>
            <View className='col-income fs-14'>￥{header['income_count']}</View>
            <View>总收入</View>
            {/* <View className={`col-${ header.income_rise }`}>同期{ header.income_rise == 'income' ? '增长' : '下降' } { header.income_percent }%</View> */}
          </View>

          <View className='column text-align-center'>
            <View className='fs-14'>￥{header['surplus']}</View>
            <View>结余</View>
            {/* <View className={`col-${ header.surplus_rise }`}>同期{ header.surplus_rise == 'income' ? '增长' : '下降' } { header.surplus_percent }%</View> */}
          </View>
        </View>

        <View className='title'>消费分类占比</View>
        <View className='pie-echart bg-color-fbfbfb mb-4'>
          <Echarts
            echarts={echarts}
            option={pieOption}
            style={echartCommonStyle}
            onChartReady={(echartsInstance) =>echartPie.current = echartsInstance}
          ></Echarts>
        </View>

        <View className='title'>收入与支出</View>
        <View className='expend-line-echart bg-color-fbfbfb mb-4'>
          <Echarts
            echarts={echarts}
            option={pieOption}
            onChartReady={(echartsInstance) =>echartLine.current = echartsInstance}
          ></Echarts>
        </View>

        <View>
          <View className='title'>消费分类排行</View>
          <View className='top-rate bg-color-fbfbfb'>
            {
              topCategories.map((category, index) => {
                return (
                  <View className='item mt-2 mb-2 p-4 d-flex flex-between' style={`background-size: ${category.percent}% 100%;`}>
                    <View>
                      {index+1}. {category.name}
                    </View>
                    <View className='col-expend'>
                      ￥{category.format_amount}
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
        
        <View className='title'>每日消费一览</View>
        <View className='text-align-center d-flex flex-center-center'>
          <Table
            columns={columns}
            dataSource={dataSource}
            scroll={ {x:'true'} }
          />
        </View>

      </View>
    </BasePage>
  )
}

export default ChartIndex