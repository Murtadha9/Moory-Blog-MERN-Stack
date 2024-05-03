import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import {useSelector} from 'react-redux'

const DashProfile = () => {
    const {currentUser} = useSelector((state) => state.user)
    
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center'>Profile</h1>
      <form className='flex flex-col gap-5'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden'>
        <img src={currentUser.photoURL} alt="user" className='rounded-full object-cover w-full h-full border-8 border-gray-400' />
        </div>
        <TextInput type='text' id='username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password'/>
        <Button type='submit' gradientDuoTone={'redToYellow'} outline >Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className=' cursor-pointer'>Delete account</span>
        <span className=' cursor-pointer'>Signout</span>
      </div>
    </div>
  )
}

export default DashProfile
