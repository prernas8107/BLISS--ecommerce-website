import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>


            {/* hero left */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-12 md:py-0 px-4 sm:px-6'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                        <p className='font-medium text-xs sm:text-sm md:text-base'>OUR BESTSELLERS</p>
                    </div>
                    <h1 className='prata-regular text-2xl sm:text-3xl lg:text-5xl sm:py-3 leading-tight sm:leading-relaxed'>Latest Arrivals</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-xs sm:text-sm md:text-base'>SHOP NOW</p>
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                    </div>
                </div>
            </div>
            {/* hero right side */}
            <img src={assets.hero} className='w-full sm:w-1/2 object-cover' alt="Hero" />
        </div>
    )
}

export default Hero