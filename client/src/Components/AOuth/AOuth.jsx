import { Button } from 'flowbite-react'
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import {GoogleAuthProvider, signInWithPopup ,getAuth} from 'firebase/auth'
import {app} from '../../firebase'
import {useDispatch} from 'react-redux'
import {signInSuccess} from '../../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'

const AOuth = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();


    const auth=getAuth(app)
    const handleGoogleClick=async()=>{
        const provider= new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account',})
        try {
            const resultFromGoogle=await signInWithPopup(auth ,provider);
            

            const res=await fetch('/api/auth/google' ,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name:resultFromGoogle.user.displayName,
                    email:resultFromGoogle.user.email,
                    GooglePhotoURL:resultFromGoogle.user.photoURL,
                })
            })

            const data=await res.json()
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Button type='button' gradientDuoTone={'cyanToBlue'} outline onClick={handleGoogleClick}>
      <FcGoogle className='w-6 h-6 mr-2' /> Continue with Google
    </Button>
  )
}

export default AOuth
