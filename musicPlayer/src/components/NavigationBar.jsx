import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const NavigationBar = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='w-full flex items-center font-semibold fixed top-0 pt-5 pb-5 pl-2.5 bg-[#121212]'>
                {/* Home Icon on the left */}
                <div className='flex items-center gap-2'>
                    <img onClick={() => navigate('/')} className='w-8 bg-[#010101] p-2 rounded-2xl cursor-pointer' src={assets.home_icon} alt="" />
                </div>

                {/* Spacer to push the right icons to the right */}
                <div className='flex-grow'></div>

                {/* Right-aligned icons */}
                <div className='flex items-center gap-2 pr-14'>
                    <img onClick={() => navigate(-1)} className='w-8 bg-[#010101] p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
                    <img onClick={() => navigate(1)} className='w-8 bg-[#010101] p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
                </div>
            </div>
        </>
    )
}

export default NavigationBar