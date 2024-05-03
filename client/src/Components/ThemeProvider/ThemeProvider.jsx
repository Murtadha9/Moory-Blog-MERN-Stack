
import React from 'react'
import {useSelector} from 'react-redux'

const ThemeProvider = ({children}) => {
    const {theme}=useSelector((state)=>state.theme)

  return (
    <div className={theme}>
      <div className='bg-gray-100 text-gray-900 dark:text-gray-100 dark:bg-slate-950 min-h-screen'>
      {children}
      </div>
    </div>
  )
}

export default ThemeProvider
