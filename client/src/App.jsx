
import React from 'react'
import {Route ,BrowserRouter ,Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import SignUp from './Pages/SignUp/SignUp'
import SignIn from './Pages/SignIn/SignIn'
import Projects from './Pages/Projects/Projects'
import DashBoard from './Pages/DashBoard/DashBoard'
import Headers from './Components/Headers/Headers'
import FooterCom from './Components/Footer/Footer'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute/OnlyAdminPrivateRoute'
import CreatePost from './Pages/CreatePost/CreatePost'
import UpdatedPost from './Pages/UpdatePost/UpdatePost'
import PostPage from './Pages/PostPage/PostPage'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'
import Search from './Pages/Search/Search'

const App = () => {
  return (
    <BrowserRouter >
    <ScrollToTop/>
    <Headers/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<DashBoard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='/updatepost/:postId' element={<UpdatedPost />} />
        </Route>
        
        <Route path='/projects' element={<Projects />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      <FooterCom/>
    </BrowserRouter>
  )
}

export default App
