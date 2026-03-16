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
      <div className='my-10  flex  flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Bliss brings joy to shopping with curated products, seamless payments, and trusted delivery. Discover fashion, lifestyle, and essentials designed to inspire everyday happiness, convenience, and effortless online experiences.</p>
        <p>We bring together fashion, lifestyle, and everyday essentials in one seamless platform. With secure payments, fast delivery, and curated collections, Bliss ensures every purchase feels rewarding. Our mission is simple: to inspire happiness, convenience, and confidence in every online shopping experience.</p>
        <b className='text-gray-800'> Our Mission</b>
        <p>Our mission is to deliver joyful, seamless shopping experiences, inspiring happiness, trust, and convenience through curated products and reliable service.</p>
        </div>

      </div>
      <div className='text-xl py-4'>
         <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex  flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance : </b>
          <p className='text-gray-600'> We ensure excellence by delivering reliable products, consistent standards, seamless service, and customer satisfaction through continuous quality improvement.</p>
        </div>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience : </b>
          <p  className='text-gray-600'> At Bliss, convenience means effortless shopping with intuitive navigation, secure payments, fast delivery, and curated essentials—simplifying everyday life while ensuring customers enjoy seamless, stress‑free online experiences.</p>
        </div>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service : </b>
          <p  className='text-gray-600'>Bliss delivers exceptional customer service through personalized support, quick solutions, attentive care, and a commitment to delighting every shopper with seamless, trustworthy, and joyful shopping experiences.</p>
        </div>

      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About