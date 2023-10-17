import { Component, useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import jz from '@/jz'
import BasePage from '@/components/common/BasePage'
import { Button } from '@/src/common/components'

type StatementDetail = {
  id: number;
  amount: number;
  asset: string;
  category: string;
  category_icon: string;
  description: string;
  location: string | null;
  residue: string;
  target_asset_id: number;
  time: string;
  title_category: string;
  type: string;
  upload_files: Array<string>;
}

const initialStatement: StatementDetail = {
  'id': 0,
  'amount': 0,
  'asset': "",
  'category': "",
  'category_icon': "",
  'description': "",
  'location': null,
  'residue': "",
  'target_asset_id': 0,
  'time': "",
  'title_category': "",
  'type': "",
  'upload_files': []
}

const StatementDetail: React.FC = () => {
  const params = jz.router.getParams()
  const [statement, setStatement] = useState(initialStatement)

  const getStatementDetail = async () => {
    const statementId = params.statement_id
    const { data } = await jz.api.statements.getDetail(statementId)
    setStatement(data)
  }

  const deleteStatement = async (statementId: number) => {
    await jz.confirm("是否删除该条账单？")
    await jz.api.statements.deleteStatement(statementId)
    jz.router.navigateBack()
  }

  useEffect(() => {
    getStatementDetail()
  }, [])

  return (
    <BasePage
      headerName='账单详情'
    >
      <View className='jz-pages__statement-detail p-4'>

        <View className='row-item d-flex flex-between'>
          <View className='d-flex flex-center-center'>
            <View className='statement-component__icon-image'>
              <Image src={statement.category_icon}></Image>
            </View>
            <View>{statement.title_category}</View>
          </View>
          <View className={`d-flex flex-center-center fs-18 col-${statement.type}`}>{ statement.amount }</View>
        </View>

        <View className='row-item d-flex flex-between'>
          <View className='d-flex flex-center-center'>
            <View className='iconfont jcon-icon-fenlei' style='font-size: 21PX'></View>
            <View>分类</View>
          </View>
          <View>{ statement.category }</View>
        </View>

        <View className='row-item d-flex flex-between'>
          <View className='d-flex flex-center-center'>
            <View className='iconfont jcon-icon-fenlei' style='font-size: 21PX'></View>
            <View>账户</View>
          </View>
          <View>{ statement.asset }</View>
        </View>

        <View className='row-item d-flex flex-between'>
          <View className='d-flex flex-center-center'>
            <View className='iconfont jcon-icon-fenlei' style='font-size: 21PX'></View>
            <View>使用后账户余额</View>
          </View>
          <View>{ statement.residue }</View>
        </View>

        <View className='row-item d-flex flex-between'>
          <View className='d-flex flex-center-center'>
            <View className='iconfont jcon-icon-fenlei' style='font-size: 21PX'></View>
            <View>时间</View>
          </View>
          <View>{ statement.time }</View>
        </View>

        <View className='row-item d-flex flex-between'>
          <View className='d-flex flex-center-center'>
            <View className='iconfont jcon-icon-fenlei' style='font-size: 21PX'></View>
            <View>描述</View>
          </View>
          <View>{ statement.description || '未填' }</View>
        </View>

        <View className='row-item d-flex flex-between'>
          <View className='d-flex flex-center-center'>
            <View className='iconfont jcon-icon-fenlei' style='font-size: 21PX'></View>
            <View>关联图片</View>
          </View>
          <View>{ statement.upload_files?.map((image) => {<Image src={image}></Image>}) }</View>
        </View>


        <View className='mt-4'>
          <Button
            title='编辑'
            className='primary'
            onClick={() => {
              jz.router.navigateTo({ url: `/pages/statement/form?statement_id=${statement.id}` })
            }}
          />
        </View>
        
        <View className='mt-4'>
          <Button
            title='删除'
            className='dangerous'
            onClick={() => deleteStatement(statement.id) }
          />
        </View>



      </View>
      
    </BasePage>
  )
}

export default StatementDetail;