import React, { useContext, useEffect, useState } from 'react'
import './AdminJobList.css'
import logo from '../../assets/images/NavbarLogo.png'
import { AdminJobCard } from '../AdminJobCard/AdminJobCard'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
export const AdminJobList = () => {
  const [jobs,setJobs]=useState([])
const {adminToken}=useContext(ContextAPI)
 const loadAllJobs=async()=>{
  try {
    const response=await API.get("/admin/allJobs",{headers:{token:adminToken}})
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
  if(adminToken){
    loadAllJobs()
  }else{
    setJobs(false)
  }
 },[adminToken])

  return (
    <div className='AdminJobList'>
      <h2>All Jobs</h2>
     {jobs?(
      <div className="adminJobLists">
        {jobs.map((item,i)=>(
          <AdminJobCard id={item._id} title={item.title} budget={item.budget} deadline={item.deadline} status={item.status} />
        ))}

</div>
     ):(
      <p>No Jobs Posted</p>
     )} 

    </div>
  )
}
