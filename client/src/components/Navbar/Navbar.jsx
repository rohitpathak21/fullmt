import React, { useContext, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaSearch } from 'react-icons/fa';

const Navbar = ({ onLoginClick, onSignUpClick }) => {
    const [toggle, setToggle] = useState(false);
    const location = useLocation();
    const { currentUser } = useContext(AuthContext);

    // Helper function to determine if a link is active
    const isActive = (path) => location.pathname === path 
        ? 'p-3 bg-yellow-400 text-black rounded-md' 
        : 'text-white';
    
    const isProfileActive = (path) => location.pathname === path 
        ? 'p-3 bg-yellow-400 text-black rounded-md' 
        : 'p-3 bg-yellow-400 text-white rounded-md';
    

    // Determine the text for the Feed button based on user role
    const feedButtonText = currentUser?.role === 'Teacher' ? 'Find Students' : 'Find Tutors';

    return (
        <>
            {toggle && 
                <div className='z-10 absolute flex flex-col gap-10 bg-black text-white h-[100vh] w-full items-center top-0 justify-center right-0'>
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
                    {currentUser && <Link 
                        to="/feed" 
                        className={`flex items-center space-x-2 p-2 rounded ${isActive('/feed')}`}
                        onClick={() => setToggle(false)}
                    >
                        <span>{feedButtonText}</span>
                        <FaSearch />
                    </Link>}
                    {!currentUser && <button 
                        className='text-white' 
                        onClick={() => { onLoginClick(); setToggle(false); }}
                    >
                        Sign In
                    </button>}
                    {!currentUser && <button 
                        className='p-3 bg-yellow-400 text-black rounded-md' 
                        onClick={() => { onSignUpClick(); setToggle(false); }}
                    >
                        Sign Up
                    </button>}
                    {currentUser && <button>
                        <Link 
                            to="/profile" 
                            className={isProfileActive('/profile')}
                            onClick={() => setToggle(false)}>
                            Profile
                        </Link>
                    </button>}
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
                        {currentUser && <Link 
                            to="/feed" 
                            className={`flex items-center space-x-2 p-2 rounded ${isActive('/feed')}`}
                        >
                            <span>{feedButtonText}</span>
                            <FaSearch />
                        </Link>}
                    </div>
                </div>
                <div className='hidden lg:flex lg:items-center lg:gap-10'>
                    {!currentUser && <button 
                        className='text-white' 
                        onClick={onLoginClick}
                    >
                        Sign In
                    </button>}
                    {!currentUser && <button 
                        className='p-3 bg-yellow-400 text-black rounded-md' 
                        onClick={onSignUpClick}
                    >
                        Sign Up
                    </button>}
                    {currentUser && <button>
                        <Link 
                            to="/profile" 
                            className={isProfileActive('/profile')}>
                            Profile
                        </Link>
                    </button>}
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
