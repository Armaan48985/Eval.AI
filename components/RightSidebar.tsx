'use client';
import React, { useEffect, useState } from 'react'
import { BsArrowRight } from "react-icons/bs";
import { defaultPrompts, gen } from '@/utils/constant';
import { Button } from './ui/button';

const RightSidebar = ({setResult, inputCode} : any) => {

  const [customPrompt, setCustomPrompt] = useState<string>('')

  const sendCustomPrompt = async () => {
        const data = await gen(customPrompt , inputCode)

        if(data){
          setResult(data)
          setCustomPrompt('')
        }
  }

  const handleClick = async (id: number) => {
    var a = inputCode
   if(inputCode){
    const b = await gen(defaultPrompts[id].prompt, a)
    if(b){
      setResult(b)
    }
   }
    }

  return (
    <div className={`absolute right-[-7rem] top-[-2rem] w-[280px] min-h-[88vh] bg-[#21283B] rounded-md m-4 mr-[8rem] text-white px-5`}>

      <div className='flex justify-start p-2'>
        <span className='text-xl p-2 hover:bg-gray-700 duration-500 rounded-full'><BsArrowRight /></span>
      </div>

      <ul className='text-gray-200'>
        <li onClick={() => handleClick(1)} className='border-b-[1px] border-gray-700 py-3 px-1 text-sm hover:text-white cursor-pointer'>Suggest function name</li>
        <li onClick={() => handleClick(0)} className='border-b-[1px] border-gray-700 py-3 px-1 text-sm hover:text-white cursor-pointer'>Add Comments</li>
        <li onClick={() => handleClick(2)} className='border-b-[1px] border-gray-700 py-3 px-1 text-sm hover:text-white cursor-pointer'>Get Code Review</li>
        <li onClick={() => handleClick(3)} className='border-b-[1px] border-gray-700 py-3 px-1 text-sm hover:text-white cursor-pointer'>Analyse Time Complexity</li>
        <li onClick={() => handleClick(4)} className='border-b-[1px] border-gray-700 py-3 px-1 text-sm hover:text-white cursor-pointer'>Generate Testcases</li>
      </ul>

        <div>
          <textarea 
            placeholder='Write custom prompt...' 
            className='w-full border-none bg-[#151B2B] rounded-xl mt-5 p-4 text-sm h-[200px]'
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
          {customPrompt.length > 0 && <Button variant='default' onClick={sendCustomPrompt} className='w-[95%] bg-blue-500 mt-2 border-none rounded-lg'>Send</Button>}
        </div>
    </div>
  )
}

export default RightSidebar