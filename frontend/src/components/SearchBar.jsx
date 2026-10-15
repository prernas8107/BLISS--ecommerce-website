import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom';


const SearchBar = () => {

    const  {search,setSearch,showSearch,setShowSearch}= useContext(ShopContext);
    const [visible,setVisible]=useState(false)
    const location = useLocation();//isse seacrch only collecction pg pr hi show hoga


    useEffect(()=>{
        if(location.pathname.includes('collection')){
            setVisible(true)
        }else{
            setVisible(false)
        }
    },[location])
  return  showSearch  && visible?(
    <div className='border-t border-b bg-gray-50 text-center py-4 px-3'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-4 sm:px-5 py-2 rounded-full w-[85%] sm:w-1/2 max-w-xl'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type='text' placeholder='Search'/>
            <img className="w-4 ml-2" src={assets.search2} alt="" />
        </div>
        <img onClick={()=>setShowSearch(false)} className='inline w-4 sm:w-5 cursor-pointer ml-3 align-middle hover:opacity-75' src={assets.close} alt="" />
    </div>
  ):null
}

export default SearchBar