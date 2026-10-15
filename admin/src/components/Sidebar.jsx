import React from 'react'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className="fixed top-[70px] left-0 h-[calc(100vh-70px)] w-14 sm:w-16 md:w-56 lg:w-64 bg-white border-r border-gray-200 shadow-sm z-40 transition-all">
      <div className='flex flex-col gap-3 pt-6 pl-2 sm:pl-3 md:pl-6 text-sm font-medium'>
        <NavLink 
          className='flex items-center justify-center md:justify-start gap-3 border border-gray-300 border-r-0 px-2 sm:px-3 py-2.5 rounded-l hover:bg-gray-50 transition-colors' 
          to="/add"
          title="Add Items"
        >
          <img className='w-5 h-5 shrink-0' src={assets.add_icon} alt="" />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink 
          className='flex items-center justify-center md:justify-start gap-3 border border-gray-300 border-r-0 px-2 sm:px-3 py-2.5 rounded-l hover:bg-gray-50 transition-colors' 
          to="/list"
          title="List Items"
        >
          <img className='w-5 h-5 shrink-0' src={assets.order1} alt="" />
          <p className='hidden md:block'>List Items</p>
        </NavLink>
        <NavLink 
          className='flex items-center justify-center md:justify-start gap-3 border border-gray-300 border-r-0 px-2 sm:px-3 py-2.5 rounded-l hover:bg-gray-50 transition-colors' 
          to="/orders"
          title="Orders"
        >
          <img className='w-5 h-5 shrink-0' src={assets.order2} alt="" />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar