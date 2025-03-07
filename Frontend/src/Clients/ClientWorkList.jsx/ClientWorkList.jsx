import React, { useContext, useEffect, useState } from 'react'

import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import { ClientWorkCard } from '../ClientWorkCard/ClientWorkCard'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'
export const ClientWorkList = () => {
const {clientId,clientToken}=useContext(ContextAPI)
const [clientPaidWork,setClientPaidWork]=useState()
const [loading,setLoading]=useState(true)

const loadWorksPaid=async()=>{
try {
  setLoading(true)
    const response=await API.get("/client/getJobCompletedAndAssigned",{headers:{token:clientToken}})
    if(response.data.success){
        setClientPaidWork(response.data.jobs)
    }else{
        toast.error(response.data.message)
    }
    setLoading(false)
} catch (error) {
    toast.error(error.message)
}
}

useEffect(()=>{
    if(clientId && clientToken){
        loadWorksPaid()
    }else{
        setClientPaidWork(false)
    }
},[clientId,clientToken])

if(loading){
  return (
    <div className="flex justify-center items-center h-screen">
        <LoadingSpinner/>
      </div>
  )
}

  return (


<div className="w-full max-w-3xl mx-auto min-h-screen p-5 bg-gray-100 rounded-lg mb-10 shadow-md mt-28">
      

      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold text-gray-800 uppercase">Jobs</h2>
      </div>


      {Array.isArray(clientPaidWork) && clientPaidWork.length > 0 ? (
        <div className="flex flex-col gap-4">
          {clientPaidWork.map((item) => (
            <ClientWorkCard 
              key={item._id} 
              id={item._id} 
              title={item.title} 
              catagory={item.catagory} 
              status={item.status} 
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No Orders</p>
      )}
      
    </div>



  )
}