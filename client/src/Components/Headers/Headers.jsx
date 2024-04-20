import React, { useEffect, useState } from 'react'
import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar , NavbarCollapse, NavbarLink, NavbarToggle, TextInput} from 'flowbite-react'
import { Link ,useLocation, useNavigate} from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";
import { FaMoon,FaSun } from "react-icons/fa";
import {useSelector ,useDispatch} from 'react-redux';
import {toggleTheme} from '../../redux/theme/themeSlice.js'
import { SignoutSuccess } from '../../redux/user/userSlice.js';



const Headers = () => {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
    }, [location.search]);


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


   const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

    
  return (
    <Navbar className='border-b-2'>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500  to-pink-500 text-white rounded-lg'>Moory</span> Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput type='text' placeholder='Search....'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
         rightIcon={IoMdSearch} className='hidden lg:inline'/>
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <IoMdSearch/>
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>{dispatch(toggleTheme())}}>
            {theme === 'light' ? <FaSun/> :<FaMoon/>}
        </Button>
        {currentUser?(
          <Dropdown arrowIcon={false} inline label={
            <Avatar alt='user' img={currentUser.photoURL} rounded/>
          }>
            <DropdownHeader>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </DropdownHeader>
            <Link to='/dashboard?tab=profile'>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownDivider/>
            <Link to='/signin'>
              <DropdownItem onClick={handleSignout}>Sign-Out</DropdownItem>
            </Link>
            
          </Dropdown>
        ):(<Link to='/signin'>
        <Button  gradientDuoTone='purpleToBlue' outline>Sign In</Button>
        </Link>)}
        
        <NavbarToggle/>
      </div>
      <NavbarCollapse>
            <NavbarLink active={path === '/'} as={'div'}><Link to='/'>Home</Link></NavbarLink>
            <NavbarLink active={path === '/about'} as={'div'}><Link to='/about'>About</Link></NavbarLink>
            <NavbarLink active={path === '/projects'} as={'div'}><Link to='/projects'>Projects</Link></NavbarLink>
        </NavbarCollapse>
    </Navbar>
  )
}

export default Headers
