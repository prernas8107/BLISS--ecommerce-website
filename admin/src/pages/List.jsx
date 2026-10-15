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
      toast.error(error.response?.data?.message || error.message)
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
      toast.error(error.response?.data?.message || error.message)
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
        <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_2fr_1fr_auto] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 font-semibold text-xs sm:text-sm text-gray-600 bg-gray-100 items-center">
          <span className="w-12 text-center">Image</span>
          <span>Name</span>
          <span className="hidden sm:block">Category</span>
          <span className="hidden md:block">Price</span>
          <span className="text-center w-10">Action</span>
        </div>
        {/* ------Product list------ */}
        {
          list.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-base font-medium">No products found in the database.</p>
              <p className="text-sm mt-1">Go to "Add Items" in the sidebar to add your first product.</p>
            </div>
          ) : (
            list.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_2fr_1fr_auto] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 border-t border-gray-200 items-center text-xs sm:text-sm"
              >
                <img
                  className="w-12 h-12 object-cover rounded shrink-0 bg-gray-50"
                  src={item.image && item.image[0] ? item.image[0] : ""}
                  alt={item.name}
                />
                <div className="min-w-0">
                  <p className="truncate sm:whitespace-normal font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500 md:hidden mt-0.5">{currency}{item.price}</p>
                </div>
                <p className="hidden sm:block text-gray-600">{item.category}</p>
                <p className="hidden md:block font-medium">{currency}{item.price}</p>
                <div className="text-center w-10">
                  <span onClick={()=>removeProduct(item._id)} className="cursor-pointer text-base sm:text-lg font-bold text-red-500 hover:text-red-700 p-2 inline-block">
                    ✕
                  </span>
                </div>
              </div>
            ))
          )
        }

      </div>
    </>

  )
}

export default List