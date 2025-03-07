import React, { useContext, useState } from "react";

import API from '../../connectApi'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ContextAPI } from "../../ContextAPI/ContextAPI";
import ClientSignUpBanner from '../../assets/images/ClientSignUpBanner.jpg'

export const ClientLogin = () => {
  const {clientToken,setClientToken,clientData,setClientData}=useContext(ContextAPI)
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [emailError,setEmailError]=useState("")
  const [password,setPassword]=useState("")
  const [passwordError,setPasswordError]=useState("")
const [resetEmail,setResetEmail]=useState("")
const [resetOtp,setResetOtp]=useState()
const [newPass,setNewPass]=useState("")
const [sendButton,setSendButton]=useState("OTP")
const [isForgot,setIsForgot]=useState(false)
const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const toClientRegister=()=>{
  navigate("/clientSignup")
}


  const formSubmit=async(e)=>{
e.preventDefault()
if(!email){
  return setEmailError("Inavlid Email")
}
if(!password){
  return setPasswordError("Password Required")
}
const response=await API.post("/client/login",{email,password},{
  headers: { "Content-Type": "application/json" } 
})
if(response.data.success){
  localStorage.setItem("clientToken",response.data.token)
 setClientToken(response.data.token)
  navigate("/clientDashboard")
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
  const response=await API.post("/client/sentClientResetOtp",{email:resetEmail})
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
    
    const response = await API.post("/client/verifyOtp", { email: resetEmail, otp: resetOtp });

    if (!response.data.success) {
      return toast.error(response.data.message || "OTP verification failed");
    }

    
    const res = await API.put("/client/updateClientPassword", { email: resetEmail, password: newPass });

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
<div className="relative flex items-center justify-center mt-20 mb-8 mx-4 sm:mx-6 p-4 sm:p-6 md:p-8 rounded-3xl overflow-hidden bg-cover bg-center min-h-[500px]" 
  style={{ backgroundImage: `url(${ClientSignUpBanner})` }}>

 
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-6 sm:gap-8">

  
    <div className="text-white text-center md:text-left font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-md px-4 sm:px-6">
      🌟 Welcome back, <span className="text-orange-500">Client!</span>  
      Your next <span className="text-orange-500">opportunity</span> is just a login away.  
      Connect with <span className="text-orange-500">Freelancers</span>, Access the best freelancers, & <span className="text-orange-500">Grow Your Business</span>.  
      <br /><br /> Let's get started! 🚀
    </div>

   
    {!isForgot ? (
      <div className="bg-white/20 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-xl shadow-lg text-white w-full md:w-3/5 lg:w-1/2 max-w-md">
        <form onSubmit={formSubmit} className="flex flex-col gap-3 sm:gap-4">
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}  
            className="p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full" />
          <div className="text-red-500 text-sm">{emailError}</div>

          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}  
            className="p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full" />
          <div className="text-red-500 text-sm">{passwordError}</div>

          <button type="submit" className="bg-orange-500 p-3 rounded-lg text-white font-bold hover:bg-orange-600 transition-all w-full">
            Login As Client
          </button>
        </form>
        
        <span className="text-blue-500 cursor-pointer text-center mt-2 block" onClick={() => setIsForgot(true)}>
          Forgot password?
        </span>

        <div className="text-center mt-3">
          <p>Don't Have an Account? 
            <span onClick={toClientRegister} className="text-orange-500 font-bold cursor-pointer ml-1">Sign Up</span>
          </p>
        </div>
      </div>
    ) : (
      <div className="fixed inset-0 flex justify-center items-center mt-10 backdrop-blur-md bg-gray-900 bg-opacity-30 z-50 p-4">
       
        <div className="bg-white/20 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md text-center relative">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">Reset Password</h2>

          <button className="absolute top-3 right-3 text-white text-lg sm:text-xl cursor-pointer" onClick={() => setIsForgot(false)}>
            ✕
          </button>

          
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <input type="email" placeholder="Enter Email" 
              className="flex-grow p-3 border border-white/50 bg-white/20 text-white placeholder-white rounded w-full outline-none" 
              onChange={(e) => setResetEmail(e.target.value)} />
            <button className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded" onClick={sentOtp}>
              {sendButton}
            </button>
          </div>

          <input type="text" placeholder="Enter OTP" 
            className="w-full p-3 border border-white/50 bg-white/20 text-white placeholder-white rounded mb-3 sm:mb-4 outline-none" 
            onChange={(e) => setResetOtp(e.target.value)} />

          
          <input type="password" placeholder="New Password" 
            className="w-full p-3 border border-white/50 bg-white/20 text-white placeholder-white rounded mb-3 sm:mb-4 outline-none" 
            onChange={(e) => setNewPass(e.target.value)} />

   
          <button className="w-full bg-blue-500 text-white py-3 rounded mb-2 sm:mb-3" onClick={submitResetForm}>
            Submit
          </button>
        </div>
      </div>
    )}
  </div>
</div>





  );
};
