
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react'
import {Link} from 'react-router-dom'
import { IoWarningOutline } from 'react-icons/io5'

const DashPosts = () => {
  const [userPosts,setUserPosts]=useState([])
  const {currentUser}=useSelector((state)=>state.user)
  const [showMore,setShowMore]=useState(true)
  const [showModal,setShowModal]=useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState('');

  console.log(userPosts)

  useEffect(()=>{
    const fetchPosts=async()=>{
      try {
        const res=await fetch(`/api/posts/getposts?userId=${currentUser._id}`)
        const data=await res.json();
        if(res.ok){
          setUserPosts(data.posts)
          if(data.posts.length<9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error)
      }
    };
    if(currentUser.isAdmin){
      fetchPosts();
    }
  },[currentUser._id])


  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/posts/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/posts/delete/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };


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
                  <span onClick={()=>{
                    setShowModal(true)
                    setPostIdToDelete(post._id)
                    }} className='cursor-pointer'>Delete</span>
                </TableCell>
                <TableCell>
                  <Link to={`/updatepost/${post._id}`}><span>Edit</span></Link>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
        {showMore &&
        (<button onClick={handleShowMore} className='w-full text-teal-500 self-center py-7'>show More</button>)
        }
      </>
      :<p>No Posts yets</p>
      }
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size={'md'}>
        <ModalHeader/>
        <ModalBody>
          <div className=' text-center'>
            <IoWarningOutline className='w-14 h-14 mb-5 mx-auto'/>
            <h3 className='font-bold text-red-700'>are you sure to delete the Post ?</h3>
            <div className='flex gap-3 items-center justify-center mt-5'>
              <Button className='flex-1' color={'failure'} onClick={handleDeletePost}>Yes,I am Sure</Button>
              <Button className='flex-1' onClick={()=>setShowModal(false)} gradientDuoTone={'redToYellow'}>Cancel</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default DashPosts
