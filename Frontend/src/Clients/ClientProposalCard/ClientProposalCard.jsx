import React, { useContext, useEffect, useState } from 'react'

import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export const ClientProposalCard = (props) => {
    const {clientToken,clientId}=useContext(ContextAPI)
const jobId=props.jobId
const navigate=useNavigate()
const [jobName,setJobName]=useState()
const loadJobData=async()=>{
    try {
        const response=await API.get(`/client/getJob/${jobId}`,{headers:{token:clientToken}})
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
    if(clientId && clientToken){
        loadJobData()
    }else{
        setJobName(false)
    }
})


const toProposalDetailPage=()=>{
navigate(`/client/proposal/${props.id}`)
}
  return (




<div 
  className="bg-white rounded-xl p-5 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center transition-transform duration-200 hover:-translate-y-1 cursor-pointer w-full max-w-lg mx-auto"
  onClick={toProposalDetailPage}
>

  <div className="flex-1 w-full">
    <h2 className="text-lg md:text-xl font-semibold text-gray-800">{jobName}</h2>
    <p className="text-gray-600 text-sm md:text-base">{props.name}</p>
    <p className="text-gray-600 text-sm md:text-base">
      <strong>💰 Budget:</strong> <span className="font-medium">${props.budget}</span>
    </p>
    <p className="text-gray-600 text-sm md:text-base">
      <strong>⏳ Deadline:</strong> <span className="font-medium">{props.deadline} Days</span>
    </p>
  </div>


  <div
    className={`px-4 py-2 rounded-lg font-bold text-xs md:text-sm capitalize mt-3 md:mt-0 ${
      props.status === "pending"
        ? "bg-yellow-100 text-yellow-800"
        : props.status === "accepted"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"
    }`}
  >
    {props.status}
  </div>
</div>

  )
}
