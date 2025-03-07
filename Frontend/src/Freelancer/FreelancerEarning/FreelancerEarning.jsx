import React, { useContext, useEffect, useState } from 'react'
import API from '../../connectApi'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { toast } from 'react-toastify'

export const FreelancerEarning = (props) => {
const {freelancerToken,freelancerId}=useContext(ContextAPI)
    const [jobName,setJobName]=useState()

const loadJobData=async()=>{
try {
    const response=await API.get(`/freelancer/job/${props.jobId}`,{headers:{token:freelancerToken}})
    if(response.data.success){
setJobName(response.data.job.title)
    }else{
        toast.error(response.data.message)
    }
} catch (error) {
    toast.error(error.message)
}
}

useEffect(()=>{
    if(props.jobId && freelancerToken && freelancerId){
        loadJobData()
    }else{
        setJobName(null)
    }
},[freelancerToken,props.jobId,freelancerId])
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4 border border-gray-200">
    <p className="text-lg font-semibold text-gray-700">
      Title: <span className="font-normal text-gray-600">{jobName}</span>
    </p>
    
    <p className="text-sm text-gray-700 mt-2">
      <span className="font-medium">Amount:</span> 
      <span className="text-green-600 font-semibold"> ${props.amount}</span>
    </p>
    
    <p className="text-sm text-gray-500 mt-1">
      <span className="font-medium">Status:</span> {props.status}
    </p>
  </div>
  
  )
}
