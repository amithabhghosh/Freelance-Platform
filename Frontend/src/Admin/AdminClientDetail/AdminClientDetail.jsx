import React, { useContext, useEffect, useState } from 'react'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { useParams } from 'react-router-dom'
import logo from "../../assets/images/jobo 1.png";
import API from '../../connectApi'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading';
export const AdminClientDetail = () => {
    const {adminToken}=useContext(ContextAPI)
    const {clientId}=useParams()
    const [clientDetails,setClientDetails]=useState([])
const [loading,setLoading]=useState(true)

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
        }else{
            toast.error(response.data.message)
        }
        setLoading(false)
    } catch (error) {
        toast.error(error.message)
    }
}


  return (
  

    <div className="max-w-2xl mt-26 min-h-screen mx-auto my-10 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center min-h-screen">
  {loading ? (
    <LoadingSpinner/>
  ) : (
    <>
    
    <div className="relative mb-6">
      <img
        src={clientDetails?.profile || logo}
        alt="Client"
        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
      />
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