import jwt from 'jsonwebtoken'

const authUser = async (req,res,next) =>{
    const {token } = req.headers;
    if(!token){
        return res.json({success:false,message : 'Not Authorised Login Again'})
    }

    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        if (!req.body) {
            req.body = {}
        }
        req.body.userId = token_decode.id  //userrcontroller se createToken se id
        next()
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}

export default authUser