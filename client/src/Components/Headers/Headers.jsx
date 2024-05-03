
import React from 'react'
import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput} from 'flowbite-react'
import { Link ,useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa6";
import {useSelector ,useDispatch} from 'react-redux'
import { toggleTheme } from '../../redux/theme/themeSlice';


const Headers = () => {
    const path=useLocation().pathname;
    const {currentUser} = useSelector((state) => state.user)
    const {theme}=useSelector((state)=>state.theme)
    const dispatch=useDispatch()
   

  return (
    <Navbar className='border-b-2'>

      <Link to={'/'} className='self-center whitespace-nowrap font-bold text-sm sm:text-lg dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-red-200 via-red-400 to-yellow-200  rounded-lg text-black'>Moory</span>Blog
        </Link>

        <form>
            <TextInput
            type='text'
            placeholder='search....'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
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
                    img={currentUser.photoUrl}
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
                    <DropdownItem>SignOut</DropdownItem>
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
