import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext) //destructuring from shopcontext

  const [cartData, setCartData] = useState([])

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData)
    }


  }, [cartItems, products])




  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={"MY"} text2={"CART"} />
      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)
            if (!productData) return null;

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[1fr_auto_auto] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-3 sm:gap-4'>
                <div className='flex items-start gap-3 sm:gap-6 min-w-0'>
                  <img className='w-14 sm:w-20 aspect-square object-cover rounded shrink-0' src={productData.image && productData.image[0] ? productData.image[0] : ''} alt="" />
                  <div className='min-w-0 flex-1'>
                    <p className='text-xs sm:text-base md:text-lg font-medium truncate sm:whitespace-normal'>{productData.name}</p>
                    <div className='flex items-center gap-3 sm:gap-5 mt-1 sm:mt-2 text-xs sm:text-sm'>
                      <p className='font-semibold'>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 py-0.5 sm:py-1 border bg-slate-50 rounded text-xs'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border w-12 sm:w-20 px-1 sm:px-2 py-1 text-center text-sm rounded outline-none' type="number" min={1} defaultValue={item.quantity} />
                <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 sm:w-5 cursor-pointer hover:opacity-75 shrink-0 ml-1 sm:ml-4' src={assets.bin_icon} alt="Delete" />
              </div>
            )
          })
        }
      </div>
      <div className='flex justify-end my-12 sm:my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end mt-6 sm:mt-8'>
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm px-8 py-3.5 w-full sm:w-auto rounded-sm active:scale-95 transition cursor-pointer'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart