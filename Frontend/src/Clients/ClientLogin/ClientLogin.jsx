import React, { useContext, useState } from "react";
import "./ClientLogin.css";
import API from '../../connectApi'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ContextAPI } from "../../ContextAPI/ContextAPI";


export const ClientLogin = () => {
  const {clientToken,setClientToken,clientData,setClientData}=useContext(ContextAPI)
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [emailError,setEmailError]=useState("")
  const [password,setPassword]=useState("")
  const [passwordError,setPasswordError]=useState("")


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
  toast.error("LOGIN UNSUCCESSFULL")
}
  }
  return (
    <div className="ClientLogin">
      <div className="clientLoginContainer">
        {/* Left Side - Content */}
        <div className="clientLoginContent">
          <p>
            🔥 <span>Access the best freelancers</span> for your business needs!  
            From web development to design, hire top talent and bring your ideas to life.  
            <br /><br />
            Sign in now and start managing your projects efficiently! 🚀
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="clientLoginForm">
          <form onSubmit={formSubmit}>
            <input type="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)}/>
            <div className="error">{emailError}</div>
            <input type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} />
            <div className="error">{passwordError}</div>
            <button type="submit">Log In</button>
          </form>
          <div className="dont">
            <p>Don't Have an Account? <span onClick={toClientRegister}>Sign Up</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
