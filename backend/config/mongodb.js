import mongoose from "mongoose";
 

//whenver the mongodb connection establishes this function executed
mongoose.connection.on('connected',()=>{
    console.log("DB Connected");
})


//mongodb connection
const connectDB = async ()=> {
    await mongoose.connect(`${process.env.MONGODB_URI}`)
}
export default connectDB;