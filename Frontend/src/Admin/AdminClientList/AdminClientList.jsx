import React, { useContext, useEffect, useState } from 'react'

import { AdminClientCard } from '../AdminClientCard/AdminClientCard'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'
export const AdminClientList = () => {
    const {adminToken}=useContext(ContextAPI)
    const [clients,setClients]=useState([])
    const [loading,setLoading]=useState(true)
    const loadAllClients=async()=>{
try {
  setLoading(true)
    const response=await API.get("/admin/allClients",{headers:{token:adminToken}})
    if(response.data.success){
        setClients(response.data.clients)
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
            loadAllClients()
        }else{
            setClients(false)
        }
    },[adminToken])
  return (


<div className="w-full max-w-5xl mx-auto px-4 text-center mt-20 min-h-screen mt-26 mb-10">

{loading ? (
  <LoadingSpinner/>
) : (
  <>
<h2 className="text-2xl font-bold text-gray-800 mb-6">All Clients</h2>
{clients && clients.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {clients.map((item, i) => (
      <AdminClientCard
        key={item._id}
        id={item._id}
        name={item.name}
        email={item.email}
        phone={item.phone}
        country={item.country}
        profile={item.profile}
      />
    ))}
  </div>
) : (
  <p className="text-gray-500 text-lg mt-4">No Clients Registered</p>
)}

  </>
)}

</div>


  )
}
