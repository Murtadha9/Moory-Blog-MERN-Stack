import { Alert, Button, Modal, ModalHeader, TextInput, ModalBody } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import {getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../../firebase'

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {Link} from 'react-router-dom'

import { updateStart,
         updateSuccess,
         updateFailure,
         deleteUserStart,
         deleteUserSuccess,
         deleteUserFailure,
         SignoutSuccess
        } from '../../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';

import { HiExclamationCircle } from "react-icons/hi";



const DashProfile = () => {
    const {currentUser , error,loading} =useSelector((state)=>state.user)
    const [imageFile ,setImageFile]=useState(null)
    const [imageFileUrl ,setImageFileUrl]=useState(null)
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef=useRef()


    const [formData ,setFormData]=useState({})
    const dispatch=useDispatch()
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const handleImageChange=(e)=>{
        const file=e.target.files[0]
        if(file){
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
        
    }
    useEffect(()=>{
        if(imageFile){
           uplaodImage();
        }
    },[imageFile])

    const uplaodImage=async()=>{
        setImageFileUploading(true)
        setImageFileUploadError(null);
        const storage=getStorage(app);
        const fileName= new Date().getTime() + imageFile.name

        const storageRef=ref(storage,fileName)
        const uploadTask=uploadBytesResumable(storageRef,imageFile)
        uploadTask.on('state_changed',
         (snapshot)=>{
            const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setImageFileUploadProgress(progress.toFixed(0));
         },(error)=>{
            setImageFileUploadError(
                'Could not upload image (File must be less than 2MB)'
              );
              setImageFileUploadProgress(null);
              setImageFile(null);
              setImageFileUrl(null);
              setImageFileUploading(false);
         },
         ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageFileUrl(downloadURL);
                setFormData({...formData , photoURL:downloadURL})
                setImageFileUploading(false);
            })
         }
        )

    }

    const handlChange=(e)=>{
       setFormData({...formData, [e.target.id]:e.target.value})
    }

    const handleSubmit = async (e) =>{
      setUpdateUserError(null);
      e.preventDefault();
      if(Object.keys(formData).length === 0){
        setUpdateUserError('no change made')
        return;
      }
      if(imageFileUploading){
        setUpdateUserError('please wait for image upload')
        return;
      }
      try {
        dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
        if(!res.ok){
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message)
        }else{
          dispatch(updateSuccess(data));
          setUpdateUserSuccess('userprofile updated successfully')
        }
      } catch (error) {
        dispatch(updateFailure(error.message));
        setUpdateUserError(error.message)
      }
    }


    const handleDeleteUser=async()=>{
      setShowModal(false)
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        })
        const data = await res.json();
        if(!res.ok){
          dispatch(deleteUserFailure(data.message));
        }else{
          dispatch(deleteUserSuccess(data));
        }
        
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }

    }

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

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
        <input type="file" accept='image/*' onChange={handleImageChange} hidden ref={filePickerRef} />
        <div className=' relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>filePickerRef.current.click()}>
            {imageFileUploadProgress && (
                <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                    root: {
                        width: '100%',
                        height: '100%',
                        position:'absolute',
                        top:0,
                        left:0,
                    },
                    path:{
                        stroke: `rgba(62,152,199,${imageFileUploadProgress/100})`,
                        
                    }
                   
                }}
                 />
            )}
        <img src={imageFileUrl ||currentUser.photoURL} alt="" lt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`} />
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handlChange} />
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handlChange} />
        <TextInput type='password' id='password' placeholder='****************' onChange={handlChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading || imageFileUploading}>
            {loading ?'Loading':'Update'}
        </Button>
        {currentUser.isAdmin && (
          <Link to={'/createpost'} >
             <Button type='button' gradientDuoTone='purpleToPink' className='w-full'>Create a Post</Button>
          </Link>
        )}
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer' onClick={()=>setShowModal(true)}>Delete An account</span>
        <span className='cursor-pointer' onClick={handleSignout}>Sign Out</span>
      </div>
      {updateUserSuccess &&(
        <Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>
      )}
      {updateUserError &&(
        <Alert color='failure' className='mt-5'>{updateUserError}</Alert>
      )}
      {error &&(
        <Alert color='failure' className='mt-5'>{error}</Alert>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
        <ModalHeader/>
        <ModalBody>
          <div className='text-center'>
            <HiExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-200' >Are You Sure to Delete ?</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>Yes , I am Sure</Button>
              <Button color='gray' onClick={()=>setShowModal(false)} >No , Cancel</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default DashProfile
