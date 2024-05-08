
import React, { useEffect, useState } from 'react'
import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput} from 'flowbite-react'
import { Link ,useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa6";
import {useSelector ,useDispatch} from 'react-redux'
import { toggleTheme } from '../../redux/theme/themeSlice';
import { SignoutSuccess } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


const Headers = () => {
    const path=useLocation().pathname;
    const location = useLocation();
    const {currentUser} = useSelector((state) => state.user)
    const {theme}=useSelector((state)=>state.theme)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
    }, [location.search]);

    const handleSubmit=(e)=>{
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);

    }

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
    <Navbar className='border-b-2'>

      <Link to={'/'} className='self-center whitespace-nowrap font-bold text-sm sm:text-lg dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-red-200 via-red-400 to-yellow-200  rounded-lg text-black'>Moory</span>Blog
        </Link>

        <form onSubmit={handleSubmit}>
            <TextInput
            type='text'
            placeholder='search....'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>

        <Button className='w-12 h-10 lg:hidden' color={'gray'} pill>
            <AiOutlineSearch/>
        </Button>

        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden lg:inline' color={'gray'} pill onClick={()=>dispatch(toggleTheme())}>
                {theme === 'light'? <FaSun/> : <FaMoon/> }
            </Button>
            {currentUser ? (
                <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar
                    alt='username'
                    img={currentUser.photoURL}
                    rounded
                    />
                }
                >
                    <DropdownHeader>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>@{currentUser.email}</span>
                    </DropdownHeader>
                    <Link to={'/dashboard?tab=profile'}>
                        <DropdownItem>Profile</DropdownItem>
                    </Link>
                    <DropdownDivider/>
                    <DropdownItem onClick={handleSignout}>SignOut</DropdownItem>
                </Dropdown>
            ):(
                <Link to={'/signin'}>
                <Button gradientDuoTone="redToYellow" outline>
                    Sign In
                </Button>
            </Link>
            )}
            <NavbarToggle/>
        </div>

        <NavbarCollapse>
                <NavbarLink active={path === '/'} as={'div'}>
                    <Link to={'/'}>Home</Link>
                </NavbarLink>
                <NavbarLink active={path === '/about'} as={'div'}>
                    <Link to={'/about'}>About</Link>
                </NavbarLink>
                <NavbarLink active={path === '/projects'} as={'div'}>
                    <Link to={'/projects'}>Projects</Link>
                </NavbarLink>
            </NavbarCollapse>

    </Navbar>
  )
}

export default Headers
