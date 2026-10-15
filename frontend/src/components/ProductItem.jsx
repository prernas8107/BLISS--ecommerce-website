import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {
    const {currency} =useContext(ShopContext);
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden rounded-sm bg-gray-100'>
            <img className='w-full aspect-[3/4] object-cover hover:scale-105 transition duration-300 ease-in-out' src={image && image[0] ? image[0] : ''} alt={name || "Product"} />
        </div>
        <p className='pt-3 pb-1 text-xs sm:text-sm truncate'>{name}</p>
        <p className='text-xs sm:text-sm font-semibold'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem