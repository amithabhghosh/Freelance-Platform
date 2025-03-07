import React, { useContext, useEffect, useState } from 'react'

import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ClientCoundownTimer } from '../ClientCoundownTimer/ClientCoundownTimer'
export const ClientWorkCard = (props) => {
    const {clientToken,clientId}=useContext(ContextAPI)
    const [paymentDataAmount,setPaymentDataAmount]=useState()
    const [paymentDataStatus,setPaymentDataStatus]=useState()
    const [proposalId,setProposalId]=useState()
    const [proposalDeadline,setProposalDeadline]=useState()
    const jobId=props.id
    const [startTime,setStartTime]=useState()
    const navigate=useNavigate()



    const loadPaymentForParticularJob=async()=>{
        console.log("ClientWorkCard Props:", props);
console.log("Job ID for Payment:", jobId);

        try {
            const response=await API.get(`/client/getPaymentData/${jobId}`,{headers:{token:clientToken}})
            if(response.data.success){
setProposalId(response.data.data.proposalId)
                setPaymentDataAmount(response.data.data.amount)
                setPaymentDataStatus(response.data.data.status)
                console.log("amount",paymentDataAmount)
                console.log("status",paymentDataStatus)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

const loadProposaData=async()=>{
    try {
      const response=await API.get(`/client/getProposalByProposalId/${proposalId}`) 
      if(response.data.success){
        setStartTime(response.data.proposal.startTime)
setProposalDeadline(response.data.proposal.deadline)
      } else{
    setProposalDeadline(null)
      }
    } catch (error) {
       toast.error(error.message) 
    }
}

useEffect(()=>{
    if(clientToken && proposalId){
        loadProposaData()
    }
},[clientToken,clientId,proposalId])

    useEffect(()=>{
if(clientId && clientToken){
    loadPaymentForParticularJob()
}else{
    setPaymentDataAmount(false)
    setPaymentDataStatus(false)
}
    })
  return (
    // <div className="client-work-card" onClick={() => navigate(`/client/Works/${jobId}`)}>
    //   <div className="work-details">
    //     <h3>Title: {props.title}</h3>
    //     <h3>Category: {props.catagory}</h3>
    //     <h3>Job Status: {props.status}</h3>
    //     <div className="payment-section">
    //       <h4>Amount Paid: {paymentDataAmount} $</h4>
    //       <h4>Payment Status: {paymentDataStatus}</h4>
    //     </div>
    //   </div>
    //   <div className="timer-section">
    //     <ClientCoundownTimer deadline={proposalDeadline} jobStatus={props.status} startTime={startTime} />
    //   </div>
    // </div>


    <div 
    className="flex flex-col md:flex-row justify-between items-center bg-white rounded-lg shadow-md p-5 my-2 cursor-pointer transition-transform duration-200 hover:-translate-y-1"
    onClick={() => navigate(`/client/Works/${jobId}`)}
  >
    {/* Work Details */}
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-gray-800">Title: {props.title}</h3>
      <h3 className="text-gray-700">Category: {props.catagory}</h3>
      <h3 className="text-gray-700">Job Status: {props.status}</h3>

      {/* Payment Section */}
      <div className="mt-3">
        <h4 className="text-gray-600">Amount Paid: {paymentDataAmount} $</h4>
        <h4 className="text-gray-600">Payment Status: {paymentDataStatus}</h4>
      </div>
    </div>

    {/* Timer Section */}
    <div className="min-w-[150px] flex items-center justify-center p-3 bg-gray-100 rounded-lg mt-4 md:mt-0">
      <ClientCoundownTimer deadline={proposalDeadline} jobStatus={props.status} startTime={startTime} />
    </div>
  </div>



  )
}
