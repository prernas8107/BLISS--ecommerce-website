import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-8 sm:my-10 flex flex-col md:flex-row gap-8 sm:gap-16'>
        <img className='w-full md:max-w-[450px] object-cover rounded' src={assets.about} alt="About Bliss" />
        <div className='flex flex-col justify-center gap-4 sm:gap-6 md:w-2/4 text-gray-600 text-sm sm:text-base leading-relaxed'>
          <p>Bliss brings joy to shopping with curated products, seamless payments, and trusted delivery. Discover fashion, lifestyle, and essentials designed to inspire everyday happiness, convenience, and effortless online experiences.</p>
          <p>We bring together fashion, lifestyle, and everyday essentials in one seamless platform. With secure payments, fast delivery, and curated collections, Bliss ensures every purchase feels rewarding. Our mission is simple: to inspire happiness, convenience, and confidence in every online shopping experience.</p>
          <b className='text-gray-800 text-base sm:text-lg'>Our Mission</b>
          <p>Our mission is to deliver joyful, seamless shopping experiences, inspiring happiness, trust, and convenience through curated products and reliable service.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
         <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 gap-3 md:gap-0'>
        <div className='border border-gray-300 px-6 sm:px-10 md:px-12 py-8 sm:py-16 flex flex-col gap-3 sm:gap-5 flex-1'>
          <b>Quality Assurance :</b>
          <p className='text-gray-600'>We ensure excellence by delivering reliable products, consistent standards, seamless service, and customer satisfaction through continuous quality improvement.</p>
        </div>
        <div className='border border-gray-300 px-6 sm:px-10 md:px-12 py-8 sm:py-16 flex flex-col gap-3 sm:gap-5 flex-1'>
          <b>Convenience :</b>
          <p className='text-gray-600'>At Bliss, convenience means effortless shopping with intuitive navigation, secure payments, fast delivery, and curated essentials—simplifying everyday life while ensuring customers enjoy seamless, stress‑free online experiences.</p>
        </div>
        <div className='border border-gray-300 px-6 sm:px-10 md:px-12 py-8 sm:py-16 flex flex-col gap-3 sm:gap-5 flex-1'>
          <b>Exceptional Customer Service :</b>
          <p className='text-gray-600'>Bliss delivers exceptional customer service through personalized support, quick solutions, attentive care, and a commitment to delighting every shopper with seamless, trustworthy, and joyful shopping experiences.</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About