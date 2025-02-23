import React, { useContext, useState } from "react";
import "./FreelancerLogin.css";
import API from '../../connectApi'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ContextAPI } from "../../ContextAPI/ContextAPI";

export const FreelancerLogin = () => {
 
  const navigate=useNavigate()
const [email,setEmail]=useState("")
const [emailError,setEmailError]=useState("")
const [password,setPassword]=useState("")
const [passwordError,setPasswordError]=useState("")
const {freelancerToken,setFreelancerToken}=useContext(ContextAPI)
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
  toast.error("LOGIN UNSUCCESSFULL")
}
}

  return (
    <div className="freelancerLogin">
      <div className="freelancerLoginContainer">
        {/* Left Side - Content */}
        <div className="freelancerLoginContent">
          <p>
            🌟 Welcome back, <span>Freelancer!</span>  
            Your next <span>opportunity</span> is just a login away.  
            Connect with <span>clients</span>, deliver your best work, and grow your <span>career</span>.  
            <br /><br /> Let's get started! 🚀
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="freelancerLoginForm">
          <form onSubmit={formSubmit}>
            <input type="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)}/>
            <div className="error">{emailError}</div>
            <input type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
<div className="error">{passwordError}</div>
            <button type="submit">Login</button>
          </form>
          <div className="dontAccount">
            <p>Don't Have an Account? <span onClick={toFreelancerRegister}>Sign Up</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
