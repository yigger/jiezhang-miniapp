import { useEffect, useState } from "react"
import { View, Picker } from "@tarojs/components"
import { format } from 'date-fns'

import jz from '@/jz'
import { Button, Calculator } from '@/src/common/components'
import CategorySelect from './CategorySelect'

// 组件类型：转账或者还债，两种的模板是类似的，可以公用
export default function BaseAssetToAssetForm({
    componentType='transfer' 
}) {
	const [calculatorActive, setCalculatorActive] = useState(false)
	const [form, setForm] = useState({
		type: componentType,
		amount: '0',
		from_asset_id: 0,
		to_asset_id: 0,
		date: format(new Date(), 'yyyy-MM-dd'),
    time: format(new Date(), 'HH:mm'),
    description: ''
	})

	const [assetList, setAssetList] = useState({
    frequent: [],
    data: []
  })

  const [assetSelectActive, setAssetSelectActive] = useState(false)
  const [selectLoading, setSelectLoading] = useState(false)
	const [fromAssetName, setFromAssetName] = useState('请选择资产')
	const [toAssetName, setToAssetName] = useState('请选择资产')
	const [choseActiveAsset, setChoseActiveAsset] = useState('')

	// 选中资产后的 callback
	const handleAssetItemClick = (e, item) => {
		if (choseActiveAsset === 'from_asset_id') {
			setFromAssetName(item.name)
		} else {
			setToAssetName(item.name)
		}
		
		const newForm = { ...form }
		newForm[choseActiveAsset] = item.id
		setForm(newForm)
		setAssetSelectActive(false)
	}

	const getAssets = async (assetType) => {
    setAssetSelectActive(true)
    setSelectLoading(true)
		setChoseActiveAsset(assetType)
		
		var st
		if (componentType === 'repayment') {
			const type = assetType === 'from_asset_id' ? 'deposit' : 'debt'
			st = await jz.api.statements.assetsWithForm({ type: type })
		} else {
			st = await jz.api.statements.assetsWithForm()
		}

    if (st.isSuccess) {
      setAssetList({ frequent: st.data.frequent, data: st.data.categories })
      setSelectLoading(false)
    }
  }

	// 计算器的过程回调，用于实时显示输入
	const calculatorProcess = (process) => {
		setForm({...form, amount: process})
	}

	const calculatorSubmit = (result) => {
		setForm({...form, amount: result})
		setCalculatorActive(false)
	}

	const submit = async () => {
		form['from'] = form['from_asset_id']
		form['to'] = form['to_asset_id']

		if (form.amount === '0') {
      jz.toastError("金额还没填呢~")
      return false
    }

		if (Number(form['from_asset_id']) === 0 || Number(form['to_asset_id']) === 0) {
      jz.toastError("资产还没选呢~")
      return false
    }

		const { data } = await jz.api.statements.create(form)
		if(data.status === 200) {
			jz.router.navigateBack()
		} else {
			jz.toastError(data.msg)
		}
	}

	return (
		<View className="statement-form__transfer-form">
			<View className='f-column d-flex p-4 text-align-right flex-between flex-center' onClick={() => setCalculatorActive(true)}>
				<View>金额</View>
				<View>{form.amount}</View>
			</View>

			<View className="f-column d-flex p-4 flex-between">
				<View onClick={() => getAssets('from_asset_id')}>
					<View>{fromAssetName}</View>
				</View>

				<View>To</View>
				
				<View onClick={() => getAssets('to_asset_id')}>
					<View>{toAssetName}</View>
				</View>
			</View>

			<View>
				<View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
					<View>日期</View>
					<View>
						<Picker
							mode='date'
							value={form.date}
							onChange={({detail}) => setForm({ ...form, date: detail.value })}
						>
							<View className='picker'>
								{ form.date }
							</View>
						</Picker>
					</View>
				</View>
			</View>

			<View>
				<Button title='提交' onClick={submit}></Button>
			</View>

			{
        assetSelectActive && 
        (<CategorySelect
           title='资产选择'
           handleClick={handleAssetItemClick}
           frequent={assetList.frequent}
           data={assetList.data}
           setActive={setAssetSelectActive}
           loading={selectLoading}
         />)
      }

			{
        calculatorActive && 
        <Calculator
          setActive={setCalculatorActive}
          submitCallback={calculatorSubmit}
          processCallback={calculatorProcess}
          defaultNum={form.amount}
        />
      }
		</View>
	)
}