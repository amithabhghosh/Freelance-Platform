import React, { useContext, useEffect, useState } from 'react'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { useParams } from 'react-router-dom'
import logo from "../../assets/images/jobo 1.png";
import API from '../../connectApi'
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading';
export const AdminClientDetail = () => {
    const {adminToken}=useContext(ContextAPI)
    const {clientId}=useParams()
    const [clientDetails,setClientDetails]=useState([])
const [loading,setLoading]=useState(true)
const [verified,setVerified]=useState(true)
useEffect(()=>{
if(clientId && adminToken){
    loadClientDetail()
}else{
    setClientDetails(null)
}
},[clientId,adminToken])


const loadClientDetail=async()=>{
    try {
      setLoading(true)
        const response=await API.get(`/admin/client/${clientId}`,{headers:{token:adminToken}})
        if(response.data.success){
            setClientDetails(response.data.client)
            setVerified(response.data.client.isVerified)
        }else{
            toast.error(response.data.message)
        }
        setLoading(false)
    } catch (error) {
        toast.error(error.message)
    }
}


const activateClient=async()=>{
  try {
    const response=await API.put(`/admin/activateClient/${clientId}`,{},{headers:{token:adminToken}})
    if(response.data.success){
setVerified(false)
    }else{
      setVerified(true)
    }
  } catch (error) {
    return null
  }
}

const inActivateClient=async()=>{
  try {
    const response=await API.put(`/admin/inActiveClient/${clientId}`,{},{headers:{token:adminToken}})
    if(response.data.success){
     setVerified(false) 
    }else{
      setVerified(true)
    }
  } catch (error) {
    return null
  }
}

  return (
  
    <div className="max-w-2xl mt-20 min-h-screen mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
    {loading ? (
      <LoadingSpinner />
    ) : (
      <>
     
        <div className="relative mb-6">
          <img
            src={clientDetails?.profile || logo}
            alt="Client"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
        </div>


        <div className="flex space-x-4 mb-6">
          {verified ? (
            <button
              onClick={inActivateClient}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
            >
              <FaTimesCircle size={18} />
              <span>Deactivate</span>
            </button>
          ) : (
            <button
              onClick={activateClient}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
            >
              <FaCheckCircle size={18} />
              <span>Activate</span>
            </button>
          )}
        </div>

       
        <div className="w-full max-w-lg text-left space-y-4 bg-gray-100 p-5 rounded-lg shadow">
          <DetailItem label="Name" value={clientDetails?.name || "N/A"} />
          <DetailItem label="Email" value={clientDetails?.email || "N/A"} />
          <DetailItem label="Country" value={clientDetails?.country || "N/A"} />
          <DetailItem label="Phone" value={clientDetails?.phone || "N/A"} />
          <DetailItem label="Rating" value={clientDetails?.rating || "0"} />
        </div>
      </>
    )}
  </div>

  )
}

const DetailItem = ({ label, value }) => (
    <p className="flex justify-between text-gray-700 text-sm border-b pb-2">
      <span className="font-medium">{label}:</span>
      <span className="font-semibold text-blue-500">{value}</span>
    </p>
  );