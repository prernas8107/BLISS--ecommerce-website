import express from "express";
import cors from "cors";
import "dotenv/config"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


//App Config
const app = express();
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

//middleware
app.use(express.json())
app.use(cors());


//api endpoints
app.use('/api/user',userRouter) //controller me bnra h express.Router() through the end pt will be /api/user/register,admin,login 
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)



app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=> console.log('Server is running on Port :' + port ))
