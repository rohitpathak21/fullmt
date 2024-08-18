import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = ({openUpdateModal}) => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);

  useEffect(()=>{
    if(!currentUser){
      navigate("/")
    }},[currentUser,navigate])

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8800/api/auth/logout", null, {
        withCredentials: true,
      });
      
      if (res.status === 200) {
        updateUser(null); // Remove user info from context and local storage
        toast.success("Logout successful!");
        navigate('/'); // Redirect to home page or login page
      }
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error("Logout error:", error);
    }
  };

  
  return (
    currentUser &&
    <div className='mt-24 flex justify-center items-center'>
      <div className='p-6 mx-auto bg-white rounded-lg flex flex-col gap-2'>
        <div className='relative bottom-16'><img className='h-20 w-20 mx-auto rounded-full' src="/placeholder.png" alt="" /></div>
        <div className='relative bottom-10 flex flex-col gap-3 hello'>
        <div><span className='font-semibold'>Name : </span><span>{currentUser.fullname}</span></div>
        <div><span className='font-semibold'>Email: </span>{currentUser.email}</div>
        <div><span className='font-semibold'>Age : </span>{currentUser.age}</div>
        <div><span className='font-semibold'>Gender : </span>{currentUser.gender}</div>
        <div><span className='font-semibold'>Phone Number : </span>{currentUser.phone}</div>
        <div><span className='font-semibold'>Street : </span>{currentUser.street || "Not added yet"}</div>
        <div><span className='font-semibold'>Area : </span>{currentUser.area || "Not added yet"}</div>
        <div><span className='font-semibold'>City : </span>{currentUser.city || "Not added yet"}</div>
        <button className='p-3 text-black bg-yellow-400 rounded-md relative top-5' onClick={openUpdateModal}>Update Profile</button>
        <button className='p-3 text-black bg-yellow-400 rounded-md relative top-5' onClick={handleLogout}>Logout</button>
        </div>


      </div>

    </div>
  );
};

export default Profile;
