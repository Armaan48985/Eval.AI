'use client';
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div className='bg-[#161D2D] text-white flex-between w-full h-16 shadow-xl shadow-black border-b-2 border-gray-600'>
        <div className='ml-36 flex-center'>
          <Image src='/logo.png' width={60} height={50} alt='logo' className='' />
          <h1 className='text-2xl playwrite-cu-regular mb-3 text-gray-300'>eval.ai</h1>
        </div>

        <div>
          <Button className='bg-[#161D2D] border-2 border-gray-600 mr-10'>Sign In</Button>
        </div>
    </div>
  )
}

export default Navbar