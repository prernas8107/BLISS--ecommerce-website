import multer from "multer";


//to add pr we will create middleware using multer,if we send file as data then it will be passed using multer
const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer({storage})

export default upload;