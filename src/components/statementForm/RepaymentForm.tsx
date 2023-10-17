import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import BaseAssetToAssetForm from './baseAssetToAssetForm'

export default function RepaymentForm({ statement }) {
  // // 提交的表单数据
  const [form, setForm] = useState({
    id: 0,
    type: 'repayment',
		amount: '0',
		from_asset_id: 0,
		to_asset_id: 0,
		date: format(new Date(), 'yyyy-MM-dd'),
    time: format(new Date(), 'HH:mm'),
    description: ''
  })

  useEffect(() => {
    if (statement.id) {
      setForm(statement)
    }
  }, [statement.id])
  
  return (
    <BaseAssetToAssetForm
      form={form}
      setForm={setForm}
    />
  )
}
