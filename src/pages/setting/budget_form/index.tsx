
import { View } from '@tarojs/components'
import jz from '@/jz'
import { useEffect, useState } from 'react'
import BasePage from '@/components/common/BasePage'
import { AtInput }  from 'taro-ui'
import { Button } from '@/src/common/components'

export default function BudgetFormPage () {
  const [amount, setAmount] = useState(0)
  const params = jz.router.getParams()

  useEffect(() => {
    console.log(params)
  }, [])

  const submit = () => {
    if (params.id === 0) {
      jz.api.budgets.updateRootAmount({amount: amount})
    } else {
      jz.api.budgets.updateRootAmount({category_id: params.category_id, amount: amount})
    }

  }

  return (
    <BasePage
      headerName='预算设置'
    >
      <View className='jz-pages__budget'>
        <AtInput
          title="预算金额"
          name='value'
          type='number'
          placeholder='输入预算金额'
          value={amount}
          onChange={(value) => setAmount(value) }
        />
      </View>

      <Button title='提交' onClick={submit}></Button>

    </BasePage>
  )
}