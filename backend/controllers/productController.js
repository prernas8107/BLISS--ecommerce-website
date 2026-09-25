import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"


//function for add product
const addProduct = async (req,res)=>{
        try {
            const { name,description,price,category,subCategory,sizes,bestseller} = req.body

            const image1 = req.files && req.files.image1 ? req.files.image1[0] : undefined
            const image2 = req.files && req.files.image2 ? req.files.image2[0] : undefined
            const image3 = req.files && req.files.image3 ? req.files.image3[0] : undefined
            const image4 = req.files && req.files.image4 ? req.files.image4[0] : undefined
           
            //cloudinary upload
            const images=[image1,image2,image3,image4].filter((item)=> item !== undefined)

            let imagesUrl = await Promise.all(
                images.map(async(item)=>{
                    let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                    return result.secure_url
                })
            )

            let parsedSizes = [];
            if (typeof sizes === 'string') {
                try {
                    parsedSizes = JSON.parse(sizes);
                } catch {
                    parsedSizes = sizes.split(',').map(s => s.trim());
                }
            } else if (Array.isArray(sizes)) {
                parsedSizes = sizes;
            }

            const productData ={
                name,
                description,
                category,
                price :Number(price),
                subCategory,
                bestseller: bestseller === "true" || bestseller === true ? true : false,
                sizes : parsedSizes,
                image : imagesUrl,
                date : Date.now()
            }
            console.log(productData);

            const product = new productModel(productData);
            await product.save()

            res.json({success:true,message:"Product Added"})
        } catch (error) {
            console.log(error);
            res.json({success :false,message : error.message})
        }
}



//function for list product
const listProducts = async (req,res)=>{
    try {
        const products= await productModel.find({})
        res.json({success:true,products})
    } catch (error) {
        console.log(error);
        res.json({success :false,message : error.message})
    }
    
}


//function for removing product
const removeProduct = async (req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
         console.log(error);
        res.json({success :false,message : error.message})
    }
}

//function for single product info
const singleProduct = async (req,res)=>{
    try {
        const {productId}= req.body;
        const product =await productModel.findById(productId)
        if (!product) {
            return res.json({success:false,message:"Product not found"})
        }
        res.json({success:true,product})
    } catch (error) {
        console.log(error);
        res.json({success :false,message : error.message})

    }
}

const sampleProducts = [
  {
    name: "Women pink and white shirt",
    description: "A lightweight cotton shirt with decent and elegant look",
    price: 300,
    image: ["http://localhost:4000/images/img1.1.png", "http://localhost:4000/images/img1.2.png", "http://localhost:4000/images/img1.3.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Men Blue shirt",
    description: "A lightweight cotton shirt with decent and elegant look",
    price: 500,
    image: ["http://localhost:4000/images/img2.1.png", "http://localhost:4000/images/img2.2.png", "http://localhost:4000/images/img2.3.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Pink Jersey",
    description: "A lightweight jersey with decent and elegant look",
    price: 400,
    image: ["http://localhost:4000/images/img3.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Wide Leg Jeans",
    description: "A lightweight jeans with decent and elegant look",
    price: 599,
    image: ["http://localhost:4000/images/img4.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Black tshirt",
    description: "A lightweight cotton shirt with decent and elegant look",
    price: 200,
    image: ["http://localhost:4000/images/img5.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "jeans",
    description: "A lightweight bootcut jenas with decent and elegant look",
    price: 900,
    image: ["http://localhost:4000/images/img6.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Men Blue Jeans",
    description: "A lightweight Jeans with decent and elegant look",
    price: 1000,
    image: ["http://localhost:4000/images/img7.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Men Blue Jeans",
    description: "A lightweight jeans with decent and elegant look",
    price: 800,
    image: ["http://localhost:4000/images/img8.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: false
  },
  {
    name: "Men Blue shirt",
    description: "A lightweight cotton shirt with decent and elegant look",
    price: 500,
    image: ["http://localhost:4000/images/img9.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Men Pink shirt",
    description: "A lightweight cotton shirt with decent and elegant look",
    price: 800,
    image: ["http://localhost:4000/images/img10.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: false
  },
  {
    name: "Girl Co-ord Set",
    description: "A lightweight coord set with decent and elegant look",
    price: 500,
    image: ["http://localhost:4000/images/img11.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: false
  },
  {
    name: "white Blue summer set",
    description: "A lightweight summer set with decent and elegant look",
    price: 500,
    image: ["http://localhost:4000/images/img12.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Men Black Shirt",
    description: "A lightweight summer set with decent and elegant look",
    price: 900,
    image: ["http://localhost:4000/images/img13.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: false
  },
  {
    name: "Men Brown linen Shirt",
    description: "A lightweight summer set with decent and elegant look",
    price: 370,
    image: ["http://localhost:4000/images/img14.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Men orange & Creame t-shirt",
    description: "A lightweight summer set with decent and elegant look",
    price: 900,
    image: ["http://localhost:4000/images/img15.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: false
  },
  {
    name: "Men Black t-shirt",
    description: "A lightweight summer set with decent and elegant look",
    price: 990,
    image: ["http://localhost:4000/images/img16.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: false
  },
  {
    name: "Men Polo Neck Brown t-shirt",
    description: "A lightweight summer set with decent and elegant look",
    price: 560,
    image: ["http://localhost:4000/images/img17.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: false
  },
  {
    name: "Floral Embroidered Bell Sleeve Cotton Peplum Top",
    description: "A lightweight cotton shirt with decent and elegant look",
    price: 480,
    image: ["http://localhost:4000/images/img18.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Sweetheart Neck Cotton Crop Regular Top",
    description: "A lightweight cotton shirt with decent and elegant look",
    price: 380,
    image: ["http://localhost:4000/images/img19.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Ethnic Printed Cuban Collar Shirt Style Top",
    description: "A lightweight cotton shirt with decent and elegant look",
    price: 600,
    image: ["http://localhost:4000/images/img20.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  }
];

const seedProducts = async (req, res) => {
    try {
        const count = await productModel.countDocuments();
        if (count > 0) {
            return res.json({ success: true, message: `Database already has ${count} products`, count });
        }
        await productModel.insertMany(sampleProducts);
        console.log(`✅ Seeded ${sampleProducts.length} sample products into MongoDB!`);
        res.json({ success: true, message: `Successfully seeded ${sampleProducts.length} sample products!` });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const autoSeedIfEmpty = async () => {
    try {
        const count = await productModel.countDocuments();
        if (count === 0) {
            await productModel.insertMany(sampleProducts);
            console.log(`🌱 Auto-seeded ${sampleProducts.length} sample products into empty database.`);
        }
    } catch (error) {
        console.error("Auto-seed error:", error.message);
    }
};

export { listProducts, addProduct, removeProduct, singleProduct, seedProducts, autoSeedIfEmpty }