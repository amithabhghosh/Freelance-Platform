import React, { useContext, useState } from "react";
import "./AdminLogin.css";
import { ContextAPI } from "../../ContextAPI/ContextAPI";
import { toast } from "react-toastify";
import API from "../../connectApi";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
const navigate=useNavigate()
const  {adminToken,setAdminToken}=useContext(ContextAPI)  

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const adminLoginSumbit=async()=>{
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
  return (
    <div className="adminLoginContainer">
      <div className="adminLogin">
        <h2>Admin Login</h2>
        <div className="adminInputs">
          <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button className="loginButton" onClick={adminLoginSumbit}>Login</button>
      </div>
    </div>
  );
};
