
import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CallToAction from '../../Components/CallToAction/CallToAction'



const PostPage = () => {
    const {postSlug}=useParams()
    const [loading,setLoading]=useState(false)
    const [error, setError]=useState(false)
    const [post,setPost]=useState(null)

   
    useEffect(()=>{
        const fetchPost=async()=>{
            try {
                const res=await fetch(`/api/posts/getposts?slug=${postSlug}`);
                const data=await res.json();
                if(!res.ok){
                    setError(true)
                    setLoading(false)
                    return;
                }
                if(res.ok){
                    setLoading(false)
                    setError(false)
                    setPost(data.posts[0])
                }
                
            } catch (error) {
                
            }
        };
        fetchPost();
    },[postSlug])

    if(loading)return(
        <div className='flex justify-center items-center min-h-screen'>
        <Spinner size={'xl'}/>
        </div>
    )

  return (
  
        <main className='p-3 flex items-center flex-col mx-auto max-w-6xl min-h-screen'>
      <h1 className='text-3xl mt-10 text-center max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
      <Link to={`/search?category=${post && post.category}`} className='mt-5 self-center'>
        <Button gradientDuoTone={'redToYellow'}>{post && post.category}</Button>
      </Link>
      <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>

      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>


    </main>

  )
}

export default PostPage
