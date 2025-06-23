import React from 'react'
import { assets } from '../../assets/assets'
import Searchbar from './Searchbar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>
      <h1 className='text-3xl font-medium text-black'>
        “Success is not the key to happiness. <br/>Happiness is the key to success.<br/> If you love what you are studying, <span 
        className='text-blue-600'>you will be successful.”</span>
      <img src={assets.sketch} alt="sketch" className='md:block hidden absolute -bottom-7 right-0' /></h1>
      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'> It’s time to step up to the plate and get
         passionate about your work commit to making eLearning courses that don't bore people to tears, but instead inspire 
         and motivate them to learn a new skill, change a certain behavior, or improve their performance.”</p>
         <p className='md:hidden text-gray-500 max-w-sm mx-auto'>We bring together world class instructors to help you achieve your professional goals.</p>
         <Searchbar/>
    </div>
  )
}

export default Hero
