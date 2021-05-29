import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import BaseForm from './baseForm'

export default function ExpendForm() {
  // 提交的表单数据
  const [form, setForm] = useState({
    type: 'expend',
    amount: '0',
    category_id: 0,
    asset_id: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    time: format(new Date(), 'HH:mm'),
    description: ''
  })
  
  return (
    <BaseForm
      statementType='expend'
      form={form}
      setForm={setForm}
    />
  )
}
