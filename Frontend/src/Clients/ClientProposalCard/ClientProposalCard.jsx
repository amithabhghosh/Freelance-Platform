import React, { useContext, useEffect, useState } from 'react'
import './ClientProposalCard.css'
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
    <div className='clientProposalCard' onClick={toProposalDetailPage}>
        <div className="clientProposalCardName">
        <h2>{jobName}</h2>
        <p>{props.name}</p>
        <p><strong>Budget: </strong>{props.budget} $</p>
        <p><strong>Deadline: </strong> {props.deadline} Days</p>
        </div>
<div className="clientProposalStatus">
  
    
<span className="status pending">{props.status}</span>
</div>
    </div>
  )
}
