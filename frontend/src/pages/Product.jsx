import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  const {products,currency,addToCart} = useContext(ShopContext)//products ka data;
  const [productData,setProductData]=useState(false);
  const [image,setImage] = useState('')
  const [size,setSize] =useState("")



  const fetchProductData = async () => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image && item.image[0] ? item.image[0] : '');
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])
  //whenever the productId or products update, fetch the product data and set in state
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*--------- product data---------- */}
      <div className='flex gap-6 sm:gap-12 flex-col sm:flex-row'>
        {/*------------- product image---------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className='flex sm:flex-col overflow-x-auto gap-2 sm:gap-3 sm:w-[20%] w-full'>
            {
              (Array.isArray(productData.image) ? productData.image : []).map((item,index)=>(
                <img 
                  onClick={()=>setImage(item)} 
                  src={item} 
                  key={index} 
                  className={`w-16 sm:w-full aspect-square object-cover flex-shrink-0 cursor-pointer rounded border ${item === image ? 'border-black' : 'border-gray-200'}`} 
                  alt="" 
                />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto max-h-[520px] object-contain sm:object-cover rounded' src={image} alt="" />
          </div>
        </div>
        {/* --------prod info-------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-xl sm:text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star} alt="" className="w-3" />
            <img src={assets.star} alt="" className="w-3" />
            <img src={assets.star} alt="" className="w-3" />
            <img src={assets.star} alt="" className="w-3" />
            <img src={assets.dullstar} alt="" className="w-2.5" />
            <p className='pl-2 text-xs sm:text-sm text-gray-500'>(122)</p>
          </div>
          <p className='mt-4 sm:mt-5 text-2xl sm:text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-4 sm:mt-5 text-gray-500 md:w-4/5 text-sm sm:text-base leading-relaxed'>{productData.description}</p>
          <div className='flex flex-col gap-3 my-6 sm:my-8'>
            <p className='text-sm font-medium'>Select Size </p>
            <div className='flex flex-wrap gap-2'>
            {
              (Array.isArray(productData.sizes) ? productData.sizes : []).map((item,index)=>(
                <button 
                  onClick={()=>setSize(item)} 
                  className={`border py-2 px-4 rounded text-sm cursor-pointer transition ${item === size ? 'border-black bg-black text-white': 'border-gray-300 bg-gray-100 text-gray-800'}`} 
                  key={index}
                >
                  {item}
                </button>
              ))
            }
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3.5 text-sm font-medium active:bg-gray-700 w-full sm:w-auto rounded-sm cursor-pointer' >ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p> 100% Original Product.</p>
            <p> Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
{/* ---------Description and review sectionn---------- */}
<div className='mt-20'>
  <div className="flex">
    <b className='border px-5 py-3 text-sm'>Description</b>
    <p  className='border px-5 py-3 text-sm'> Reviews(122)</p>
  </div>
<div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'> 
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, impedit eos aliquid eaque consequuntur exercitationem id doloremque quibusdam similique nam, beatae a vero animi voluptatum dolore aperiam deleniti? Sunt, consequatur.
Excepturi perferendis harum vitae adipisci, omnis amet? Eos at qui velit necessitatibus? Perferendis, atque numquam. Eveniet quis cumque commodi hic, eos omnis sit sequi ea nesciunt eum facere ipsa impedit?
Pariatur rem quis eaque fuga architecto fugiat, sit eos, nisi delectus, obcaecati aut? Maxime iusto tempore doloremque accusantium ratione illo itaque, tenetur veniam quas aut quam libero, voluptatem reprehenderit maiores.</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam accusamus similique consectetur debitis temporibus quidem architecto deleniti? Ut voluptas excepturi tempore, adipisci blanditiis distinctio accusamus voluptatum fugit corporis, delectus quo?
Officia laboriosam quos dolorem consectetur rem. Ab at doloremque alias quas placeat odio sint facilis maiores, praesentium possimus dicta hic provident vitae similique reiciendis eum, ullam laboriosam magni omnis? Recusandae!</p>
</div>
</div>
{/* --------display related product---------- */}
            <RelatedProducts category = {productData.category} subCategory={productData.subCategory}/>

    </div>
  
  ): <div className="opacity-0"></div>
}

export default Product