import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler =(event)=>{
    event.preventDefault()
  }
  return (
    <div className='text-center'>
    <p className='text-2xl font-medium text-gray-800'> Subscribe now &  get 20% off</p>
    <p className='text-gray-400 mt-3'> 
Subscribe today and unlock exclusive discounts instantly.Join our list now — save more on every purchase!   </p>
    <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center mx-auto my-6 border pl-3 rounded-none overflow-hidden'>
      <input className='w-full flex-1 outline-none min-w-0 text-sm' type='email' placeholder='Enter your email' required/>
      <button type='submit' className='bg-black text-white text-xs px-5 sm:px-10 py-3.5 sm:py-4 shrink-0 font-medium'>SUBSCRIBE</button>
    </form>
    </div>
  )
}

export default NewsletterBox