
import { Alert, Button, Label, Spinner, TextInput  } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { signInStart ,signInSuccess ,signInFailure } from '../../redux/user/userSlice';
import {useDispatch ,useSelector} from 'react-redux'
import AOuth from '../../Components/AOuth/AOuth';


const SignIn = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user || {});
  const filePicker=useRef()
  const [formData, setFormData] = useState({});

 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if( !formData.email ||!formData.password ){
      return dispatch(signInFailure('Please fill all the fields'));
    }
    
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if(data.success === false) {
        dispatch(signInFailure((data.message)));
      }
   

      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
        
     
    } catch (error) {
      dispatch(signInFailure((error.message)));
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 gap-6 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        {/*left*/}
        <div className='flex-1'>
          <Link to={'/'} className='font-bold text-4xl  dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-red-200 via-red-400 to-yellow-200 rounded-lg text-black'>
              Moory
            </span>
            Blog
          </Link>
          <p className='text-sl mt-5'>
            place for every one <br />
            join us to meet others and talk about your coding style
          </p>
        </div>

        {/*right*/}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
           
          <div>
              <Label value='Email' />
              <TextInput type='email' id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Password' />
              <TextInput type='password' id='password' onChange={handleChange} />
            </div>
           
            <Button gradientDuoTone={'redToYellow'} type='submit' disabled={loading}>
             {loading ?(
             <>
             <Spinner size={'sm'}/>
             <span className='pl-3'>Loading......</span>
             </>
             ): 'Sign In'} 
            </Button>
            <AOuth/>
          </form>
          <div className='flex gap-2 mt-5'>
            <span>Don't have an Account?</span>
            <Link to={'/signup'} className='font-bold text-red-400'>
              Sign up
            </Link>
          </div>
          
          {
            errorMessage && (
              <Alert className='mt-5' color={'failure'}>{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default SignIn;
