import React, { useState } from 'react'
import { IoMenu } from 'react-icons/io5';

const Navbar = ({ onLoginClick, onSignUpClick }) => {

    const [toggle,setToggle] = useState(0);

  return (
    <>
    {toggle && <div className='absolute flex flex-col gap-10 bg-black text-white h-[100vh] w-1/2 items-center top-0 justify-center right-0'>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact Us</a>
            <button onClick={onLoginClick}>Sign In</button>
            <button className='p-3 bg-yellow-400 rounded-md'onClick={onSignUpClick}>Sign Up</button>
    </div>}
    <div className='flex justify-between mt-4 px-4 py-2 lg:h-24 lg:flex lg:items-center lg:justify-between lg:px-28 lg:pt-16 lg:text-xl'>
        <div className='flex items-center gap-16' >
            <img src="/mytutor.png" alt="logo" className='h-24 w-56 bg-white rounded-md' />
            <div className='hidden lg:flex lg:items-center lg:gap-16'>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact Us</a>
            </div>
        </div>
        <div className='hidden lg:flex lg:items-center lg:gap-10'>
            <button onClick={onLoginClick}>Sign In</button>
            <button className='p-3 bg-yellow-400 rounded-md' onClick={onSignUpClick}>Sign Up</button>
        </div>
        <button className='flex text-4xl pr-8 items-center z-10 text-white lg:hidden' onClick={()=>{setToggle(!toggle)}}>
            <IoMenu/>
        </button>
    </div>
    
    </>
  )
}

export default Navbar;