import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Educator/Navbar.jsx'
import Sidebar from '../../Components/Educator/Sidebar.jsx'
import Footer from '../../Components/Educator/Footer.jsx'


const Educator = () => {
  return (
    <div className='flex flex-col min-h-screen text-default  bg-white' >
      <Navbar />
       
    <div className='flex flex-1'>
      <Sidebar/>
      <div className='flex-1 p-4'>
        {<Outlet />}</div>
      </div>
      <Footer/>
    </div>

  )
}

export default Educator
