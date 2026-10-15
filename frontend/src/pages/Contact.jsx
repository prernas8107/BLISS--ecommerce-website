import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>


      <div className='my-8 sm:my-10 flex flex-col justify-center md:flex-row gap-8 sm:gap-10 mb-20 sm:mb-28'>
        <img className='w-full md:max-w-[480px] object-cover rounded' src={assets.contactus} alt="Contact Us" />
        <div className='flex flex-col justify-center items-start gap-4 sm:gap-6 text-sm sm:text-base'>
          <p className='font-semibold text-lg sm:text-xl text-gray-700'>Our Store</p>
          <p className='text-gray-500'>54532 Williams Station <span className='font-medium text-gray-700'>Suite 350, Washington, USA</span></p>
          <p className='text-gray-500'>Tel: (415) 555-01324 <span className='block sm:inline sm:ml-2 font-medium text-gray-700'>Email: admin@bliss.com</span></p>          
          <p className='font-semibold text-lg sm:text-xl text-gray-700 mt-2'>Careers at Bliss</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-3.5 sm:py-4 text-sm hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-auto rounded-sm active:scale-95 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact