const Client = require("../Models/ClientModel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Job = require("../Models/JobModel")
const Proposal = require("../Models/ProposalModel")
const Message = require("../Models/MessageModel")
const Submission=require("../Models/SubmissionModel")
require("dotenv").config()
const generateOTP = require("../utilities/generateOtp")
const sendOTP=require("../utilities/mailSender")
const Freelancer = require("../Models/FreelancerModel")

let otpStore = {};
const OTP_EXPIRATION = 5 * 60 * 1000;
//Client Register
const registerClient=async(req,res)=>{
  
  try {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    console.log("Checking if freelancer exists...");
    const existingFreelancer = await Client.findOne({ email });

    if (existingFreelancer) {
        console.log("Freelancer already exists.");
        return res.status(400).json({ success: false, message: "Freelancer Already Exists" });
    }

    console.log("Generating OTP...");
    const otp = generateOTP();
    const expiresAt = Date.now() + OTP_EXPIRATION;
    
    otpStore[email] = { otp, expiresAt };

    console.log(`OTP generated: ${otp} (expires at ${expiresAt})`);

    await sendOTP(email, otp); // Ensure this function works properly

    console.log("OTP sent successfully.");
    res.status(200).json({ success: true, message: "OTP Sent Successfully" });

} catch (error) {
    console.error("Error Sending OTP:", error);
    res.status(500).json({ success: false, message: "Error Sending OTP", error: error.message });
}
}


const verifyOtp=async(req,res)=>{
    const { email, otp } = req.body;

    if (!otpStore[email] || otpStore[email].expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired. Request a new one." });
    }
  
    if (otpStore[email].otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  
    delete otpStore[email];
    return res.status(200).json({success:true,message:"OTP VERIFIED"})
}


const signUp=async(req,res)=>{
   const {name,
    email,
    password,
    profile,
    phone,
    country,
    rating,
    review,
    }=req.body
try {
    const salt=await bcrypt.genSalt(10) 
    const hashedPassword= await bcrypt.hash(password,salt)
    const newFreelancer=await Client.create({
     name,
     email,
     password:hashedPassword,
     profile,
     phone,
     country,
     rating,
     review,
    
    })
    return res.status(200).json({success:true,message:"Freelancer Created Successfully",newFreelancer})
} catch (error) {
    return res.status(500).json({success:false,messsage:error.message})
}

    
}

//Client Login
const loginClient=async (req,res)=>{
    const{email,password}=req.body
    try {
        const user=await Client.findOne({email})
        if(!user){
return res.status(400).json({success:false,message:"User Not Exists"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({success:false,message:"Invalid Credinals"})
        }
        const token =await jwt.sign({id:user._id},process.env.SECRET_KEY, { expiresIn: "1d" })
        return res.status(200).json({success:true,message:"Login Succesful",token,client:user})
    } catch (error) {
       return res.status(500).json({success:false,message:"Login Unsuccessful"})
    }
}

//Post a Job
const postJob=async(req,res)=>{
    const {title,description,catagory,budget,deadline,skills}=req.body
    const ClientId=req.user._id
    try {
        const newJob=await Job.create({
            title,description,catagory,budget,ClientId,deadline,skills
        })
      return  res.status(200).json({success:true,message:"Job Posted Successfully",newJob})
    } catch (error) {
      return res.status(500).json({success:false,message:error.message}) 
    }
}

//Get Job Posted By The Client
const getPostedJobByClient=async(req,res)=>{
const {clientId}=req.body
try {
    const jobs=await Job.find({ClientId:clientId})
    if(!jobs){
       return res.status(400).json({success:false,message:"No Jobs Found"})
    }
    return res.status(200).json({success:true,jobs})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}

//Get The Propsals Recieved By the Client
const getProposalsRecievedByClient=async(req,res)=>{
const {id}=req.params
try {
   
    const clientProposals=await Proposal.find({clientId:id})
if(!clientProposals){
    return res.status(400).json({success:false,message:"No Proposals Recieved"})
}
return res.status(200).json({success:true,clientProposals})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}

//Accept Propasal Status
const updateProposalStatus=async(req,res)=>{
const {id}=req.params
const {status}=req.body
try {
    const proposal=await Proposal.findByIdAndUpdate(
        id,
        {status:status},
        {new:true}
    )
   if(!proposal){
    return res.status(400).json({success:false,message:"Proposal Not Found"})
   }
   return res.status(200).json({success:true,message:"Proposal Accepted",proposal})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}


//Get Propsal Recieved For a job
const proposalsRecievedForJob=async(req,res)=>{
    const {id}=req.params
    try {
        const proposals=await Proposal.find({jobId:id})
        if(!proposals){
            return res.status(400).json({success:false,message:"No Proposals For the Job"})
        }
        return res.status(200).json({success:true,proposals})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}


//Image Uploads to the Cloudinary
const ClientImageUpload=async(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const imageUrl = req.file.path;

      res.status(200).json({
        message: "Image uploaded successfully",
        image_url: imageUrl, // Return Cloudinary URL
      });
}

//Upadate Job Status (Completed or Assigned)
const updateJobAssignedStatus=async(req,res)=>{
    const {id}=req.params
    try {
        const job=await Job.findByIdAndUpdate(
            
                id,
                {status:"assigned"},
                {new:true}
            
        )
        if(!job){
            return res.status(400).json({success:false,message:"Job Not Found"})
        }
        return res.status(200).json({success:true,message:"Job Assigned Succesfully",job})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}


//Update Job Completed Status
const updateJobCompleteStatus=async(req,res)=>{
const {id}=req.params
try {
    const job=await Job.findByIdAndUpdate(
        id,
        {status:"completed"},
        {new:true}
    )
    if(!job){
        return res.status(400).json({success:false,message:"Job Not found"})
    }
    return res.status(200).json({success:true,message:"Job Completed Succesfuly",job})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}  
}

//Message Storing By Client
const messagePostedByClient=async(req,res)=>{
const {senderId,recieverId,jobId,content}=req.body
try {
    const message=await Message.create({
senderId,
recieverId,
jobId,
content
    })
    if(!message){
        return res.status(400).json({success:true,message:"Message Not Posted"})
    }
    return res.status(200).json({success:true,message:"Message Sent Succesfully",message})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}


//Get Message For Client ,Freelacer
const messageRecievedForClientAndFreelancer=async(req,res)=>{
 const  {senderId,recieverId}=req.params
    try {
        const message=await Message.find({senderId,recieverId})
        if(!message){
            return res.status(400).json({success:false,message:"No Message Recieved"})
        }
        return res.status(200).json({success:true,Recieved:"Message Recieved",message:message})
    } catch (error) {
     res.status(500).json({success:false,message:error.message})   
    }
}

//Get The Job Answer Submitted By the Freelancer
const getJobAnswer=async(req,res)=>{
try {
    const {jobId}=req.params


    const submissions = await Submission.find({ jobId }).populate('freelancerId', 'name email');

    res.status(200).json({ success: true, submissions });
} catch (error) {
    res.status(500).json({ success: false, error: error.message });
}
}


const getClientData=async(req,res)=>{
     try {
           const {clientId}=req.body
           const  clientData=await Client.findById(clientId).select("-password")
    
           res.status(200).json({success:true,client:clientData})
        } catch (error) {
            res.status(500).json({success:true,message:error.message})
        }
}

const updataClientData=async(req,res)=>{
    try {
        const {clientId}=req.body
        const imageFile=req.file
       if(imageFile){
        const imageUrl = imageFile.path
        await Client.findByIdAndUpdate(clientId,{profile:imageUrl})
       }
res.status(200).json({success:true,message:"Profile Updated Successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}


const getJobByJobId=async(req,res)=>{
    const {jobId}=req.params
    try {
       const job=await Job.findOne({_id:jobId}) 
       if(!job){
        return res.json({success:false,message:"Job Not found"})
       }
       return res.json({success:true,job})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


const getProposalByProposalId=async(req,res)=>{
    const {proposalId}=req.params
    try {
        const proposal=await Proposal.findOne({_id:proposalId})
        if(proposal.length===0){
            return res.json({success:false,message:"Proposal Not Found"})
        
        }
        return res.json({success:true,proposal})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

const getFreelancerByFreelancerId=async(req,res)=>{
    const {freelancerId}=req.params
    try {
        const freelancer = await Freelancer.findOne({ _id: freelancerId }).select("-password -email");

if(!freelancer){
    return res.json({success:false,message:"Freelancer Not Found"})
}
return res.json({success:true,freelancer})
    } catch (error) {
      res.json({success:false,message:error.message})  
    }
}

module.exports={getFreelancerByFreelancerId,getProposalByProposalId,getJobByJobId,registerClient,loginClient,updataClientData,getClientData,postJob,signUp,verifyOtp,getPostedJobByClient,getProposalsRecievedByClient,updateProposalStatus,proposalsRecievedForJob,ClientImageUpload,updateJobAssignedStatus,updateJobCompleteStatus,messagePostedByClient,messageRecievedForClientAndFreelancer,getJobAnswer}