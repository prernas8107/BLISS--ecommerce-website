import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from "react-toastify";


const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)



  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')


  const onSubmitHandler = async (event) => {
    event.preventDefault(); // it will prevent to reload  while submitting the form 
    try {
      if (currentState === 'Sign Up') {
        //register api
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          toast.success('Account created successfully! Please login.')
          setCurrentState('Login')
          setPassword('')
        } else {
          toast.error(response.data.message)
        }
      } else {
        //login api
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)

        } else {
          toast.error(response.data.message)

        }

      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }


  useEffect(()=>{
      if(token){
        navigate('/')
      }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-full max-w-[380px] px-4 sm:px-0 m-auto mt-10 sm:mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-6 sm:mt-10'>
        <p className='prata-regular text-2xl sm:text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input required onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3.5 py-2.5 border border-gray-400 rounded-sm text-base sm:text-sm outline-none focus:border-black' placeholder='Name' />}
      <input required onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3.5 py-2.5 border border-gray-400 rounded-sm text-base sm:text-sm outline-none focus:border-black' placeholder='Email' />
      <input required onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3.5 py-2.5 border border-gray-400 rounded-sm text-base sm:text-sm outline-none focus:border-black' placeholder='Password' />
      <div className='w-full flex justify-between text-xs sm:text-sm mt-[-4px] text-gray-600'>
        <p className='cursor-pointer hover:text-black'>Forgot your password?</p>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:text-black font-medium text-black'>Create account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:text-black font-medium text-black'>Login Here</p>
        }
      </div>
      <button type='submit' className='bg-black text-white font-medium px-8 py-2.5 mt-2 w-full sm:w-auto rounded-sm active:scale-95 transition cursor-pointer text-sm'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login