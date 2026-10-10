import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'
import { assets } from '../assets/assets.js'

const Login = ({setToken}) => {

  const [email,setEmail] = useState("")
  const [password,setPassword]= useState("")

  const frontendUrl = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173'

  const onSubmitHandler = async(e)=>{
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin",{email,password})
      if(response.data.success){
        setToken(response.data.token)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col w-full'>
      {/* Top Navigation Bar */}
      <header className='fixed top-0 left-0 w-full h-[70px] bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 sm:px-[5%] z-50'>
        {/* Bliss Admin Logo */}
        <img
          className='w-[140px] sm:w-[180px] md:w-[200px] cursor-pointer'
          src={assets.blisslogoAdmin}
          alt='Bliss Admin Logo'
        />

        {/* Continue as User Link to Frontend */}
        <a
          href={`${frontendUrl}/login`}
          className='flex items-center gap-2 bg-black hover:bg-gray-800 transition-colors text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm'
        >
          <span>Continue as User</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </header>

      {/* Main Login Card Section */}
      <div className='flex-1 flex items-center justify-center px-4 pt-[90px] pb-8 w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full sm:w-[420px]'>
          <h1 className='text-2xl font-bold mb-4 text-gray-800'>Admin Panel</h1>
          <form onSubmit={onSubmitHandler} action="">
            <div className='mb-3'>
              <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
            </div>
            <div className='mb-3'>
              <p className='text-sm font-medium text-gray-700 mb-2'>Enter Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter password' required />
            </div>
            <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition-colors cursor-pointer font-medium' type='submit'>Login</button>
          </form>

          {/* Admin Credentials Info Card */}
          <div className='mt-5 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm'>
            <div className='flex items-center justify-between mb-2'>
              <span className='font-semibold text-gray-800 flex items-center gap-1.5'>
                <span className='inline-block w-2 h-2 rounded-full bg-emerald-500'></span>
                Admin Credentials
              </span>
              <button
                type='button'
                onClick={() => {
                  setEmail('admin@bliss.com');
                  setPassword('bliss123');
                  toast.info('Credentials auto-filled!');
                }}
                className='text-xs text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer'
              >
                Auto Fill
              </button>
            </div>
            <div className='space-y-1 text-gray-600 font-mono text-xs'>
              <p><span className='font-sans font-medium text-gray-700'>Email:</span> admin@bliss.com</p>
              <p><span className='font-sans font-medium text-gray-700'>Password:</span> bliss123</p>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default Login