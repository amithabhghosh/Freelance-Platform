import React, { useContext, useEffect, useState } from 'react'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import { FreelancerEarning } from '../FreelancerEarning/FreelancerEarning'
import { FreelancerEarningChart } from '../FreelancerEarningChart/FreelancerEarningChart'

export const FreelancerEarningDetail = () => {
const {freelancerToken,freelancerId,freelancerData}=useContext(ContextAPI)
const [completedPaymentAmount,setCompletedPaymentAmount]=useState(0)
const [completedPayments,setCompletedPayments]=useState()
const [holdPaymentAmount,setHoldPaymentAmount]=useState(0)
const loadCompletedPayments=async()=>{
    try {
        const response=await API.get(`/freelancer/getPaymentDetailsOfFreelancer/${freelancerId}`,{headers:{token:freelancerToken}})
        if(response.data.success){
setCompletedPaymentAmount(response.data.totalCompletedAmount)
setCompletedPayments(response.data.payments)
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}


const loadHoldPayments=async()=>{

    try {
    const response=await API.get(`/freelancer/getHoldPaymentOfFreelancer/${freelancerId}`,{headers:{token:freelancerToken}})
    if(response.data.success){
setHoldPaymentAmount(response.data.totalHoldAmount)
    }  else{
        toast.error(response.data.message)
    }  
    } catch (error) {
      toast.error(error.message)  
    }
}

useEffect(()=>{
    if(freelancerId && freelancerToken){
        loadCompletedPayments()
    }else{
        setCompletedPaymentAmount(0)
        setCompletedPayments(null)
    }
},[freelancerToken,freelancerId])


useEffect(()=>{
    if(freelancerId && freelancerToken){
        loadHoldPayments()
    }else{
        setHoldPaymentAmount(0)
    }
},[freelancerToken,freelancerId])

  return (
<div className="max-w-6xl mb-10 mx-auto px-4 sm:px-6 mt-24">

<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700">
  <div className="bg-yellow-100 p-3 rounded-lg text-sm sm:text-base">
    <span className="font-medium">On Hold:</span> 
    <span className="text-yellow-600 font-semibold"> ${holdPaymentAmount}</span>
  </div>
  <div className="bg-green-100 p-3 rounded-lg text-sm sm:text-base">
    <span className="font-medium">Completed:</span> 
    <span className="text-green-600 font-semibold"> ${completedPaymentAmount}</span>
  </div>
  <div className="bg-blue-100 p-3 rounded-lg text-sm sm:text-base">
    <span className="font-medium">Earned:</span> 
    <span className="text-blue-600 font-semibold"> ${freelancerData.amount}</span>
  </div>
  <div className="bg-red-100 p-3 rounded-lg text-sm sm:text-base">
    <span className="font-medium">Platform Fee:</span> 
    <span className="text-red-600 font-semibold"> ${freelancerData.amount - completedPaymentAmount}</span>
  </div>
</div>

<div className="mt-6 w-full max-w-6xl mx-auto overflow-hidden">
  <FreelancerEarningChart />
</div>

<div className="mt-8 max-w-6xl mx-auto px-4">
  <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Completed Payments</h4>
  {completedPayments && completedPayments.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {completedPayments.map((item, i) => (
        <FreelancerEarning key={i} jobId={item.jobId} amount={item.amount} status={item.status} />
      ))}
    </div>
  ) : (
    <p className="text-gray-500 italic">No Work Completed</p>
  )}
</div>

</div>


  )
}
