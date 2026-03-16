import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchList()
  }, [])
  return (
    <>
      <p className="mb-4 text-lg font-semibold text-gray-700">All Products List</p>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        {/* Header row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-4 py-2 font-semibold text-gray-600 bg-gray-100">
          <span>Image</span>
          <span>Name</span>
          <span className="hidden sm:block">Category</span>
          <span className="hidden md:block">Price</span>
          <span className="hidden md:block text-center">Action</span>
        </div>
        {/* ------Product list------ */}
        {
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-4 py-2 border-t border-gray-200 items-center"
            >
              <img
                className="w-12 h-12 object-cover rounded"
                src={item.image[0]}
                alt={item.name}
              />
              <p>{item.name}</p>
              <p className="hidden sm:block">{item.category}</p>
              <p className="hidden md:block">{currency}{item.price}</p>
              <p onClick={()=>removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg text-red-500 hover:text-red-700">
                X
              </p>
            </div>

          ))
        }

      </div>
    </>

  )
}

export default List