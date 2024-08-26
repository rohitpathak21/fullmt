import React from 'react'

const Home = () => {
  return (
    <div className='text-white flex gap-[100px] mx-28 mt-10'>
      <div className='flex-1 flex flex-col gap-6 mt-20'>
        <div className='flex flex-col gap-[10px]'>
        <h1 className='text-5xl font-bold'>Enrich Your Skills,</h1>
        <h1 className='text-5xl font-bold'>Find Your Passion,</h1>
        <h1 className='text-5xl font-bold'>Connect With Tutors!</h1>
        </div>
        <div>
        <p className='mt-6 text-xl font-normal'>Discover the perfect tutor for your goals. Connect locally for personalized guidance in academics, skills and passions.</p>
        </div>
        <div className='flex gap-10 pt-6 font-medium'>
        <button className='p-5 min-w-[120px] cursor-pointer border-none rounded-lg bg-white text-blue-950'>Learn More</button>
        <button className='p-5 min-w-[120px] cursor-pointer border-none rounded-lg bg-sky-600 hover:bg-sky-400' >Register</button>
        
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