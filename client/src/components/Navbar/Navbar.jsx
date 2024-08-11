import React, { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onLoginClick, onSignUpClick }) => {
    const [toggle, setToggle] = useState(false);
    const location = useLocation(); // Get current location

    // Helper function to determine if a link is active
    const isActive = (path) => location.pathname === path 
        ? 'p-3 bg-yellow-400 text-black rounded-md' 
        : 'text-white';

    return (
        <>
            {toggle && 
                <div className='absolute flex flex-col gap-10 bg-black text-white h-[100vh] w-full items-center top-0 justify-center right-0'>
                    <Link 
                        to="/" 
                        className={isActive('/')} 
                        onClick={() => setToggle(false)}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/about" 
                        className={isActive('/about')} 
                        onClick={() => setToggle(false)}
                    >
                        About
                    </Link>
                    <Link 
                        to="/contact" 
                        className={isActive('/contact')} 
                        onClick={() => setToggle(false)}
                    >
                        Contact Us
                    </Link>
                    <button 
                        className='text-white' 
                        onClick={() => { onLoginClick(); setToggle(false); }}
                    >
                        Sign In
                    </button>
                    <button 
                        className='p-3 bg-yellow-400 text-black rounded-md' 
                        onClick={() => { onSignUpClick(); setToggle(false); }}
                    >
                        Sign Up
                    </button>
                </div>
            }
            <div className='flex justify-between mt-4 px-4 py-2 lg:h-24 lg:flex lg:items-center lg:justify-between lg:px-28 lg:pt-16 lg:text-xl'>
                <div className='flex items-center gap-16'>
                    <img 
                        src="/mytutor.png" 
                        alt="logo" 
                        className='h-24 w-56 bg-white rounded-md' 
                    />
                    <div className='hidden lg:flex lg:items-center lg:gap-16'>
                        <Link 
                            to="/" 
                            className={isActive('/')}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/about" 
                            className={isActive('/about')}
                        >
                            About
                        </Link>
                        <Link 
                            to="/contact" 
                            className={isActive('/contact')}
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
                <div className='hidden lg:flex lg:items-center lg:gap-10'>
                    <button 
                        className='text-white' 
                        onClick={onLoginClick}
                    >
                        Sign In
                    </button>
                    <button 
                        className='p-3 bg-yellow-400 text-black rounded-md' 
                        onClick={onSignUpClick}
                    >
                        Sign Up
                    </button>
                </div>
                <button 
                    className='flex text-4xl pr-8 items-center z-10 text-white lg:hidden' 
                    onClick={() => { setToggle(!toggle); }}
                >
                    <IoMenu />
                </button>
            </div>
        </>
    );
};

export default Navbar;
