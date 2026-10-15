import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products,search,showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category,setCategory] =  useState([])
  const [subCategory,setSubCategory]= useState([])
  const [sortType,setSortType]=useState('relavent')


const toggleCategory=(e)=>{
  if (category.includes(e.target.value)){
    setCategory(prev=>prev.filter(item=>item!== e.target.value ))
  }
  else{
    setCategory(prev=>[...prev,e.target.value])
  }
}

const toggleSubCategory=(e)=>{
  if (subCategory.includes(e.target.value)){
    setSubCategory(prev=>prev.filter(item=>item!== e.target.value ))
  }
  else{
    setSubCategory(prev=>[...prev,e.target.value])
  }
}


const applyFilter = () => {
  let productsCopy = products.slice();

  if (showSearch && search) {
    productsCopy = productsCopy.filter(item => item.name?.toLowerCase().includes(search.toLowerCase()))
  }

  if (category.length > 0) {
    productsCopy = productsCopy.filter(item => category.includes(item.category))
  }
  if (subCategory.length > 0) {
    productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
  }

  switch (sortType) {
    case 'low-high':
      productsCopy.sort((a, b) => a.price - b.price);
      break;
    case 'high-low':
      productsCopy.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  setFilterProducts(productsCopy)
}

useEffect(() => {
  applyFilter();
}, [category, subCategory, search, showSearch, products, sortType])
                                                   // applyfilter()  is for category,subcategory  & sortProduct is for sortType search me bi kamm aajaega
  return (
    <div className='flex flex-col sm:flex-row gap-4 sm:gap-10 pt-6 sm:pt-10 border-t'>

      {/* Filter Options*/}
      <div className='w-full sm:w-60 shrink-0'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-lg sm:text-xl flex items-center justify-between sm:justify-start gap-2 cursor-pointer font-medium text-gray-700'>
          <span>FILTERS</span>
          <img
            className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown}
            alt=""
          />
        </p>
        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-3 sm:mt-6 rounded-sm ${showFilter ? "block" : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="checkbox" className='w-3.5 h-3.5' value={'Men'} checked={category.includes('Men')} onChange={toggleCategory} /> Men
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="checkbox" className='w-3.5 h-3.5' value={'Women'} checked={category.includes('Women')} onChange={toggleCategory} /> Women
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="checkbox" className='w-3.5 h-3.5' value={'Kids'} checked={category.includes('Kids')} onChange={toggleCategory} /> Kids
            </label>
          </div>
        </div>

        {/* subcategory filters */}
        <div className={`border border-gray-300 pl-5 py-3 my-4 rounded-sm ${showFilter ? "block" : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="checkbox" className='w-3.5 h-3.5' value={'Topwear'} checked={subCategory.includes('Topwear')} onChange={toggleSubCategory}/> Topwear
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="checkbox" className='w-3.5 h-3.5' value={'Bottomwear'} checked={subCategory.includes('Bottomwear')} onChange={toggleSubCategory} /> Bottomwear
            </label>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        {/* Header & Product Sort */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-xs sm:text-sm px-3 py-1.5 outline-none rounded bg-white w-full sm:w-auto cursor-pointer'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 gap-y-6'>
          {
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          }
        </div>
      </div>
      {/* Map products */}

    </div>
  )
}

export default Collection