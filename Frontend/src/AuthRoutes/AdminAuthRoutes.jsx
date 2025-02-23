
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export const AdminAuthRoutes = ({children}) => {
    const navigate=useNavigate()
  const adminToken=localStorage.getItem("adminToken")
  useEffect(()=>{
    if(!adminToken){
      toast.error("Please Login")
        navigate("/adminLogin")
    }
  },[adminToken,navigate])
  return adminToken?children:null
}
