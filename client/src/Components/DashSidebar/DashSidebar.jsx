
import React, { useEffect, useState } from 'react'
import {Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react'
import { HiUser } from "react-icons/hi";
import { VscSignOut } from "react-icons/vsc";
import { Link, useLocation } from 'react-router-dom';
import { SignoutSuccess } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BsPostcard } from "react-icons/bs";
import {useSelector} from 'react-redux';
import { MdGroups2 } from "react-icons/md";

const DashSidebar = () => {

    const location=useLocation();
    const [tab,setTab]=useState('')
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {currentUser}=useSelector((state)=>state.user)

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl= urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/users/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(SignoutSuccess());
        navigate('/signin')
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <Sidebar className='w-full md:w-56'>
      <SidebarItems>
        <SidebarItemGroup className='flex flex-col gap-2'>
            <Link to={'/dashboard?tab=profile'}>
            <SidebarItem active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin?'Admin':'User'} as={'div'}>Profile</SidebarItem>
            </Link>
            {currentUser.isAdmin &&
            <Link to={'/dashboard?tab=posts'}>
               <SidebarItem active={tab === 'posts'} icon={BsPostcard} as={'div'}>Posts</SidebarItem>
            </Link>
            }
            {currentUser.isAdmin &&
            <Link to={'/dashboard?tab=users'}>
               <SidebarItem active={tab === 'users'} icon={MdGroups2} as={'div'}>Users</SidebarItem>
            </Link>
            }
            <SidebarItem  icon={VscSignOut} onClick={handleSignout} >Signout</SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  )
}

export default DashSidebar
