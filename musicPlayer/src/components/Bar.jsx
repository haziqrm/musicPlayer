import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Check if the current path is the home page
  const isHomePage = location.pathname === '/'

  return (
    <div className='w-[25%] h-screen flex flex-col gap-0 text-black hidden lg:flex'>
      <div className='h-[20%] roundex flex flex-col justify-around'>
        {/* Home button with conditional styling */}
        <div
          onClick={() => navigate('/')}
          className={`h-[100%] flex items-center gap-3 pl-8 cursor-pointer ${isHomePage ? 'bg-[#cfcfcf]' : 'bg-[#e3e3e3]'} hover:bg-[#cfcfcf]`}
        >
          <p className='font-poppins font-normal'>Home</p>
        </div>
        
        <div className='h-[100%] flex items-center gap-3 pl-8 cursor-pointer bg-[#e3e3e3] hover:bg-[#cfcfcf]'>
          <p className='font-poppins font-normal'>Search</p>
        </div>
      </div>
      
      <div className='h-[80%] bg-[#e3e3e3]'>
        <div className='p-4 pl-8 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <p className='text-[#5576ad] font-semibold font-poppins font-normal'>My Library</p>
          </div>
          <div className='flex items-center gap-3 cursor-pointer'>
            <img className='w-5' src={assets.arrow_icon} alt="" />
            <img className='w-5' src={assets.plus_icon} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar