import React, { useContext, useEffect, useState } from 'react'

import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ClientCoundownTimer } from '../../Clients/ClientCoundownTimer/ClientCoundownTimer'
export const FreelancerWorkCard = (props) => {
  const navigate=useNavigate()
const {freelancerId,freelancerToken}=useContext(ContextAPI)
const jobId=props.jobId
const [jobData,setJobData]=useState({})
const [paymentData,setPaymentData]=useState({})
    const loadJobData=async()=>{
      try {

        const response=await API.get(`/freelancer/getJobById/${jobId}`)
        if(response.data.success){
          setJobData(response.data.job)
        }else{
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

const loadPaymentData=async()=>{
 
  try {
    const response=await API.get(`/freelancer/getPaymentByProposal/${props.id}`,{headers:{token:freelancerToken}})
    if(response.data.success){
      setPaymentData(response.data.payment)
    }else{
      toast.error(response.data.message)
    }
  } catch (error) {
   toast.error(error.message) 
  }
}

useEffect(()=>{
  if(freelancerToken && freelancerId){
    loadPaymentData()
  }else{
    setPaymentData(false)
  }
},[freelancerToken,freelancerId])

useEffect(()=>{
  if(freelancerToken && freelancerId){
    loadJobData()
  }else{
    setJobData(false)
  }
},[freelancerToken,freelancerId])
  return (

<div
  className="w-full max-w-3xl bg-white text-gray-800 p-6 rounded-xl shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl mx-auto flex flex-col gap-4 cursor-pointer"
  onClick={() => navigate(`/freelancer/Works/${jobId}`)}
>
 
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
    <div>
      <h3 className="text-xl font-semibold">Title: {jobData?.title || "Loading..."}</h3>
      <h3 className="text-lg text-gray-600">Deadline: {props.deadline} Days</h3>
      <h3 className="text-lg text-gray-600">Amount Offered: {props.budget} $</h3>
    </div>

    <div className="mt-2 md:mt-0">
      <ClientCoundownTimer deadline={props.deadline} jobStatus={jobData?jobData.status : null} startTime={props.startTime} />
    </div>
  </div>


  <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
    <h4 className="text-gray-700 font-medium">
      Job Status: <span className="font-bold">{jobData.status === "completed"?"Completed" :jobData.status==="pending"?"Pending" : jobData.status==="assigned"?"Assigned":null }</span>
    </h4>
    <h4 className="text-gray-700 font-medium">
      Amount Paid: <span className="font-bold">{paymentData.amount} $</span>
    </h4>
    <h4
      className={`px-3 py-1 rounded-md font-bold text-white ${
        paymentData.status === "completed"
          ? "bg-green-500"
          : paymentData.status === "hold"
          ? "bg-yellow-500"   
          : "bg-red-500"
      }`}
    >
      {paymentData.status === "hold" ? "Hold" :paymentData.status==="completed"?"Completed":paymentData.status==="rejected"?"Rejected" :null}
    </h4>
  </div>
</div>



  )
}
