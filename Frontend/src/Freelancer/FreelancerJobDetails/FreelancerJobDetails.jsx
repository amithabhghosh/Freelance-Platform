import React, { useContext, useEffect, useState } from 'react'
import './FreelancerJobDetails.css'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { useParams } from 'react-router-dom'
import API from '../../connectApi'
import { toast } from 'react-toastify'
export const FreelancerJobDetails = () => {
    const {jobId}=useParams()
const {freelancerToken,freelancerId}=useContext(ContextAPI)
const [job,setJob]=useState(null)
const [clientId,setClientId]=useState()
const [name,setName]=useState("")
const [description,setDescription]=useState("")
const [budget,setBudget]=useState()
const [deadline,setDeadline]=useState()

const [applied,setApplied]=useState("Not Applied")
const findClientId=async()=>{
    try {
        const response=await API.get(`/freelancer/getClientId/${jobId}`)
        if(response.data.success){
setClientId(response.data.clientId.ClientId)
        }else{
            toast.error("Error Occured")
        }
    } catch (error) {
        toast.error(error.message)
    }
}
const sentProposal=async ()=>{
    if(!name || !description || !budget || !deadline){
      return toast.success("All Fields Required")
    }
    await findClientId()
    try {
        const response=await API.post("/freelancer/postProposal",{name,description,budget,jobId,freelancerId,deadline,clientId},{headers:{token:freelancerToken}})
        if(response.data.success){
            toast.success("Proposal Sent Successfull")
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

const loadJobData=async()=>{
    try {
      const response=await API.get(`/freelancer/job/${jobId}`,{headers:{token:freelancerToken}})
      if(response.data.success){
        setJob(response.data.job)
      }  else{
        toast.error(response.data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
}


const loadAppliedStatus=async()=>{
  try {
    console.log("freelancerId",freelancerId)
    const response=await API.get(`/freelancer/getAppliedStatus/${jobId}/${freelancerId}`)
    if(response.data.success){
      setApplied("Not Applied")
    }else{
      setApplied("Applied")
    }
  } catch (error) {
    toast.error(error.message)
  }
}

useEffect(()=>{
    if(freelancerToken){
        loadJobData()
       
    }else{
        setJob(false)
        
    }
 
},[freelancerToken,jobId])


useEffect(()=>{
  if(freelancerToken){
    
      loadAppliedStatus()
  }else{
      setApplied("Not Applied")
      
  }

},[freelancerToken,jobId])

  return job ?  (
    <div className="freelancerJobDetails">
    <div className="jobDetails">
      <h2>Job Details</h2>
      <div className="details">
        <h4>Title</h4>
        <p>{job.title?job.title:"NA"}</p>
      </div>
      <div className="details">
        <h4>Description</h4>
        <p>{job.description?job.description:"NA"}</p>
      </div>
      <div className="details">
        <h4>Category</h4>
        <p>{job.catagory?job.catagory:"NA"}</p>
      </div>
      <div className="details">
        <h4>Skills</h4>
        <p>{job.skills?job.catagory:"NA"}</p>
      </div>
      <div className="details">
        <h4>Budget</h4>
        <p>${job.budget?job.budget:"NA"}</p>
      </div>
      <div className="details">
        <h4>Deadline</h4>
        <p>{job.deadline?job.deadline:"NA"} Days</p>
      </div>
    </div>

    <div className="proposalForm">
      <h2>Send Proposal</h2>
      <div className="proposalInputs">
        <input type="text" placeholder="Your Name" onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className="proposalInputs">
        <textarea placeholder="Short Description About You" onChange={(e)=>setDescription(e.target.value)}></textarea>
      </div>
      <div className="proposalBudget">
        <input type="number" placeholder="Budget You Offer $" onChange={(e)=>setBudget(e.target.value)}/>
        <input type="number" placeholder="Days Needed" onChange={(e)=>setDeadline(e.target.value)} />
      </div>
      {applied==="Applied" ? (<button disabled>Applied</button>):(<button className="submitProposal" onClick={sentProposal}>Send Proposal</button>)}
      
    </div>
  </div>
  ):(<p>No Job Deatils</p>)
}
