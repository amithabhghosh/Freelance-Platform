import React, { useContext, useEffect, useState } from 'react'


import { AdminJobCard } from '../AdminJobCard/AdminJobCard'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'
export const AdminJobList = () => {
  const [jobs,setJobs]=useState([])
const {adminToken}=useContext(ContextAPI)
const [loading,setLoading]=useState(true)
 const loadAllJobs=async()=>{
  try {
    setLoading(true)

    const response=await API.get("/admin/allJobs",{headers:{token:adminToken}})
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
  if(adminToken){
    loadAllJobs()
  }else{
    setJobs(false)
  }
 },[adminToken])

  return (


<div className="w-full max-w-5xl mx-auto text-center p-6 mt-28 min-h-screen">

{loading ? (
  <LoadingSpinner/>
) : (
  <>
  
  <h2 className="text-2xl font-bold text-gray-800 mb-4">All Jobs</h2>


{jobs && jobs.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
    {jobs.map((item) => (
      <AdminJobCard
    id={item._id}
        key={item._id}
        title={item.title}
        budget={item.budget}
        deadline={item.deadline}
        status={item.status}
      />
    ))}
  </div>
) : (
  <p className="text-lg font-semibold text-red-500 mt-4">No Jobs Posted</p>
)}

  
  </>
)}


</div>


  )
}
