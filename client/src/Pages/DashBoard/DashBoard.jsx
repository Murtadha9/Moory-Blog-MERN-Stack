
import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashProfile from '../../Components/DashProfile/DashProfile';
import DashSidebar from '../../Components/DashSidebar/DashSidebar';
import DashPosts from '../../Components/DashPosts/DashPosts';
import DashUsers from '../../Components/DashUsers/DashUsers';
import DashComments from '../../Components/DashComments/DashComments';
import DashboardComp from '../../Components/DashboardComp/DashboardComp';

const DashBoard = () => {
  const location=useLocation();
  const [tab,setTab]=useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl= urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/*Side Bar*/}
        <DashSidebar/>
      </div>
      {/*Profile*/}
      {tab === 'profile' && <DashProfile/>}

      {/*Posts*/}
      {tab === 'posts' && <DashPosts/>}

      {/*Users*/}
      {tab === 'users' && <DashUsers/>}

      {/*comments*/}
      {tab === 'comments' && <DashComments/>}

      {/*dashboard*/}
      {tab === 'dashboard' && <DashboardComp/>}
    </div>
  )
}

export default DashBoard
