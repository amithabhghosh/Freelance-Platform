import React, { useContext, useEffect, useState } from 'react'
import './ClientProposalList.css'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import { FreelancerProposalCard } from '../../Freelancer/FreelancerProposalCard/FreelancerProposalCard'
import { ClientProposalCard } from '../ClientProposalCard/ClientProposalCard'
export const ClientProposalList = () => {
    const {clientToken,clientId}=useContext(ContextAPI)
    const [proposals,setProposals]=useState([])
const loadClientProposals=async()=>{
    try {
        const response=await API.get(`/client/getProposalRecievedByClient/${clientId}`,{headers:{token:clientToken}})
        if(response.data.success){
        setProposals(response.data.clientProposals)
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
       toast.error(error.message) 
    }
}
useEffect(()=>{
    if(clientToken && clientId){
        loadClientProposals()
    }else{
        setProposals([])
    }
},[clientToken,clientId])

  return (
    <div className='ClientProposalList'>
    <div className="clientProposals">
        <h2>Proposals Received</h2>
    </div>

    {proposals && proposals.length > 0 ? (
        <div className="proposalCardList">
            {proposals.map((item, i) => (
                <ClientProposalCard 
                    key={item._id}
                    id={item._id} 
                    name={item.name} 
                    budget={item.budget} 
                    deadline={item.deadline} 
                    status={item.status} 
                    jobId={item.jobId} 
                />
            ))}
        </div>
    ) : (
        <p className="noProposals">No Proposals Received</p>
    )}
</div>

  )
}
