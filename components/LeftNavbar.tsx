'use client';
import { gen } from '@/utils/constant';
import React, { useEffect, useState } from 'react';
import { FaHashtag, FaLaptopCode } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import { LiaChartBarSolid } from 'react-icons/lia';

const LeftNavbar = ({ setShowGraphs, inputCode, setPieVariables, setBarvariable, setComplexity}:any) => {
  const [active, setActive] = useState<string>('code');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  const handleGraphClick = async () => {
    // Define the prompt
    setActive('graph');
    setShowGraphs(true);
    const prompt1 = `You are given a function. Analyze it based on the following five criteria: Maintainability, Readability, Vulnerability, Bugs, and Security Warnings. For each criterion, I need a single numeric value between 0 and 100 that represents the evaluation of that criterion. The sum of all five values must exactly equal 360.

Output the values in the following array format: [Maintainability, Readability, Vulnerability, Bugs, security warnings].

Constraints:
- The output must only be in the array format, for example: [95, 34, 45, 76, 90].
- The sum of all values in the array must be exactly 360.
- The data will be applied in the pie chart data in chart.js

Do not include any additional text, explanation, or comments—only the array of values.`;


    const prompt2 = `I am giving you a function. Please analyze it based on the following five criteria :'IllegalArgEx', 'NullPointerEx', 'ArrayIndexOutOfBoundsEx', 'IOException', 'FileNotFoundEx. For each criterion, I need a single numeric value between 0 and 100 that represents the evaluation of that criterion, but they should all add up to 300.

Provide the values in the following format:

a = [IllegalArgEx],
b = [NullPointerEx],
c = [ArrayIndexOutOfBoundsEx],
d = [IOException],
e = [FileNotFoundEx]
I only want the numeric values, nothing else. Not even a = 95, c = 30.
I only want an array like this: [95, 34, 45, 76, 23] nothing more`
  
try {
  const dataString = await gen(prompt1, inputCode);
  const dataString2 = await gen(prompt2, inputCode);
  const dataString3 = await gen('give me the time complexity of the function without any additional text. I only want a single word output. If time complexity is O(n), I only want n as a output', inputCode);

  const cleanedDataString = dataString.replace(/^=\s*\[|\]$/g, '');
  const cleanedDataString2 = dataString2.replace(/^=\s*\[|\]$/g, '');

  // Convert the cleaned strings to arrays
  const dataArray = JSON.parse(`[${cleanedDataString}]`);
  const dataArray2 = JSON.parse(`[${cleanedDataString2}]`);

  console.log(dataString3)
  setPieVariables(dataArray);
  setBarvariable(dataArray2);
  setComplexity(dataString3);
} catch (error) {
  console.error('Error fetching chart data:', error);
}
  }

  return (
    <div className="relative">
      {/* Main Navbar */}
      <div
        className={`bg-[#21283B] absolute top-0 left-0 min-h-screen ${
          isHovered ? 'w-52' : 'w-20'
        } z-10 text-white flex flex-col items-center justify-between py-10 transition-width duration-500 ease-in-out`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col gap-4">
          <span
            onClick={() => {
              setActive('code');
              setShowGraphs(false);
            }}
            className={`text-xl ${isHovered && 'text-lg rounded-xl px-8'} border-[1px] border-gray-700  p-3 shadow-sm rounded-full flex items-center gap-2 cursor-pointer transition-all duration-200 ${
              active === 'code' ? 'bg-white text-black border-none' : ''
            }`}
          >
            <FaLaptopCode />
            {isHovered && <span className="ml-2 text-sm">Code</span>}
          </span>

          <span
            onClick={handleGraphClick}
            className={`text-xl ${isHovered && 'text-lg rounded-xl px-8'} border-[1px] border-gray-700  p-3 shadow-sm rounded-full flex items-center gap-2 cursor-pointer transition-all duration-200 ${
              active === 'graph' ? 'bg-white text-black border-none' : ''
            }`}
          >
            <LiaChartBarSolid />
            {/* Show text based on hover state */}
            {isHovered && <span className="ml-2 text-sm">Graph</span>}
          </span>

          <span
            onClick={() => {
              setActive('hash');
              setShowGraphs(false);
            }}
            className={`text-xl ${isHovered && 'text-lg rounded-xl px-8'} border-[1px] border-gray-700 p-3 shadow-sm rounded-full flex items-center gap-2 cursor-pointer transition-all duration-200 ${
              active === 'hash' ? 'bg-white text-black border-none' : ''
            }`}
          >
            <FaHashtag />
            {/* Show text based on hover state */}
            {isHovered && <span className="ml-2 text-sm">Hashtag</span>}
          </span>
        </div>

        <div>
          <span
            onClick={() => setActive('search')}
            className={`text-xl flex p-3 shadow-lg rounded-full cursor-pointer transition-all duration-200 ${
              active === 'search' ? 'bg-white text-black' : ''
            }`}
          >
            <IoSearchOutline />
            {isHovered && <span className="ml-2 text-sm">Search</span>}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;
