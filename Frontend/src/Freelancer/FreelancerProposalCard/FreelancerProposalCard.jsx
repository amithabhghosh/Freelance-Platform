import React, { useContext, useEffect, useState } from 'react';

import API from '../../connectApi';
import { ContextAPI } from '../../ContextAPI/ContextAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const FreelancerProposalCard = (props) => {
    const {freelancerToken}=useContext(ContextAPI)
    const navigate=useNavigate()
    const jobId=props.jobId
    const [jobName,setJobName]=useState()
    const loadJobData= async()=>{
        try {
            const response= await API.get(`/freelancer/job/${jobId}`,{headers:{token:freelancerToken}})
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
        if(freelancerToken){
            loadJobData()
        }else{
            setJobName(false)
        }
    },[freelancerToken,jobId])

    const toProposalDetail=()=>{
      navigate(`/freelancer/proposal/${props.id}`)
    }


  return (
 


<div className="bg-white rounded-lg p-4 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center transition-transform transform hover:-translate-y-1 cursor-pointer" onClick={toProposalDetail}>
  <div className="flex-1">
    <h2 className="text-xl font-semibold text-gray-800">{jobName}</h2>
    <p className="text-gray-600"><strong>Budget: </strong>{props.budget} $</p>
    <p className="text-gray-600"><strong>Deadline: </strong> {props.deadline} Days</p>
  </div>
  <div 
    className={`px-3 py-1 rounded-lg font-bold capitalize text-sm ${
      props.status === 'pending' ? 'bg-yellow-300 text-yellow-900' 
      : props.status === 'accepted' ? 'bg-green-500 text-white' 
      : 'bg-red-500 text-white'
    }`}
  >
    {props.status}
  </div>
</div>








  );
}
