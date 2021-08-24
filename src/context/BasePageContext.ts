import React, { useState } from 'react'

export const context = () => {
  const [theme, setTheme] = useState('black')

  return {
    data: {
      theme
    },
    actions: {
      setTheme
    }
  }
}

export const BasePageContext = React.createContext({
  data: {
    theme: ''
  },
  actions: {
    setTheme: () => {}
  }
});

