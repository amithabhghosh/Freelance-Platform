import React, { useContext, useEffect, useState } from 'react'
import './FreelancerJobList.css'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { FreelancerJobCard } from '../FreelancerJobCard/FreelancerJobCard'
import API from '../../connectApi'
import { toast } from 'react-toastify'
export const FreelancerJobList = () => {
  const {freelancerToken}=useContext(ContextAPI)
  const [jobs,setJobs]=useState([])

  const loadPendingAllJobs=async()=>{
try {
  const response=await API.get("/freelancer/jobPendingStatus",{headers:{token:freelancerToken}})
  if(response.data.success){
    setJobs(response.data.jobs)
  }else{
    toast.error(response.data.message)
  }
} catch (error) {
  toast.error(error.message)
}
  }

  useEffect(()=>{
    if(freelancerToken){
      loadPendingAllJobs()
    }else{
      setJobs(false)
    }
  },[freelancerToken])
  return (
    <div className='FreelancerJobList'>
<h2>Jobs For You</h2>
{jobs?(
  <div className="freelancerJobLists">
    {jobs.map((item,i)=>(
      <FreelancerJobCard id={item._id} title={item.title} budget={item.budget} deadline={item.deadline}  />
    ))}

</div>
):(
  <p>No Jobs</p>
)}

    </div>
  )
}
