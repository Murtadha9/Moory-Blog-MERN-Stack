import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useRef, useState } from 'react'
import {useSelector ,useDispatch} from 'react-redux'
import {updateStart ,updateSuccess ,updateFailure} from '../../redux/user/userSlice'

const DashProfile = () => {

    const {currentUser} = useSelector((state) => state.user)
    const [imageFile ,setImageFile]=useState(null)
    const [imageFileURL,setImageFileURL]=useState(null)
    const filePick=useRef()
    const [formData,setFormData]=useState({})
    const dispatch=useDispatch()
    const [updateUserSuccess ,setUpdateUserSuccess]=useState(null)
    const [updateUserError ,setUpdateUserError]=useState(null)


    
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file); // Define imageUrl within the if block
        setImageFile(file);
        setImageFileURL(imageUrl);
    
        // Update formData.photoURL with the imageUrl
        setFormData({ ...formData, photoURL: imageUrl });
      }
    };
    


    const handleChange=(e)=>{
      setFormData({...formData,[e.target.id]:e.target.value})
    }


  const handleSubmit=async(e)=>{
    e.preventDefault()
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    if(Object.keys(formData).length ===0){
      setUpdateUserError('Please fill the fields')
      return;
    }
    try {
      dispatch(updateStart())
      const res=await fetch(`/api/users/update/${currentUser._id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      if(!res.ok){
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message)
      }else{
        dispatch(updateSuccess(data))
        setUpdateUserSuccess('Successfully updated')
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
    }
    
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center'>Profile</h1>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <input type="file" accept='image/*' onChange={handleImageChange} hidden ref={filePick} />
        <div className='w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden' onClick={()=>filePick.current.click()}>
        <img src={imageFileURL || currentUser.photoURL} alt="user" className='rounded-full object-cover w-full h-full border-8 border-gray-400' />
        </div>
        <TextInput type='text' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email' id='email' defaultValue={currentUser.email} onChange={handleChange}/>
        <TextInput type='password' id='password' placeholder='password' onChange={handleChange}/>
        <Button type='submit' gradientDuoTone={'redToYellow'} outline >Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className=' cursor-pointer'>Delete account</span>
        <span className=' cursor-pointer'>Signout</span>
      </div>
      {updateUserSuccess  && 
      <Alert className='mt-5' color={'success'}>{updateUserSuccess}</Alert>
      }
      {updateUserError &&
      <Alert className='mt-5' color={'failure'}>{updateUserError}</Alert>}
    </div>
    
  )
}

export default DashProfile
