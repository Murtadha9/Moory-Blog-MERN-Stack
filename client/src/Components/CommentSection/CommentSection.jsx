
import { Button, TextInput, Textarea } from 'flowbite-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CommentSection = ({postId}) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('/api/comment/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: comment,
            postId,
            userId: currentUser._id,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setComment('');
         
        }
      } catch (error) {
        console.log(error);
      }
    };
  


  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser?
      (<div className='flex items-center gap-1 my-5 '>
        <span>Sign in as :</span>
        <img src={currentUser.photoURL} alt="alt" className='h-8 w-8 object-cover rounded-full' />
        <Link to={'/dashboard?tab=profile'} className='text-red-300 hover:underline'>@{currentUser.username}</Link>
      </div>)
      :
      (<div className='text-red-400 font-bold'>
        <span >Sign in in order to comments :</span>
        <Link to={'/signin'}>Sign In</Link>
      </div>)}

      {currentUser && (
        <form onSubmit={handleSubmit} className='border border-red-400 p-5 rounded-br-2xl rounded-tl-2xl'>
            <Textarea  onChange={(e) => setComment(e.target.value)}
            value={comment} placeholder='Add a comment' rows={'3'} maxLength={'200'}/>
            <div className='flex items-center justify-between mt-6'>
                <p>{200 - comment.length} characters remaining</p>
                <Button type='submit' gradientDuoTone={'redToYellow'}>comment</Button>
            </div>
        </form>
      )}
    </div>
  )
}

export default CommentSection
