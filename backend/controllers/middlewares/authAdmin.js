import jwt from 'jsonwebtoken';

//admin authentication middleware.
const authAdmin = async (req,res,next) => {
    try {
        
        const {atoken} = req.headers
        if(!atoken){
            return res.json({success:false, message: "No token provided" });
        }
        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message: "Invalid token" });
        }

        next()
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export default authAdmin;