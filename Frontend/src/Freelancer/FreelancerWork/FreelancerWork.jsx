import React, { useContext, useEffect, useState } from 'react'

import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import { FreelancerWorkCard } from '../FreelancerWorkCard/FreelancerWorkCard'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'
export const FreelancerWork = () => {
  const {freelancerId,freelancerToken}=useContext(ContextAPI)
  const [acceptedProposals,setAcceptedProposals]=useState()
  const [loading,setLoading]=useState(true)
  const loadProposalDetails=async()=>{
    try {
      setLoading(true)
      const response=await API.get(`/freelancer/getAcceptedProposals/${freelancerId}`,{headers:{token:freelancerToken}})
      if(response.data.success){
setAcceptedProposals(response.data.proposals)

      }else{
      setAcceptedProposals(null)
       
      }
      setLoading(false)
    } catch (error) {
      
     setAcceptedProposals(null)
    }
  }

useEffect(()=>{
  if(freelancerId && freelancerToken){
    loadProposalDetails()
  }else{
    setAcceptedProposals(false)
  }
},[freelancerId,freelancerToken])

  return (



<div className="w-full min-h-[400px] mx-auto px-6 mt-32">
  {loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Jobs</h2>
      </div>

      {acceptedProposals?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {acceptedProposals.map((item) => (
            <FreelancerWorkCard
              key={item._id}
              id={item._id}
              jobId={item.jobId}
              budget={item.budget}
              deadline={item.deadline}
              startTime={item.startTime}
              className="w-full"
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No Works For You</p>
      )}
    </>
  )}
</div>

  )
}
