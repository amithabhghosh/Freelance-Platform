const jwt =require("jsonwebtoken")
require("dotenv").config()
const freelancerAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            return res.json({success:false,message:"Not Authorised"})
        }
        const token_decode=jwt.verify(token,process.env.SECRET_KEY)
        req.body.freelancerId=token_decode.id
        next()
    } catch (error) {
        res.json({success:false,message:error.message})
    }
 }
 
 module.exports={freelancerAuth}