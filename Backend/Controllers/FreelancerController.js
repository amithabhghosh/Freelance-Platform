const Freelancer = require("../Models/FreelancerModel")
const Proposal=require("../Models/ProposalModel")
const Job=require("../Models/JobModel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Submission=require("../Models/SubmissionModel")
const generateOTP = require("../utilities/generateOtp")
const sendOTP=require("../utilities/mailSender")
const cloudinary=require("cloudinary")
require("dotenv").config()

//Register Freelancer
let otpStore = {};
const OTP_EXPIRATION = 5 * 60 * 1000;
const registerFreelancer = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        console.log("Checking if freelancer exists...");
        const existingFreelancer = await Freelancer.findOne({ email });

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
};



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


// const resentOtp=async(req,res)=>{
//     const { email } = req.body;

//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const otp = generateOTP();
//   const expiresAt = Date.now() + OTP_EXPIRATION;
//   otpStore[email] = { otp, expiresAt };

//   await sendOTP(email, otp);

//   res.status(200).json({ message: "New OTP sent" });
// }


const signUp=async(req,res)=>{
   const {name,
    email,
    password,
    profile,
    phone,
    country,
    rating,
    review,
    skills}=req.body
try {
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
    return res.status(200).json({success:true,message:"Freelancer Created Successfully",newFreelancer})
} catch (error) {
    return res.status(500).json({success:false,messsage:error.message})
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
return res.status(200).json({success:true,message:"Login Succesfull",token,freelancer:user})
    } catch (error) {
       return res.status(500).json({success:false,message:error.message})
    }
}

//Sent Proposals
const sentProposal=async(req,res)=>{
const {name,description,budget,jobId,freelancerId,deadline,clientId}=req.body
try {
const existingProposal=await Proposal.findOne({freelancerId,jobId})
if(existingProposal){
return res.json({success:false,message:"You Have Already Applied For the job"})
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
    return res.status(200).json({success:true,messsage:"Proposal Created Successfully",proposal})
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

const token=async(req,res)=>{
    const token = req.headers.authorization;
    try {
          const decoded =await jwt.verify(token, process.env.SECRET_KEY);
          console.log(decoded)
          const freelancer=await Freelancer.findById(decoded.id)
          res.status(200).json({success:true,freelancer})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}


const getFreelancerData=async(req,res)=>{
    try {
       const {freelancerId}=req.body
       const  freelancerData=await Freelancer.findById(freelancerId).select("-password")

       res.status(200).json({success:true,freelancer:freelancerData})
    } catch (error) {
        res.status(500).json({success:true,message:error.message})
    }
}

const updateFreelancerProfile=async(req,res)=>{
    try {
        const {freelancerId,skills}=req.body
        const imageFile=req.file

        if(!skills){
return res.json({success:false,message:"Data Missing"})
        }

        await Freelancer.findByIdAndUpdate(freelancerId,{skills})

        if(imageFile){
            const imageUrl = imageFile.path

await Freelancer.findByIdAndUpdate(freelancerId,{profile:imageUrl})
            
        }
        res.status(200).json({success:true,message:"Profile Updated Successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}


const getOneJob=async(req,res)=>{
const {id}=req.params
try {
    const job=await Job.findOne({_id:id})
    if(!job){
        return res.status(400).json({success:false,message:"Job Not Found"})
    }
    return res.status(200).json({success:true,job})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}

const getClientByJobId=async(req,res)=>{
    const {jobId}=req.params
    try {
        const clientId=await Job.findOne({_id:jobId}).select("ClientId")
        return res.status(200).json({success:true,clientId})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

const getFreelancerProposalIsApplied = async (req, res) => {
    const { jobId, freelancerId } = req.params;
    try {
        // Await the Proposal.find to get actual results
        const proposals = await Proposal.find({ jobId: jobId });

        // Filter proposals that match the given freelancerId
        const getParticularProposal = proposals.filter(proposal => proposal.freelancerId.toString() === freelancerId);

        if (getParticularProposal.length > 0) {
            return res.json({ success: false, message: "Already Applied", getParticularProposal });
        }

        res.json({ success: true, message: "Success", getParticularProposal });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getJobByJobId=async(req,res)=>{
    const {jobId}=req.params
    try {
        const job=await Job.findById({_id:jobId})
        if(!job){
            return res.json({success:false,message:"Job Not Found"})
        }
        res.json({success:true,job})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

getJobIdByProposal=async(req,res)=>{
    const {proposalId}=req.params
    try {
        const proposal=await Proposal.findOne({_id:proposalId})
        if(!proposal){
            return res.json({success:false,message:"Proposal Not Found"})
        }
        res.json({success:true,proposal})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

module.exports={registerFreelancer,getFreelancerData,getJobByJobId,getJobIdByProposal,getFreelancerProposalIsApplied,getOneJob,getClientByJobId,updateFreelancerProfile,verifyOtp,signUp,loginFreelancer,sentProposal,getProposalByFreelancer,FreelancerImageUpload,jobWithPendingStatus,jobSubmission,token}