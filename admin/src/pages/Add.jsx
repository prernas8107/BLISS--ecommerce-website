import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image1,setImage1]=useState(false)
    const [image2,setImage2]=useState(false)
      const [image3,setImage3]=useState(false)

const [name,setName] = useState("")
const [description,setDescription] = useState("")
const [price,setPrice] = useState("")      
const [category,setCategory] = useState("Men")
const [subCategory,setSubCategory] = useState("Topwear")
const [bestseller,setBestseller] = useState(false)
const [sizes,setSizes] = useState([])


const onSubmitHandler= async (e)=>{
  e.preventDefault();

  try {
    const formData = new FormData()
    formData.append("name",name)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("category",category)
    formData.append("subCategory",subCategory)
    formData.append("bestseller",bestseller)
    formData.append("sizes",JSON.stringify(sizes)) //we r gettin sizes in array so to send it will convert into string ,here the array is converted into string and during accesss will again convert into array
    
    image1 && formData.append("image1",image1)
    image2 && formData.append("image2",image2)
    image3 && formData.append("image3",image3)
   
    const response = await axios.post(backendUrl + "/api/product/add",formData,
      {
        headers: {token}
      }
      )

if(response.data.success){
  toast.success(response.data.message)
  setName('')
  setDescription('')
  setImage1(false)
  setImage2(false)
  setImage3(false)
  setPrice('')
}else{
      toast.error(response.data.message)

}
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

  return (
    <form onSubmit={onSubmitHandler} className=" mt-15 md:ml-[220px] p-6 bg-white shadow-md rounded-lg border border-gray-300 max-w-3xl mx-auto space-y-6">
      {/* Upload Section */}
      <p className="text-lg font-semibold text-gray-700 text-center">Upload Image</p>
      <div className="flex flex-wrap justify-center gap-6">
        <label htmlFor="image1" className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-400 transition">
          <img className="w-12 h-12 opacity-70" src={!image1 ? assets.upload : URL.createObjectURL(image1)} alt="Upload" />
          <span className="mt-2 text-sm text-gray-500">Image 1</span>
          <input onChange={(e)=>setImage1(e.target.files[0])} type='file' id='image1' hidden/>
        </label>

        <label htmlFor="image2" className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-400 transition">
          <img className="w-12 h-12 opacity-70" src={!image2 ? assets.upload : URL.createObjectURL(image2)} alt="Upload" />
          <span className="mt-2 text-sm text-gray-500">Image 2</span>
                <input onChange={(e)=>setImage2(e.target.files[0])} type='file' id='image2'hidden/>
        </label>

        <label htmlFor="image3" className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-400 transition">
          <img className="w-12 h-12 opacity-70" src={!image3 ? assets.upload : URL.createObjectURL(image3)} alt="Upload" />
          <span className="mt-2 text-sm text-gray-500">Image 3</span>
         <input onChange={(e)=>setImage3(e.target.files[0])} type='file' id='image3'hidden/>
        </label>
      </div>

      {/* Product Name */}
      <div>
        <p className="text-gray-700 font-medium mb-2">Product Name</p>
        <input 
        onChange={(e)=>setName(e.target.value)}
        value={name}
          type="text" 
          placeholder="Type here" 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
        />
      </div>

      {/* Product Description */}
      <div>
        <p className="text-gray-700 font-medium mb-2">Product Description</p>
        <textarea 
         onChange={(e)=>setDescription(e.target.value)}
        value={description}
          placeholder="Write content area" 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 
                     focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
        />
      </div>

      {/* Product Category & Sub Category side by side on large screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-700 font-medium mb-2">Product Category</p>
          <select onChange={(e)=>setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="text-gray-700 font-medium mb-2">Sub Category</p>
          <select onChange={(e)=>setSubCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
          </select>
        </div>
      </div>

      {/* Product Price */}
      <div>
        <p className="text-gray-700 font-medium mb-2">Product Price</p>
        <input onChange={(e)=>setPrice(e.target.value)}
        value={price}
          type="number" 
          placeholder="Add Price" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
        />
      </div>

      {/* Product Sizes */}
      <div>
        <p className="text-gray-700 font-medium mb-2">Product Sizes</p>
        <div className="flex flex-wrap gap-4">
         <div onClick={() =>
  setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])
} className="px-6 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-pink-100 hover:border-pink-400 transition">
  <p className={`${sizes.includes("S") ? 'bg-pink-100' : 'bg-slate-400'} text-sm font-semibold text-gray-700`}>S</p>
</div>

<div onClick={() =>
  setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])
} className="px-6 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-pink-100 hover:border-pink-400 transition">
  <p className={`${sizes.includes("M") ? 'bg-pink-100' : 'bg-slate-400'} text-sm font-semibold text-gray-700`}>M</p>
</div>

<div onClick={() =>
  setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])
} className="px-6 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-pink-100 hover:border-pink-400 transition">
  <p className={`${sizes.includes("L") ? 'bg-pink-100' : 'bg-slate-400'} text-sm font-semibold text-gray-700`}>L</p>
</div>

        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center gap-2">
        <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller}
          type="checkbox" 
          id="bestseller" 
          className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-300"
        />
        <label 
          htmlFor="bestseller" 
          className="text-gray-700 font-medium cursor-pointer"
        >
          Add to bestseller
        </label>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button 
          type="submit" 
          className="bg-black text-white px-4 py-2  hover:bg-pink-600 transition"
        >
          ADD
        </button>
      </div>
    </form>
  )
}

export default Add
