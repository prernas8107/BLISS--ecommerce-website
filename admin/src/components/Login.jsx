import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Login = ({setToken}) => {

  const [email,setEmail] = useState("")
  const [password,setPassword]= useState("")

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
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Enter Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter password' required />
          </div>
          <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition-colors cursor-pointer' type='submit'>Login</button>
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
  )
}

export default Login