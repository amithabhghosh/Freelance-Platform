const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Admin = require("../Models/AdminModel")
const Freelancer = require("../Models/FreelancerModel")
const Client = require("../Models/ClientModel")
const Job = require("../Models/JobModel")
const Payment=require("../Models/PaymentModel")
const generateOTP = require("../utilities/generateOtp")
require("dotenv").config()
const sendOTP=require("../utilities/mailSender")
let otpStore = {};
const OTP_EXPIRATION = 5 * 60 * 1000;

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

const sentAdminOtp=async(req,res)=>{
    const { email } = req.body;
    try {
     
    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }
 const existingAdmin = await Admin.findOne({ email });


 if (existingAdmin) {
    
    return res.json({ success: false, message: "Admin Already Exists" });
}

const otp = generateOTP();
const expiresAt = Date.now() + OTP_EXPIRATION;

otpStore[email] = { otp, expiresAt };

await sendOTP(email, otp);
res.status(200).json({ success: true, message: "OTP Sent Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error Sending OTP", error: error.message });
    }
}


const verifyOtp=async(req,res)=>{
    const { email, otp } = req.body;

    if (!otpStore[email] || otpStore[email].expiresAt < Date.now()) {
      return res.json({ success:false,message: "OTP expired. Request a new one." });
    }
  
    if (otpStore[email].otp !== otp) {
      return res.json({success:false, message: "Invalid OTP" });
    }
  
    delete otpStore[email];
    return res.json({success:true,message:"OTP VERIFIED"})
}

//Login Admin
const loginAdmin=async(req,res)=>{
const {email,password}=req.body
try {
    const existingUser=await Admin.findOne({email})
    if(!existingUser){
        return res.json({success:false,message:"Admin Not found"})
    }
    const isMatch=await bcrypt.compare(password,existingUser.password)
    if(!isMatch){
return res.json({success:false,message:"Invalid Credinals"})
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
    const freelancers=await Freelancer.find().select("-password").sort({ createdAt: -1 });
   return res.status(200).json({success:true,freelancers})
} catch (error) {
   return res.status(500).json({success:false,message:error.message})
}
}

//Get All Client List
const getAllClient=async(req,res)=>{
try {
    const clients=await Client.find().select("-password").sort({ createdAt: -1 })
   return res.status(200).json({success:true,clients})
} catch (error) {
  return  res.status(500).json({success:false,message:error.message})
}
}

//Get All Job List
const getAllJobs=async(req,res)=>{
    try {
        const jobs=await Job.find().sort({ createdAt: -1 })
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
  const freelancer= await Freelancer.findOne({_id:id}).select("-password") 
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
    const client=await Client.findOne({_id:id}).select("-password")
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
    const job=await Job.findOne({_id:id})
    if(!job){
        return res.status(400).json({success:false,message:"Job Not Found"})
    }
    return res.status(200).json({success:true,job})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}

const getTotalAmountGained=async(req,res)=>{
    try {
       const payment=await Payment.find({status:"completed"}) 
       if (payment.length === 0) {
        return res.json({ success: false, message: "No Completed Payment" });
    }

    const completedWorks=await payment.length
    const totalAmount = payment.reduce((sum, payment) => sum + payment.amount, 0);

    const fivePercent = totalAmount * 0.05;
    res.json({success:true,fivePercent,payment,completedWorks})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const getAllpayments=async(req,res)=>{
    try {
        const payments=await Payment.find()
        if(!payments){
            res.json({success:false,message:"No Payments Yet"})
        }
        res.json({success:true,payments})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const getAllAdmins=async(req,res)=>{
    const adminId=req.user._id
    try {
        const admins = await Admin.find({ _id: { $ne: adminId } }).sort({ createdAt: -1 }); 
        if(admins.length===0){
            return res.json({success:false,message:"No other Admins"})
        }
        res.status(200).json({success:true,admins});  
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const deleteAdminOtpsent=async(req,res)=>{
    const {email}=req.body
    try {
        if (!email) {
            return res.json({ success: false, message: "Email is required" });
        }
        const otp = generateOTP();
const expiresAt = Date.now() + OTP_EXPIRATION;

otpStore[email] = { otp, expiresAt };

await sendOTP(email, otp);
res.status(200).json({ success: true, message: "OTP Sent Successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error Sending OTP", error: error.message }); 
    }
}

const verifyDeleteOtp=async(req,res)=>{
    const { email, otp } = req.body;

    if (!otpStore[email] || otpStore[email].expiresAt < Date.now()) {
      return res.json({ message: "OTP expired. Request a new one." });
    }
  
    if (otpStore[email].otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  
    delete otpStore[email];
    return res.status(200).json({success:true,message:"OTP VERIFIED"})
}

const deleteAdmin=async(req,res)=>{
    const {adminId}=req.params
    try {
        await Admin.deleteOne({_id:adminId})
        res.json({success:true,message:"Admin Deleted SuccessFully"})
    } catch (error) {
        res.status({success:false,message:error.meesage})
    }
}

const sentResetOtp=async(req,res)=>{
    const { email } = req.body;
    try {
        if (!email) {
            return res.json({ success: false, message: "Email is required" });
        }
     const existingAdmin = await Admin.findOne({ email });
     if (!existingAdmin) {
        
        return res.json({ success: false, message: "Email Not Exist" });
    }
    const otp = generateOTP();
    const expiresAt = Date.now() + OTP_EXPIRATION;
    
    otpStore[email] = { otp, expiresAt };
    
    await sendOTP(email, otp);
    res.json({ success: true, message: "OTP Sent Successfully" });
    } catch (error) {
        
    }
}

const updateAdminPassword=async(req,res)=>{
    const {email,password}=req.body
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.json({ message: "Admin not found" });
        }

 
        const hashedPassword = await bcrypt.hash(password, 10);

        admin.password = hashedPassword;
        await admin.save();

        res.json({ success:true,message: "Password updated successfully" });
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


const getDateRange = (filter) => {
    const now = new Date();
    let startDate;
  
    if (filter === "daily") {
      startDate = new Date(now.setHours(0, 0, 0, 0));
    } else if (filter === "weekly") {
      startDate = new Date(now.setDate(now.getDate() - 7));
    } else if (filter === "monthly") {
      startDate = new Date(now.setMonth(now.getMonth() - 1));
    } else {
      startDate = new Date("2000-01-01"); 
    }
  
    return { $gte: startDate };
  };



  const getChartData=async(req,res)=>{
    try {
        const filter = req.query.filter || "monthly";
        const earnings=await Payment.find({date:getDateRange(filter),status:"completed"})
        res.json({success:true,earnings});
    } catch (error) {
        res.json({success:false,message:error.message})
    }
  }


  const inactiveFreelancer=async(req,res)=>{
    const {freelancerId}=req.params
    try {
        const freelancer=await Freelancer.findByIdAndUpdate(freelancerId,
            {isVerified: false},
            {new:true}
        )
        if(!freelancer){
           return res.json({success:false,message:"No freelancer Found"})
        }
        res.json({success:true,freelancer})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
  }

  const activateClient=async(req,res)=>{
    const {clientId}=req.params
    try {
         await Client.findByIdAndUpdate(clientId,{isVerified:true},{new:true})
        res.json({success:true,message:"Updated Successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
  }

  const inActiveClient=async(req,res)=>{
    const {clientId}=req.params
    try {
        await Client.findByIdAndUpdate(clientId,{isVerified:false},{new:true})
        res.json({success:true,message:"Updated Successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
  }
module.exports={inActiveClient,activateClient,inactiveFreelancer,getChartData,sentResetOtp,updateAdminPassword,deleteAdmin,verifyDeleteOtp,deleteAdminOtpsent,getAllAdmins,verifyOtp,sentAdminOtp,getAllpayments,getTotalAmountGained,registerAdmin,loginAdmin,getAllFreelancer,getAllClient,getAllJobs,freelancerUpdate,getOneFreelancer,getOneClient,getOneJob}