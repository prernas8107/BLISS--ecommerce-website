import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const {backendUrl,token,currency}= useContext(ShopContext);

  const [orderData,setorderData]=useState([])

  const loadOrderData = async()=>{
    try {
      if(!token){
        return null 
      }
      const response = await axios.post(backendUrl + '/api/order/userOrders',{},{headers: {token}})
      if(response.data.success){
        let allOrdersItem =[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']= order.status
            item['payment']= order.payment
            item['paymentMethod']= order.paymentMethod
            item['date']= order.date
            allOrdersItem.push(item)

          })
        })
        setorderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token]);


  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={"MY"} text2={'ORDERS'}/>
      </div>
      <div className='mt-4'>
        {
          orderData.length === 0 ? (
            <p className='text-gray-500 py-12 text-center text-sm'>No orders found.</p>
          ) : (
            orderData.map((item,index)=>(
              <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex items-start gap-3 sm:gap-6 text-sm min-w-0'>
                  <img className='w-14 sm:w-20 aspect-square object-cover rounded shrink-0' src={item.image && item.image[0] ? item.image[0] : ''} alt="" />
                  <div className='min-w-0 flex-1'>
                    <p className='text-sm sm:text-base font-medium'>{item.name}</p>
                    <div className='flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs sm:text-sm text-gray-700'> 
                      <p className='font-semibold'>{currency}{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: <span className='border px-1.5 py-0.5 bg-gray-50 rounded text-xs'>{item.size}</span></p>
                    </div>
                    <p className='mt-1 text-xs sm:text-sm text-gray-500'>Date: <span className='text-gray-700'>{new Date(item.date).toDateString()}</span></p>
                    <p className='mt-0.5 text-xs sm:text-sm text-gray-500'>Payment: <span className='text-gray-700'>{item.paymentMethod}</span></p>
                  </div>
                </div>
                <div className='md:w-1/2 flex items-center justify-between gap-2 border-t md:border-t-0 pt-2 md:pt-0'>
                  <div className='flex items-center gap-2'>
                    <p className='min-w-2.5 h-2.5 rounded-full bg-green-500'></p>
                    <p className='text-xs sm:text-sm md:text-base font-medium'>{item.status}</p>
                  </div>
                  <button onClick={loadOrderData} className='border border-gray-300 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-sm hover:bg-gray-50 active:scale-95 transition cursor-pointer'>Track Order</button>
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

export default Orders