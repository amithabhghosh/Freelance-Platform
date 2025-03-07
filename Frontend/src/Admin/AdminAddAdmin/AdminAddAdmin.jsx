import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import API from '../../connectApi'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'

export const AdminAddAdmin = () => {
    const {adminToken}=useContext(ContextAPI)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const [otp,setOtp]=useState()
const [timer,setTimer]=useState(0)
const [isDisabled,setIsDisabled]=useState(true)
const [otpButtonText,setOtpButtonText]=useState("OTP")
const [verifyButton,setVerifyButton]=useState("VERIFY")
const [isOtpVerified,setIsOtpVerified]=useState(false)
const [admins,setAdmins]=useState([])
const [isDelete,setIsDelete]=useState(false)
const [deleteOtp,setDeleteOtp]=useState()
const [isDeleteVerified,setIsDeleteVerified]=useState(false)
const [resendButton,setResendButton]=useState("Resend ?")
const [deleteTimer,setDeleteTimer]=useState(0)
const [deleteVerifyButton,setDeleteVerifyButton]=useState("VERIFY")
const [loading,setLoading]=useState(true)
useEffect(()=>{
if(timer>0){
  setIsDisabled(true)
setOtpButtonText(`Resend (${timer})`)
const interval=setInterval(()=>{
  setTimer((prev)=>prev-1)
},1000)
return()=> clearInterval(interval)
}else if(timer===0 && otpButtonText !== "OTP"){
  setIsDisabled(false)
  setOtpButtonText("Resend")
  }
},[timer])


useEffect(()=>{
    if(deleteTimer>0){
     
    setResendButton(`Resend (${deleteTimer})`)
    const interval=setInterval(()=>{
      setDeleteTimer((prev)=>prev-1)
    },1000)
    return()=> clearInterval(interval)
    }else if(deleteTimer===0 && resendButton !== "Resend ?"){
      
      setResendButton("Resend ?")
      }
    },[deleteTimer])


const sentOtp=async()=>{
    const value= await emailRegex.test(email)
    if(!value){
      return toast.error("Email Not Valid")
    }
   
    setOtpButtonText("Resend (30)")
  
    setTimer(30)
    try {
      const response=await API.post("/admin/sentOtp",{email}, {
        headers: { "Content-Type": "application/json" } 
      })

      if(response.data.success){
        return toast.success("OTP Sent SuccessFuly")
      }
    } catch (error) {
      return toast.error(error.message)
    }
  }


  const verifyOtp=async()=>{
    try {
      const response=await API.post("/admin/verifyOtp",{email,otp},{
        headers: { "Content-Type": "application/json" } 
      })
    
     if(response.data.success){
      toast.success("OTP VERIFIED")
      setVerifyButton("VERIFIED")
      setIsOtpVerified(true)
     }else{
        toast.error(response.data.message)
     }
    } catch (error) {
      toast.error(error.message)
    }
  }


  const submitAdminRegister=async()=>{
    if(!isOtpVerified){
        return toast.error("OTP Not Verified")
       }
    try {
        const response=await API.post("/admin/register",{name,email,password},{
            headers: { "Content-Type": "application/json" } 
          })
          if(response.data.success){
            toast.success("Admin Registered Successfully")
            setEmail("")
            setPassword("")
            setOtp("")
            setName("")
          }
    } catch (error) {
        toast.error(error.message)
    }
  }


  const loadAdmins=async()=>{
    try {
        setLoading(true)
        const response=await API.get("/admin/getAllAdmins",{headers:{token:adminToken}})
        if(response.data.success){
setAdmins(response.data.admins)
        }else{
            setAdmins(null)
        }
        setLoading(false)
    } catch (error) {
        toast.error(error.message)
    }
  }

useEffect(()=>{
    if(adminToken){
        loadAdmins()
    }else{
        setAdmins(null)
    }
},[adminToken])

const deleteInput=async(email)=>{
setIsDelete(true)
try {
    const response=await API.post("/admin/deleteAdminOtpsent",{email},{headers:{token:adminToken}})
    if(response.data.success){
        toast.success(response.data.message)
        setDeleteTimer(30)
    }else{
        toast.error(response.data.message)
    }
} catch (error) {
    toast.error(error.message)
}
}

const verifyDeleteOtp=async(email)=>{
    try {
        const response=await API.post("/admin/verifyDeleteOtp",{email,otp:deleteOtp},{headers:{token:adminToken}})
        if(response.data.success){
            toast.success("OTP VERIFIED")
            setIsDeleteVerified(true)
            setDeleteVerifyButton("VERIFIED")
        }
    } catch (error) {
        toast.error(error.message)
    }
}


const deleteAdmin=async(adminId)=>{
    if(!isDeleteVerified){
        return toast.error("OTP Not Verified")
       }
    try {
        const response=await API.delete(`/admin/deleteAdmin/${adminId}`,{headers:{token:adminToken}})
        if(response.data.success){
            toast.success(response.data.message)
            window.location.reload()
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

  return (


<div className="min-h-screen flex flex-col items-center bg-gray-100 p-6 mt-20 min-h-screen">

<div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-semibold text-center mb-4">Admin Registration</h2>
    <div className="space-y-4">
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center space-x-2">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={sentOtp}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
                {otpButtonText}
            </button>
        </div>
        <div className="flex items-center space-x-2">
            <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
               
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            />
            <button
                onClick={verifyOtp}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
                {verifyButton}
            </button>
        </div>
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
            onClick={submitAdminRegister}
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
        >
            Register
        </button>
    </div>
</div>


<div className="mt-10 w-full max-w-4xl">

{loading ? (
    <LoadingSpinner/>
) : (
    <>
    
    <h2 className="text-2xl font-semibold text-center mb-4">Admin List</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins && admins.length > 0 ? ( 
            admins.map((item, i) => ( 
                <div key={i} className="bg-white p-4 rounded-2xl shadow-lg">
                    <h4 className="text-lg font-semibold">Name: {item.name}</h4>
                    <h4 className="text-sm text-gray-500">Email: {item.email}</h4>
                    {!isDelete ? (
                        <button
                            onClick={() => deleteInput(item.email)}
                            className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Delete Admin
                        </button>
                    ) : (
                        <div className="mt-4 space-y-2">
                            <input
                                type="text"
                                placeholder="OTP"
                                value={deleteOtp}
                                onChange={(e) => setDeleteOtp(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={() => verifyDeleteOtp(item.email)}
                                className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                            >
                                {deleteVerifyButton}
                            </button>
                            <p className="text-sm text-gray-500">
                                Do You Want To <span className="text-blue-500 cursor-pointer">{resendButton}</span>
                            </p>
                            <button
                                onClick={() => deleteAdmin(item._id)}
                                className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    )}
                </div>
            ))
        ) : (
            <p className="text-center text-gray-500">No Admins</p> 
        )}
    </div>

    
    </>
)}
    




</div>

</div>




  )
}
