import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    useEffect(() => {
        // console.log(products); shop context se data aara h ye check krne k liye
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])
    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Our best sellers shine with vibrant colors, bold patterns, and innovative designs that transform ordinary moments into extraordinary lifestyle statements
                </p>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-12'>
                    {
                        bestSeller.map((item, index) => (
                            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BestSeller