import React from 'react'
import {assets} from '../assets/assets.js'   // use default export for simplicity

const Navbar = ({setToken}) => {
  return (

    <div className="fixed top-0 left-0 w-full h-[70px] bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-3 sm:px-[5%] z-50">
      {/* Logo */}
      <img
        className="w-[110px] sm:w-[160px] md:w-[190px] cursor-pointer"
        src={assets.blisslogoAdmin}
        alt="Bliss Logo"
      />

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Continue as User Link */}
        <a
          href={`${import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173'}/login`}
          className="text-xs sm:text-sm text-gray-700 hover:text-black border border-gray-300 hover:border-gray-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-colors inline-flex items-center gap-1"
        >
          <span className="hidden xs:inline sm:inline">Store</span>
          <span className="xs:hidden">Shop</span>
          <span>→</span>
        </a>

        {/* Logout Button */}
        <button onClick={()=>setToken('')} className="bg-gray-800 hover:bg-black transition-colors text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium cursor-pointer">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
