import React from 'react'


const about = () => {
  return (
    <div>
    <div className='flex flex-col gap-6 md:flex'>

      <div className='text-center'> 
        <h1 className='text-3xl font-bold mt-[80px] md:text-[35px]'> Welcome to myTutor</h1>
        <p className='text-lg font-normal mt-2 md:text-[20px] md:mt-4'>At myTutor, we're passionate about connecting individuals with the resources they need to thrive. Out platform was born of a simple realization: finding a qualified tutor nearby for a specific task shouldn't be a daunting task.</p>
      </div>

      <div className='flex flex-col bg-orange-400 rounded-lg justify-between p-6 gap-5 md:grid md:grid-cols-12 md:mt-6 md:p-10'>
          <div className='relative w-24 h-24 mx-auto md:col-span-2 md:my-auto lg:h-32 lg:w-32'>
           <img src="/mission.png" fill className='rounded-full'/>
          </div>
          <div className='col-span-10 md:-order-1'>
           <h1 className='text-2xl text-center font-serif font-semibold md:text-[35px]'>Our Mission</h1>
           <p className='mt-2 text-base text-center font-serif md:font-normal md:mt-4 md:text-[18px]'>Our mission is to make learning accessible and personalized by connecting learners with local tutors who are experts in their fields. We believe that everyone should have the opportunity to pursue their passions and enhance their skills, regardless of where they live or their background.
           </p>
          </div>
      </div>

      <div className='flex flex-col bg-orange-400 rounded-lg justify-between p-6 gap-5 md:grid md:grid-cols-12 md:p-10'>
          <div className='relative w-24 h-24 mx-auto md:col-span-2 md:my-auto lg:h-32 lg:w-32'>
           <img src="/howitworks.jpeg" fill className='rounded-full'/>
          </div>
          <div className='md:col-span-10'>
           <h1 className='text-2xl text-center font-serif font-semibold md:text-[35px]'>How It Works</h1>
           <p className='mt-2 text-base text-center font-serif md:font-normal md:mt-4 md:text-[18px]'>Using myTutor is simple. Just tell us what you want to learn and your location, and we'll match you with your nearby tutors who specialize in that skill. Whether you're looking to master a new language, improve your math skills, or learn a musical instrument, we've got you covered.
           </p>
          </div>
      </div>

      <div className='flex flex-col bg-orange-400 rounded-lg justify-between p-6 gap-5 md:grid md:grid-cols-12 '>
          <div className='relative w-24 h-24 mx-auto md:col-span-2 md:my-auto lg:h-32 lg:w-32'>
           <img src="/whychoose.jpeg" fill className='rounded-full'/>
          </div>
          <div className='md:col-span-10 md:-order-1'>
           <h1 className='text-2xl text-center font-serif font-semibold md:text-[35px]'>Why Choose myTutor</h1>
           <ul className='mt-2 text-base text-left font-serif list-disc list-inside marker:text-black md:font-normal md:mt-4 md:text-[18px] md:pl-6'>
            <li><span className='font-semibold text-black'>Personalized Learning:</span> Our Platform connects you with tutors who tailor their approach to your unique learning style and goals.</li>
            <li><span className='font-semibold text-black'>Convenience:</span> Say goodbye to long commutes and scheduling conflicts. With myTutor, you can find a tutor who's right in your neighborhood</li>
            <li><span className='font-semibold text-black'>Quality assurance:</span> We carefully vet all our tutors to ensure they have the expertise and experience to provide top-notch instruction</li>
            <li><span className='font-semibold text-black'>Community:</span> Join a vibrant community of learners and tutors who share your passion for knowledge and growth.</li>
           </ul>
          </div>
      </div>

      <div className='flex flex-col bg-orange-400 rounded-lg justify-between p-6 gap-5 md:grid md:grid-cols-12'>
          <div className='relative w-24 h-24 mx-auto md:col-span-2 md:my-auto lg:h-32 lg:w-32'>
           <img src="/promise.jpeg" fill className='rounded-full'/>
          </div>
          <div className='md:col-span-10'>
           <h1 className='text-2xl text-center font-serif font-semibold md:text-[35px]'>Our Promise</h1>
           <p className='mt-2 text-base text-center font-serif md:font-normal md:mt-4 md:text-[18px]'>At myTutor, we're committed to empowering individuals to unlock their full potential. Whether you're a student striving for academic excellence, a professional looking to acquire new skills, or someone simply curious to learn something new, we're here to support you every step of the way.</p>
          </div>
      </div>

      <div className='flex flex-col bg-orange-400 rounded-lg justify-between p-6 gap-5 md:grid md:grid-cols-12'>
          <div className='relative w-24 h-24 mx-auto md:col-span-2 md:my-auto lg:h-32 lg:w-32'>
           <img src="/joinus.jpeg" fill className='rounded-full'/>
          </div>
          <div className='md:col-span-10 md:-order-1'>
           <h1 className='text-2xl text-center font-serif font-semibold md:text-[35px]'>Join Us</h1>
           <p className='mt-2 text-base text-center font-serif md:font-normal md:mt-4 md:text-[18px]'>Ready to embark on your learning journey? Sign up for myTutor today and start connecting with tutors who can help you achieve your goals.</p>
           <div className='flex justify-center'><button className='content-center p-3 mt-4 min-w-[100px] cursor-pointer rounded-lg bg-sky-600 hover:bg-sky-400 md:min-w-[120px]'>Register</button></div>
          </div>
      </div>






      
    </div>  
    </div>
  )
}

export default about