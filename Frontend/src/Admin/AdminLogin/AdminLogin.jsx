import React, { useContext, useState } from "react";

import { ContextAPI } from "../../ContextAPI/ContextAPI";
import { toast } from "react-toastify";
import API from "../../connectApi";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
const navigate=useNavigate()
const  {adminToken,setAdminToken}=useContext(ContextAPI)  
const [isForgot,setIsForgot]=useState(false)
const [email,setEmail]=useState("")
const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const [password,setPassword]=useState("")
const [resetEmail,setResetEmail]=useState("")
const [resetOtp,setResetOtp]=useState()
const [newPass,setNewPass]=useState("")
const [sendButton,setSendButton]=useState("OTP")

const adminLoginSubmit=async()=>{
     if(!email.trim() || !password.trim()){
           return toast.error("Fields Are Missing")
       }
    try {
        const response=await API.post("/admin/login",{email,password})
        if(response.data.success){
            localStorage.setItem("adminToken",response.data.token)
            setAdminToken(response.data.token)
            toast.success(response.data.message)
            navigate("/adminFreelancers")
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

const sentOtp=async()=>{
 const value= await emailRegex.test(resetEmail)
    if(!value){
      return toast.error("Email Not Valid")
    }

try {
  const response=await API.post("/admin/sentResetOtp",{email:resetEmail})
  if(response.data.success){
    toast.success(response.data.message)
    setSendButton("RESEND")
  }else{
    toast.error(response.data.message)
  }
} catch (error) {
  toast.error(error.message)
}

}


const submitResetForm = async () => {
  if (!resetOtp.trim()) {
    return toast.error("OTP is required");
  }
  if (!newPass.trim()) {
    return toast.error("New password is required");
  }

  try {
    
    const response = await API.post("/admin/verifyOtp", { email: resetEmail, otp: resetOtp });

    if (!response.data.success) {
      return toast.error(response.data.message || "OTP verification failed");
    }

    
    const res = await API.put("/admin/updateAdminPassword", { email: resetEmail, password: newPass });

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
};


  return (
    // <div className="adminLoginContainer">
    //   <div className="adminLogin">
    //     <h2>Admin Login</h2>
    //     <div className="adminInputs">
    //       <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
    //       <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
    //     </div>
    //     <button className="loginButton" onClick={adminLoginSumbit}>Login</button>
    //   </div>
    // </div>

<div className="flex justify-center items-center h-screen bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-sm">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Login</h2>

        {/* Input Fields */}
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="text-blue-500 cursor-pointer" onClick={() => setIsForgot(true)}>
        Forgot password?
      </span>
      {isForgot && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="email"
                placeholder="Email"
                className="flex-grow p-2 border rounded"
onChange={(e)=>setResetEmail(e.target.value)}
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={sentOtp}>
                {sendButton}
              </button>
            </div>
           
      
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border rounded mb-4"
              onChange={(e)=>setResetOtp(e.target.value)}
            />
            
         
       
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 border rounded mb-4"
              onChange={(e)=>setNewPass(e.target.value)}
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded mb-2" onClick={submitResetForm}>
              Submit
            </button>
            <button 
              className="w-full text-gray-600 underline"
              onClick={() => setIsForgot(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}


        {/* Login Button */}
        <button
          className="w-full mt-4 py-2 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition-all duration-300"
          onClick={adminLoginSubmit}
        >
          Login
        </button>
      </div>
    </div>

  );
};
