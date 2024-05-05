
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react'
import {Link} from 'react-router-dom'

const DashPosts = () => {
  const [userPosts,setUserPosts]=useState([])
  const {currentUser}=useSelector((state)=>state.user)

  console.log(userPosts)

  useEffect(()=>{
    const fetchPosts=async()=>{
      try {
        const res=await fetch(`/api/posts/getposts?userId=${currentUser._id}`)
        const data=await res.json();
        if(res.ok){
          setUserPosts(data.posts)
        }
      } catch (error) {
        console.log(error)
      }
    };
    if(currentUser.isAdmin){
      fetchPosts();
    }
  },[currentUser._id])

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length>0 ? 
      <>
        <Table hoverable className='shadow-md'>
          <TableHead>
            <TableHeadCell>Date Updated</TableHeadCell>
            <TableHeadCell>Post Image</TableHeadCell>
            <TableHeadCell>post title</TableHeadCell>
            <TableHeadCell>category</TableHeadCell>
            <TableHeadCell>Delete</TableHeadCell>
            <TableHeadCell><span>Edit</span></TableHeadCell>
          </TableHead>
          {userPosts.map((post)=>(
            <TableBody className='divide-y'>
              <TableRow className='bg-white dark:bg-gray-900 dark:border-gray-700'>
                <TableCell>{new Date(post.updatedAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Link to={`/post/${post.slug}`}>
                    <img src={post.image} alt="" className='w-20 h-20 object-cover' />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={`/post/${post.slug}`}>{post.title}</Link>
                </TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <span>Delete</span>
                </TableCell>
                <TableCell>
                  <Link to={`/updatepost/${post._id}`}><span>Edit</span></Link>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </>
      :<p>No Posts yets</p>
      }
    </div>
  )
}

export default DashPosts
