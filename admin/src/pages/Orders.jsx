import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

const statusHandler = async (event,orderId)=>{
  try {
    const response = await axios.post(backendUrl + '/api/order/status', {orderId,status: event.target.value},{headers : {token}})
    if(response.data.success){
      await fetchAllOrders()
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response?.data?.message || error.message)
  }
}

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div className="w-full">
      <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">Order Page</h3>
      {
        orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
            No orders placed yet.
          </div>
        ) : (
          orders.map((order, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg shadow-sm p-3 sm:p-5 mb-4 sm:mb-6 flex flex-col md:flex-row md:justify-between md:items-start gap-4 sm:gap-6 bg-white"
            >
              {/* Left section */}
              <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                <img src={assets.parcel} alt="parcel" className="w-12 h-12 sm:w-16 sm:h-16 object-contain shrink-0" />
                <div className="text-xs sm:text-sm text-gray-700 min-w-0 flex-1">
                  <div className="mb-2 font-medium">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="block">
                        {item.name} x {item.quantity} <span className="text-gray-500 font-normal">({item.size})</span>
                      </span>
                    ))}
                  </div>
                  <p className="font-semibold text-gray-900">{order.address.firstName} {order.address.lastName}</p>
                  <p className="text-gray-600">{order.address.street},</p>
                  <p className="text-gray-600">{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                  <p className="text-gray-600 mt-1">📞 {order.address.phone}</p>
                </div>
              </div>

              {/* Right section */}
              <div className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700 md:text-right border-t md:border-t-0 pt-3 md:pt-0">
                <p><span className="font-medium">Items:</span> {order.items.length}</p>
                <p><span className="font-medium">Method:</span> {order.paymentMethod}</p>
                <p><span className="font-medium">Payment:</span> {order.payment ? '✅ Done' : '⌛ Pending'}</p>
                <p><span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                <p className="text-base sm:text-lg font-bold text-green-600">{currency}{order.amount}</p>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="border border-gray-300 rounded px-2.5 py-1.5 mt-2 bg-white text-xs sm:text-sm outline-none cursor-pointer w-full md:w-auto font-medium">
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        )
      }
    </div>

  )
}

export default Orders