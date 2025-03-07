import React, { useContext, useState } from "react";

import API from '../../connectApi'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ContextAPI } from "../../ContextAPI/ContextAPI";
import SignUpCover from '../../assets/images/SignUpCover.jpg'


export const FreelancerLogin = () => {
 
  const navigate=useNavigate()
const [email,setEmail]=useState("")
const [emailError,setEmailError]=useState("")
const [password,setPassword]=useState("")
const [passwordError,setPasswordError]=useState("")
const {freelancerToken,setFreelancerToken}=useContext(ContextAPI)
const [resetEmail,setResetEmail]=useState("")
const [resetOtp,setResetOtp]=useState()
const [newPass,setNewPass]=useState("")
const [sendButton,setSendButton]=useState("OTP")
const [isForgot,setIsForgot]=useState(false)
const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const toFreelancerRegister=()=>{
  navigate("/freelancerSignup")
}


const formSubmit=async(e)=>{
  e.preventDefault()
if(!email){
  return setEmailError("Invalid Email")
}
if(!password){
  return setPasswordError("Enter The Password")
}


const response=await API.post("/freelancer/login",{email,password},{
  headers: { "Content-Type": "application/json" } 
})
if(response.data.success){
  localStorage.setItem("freelancerToken",response.data.token)
setFreelancerToken(response.data.token)

  navigate("/freelancerDashboard")
  toast.success("LOGIN SUCCESSFULL")
  
}else{
  toast.error(response.data.message)
}
}


const sentOtp=async()=>{
  const value= await emailRegex.test(resetEmail)
  if(!value){
    return toast.error("Email Not Valid")
  }
  setSendButton("RESEND")
try {
const response=await API.post("/freelancer/sentFreelancerResetOtp",{email:resetEmail})
if(response.data.success){
toast.success(response.data.message)
}else{
toast.error(response.data.message)
}
} catch (error) {
toast.error(error.message)
}
}

const submitResetForm=async()=>{
  if (!resetOtp.trim()) {
    return toast.error("OTP is required");
  }
  if (!newPass.trim()) {
    return toast.error("New password is required");
  }

  try {
    
    const response = await API.post("/freelancer/verifyOtp", { email: resetEmail, otp: resetOtp });

    if (!response.data.success) {
      return toast.error(response.data.message || "OTP verification failed");
    }

    
    const res = await API.put("/freelancer/updateFreelancerPassword", { email: resetEmail, password: newPass });

    if (res.data.success) {
      toast.success(res.data.message || "Password updated successfully");
      setResetEmail("")
      setResetOtp(null)
      setNewPass("")
      setIsForgot(false)
    } else {
      toast.error(res.data.message || "Failed to update password");
    }
  } catch (error) {
  
    toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
  }
}

  return (

<div className="relative flex items-center justify-center mt-20 sm:mt-28 mb-8 sm:mb-10 mx-4 sm:mx-6 p-4 sm:p-6 md:p-8 rounded-3xl overflow-hidden bg-cover bg-center min-h-[400px] sm:min-h-[500px]" style={{ backgroundImage: `url(${SignUpCover})` }}>

  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-6 sm:gap-8">
    
   
    <div className="text-white text-center md:text-left font-bold text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed max-w-md sm:max-w-lg">
      🌟 Welcome back, <span className="text-orange-500">Freelancer!</span>  
      Your next <span className="text-orange-500">opportunity</span> is just a login away.  
      Connect with <span className="text-orange-500">clients</span>, deliver your best work, and grow your <span className="text-orange-500">career</span>.  
      <br /><br /> Let's get started! 🚀
    </div>

  
    {!isForgot ? (
      <div className="bg-white/20 backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-lg text-white w-full md:w-3/5 lg:w-1/2 max-w-md sm:max-w-lg">
        <form onSubmit={formSubmit} className="flex flex-col gap-3 sm:gap-4">
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base" />
          <div className="text-red-500 text-xs sm:text-sm">{emailError}</div>

          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base" />
          <div className="text-red-500 text-xs sm:text-sm">{passwordError}</div>

          <button type="submit" className="bg-orange-500 p-2 sm:p-3 rounded-lg text-white font-bold hover:bg-orange-600 transition-all w-full text-sm sm:text-base">Login As Freelancer</button>
        </form>

        <span className="text-blue-500 cursor-pointer text-center block mt-2 text-sm sm:text-base" onClick={() => setIsForgot(true)}>
          Forgot password?
        </span>

        <div className="text-center mt-3 sm:mt-4 text-sm sm:text-base">
          <p>Don't Have an Account? <span onClick={toFreelancerRegister} className="text-orange-500 font-bold cursor-pointer">Sign Up</span></p>
        </div>
      </div>
    ) : (
      <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-gray-900 bg-opacity-30 z-50 p-4">
       
        <div className="bg-white/20 backdrop-blur-lg p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md text-center relative">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-white">Reset Password</h2>

          <button className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white text-xl sm:text-2xl cursor-pointer" onClick={() => setIsForgot(false)}>
            ✕
          </button>

      
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <input type="email" placeholder="Enter Email" className="flex-grow p-2 sm:p-3 border border-white/50 bg-white/20 text-white placeholder-white rounded w-full outline-none text-sm sm:text-base" onChange={(e) => setResetEmail(e.target.value)} />
            <button className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base" onClick={sentOtp}>{sendButton}</button>
          </div>

          <input type="text" placeholder="Enter OTP" className="w-full p-2 sm:p-3 border border-white/50 bg-white/20 text-white placeholder-white rounded mb-3 sm:mb-4 outline-none text-sm sm:text-base" onChange={(e) => setResetOtp(e.target.value)} />

     
          <input type="password" placeholder="New Password" className="w-full p-2 sm:p-3 border border-white/50 bg-white/20 text-white placeholder-white rounded mb-3 sm:mb-4 outline-none text-sm sm:text-base" onChange={(e) => setNewPass(e.target.value)} />

        
          <button className="w-full bg-blue-500 text-white py-2 sm:py-3 rounded text-sm sm:text-base" onClick={submitResetForm}>
            Submit
          </button>
        </div>
      </div>
    )}
  </div>
</div>

  );
};
