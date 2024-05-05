

import { TextInput, Select, FileInput, Button, Alert } from 'flowbite-react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate , useParams} from 'react-router-dom';
import {useSelector} from 'react-redux'


const UpdatedPost = () => {

    const [imageFile ,setImageFile]=useState(null)
    const [imageFileURL,setImageFileURL]=useState(null)
    const [formData,setFormData]=useState({})
    const [publishError,setPublishError]=useState(null)
    const navigate=useNavigate()
    const {postId}=useParams()
    const {currentUser}=useSelector((state)=>state.user)

    useEffect(() => {
      try {
        const fetchPost = async () => {
          const res = await fetch(`/api/posts/getposts?postId=${postId}`);
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
            setPublishError(data.message);
            return;
          }
          if (res.ok) {
            setPublishError(null);
            setFormData(data.posts[0]);
          }
        };
  
        fetchPost();
      } catch (error) {
        console.log(error.message);
      }
    }, [postId]);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file); // Define imageUrl within the if block
        setImageFile(file);
        setImageFileURL(imageUrl);
    
        // Update formData.photoURL with the imageUrl
        setFormData({ ...formData, image: imageUrl });
      }
    };

  const handleSubmit=async (e) => {
    e.preventDefault();
    try {
      const res=await fetch(`/api/posts/updatepost/${formData._id}/${currentUser._id}`, 
        {
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        }
      )
      const data=await res.json();
      if(!res.ok){
        setPublishError(data.message)
        return;
      }
      
      if(res.ok){
        setPublishError(null)
        navigate(`/post/${data.slug}`)
      }

    } catch (error) {
      console.error(error);
    }
    
  }




  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl font-semibold my-7'>Update a Post</h1>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput value={formData.title} type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e)=>setFormData({...formData,title:e.target.value})}/>
            <Select value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})}>
                <option value={'uncategorized'}>Select a Category</option>
                <option value={'javaScript'}>javaScript</option>
                <option value={'NextJs'}>NextJs</option>
                <option value={'ReactJs'}>ReactJs</option>
                <option value={'ReactNative'}>React Native</option>
            </Select>
        </div>
        <div className='flex  items-center justify-center  border-4 border-red-400 p-4'>
            <FileInput  type='file' accept='image/*' onChange={handleImageChange} />
            
        </div>
        <img src={formData.image}  alt="" />
        <ReactQuill value={formData.content} theme="snow" placeholder='Write Here..........' className='h-72 mb-12' required
        onChange={(value)=>setFormData({...formData ,content:value})} 
         />
        <Button type='submit' gradientDuoTone={'redToYellow'}>UPDATE</Button>
      </form>
      {publishError && 
      <Alert color={'failure'} className='mt-5'>{publishError}</Alert>
      }
    </div>
  )
}

export default UpdatedPost
