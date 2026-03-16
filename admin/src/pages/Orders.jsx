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
    toast.error(response.data.message)
  }
}

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div className="p-6">
  <h3 className="text-2xl font-semibold mb-6">Order Page</h3>
  {
    orders.map((order, index) => (
      <div 
        key={index} 
        className="border rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row md:justify-between md:items-start gap-6 bg-white"
      >
        {/* Left section */}
        <div className="flex gap-4">
          <img src={assets.parcel} alt="parcel" className="w-16 h-16 object-contain" />
          <div className="text-sm text-gray-700">
            <div className="mb-2">
              {order.items.map((item, idx) => (
                <span key={idx} className="block">
                  {item.name} x {item.quantity} <span className="text-gray-500">({item.size})</span>
                </span>
              ))}
            </div>
            <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
            <p>{order.address.street},</p>
            <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
            <p className="text-gray-600">📞 {order.address.phone}</p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col gap-2 text-sm text-gray-700 md:text-right">
          <p><span className="font-medium">Items:</span> {order.items.length}</p>
          <p><span className="font-medium">Method:</span> {order.paymentMethod}</p>
          <p><span className="font-medium">Payment:</span> {order.payment ? '✅ Done' : '⌛ Pending'}</p>
          <p><span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
          <p className="text-lg font-semibold text-green-600">{currency}{order.amount}</p>
          <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="border rounded px-2 py-1 mt-2">
            <option>Order Placed</option>
            <option>Packing</option>
            <option>Shipped</option>
            <option>Out for delivery</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>
    ))
  }
</div>

  )
}

export default Orders