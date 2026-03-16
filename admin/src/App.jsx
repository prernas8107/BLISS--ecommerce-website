import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import Login from './components/Login.jsx'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency ="$"

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ?  localStorage.getItem('token') : '') //when user is authenticated then only it can see the after login pg


  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])


  return (
    <div className='bg-gray-50 min-h-screen' >
      <ToastContainer/>
      {token === "" ? <Login setToken={setToken} /> :  //wehen user is not autenticated it will see the login pg if authenticated he will se the after login admin panel
          <>
            <Navbar setToken={setToken} />
            <hr />
           <div className="flex w-full">
  <Sidebar className="w-64" />   {/* Sidebar fixed width */}
 <div className="flex-1 ml-[220px] mt-[70px] my-8 text-gray-600 text-base">
  <Routes>
    <Route path='/add' element={<Add token={token}/>} />
    <Route path='/list' element={<List token={token} />} />
    <Route path='/orders' element={<Orders token={token}/>} />
  </Routes>
</div>

</div>

          </>
      }

    </div>
  )
}

export default App