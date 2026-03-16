import React from 'react'
import {assets} from '../assets/assets.js'   // use default export for simplicity

const Navbar = ({setToken}) => {
  return (

    <div className="fixed top-0 left-0 w-full h-[70px] bg-white shadow-md flex items-center justify-between px-[5%] z-50">      {/* Logo */}
      <img
        className="w-[140px] sm:w-[180px] md:w-[200px] cursor-pointer"
        src={assets.blisslogoAdmin}
        alt="Bliss Logo"
      />

      {/* Logout Button */}
      <button onClick={()=>setToken('')} className="bg-gray-700 hover:bg-gray-800 transition-colors text-white px-6 py-2 sm:px-8 sm:py-2 rounded-full text-sm font-medium">
        Logout
      </button>
    </div>
  )
}

export default Navbar
