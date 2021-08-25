## 新建页面的标准模版

```js
import { Component } from 'react'
import { View } from '@tarojs/components'
import BasePage from '@/components/common/BasePage'

export default function Demo () {
  return (
    <BasePage
      headerName='TabBar 的名称'
    >
      <View>
        主体内容
      </View>
    </BasePage>
  )
}
```