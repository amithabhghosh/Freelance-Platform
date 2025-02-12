const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Admin = require("../Models/AdminModel")
const Freelancer = require("../Models/FreelancerModel")
const Client = require("../Models/ClientModel")
const Job = require("../Models/JobModel")
require("dotenv").config()


//Register Admin
const registerAdmin=async(req,res)=>{
const {name,email,password}=req.body
try {
    const existingAdmin=await Admin.findOne({email})
    if(existingAdmin){
        return res.status(401).json({success:false,message:"Admin Already Exists"})
    }
           const salt=await bcrypt.genSalt(10) 
            const hashedPassword= await bcrypt.hash(password,salt)
            const newAdmin=await Admin.create({
                name,
                email,
                password:hashedPassword
            })
            return res.status(200).json({success:true,message:"Admin Registered Successfully",newAdmin})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}

//Login Admin
const loginAdmin=async(req,res)=>{
const {email,password}=req.body
try {
    const existingUser=await Admin.findOne({email})
    if(!existingUser){
        return res.status(400).json({success:false,message:"Admin Not found"})
    }
    const isMatch=await bcrypt.compare(password,existingUser.password)
    if(!isMatch){
return res.status(401).json({success:false,message:"Invalid Credinals"})
    }
     const token =await jwt.sign({id:existingUser._id},process.env.SECRET_KEY, { expiresIn: "1d" })
     return res.status(200).json({success:true,message:"Admin Login Successfully",token})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}

//Get All Freelancer List
const getAllFreelancer=async(req,res)=>{
try {
    const freelancers=await Freelancer.find()
   return res.status(200).json({success:true,freelancers})
} catch (error) {
   return res.status(500).json({success:false,message:error.message})
}
}

//Get All Client List
const getAllClient=async(req,res)=>{
try {
    const clients=await Client.find()
   return res.status(200).json({success:true,clients})
} catch (error) {
  return  res.status(500).json({success:false,message:error.message})
}
}

//Get All Job List
const getAllJobs=async(req,res)=>{
    try {
        const jobs=await Job.find()
      return  res.status(200).json({success:true,jobs})
    } catch (error) {
       return res.status(500).json({success:false,message:error.message})
    }
}

//Update Freelance Status(Approve,Diapprove)
const freelancerUpdate=async(req,res)=>{
const {id}=req.params

try {
const freelancer = await Freelancer.findByIdAndUpdate(
        id,
        {isVerified:true},
        { new: true } 
    )
if(!freelancer){
    return res.status(400).json({success:false,message:"Freelancer Not Found"})
}
return res.status(200).json({success:true,freelancer})
} catch (error) {
   return res.status(500).json({success:false,message:error.message}) 
}
}

//Get One Freelancer
const getOneFreelancer=async(req,res)=>{
const {id}=req.params
try {
  const freelancer= await Freelancer.find({_id:id}) 
  if(!freelancer){
    return res.status(400).json({success:false,message:"Freelancer Not Found"})
  } 
  return res.status(200).json({success:true,freelancer})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}


//Get One Client
const getOneClient=async(req,res)=>{
const {id}=req.params
try {
    const client=await Client.find({_id:id})
    if(!client){
        return res.status(400).json({success:false,message:"Client Not Found"})
    }
    return res.status(200).json({success:true,client})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}

//Get One Job
const getOneJob=async(req,res)=>{
const {id}=req.params
try {
    const job=await Job.find({_id:id})
    if(!job){
        return res.status(400).json({success:false,message:"Job Not Found"})
    }
    return res.status(200).json({success:true,job})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}


module.exports={registerAdmin,loginAdmin,getAllFreelancer,getAllClient,getAllJobs,freelancerUpdate,getOneFreelancer,getOneClient,getOneJob}