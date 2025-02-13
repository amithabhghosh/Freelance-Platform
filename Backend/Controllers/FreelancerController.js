const Freelancer = require("../Models/FreelancerModel")
const Proposal=require("../Models/ProposalModel")
const Job=require("../Models/JobModel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Submission=require("../Models/SubmissionModel")
require("dotenv").config()

//Register Freelancer
const registerFreelancer=async(req,res)=>{
    const  {name,email,password,profile,phone,country,rating,review,skills}=req.body
    try {
        const existingFreelancer=await Freelancer.findOne({email})
        if(existingFreelancer){
            return res.status(400).json({success:false,message:"Freelancer Already Exists"})
        }
         const salt=await bcrypt.genSalt(10) 
               const hashedPassword= await bcrypt.hash(password,salt)
               const newFreelancer=await Freelancer.create({
                name,
                email,
                password:hashedPassword,
                profile,
                phone,
                country,
                rating,
                review,
                skills
               })
               res.status(200).json({success:true,message:"Freelancer Registerd Successfuly",newFreelancer})
    } catch (error) {
        res.status(500).json({success:false,message:"Error Occured"})
    }
}

//Login Freelancer
const loginFreelancer=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await Freelancer.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"User Not Found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({success:false,message:"Invalid creditnals"})
        }
const token = await jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1d"})
return res.status(200).json({success:true,message:"Login Succesfull",token,id:user._id})
    } catch (error) {
       return res.status(500).json({success:false,message:"Login Unsuccessful"})
    }
}

//Sent Proposals
const sentProposal=async(req,res)=>{
const {name,description,budget,jobId,freelancerId,deadline,clientId}=req.body
try {
const existingProposal=await Proposal.findOne({freelancerId,jobId})
if(existingProposal){
return res.status(400).json({success:false,message:"You Have Already Applied For the job"})
}
    const proposal=await Proposal.create({
name,
description,
budget,
jobId,
freelancerId,
deadline,
clientId
    })
    return res.status(200).json({success:true,messsage:"Proposal Created Succesfully",proposal})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}

//Get Proposals of the Particular Freelancer
const getProposalByFreelancer=async(req,res)=>{
const {id}=req.params
try {
    const freelancerProposals=await Proposal.find({freelancerId:id})
    if(!freelancerProposals){
        return res.status(400).json({success:false,message:"Proposals Not Found"})
    }
    return res.status(200).json({success:true,freelancerProposals})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}


//Profile Uploading for Freelancer
const FreelancerImageUpload=async(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const imageUrl = req.file.path;

      res.status(200).json({
        message: "Image uploaded successfully",
        image_url: imageUrl, // Return Cloudinary URL
      });
}

//Get Job With pending Status
const jobWithPendingStatus=async(req,res)=>{
    try {
        const jobs=await Job.find({status:"pending"})
        if(!jobs){
            return res.status(400).json({success:false,message:"No Jobs"})
        }
        return res.status(200).json({success:true,jobs})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
    
}


//Answer Submission 
const jobSubmission=async(req,res)=>{
    try {
        const { jobId, textAnswer1,textAnswer2,textAnswer3 } = req.body;

        const fileUrls = req.files.map(file => file.path);
        const newSubmission = new Submission({
            freelancerId: req.user._id,
            jobId,
            textAnswer1,
            textAnswer2,
            textAnswer3,
            files: fileUrls
        });

        await newSubmission.save();
        res.status(201).json({ success: true, message: 'Submission uploaded successfully', submission: newSubmission });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports={registerFreelancer,loginFreelancer,sentProposal,getProposalByFreelancer,FreelancerImageUpload,jobWithPendingStatus,jobSubmission}