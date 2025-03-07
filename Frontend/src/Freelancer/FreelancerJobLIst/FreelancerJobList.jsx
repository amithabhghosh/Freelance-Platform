import React, { useContext, useEffect, useState } from 'react'

import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { FreelancerJobCard } from '../FreelancerJobCard/FreelancerJobCard'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'
export const FreelancerJobList = ({ searchQuery }) => {
  const {freelancerToken}=useContext(ContextAPI)
  const [jobs,setJobs]=useState([])
const [loading,setLoading]=useState(true)
  const loadPendingAllJobs=async()=>{
try {
  setLoading(true)
  const response=await API.get("/freelancer/jobPendingStatus",{headers:{token:freelancerToken}})
  if(response.data.success){
    setJobs(response.data.jobs)
  }else{
    toast.error(response.data.message)
  }
  setLoading(false)
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

  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();

    return (
      job.title.toLowerCase().includes(query) || 
      job.catagory.toLowerCase().includes(query) || 
      job.description.toLowerCase().includes(query) || 
      job.skills.toLowerCase().includes(query)
    );
  });

  return (



<div className="w-full max-w-5xl min-h-[400px] mx-auto text-center p-5 font-poppins">

{loading ? (
  <LoadingSpinner/>
) : (
  <>
  
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Jobs For You</h2>
{filteredJobs && filteredJobs.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {filteredJobs.map((item) => (
      <FreelancerJobCard 
      key={item._id}
      id={item._id}
      title={item.title}
      catagory={item.catagory}
      skills={item.skills}
      budget={item.budget}
      deadline={item.deadline}
      description={item.description}
      />
    ))}
  </div>
) : (
  <p className="text-lg text-red-500 font-medium mt-5">No Jobs Found</p>
)}

  
  </>
)}



</div>
  )
}
