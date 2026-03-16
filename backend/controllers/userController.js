import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"


const createToken = (id) => {// ye id jaegi auth.js k token_decode
    return jwt.sign({ id }, process.env.JWT_SECRET)
}




//Route for  user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })

        }
        const isMatch = await bcrypt.compare(password, user.password);//user.password is the saved password  of database
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}





//register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        //checking user exists or not
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        //validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong Password" })
        }

        //hashing user Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        //new user creation
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}






//adminLogin
const adminLogin = async (req, res) => {
try {
    const {email,password} = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password ,process.env.JWT_SECRET);
        res.json({success:true,token})
    }else{
        res.json({ success: false, message: "Invalid credentials"})
    }
} catch (error) {
     console.log(error);
        res.json({ success: false, message: error.message })
}
}


export { loginUser, registerUser, adminLogin }