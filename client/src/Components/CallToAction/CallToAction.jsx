import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div  className='flex flex-col sm:flex-row p-3 border
    border-teal-500 items-center justify-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 flex justify-center flex-col'>
        <h1 className='text-2xl'>Want more to learn about js</h1>
        <p className='text-gray-600 my-2'>Check out this Check out this Check out this v Check out this </p>
        <Button gradientDuoTone='purpleToPink'>
            <a href="" target='_blank'>1000 projects of js</a>
        </Button>
      </div>

      <div className='p-7 flex-1'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlLIALXHqYCkHmtb3RYDdlc0W3CfNE4T_mJEgPfQEvYg&s" alt="" />
      </div>
    </div>
  )
}

export default CallToAction
