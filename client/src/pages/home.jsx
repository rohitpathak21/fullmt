import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = ({openRegisterModal}) => {

  const navigate =useNavigate();
  const { currentUser } = useContext(AuthContext);
  const handleLearnMore = () =>{
    navigate('/about');
  } 

  return (
    <div className='mx-10  text-white flex gap-[100px] md:mx-28 md:mt-10'>
      <div className='flex-1 flex flex-col gap-10 md:mt-20 mt-16'>
        <div className='flex flex-col gap-[10px] text-center md:text-left'>
        <h1 className='text-4xl md:text-5xl font-bold'>Enrich Your Skills,</h1>
        <h1 className='text-4xl md:text-5xl font-bold'>Find Your Passion,</h1>
        <h1 className='text-4xl md:text-5xl font-bold'>Connect With Tutors!</h1>
        </div>
        <div>
        <p className='mt-6 text-lg text-center md:text-left md:text-xl font-normal'>Discover the perfect tutor for your goals. Connect locally for personalized guidance in academics, skills and passions.</p>
        </div>
        <div className='flex gap-10 pt-6 font-medium mx-auto md:mx-0'>
        <button className='p-5 min-w-[120px] cursor-pointer border-none rounded-lg bg-white text-blue-950' onClick={handleLearnMore}>Learn More</button>
        {!currentUser && <button className='p-5 min-w-[120px] cursor-pointer border-none rounded-lg bg-sky-600 hover:bg-sky-400' onClick={openRegisterModal} >Register</button>}
        
        </div> 
      </div>


      <div className='flex-1 hidden md:block'>
        <img src="/placeholder.png" alt="" className='w-56 h-56 relative top-32 right-12'/>
        <img src="/placeholder.png" alt="" className='w-56 h-56 relative left-64 bottom-52'/>
        <img src="/placeholder.png" alt="" className='w-56 h-56 relative left-64 bottom-32'/>

      </div>
    </div>
  )
}

export default Home;
