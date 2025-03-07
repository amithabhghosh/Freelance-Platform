
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {checkAdminTokenExpiration} from '../checkTokenExpiry'
export const AdminAuthRoutes = ({children}) => {

useEffect(()=>{
  checkAdminTokenExpiration()
},[])
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
