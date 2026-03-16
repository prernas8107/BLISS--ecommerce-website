import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean },
    date: { type: Number, required: true },
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema)
//whenever we run the project the model will created multiple times and we will create the model only once so to solve
//error here we use  mongoose.models.product ||  by using this when the product model is already availabele it will  be used


export default productModel;