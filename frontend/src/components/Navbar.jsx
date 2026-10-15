import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [visible, setVisible] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const {setShowSearch, getCartCount,navigate,token,setToken,setCartItems}= useContext(ShopContext);
    const logout = ()=>{
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        setProfileOpen(false)
        setVisible(false)
    }

    return (
        <div className='flex items-center justify-between py-4 sm:py-5 font-medium relative'>
            <Link to="/"><img src={assets.blisslogo2} className='w-32 sm:w-40 md:w-44 h-auto' alt="BLISS" /></Link>
            <ul className='hidden sm:flex gap-4 md:gap-6 lg:gap-8 text-xs md:text-sm text-gray-600'>
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-400 hidden' />
                </NavLink>
                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-400 hidden' />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-400 hidden' />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-400 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-3 sm:gap-5 md:gap-6'>
                <img onClick={()=>setShowSearch(true)} src={assets.search2} className='w-5 sm:w-6 cursor-pointer hover:opacity-75 transition-opacity' alt="Search" />
                
                <div className='group relative'>
                    <img 
                        onClick={()=>token ? setProfileOpen(prev => !prev) : navigate('/login')} 
                        src={assets.account} 
                        className='w-5 sm:w-6 cursor-pointer hover:opacity-75 transition-opacity' 
                        alt="Account" 
                    />
                    {/* Drop down menu - supports both desktop hover and touch device click */}
                    {
                        token && 
                        <div className={`${profileOpen ? 'block' : 'hidden'} group-hover:block absolute dropdown-menu right-0 pt-4 z-50`}>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg text-sm'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={()=>{setProfileOpen(false); navigate('/orders')}} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }
                </div>

                <Link to="/cart" className='relative'>
                    <img src={assets.cart3} className='w-5 sm:w-6 min-w-5 cursor-pointer' alt="Cart" />
                    <p className="absolute -right-1 -bottom-1 flex items-center justify-center w-4 h-4 bg-black text-white rounded-full text-[8px] leading-none"> {getCartCount()}</p>
                </Link>
                
                <img onClick={() => setVisible(true)} src={assets.menu} className="w-5 sm:w-6 cursor-pointer sm:hidden" alt="Menu" />
            </div>

            {/* Backdrop overlay for mobile menu */}
            {visible && (
                <div 
                    onClick={() => setVisible(false)} 
                    className='fixed inset-0 bg-black/40 z-40 sm:hidden transition-opacity'
                />
            )}

            {/* Sidebar menu drawer for small screens / phones / iOS */}
            <div className={`fixed top-0 right-0 bottom-0 z-50 overflow-y-auto bg-white shadow-xl transition-all duration-300 ${visible ? "w-[75vw] max-w-xs" : "w-0"} sm:hidden`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-gray-50'>
                        <img className='h-4 rotate-180' src={assets.dropdown} alt="" />
                        <p className='font-semibold text-gray-800 text-sm'>Close Menu</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b text-sm font-medium" to="/">HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b text-sm font-medium" to="/collection">COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b text-sm font-medium" to="/about">ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b text-sm font-medium" to="/contact">CONTACT</NavLink>
                    
                    {token ? (
                        <>
                            <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b text-sm font-medium" to="/orders">MY ORDERS</NavLink>
                            <p onClick={logout} className="py-3 pl-6 border-b text-sm font-medium cursor-pointer text-red-500 hover:bg-gray-50">LOGOUT</p>
                        </>
                    ) : (
                        <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b text-sm font-medium text-black font-semibold" to="/login">LOGIN / REGISTER</NavLink>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar