import React, { useContext, useEffect, useState } from 'react';
import './FreelancerProposalCard.css';
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
    <div className="freelancerProposalCard" onClick={toProposalDetail}>
      <div className="freelancerProposalDetails">
        <h2>{jobName}</h2>
        <p><strong>Budget: </strong>{props.budget} $</p>
        <p><strong>Deadline: </strong> {props.deadline} Days</p>
      </div>
      <div className="freelancerProposalStatus">
        <span className="status pending">{props.status}</span>
      </div>
    </div>
  );
}
