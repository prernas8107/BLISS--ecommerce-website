import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,unique: true },
    password : { type: String, required: true },
    cartData: { type: Object , default:{} }, //whenever the new user is created it has blank cart means it has one empty object
},{minimize:false}) //cart data minimise wala show ni hoga qki mongoose neglects the empty object which is default{}


const userModel = mongoose.models.user || mongoose.model ('user',userSchema) 

export default userModel;