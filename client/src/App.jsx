
import React from 'react'
import {Route ,BrowserRouter ,Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import SignUp from './Pages/SignUp/SignUp'
import SignIn from './Pages/SignIn/SignIn'
import Projects from './Pages/Projects/Projects'
import DashBoard from './Pages/DashBoard/DashBoard'

const App = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
