import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export const ClientAuthRoutes = ({children}) => {
  const navigate=useNavigate()
  const clientToken=localStorage.getItem("clientToken")

  useEffect(()=>{
    if(!clientToken){
      toast.error("Please Login")
        navigate("/clientLogin")
    }
  },[clientToken,navigate])
  return clientToken?children:null
}
