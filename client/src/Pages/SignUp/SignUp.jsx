
import { Alert, Button, Label, Spinner, TextInput  } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import AOuth from '../../Components/AOuth/AOuth';
import { useSelector } from 'react-redux';

const SignUp = () => {

  const {currentUser } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };



  

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
          <h1 className='mx-auto text-2xl'>Sign up</h1>

            <div>
              <Label value='Username' />
              <TextInput type='text' id='username' onChange={handleChange} />
            </div>
           
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
             ): 'Sign Up'} 
            </Button>
            <AOuth/>
          </form>
          <div className='flex gap-2 mt-5'>
            <span>Have an Account?</span>
            <Link to={'/signin'} className='font-bold text-red-400'>
              Sign In
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

export default SignUp;
