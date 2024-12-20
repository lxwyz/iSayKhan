import jwt from 'jsonwebtoken';

//admin authentication middleware.
const authDoctor = async (req,res,next) => {
    try {
        
        const { dtoken } = req.headers;

        if(!dtoken){
            return res.json({success:false, message: "No token provided" });
        }
        const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET)

        req.body.docId = token_decode.id

        next()
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export default authDoctor;