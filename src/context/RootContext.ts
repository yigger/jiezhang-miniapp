import React from 'react'
export const RootContext = React.createContext({
  pageTitle: '首页',
  currentTab: 'index',
  theme: '',
  setCurrentTab: () => {}
});

