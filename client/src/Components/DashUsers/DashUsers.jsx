

import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react'
import {Link} from 'react-router-dom'
import { IoWarningOutline } from 'react-icons/io5'
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const DashUsers = () => {
  const [users,setUsers]=useState([])
  const {currentUser}=useSelector((state)=>state.user)
  const [showMore,setShowMore]=useState(true)
  const [showModal,setShowModal]=useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState('');

 

  useEffect(()=>{
    const fetchUsers=async()=>{
      try {
        const res=await fetch('/api/users/getusers')
        const data=await res.json();
        if(res.ok){
          setUsers(data.users)
          if(data.users.length<9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error)
      }
    };
    if(currentUser.isAdmin){
        fetchUsers();
    }
  },[currentUser._id])


  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/users/getusers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    
    try {
        const res=await fetch(`/api/users/delete/${userIdToDelete}`,{
            method:'DELETE',
        });
        const data=await res.json();
        if(res.ok){
            setUsers((prev)=>prev.filter((user)=>user._id!==userIdToDelete))
            setShowModal(false);
        }else{
            console.log(data.message)
        }
    } catch (error) {
        console.log(error.message)
    }
   
  };


  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && users.length>0 ? 
      <>
        <Table hoverable className='shadow-md'>
          <TableHead>
            <TableHeadCell>Date created</TableHeadCell>
            <TableHeadCell>user Image</TableHeadCell>
            <TableHeadCell>username</TableHeadCell>
            <TableHeadCell>email</TableHeadCell>
            <TableHeadCell>admin</TableHeadCell>
            <TableHeadCell>Delete</TableHeadCell>
            
          </TableHead>
          {users.map((user)=>(
            <TableBody className='divide-y' key={user._id}>
              <TableRow className='bg-white dark:bg-gray-900 dark:border-gray-700'>
                <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                    <img src={user.photoURL} alt="" className='w-20 h-20 object-cover rounded-full' />
                </TableCell>
                <TableCell>
                  {user.username}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? <FaCheck/>:<RxCross2/>}</TableCell>
                <TableCell>
                  <span onClick={()=>{
                    setShowModal(true)
                    setUserIdToDelete(user._id)
                    }} className='cursor-pointer'>Delete</span>
                </TableCell>
               
              </TableRow>
            </TableBody>
          ))}
        </Table>
        {showMore &&
        (<button onClick={handleShowMore} className='w-full text-teal-500 self-center py-7'>show More</button>)
        }
      </>
      :<p>No Users yets</p>
      }
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size={'md'}>
        <ModalHeader/>
        <ModalBody>
          <div className=' text-center'>
            <IoWarningOutline className='w-14 h-14 mb-5 mx-auto'/>
            <h3 className='font-bold text-red-700'>are you sure to delete the User ?</h3>
            <div className='flex gap-3 items-center justify-center mt-5'>
              <Button className='flex-1' color={'failure'} onClick={handleDeleteUser}>Yes,I am Sure</Button>
              <Button className='flex-1' onClick={()=>setShowModal(false)} gradientDuoTone={'redToYellow'}>Cancel</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default DashUsers
