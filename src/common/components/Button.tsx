import React from 'react'
import { Button as B } from '@tarojs/components'

export const Button = ({
  title,
  ...props
}) => {
  return (
    <B className='jz-common-components__button' {...props}>
      { title }
    </B>
  )
}