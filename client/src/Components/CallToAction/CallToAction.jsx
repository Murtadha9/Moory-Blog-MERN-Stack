
import React from 'react'
import {Button } from 'flowbite-react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-red-400 justify-center gap-6  items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more about JavaScript ReactJS NextJS?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these GitHub and Explore all Project
            </p>
            <Button gradientDuoTone='redToYellow' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://github.com/Murtadha9" target='_blank' rel='noopener noreferrer'>
                    Mr.Moory's GitHub
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src='MrFrog-1.jpg' className='w-96 h-96 rounded-xl object-cover'/>
        </div>
    </div>
  )
}

export default CallToAction
