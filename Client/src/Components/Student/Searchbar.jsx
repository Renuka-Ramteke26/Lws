import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Searchbar = ({data}) => {
const navigate=useNavigate()
const [input,setInput]=useState(data ? data :'')


const onSearchHandler =(e)=>{
    e.preventDefault()
    navigate('/course-list/'+input)
}

  return (
   
      <form onSubmit={onSearchHandler} className='max-w-xl w-full md:h-10 h-9 flex items-center bg-white border border-gray-500/20 rounded'> 
        <img src={assets.search_icon} alt="search_icon" className='md:w-auto w-1 px-3'/>
        <input onChange={e=> setInput(e.target.value)}type='text' placeholder='Search for courses' className='w-full h-full outline-none text-gray-500/80'/>
        <button type='submit' className='bg-blue-600 rounded text-whitemd:px-1 px-7 md:py-1 py-1 mx-1'> Search</button>
        </form>
   
  )
}

export default Searchbar
