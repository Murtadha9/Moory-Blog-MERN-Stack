
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Alert, Button, Label ,Spinner,TextInput} from 'flowbite-react';
import {useDispatch , useSelector} from 'react-redux';
import {signInStart , signInSuccess , signInFailure} from '../../redux/user/userSlice.js';
import AOuth from '../../Components/AOuth/AOuth.jsx';



const SignIn = () => {

  const navigate=useNavigate()
  const [formData,setFormData]=useState({});
  const dispatch=useDispatch();
  const {loading ,error:errorMessage}= useSelector((state)=>state.user);


  const handleChange=(e)=>{
    setFormData({
     ...formData,
      [e.target.id]:e.target.value
    })
  }
 
  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(!formData.email || !formData.password ){
      return dispatch(signInFailure('all fields must be filled'));
    }
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      if(data.success===false){
        dispatch(signInFailure(data.message));
      }

      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
      
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/*left*/}
      <div className='flex-1'>
      <Link to='/' className='text-4xl  font-bold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500  to-pink-500 text-white rounded-lg'>Moory</span> Blog
      </Link>
      <p className='text-sm mt-5'>Moory Blog for all guy and you can join us by email and password or by your Google account</p>
      </div>

      {/*left*/}
      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          
          <div>
            <Label value='Your Email' />
            <TextInput type='email' placeholder='email' id='email' onChange={handleChange}/>
          </div>
          <div>
            <Label value='Your Password' />
            <TextInput type='password' placeholder='password' id='password' onChange={handleChange}/>
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit' outline disabled={loading} >
            {loading?<><Spinner/> <span>Loading....</span></> : 'Sign In'}
          </Button>
          <AOuth/>
        </form>
        <div className='flex gap-2 mt-5'>
          <span>Don't Have an account?</span>
          <Link to='/signup' className='text-blue-500 font-bold'>Sign Up</Link>
        </div>
        {
          errorMessage && <Alert color='red'>{errorMessage}</Alert>
        }
      </div>
      </div>
    </div>
  )
}

export default SignIn;
