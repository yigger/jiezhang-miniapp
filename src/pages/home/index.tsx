import React, { useContext, useState } from 'react'
import Root from '@/components/common/Root'
import { RootContext } from '@/src/context/RootContext'
import Index from '../index'
import Statistic from '../statistic'

export default function Home() {
  const [activeSection, setActiveSection] = useState('index')
  const rootContext = useContext(RootContext)
  return (<>
    <Root
      withTabBar
      // switchSection={({ page }) => setActiveSection(page)}
    >
      { rootContext.currentTab === 'index' && <Index /> }
      { rootContext.currentTab === 'statistic' && <Statistic /> }
    </Root>
  </>)
}