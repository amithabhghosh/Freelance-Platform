import React, { useContext, useEffect, useState } from 'react'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { useParams } from 'react-router-dom'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'

export const AdminJobDetails = () => {
    const {adminToken}=useContext(ContextAPI)
    const {jobId}=useParams()
const [jobData,setJobData]=useState()
const [loading,setLoading]=useState(true)
const loadJobData=async()=>{
    try {
      setLoading(true)
        const response=await API.get(`/admin/job/${jobId}`,{headers:{token:adminToken}})
        if(response.data.success){
setJobData(response.data.job)
        }else{
            setJobData({})
        }
        setLoading(false)
    } catch (error) {
        toast.error(error.message)
    }
}


useEffect(()=>{
    if(adminToken && jobId){
        loadJobData()
    }else{
        setJobData()
    }
},[jobId,adminToken])
  return (
    <div className="max-w-2xl mt-26 min-h-screen mx-auto my-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-2">
        Job Details
      </h2>

      <div className="space-y-4">
        <DetailItem label="Title" value={jobData?.title || "NA"} />
        <DetailItem label="Description" value={jobData?.description || "NA"} />
        <DetailItem label="Category" value={jobData?.catagory || "NA"} />
        <DetailItem label="Skills" value={jobData?.skills || "NA"} />
        <DetailItem label="Days Provided" value={jobData?.deadline || 0} />
        <DetailItem label="Amount" value={`$${jobData?.budget || 0}`} />
        <DetailItem label="Job Status" value={jobData?.status || "NA"} statusColor />
      </div> 
        
        </>
      )}
      
     




    </div>
  )
}


const DetailItem = ({ label, value, statusColor }) => (
    <div className="p-4 bg-gray-100 rounded-md">
      <span className="text-gray-700 font-medium block mb-1">{label}:</span>
      <span
        className={`font-semibold block ${
          statusColor ? "text-green-600" : "text-blue-500"
        }`}
      >
        {value || "N/A"}
      </span>
    </div>
  );
  