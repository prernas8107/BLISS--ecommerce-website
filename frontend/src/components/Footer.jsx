import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div className=''>
                    <img src={assets.blisslogo2} className='mb-0 w-50  ' alt="" srcset="" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        We are committed to delivering quality products, exceptional service, and timeless designs that bring comfort and style to everyday life.Driven by innovation and simplicity, we create collections that blend functionality with elegance, designed to make your lifestyle effortless.Our mission is to inspire confidence and joy through thoughtfully crafted products, backed by reliable support and a seamless shopping experience.                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us </li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>91+ 222-33-44</li>
                        <li>contactus@gmail.com</li>
                    </ul>
                    
                </div>
                
     
            </div>
                       <hr/ >
                <p className='py-5 text-sm text-center'> Copywright 2026@ bliss.com - All rights reserved.</p>
        </div>
    )
}

export default Footer