import React, { useEffect, useState } from 'react'
import {Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react'
import { HiChartPie, HiUser } from "react-icons/hi";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { SignoutSuccess } from '../../redux/user/userSlice';
import { useDispatch ,useSelector} from 'react-redux';
import { HiDocumentText } from "react-icons/hi";
import { MdGroup } from "react-icons/md";
import { LiaComments } from "react-icons/lia";



const DashSidebar = () => {
    const dispatch=useDispatch()
    const {currentUser}=useSelector((state)=>state.user)
    const location = useLocation();
    const [tab,setTab]=useState('');
    useEffect(() =>{
    const urlParams=new URLSearchParams(location.search)
    const tabFromUrl=urlParams.get('tab')
    if(tabFromUrl) {
      setTab(tabFromUrl)
    }
  },[location.search])


  const handleSignout=async()=>{
    try {
     const res=await fetch('/api/user/signout', 
     {method: 'POST'})
     
     const data=await res.json();
     if(!res.ok){
       console.log(data.message)
     }else{
       dispatch(SignoutSuccess())
     }
    } catch (error) {
     console.log(error.message);
     
    }
 }


  return (
    <Sidebar className='w-full'>
      <SidebarItems>
        <SidebarItemGroup className='flex flex-col gap-2'>
        {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}

           <Link to='/dashboard?tab=profile'>
           <SidebarItem active={tab === 'profile'}
            icon={HiUser} label={currentUser.isAdmin?'Admin':'User'} as={'div'} labelColor='dark'>Profile</SidebarItem>
           </Link>

           {currentUser.isAdmin &&(
            <Link to='/dashboard?tab=posts'>
            <SidebarItem as={'div'} active={tab === 'posts'} icon={HiDocumentText}>Posts</SidebarItem>
            </Link>
           )}

             {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={MdGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={LiaComments}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}

            <SidebarItem  icon={FaSignOutAlt} className=' cursor-pointer' onClick={handleSignout} >Sign Out</SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  )
}

export default DashSidebar
