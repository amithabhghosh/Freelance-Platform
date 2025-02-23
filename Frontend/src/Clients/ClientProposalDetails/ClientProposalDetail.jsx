import React, { useContext, useEffect, useState } from 'react'
import './ClientProposalDetail.css'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { useParams } from 'react-router-dom'
import API from '../../connectApi'
import { toast } from 'react-toastify'
export const ClientProposalDetail = () => {
const {clientToken,clientId}=useContext(ContextAPI)
const {proposalId}=useParams()
const [proposalData,setProposalData]=useState()
const [freelanceId,setFreelanceId]=useState()
const [freelancerData,setFreelancerData]=useState()
const loadProposal=async()=>{
    try {
        const response=await API.get(`/client/getProposalByProposalId/${proposalId}`,{headers:{token:clientToken}})
        if(response.data.success){
            setProposalData(response.data.proposal)
            setFreelanceId(response.data.proposal.freelancerId)
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

const loadFreelancerDetails=async()=>{
    
    try {
        const response=await API.get(`/client/getFreelancerByFreelancerId/${freelanceId}`,{headers:{token:clientToken}})
        if(response.data.success){
            setFreelancerData(response.data.freelancer)
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}


             
// const acceptProposal=async()=>{
//     try {
//         const response=await API.put(`/client/updateProposalStatus/${proposalId}`,{status:"accepted"},{headers:{token:clientToken}})
//         if(response.data.success){
//             toast.success("Proposal Accepted")
//             setProposalData((prev) => ({ ...prev, status: "accepted" }));
//         }else{
//             toast.error(response.data.success)
//         }
//     } catch (error) {
//         toast.error(error.message)
//     }
// }

const rejectProposal=async()=>{
    try {
        const response=await API.put(`/client/updateProposalStatus/${proposalId}`,{status:"rejected"},{headers:{token:clientToken}})
        if(response.data.success){
            toast.success("Proposal Accepted")
            setProposalData((prev) => ({ ...prev, status: "rejected" }));  
        }else{
            toast.error(response.data.success)
        }
    } catch (error) {
        toast.error(error.message)
    }
}


useEffect(()=>{
    if(clientToken && proposalId){
        loadProposal()
    }else{
        setFreelancerData(false)
    }
},[clientToken,proposalId])


useEffect(()=>{
    if(freelanceId){
        loadFreelancerDetails()
    }else{
        setFreelancerData(false)
    }
},[freelanceId])


const paymentToWork = async () => {
    try {
        const response = await API.post(
            `/payment/checkout-session/${proposalId}`,
            { freelanceId }, // Fix typo: should be freelancerId
            { headers: { token: clientToken } }
        );

        if (response.data.success) {
            if (response.data.session && response.data.session.url) {
                window.location.href = response.data.session.url; 
                
            }
           
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Payment failed");
    }
};


  return freelancerData && (

    <div className='ClientProposalDetail'>
        <div className="proposalArea">
            <div className="propsalHeadings">
                <h4>Name</h4>
                <p>{proposalData.name}</p>
            </div>
            <div className="propsalHeadings">
                <h4>Description</h4>
                <p>{proposalData.description}</p>
            </div>
            <div className="propsalHeadings">
                <h4>Budget Offered</h4>
                <p>{proposalData.budget} $</p>
            </div>
            <div className="propsalHeadings">
                <h4>Days</h4>
                <p>{proposalData.deadline} Days</p>
            </div>
            {proposalData.status==="accepted"? (
 <p>Accepted</p>
            ):null}
         {proposalData.status==="pending"?(
             <div className="proposalAcceptButtons">
             <button onClick={paymentToWork}>Accept</button>
             <button onClick={rejectProposal}>Reject</button>
            </div>
         ):null}
         {proposalData.status==="rejected"?(
            <p>Rejected</p>
         ):null}
        </div>

        <div className="freelancerProposalDetails">
            <div className="frelancerProposalTags">
                <h4>Name</h4>
                <p>{freelancerData.name}</p>
            </div>
            <div className="frelancerProposalTags">
                <h4>Skills</h4>
                <p>{freelancerData.skills}</p>
            </div>
            <div className="frelancerProposalTags">
                <h4>Country</h4>
                <p>{freelancerData.country}</p>
            </div>
            <div className="frelancerProposalTags">
                <h4>Jobs Completed</h4>
                <p>{freelancerData.jobsCompleted}</p>
            </div>
            <div className="frelancerProposalTags">
                <h4>Rating</h4>
                <p>{freelancerData.rating}/5</p>
            </div>
           <div className="reviewProposalForClients">
            <div className="reviews">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad odit error necessitatibus quia aperiam accusamus earum sunt, blanditiis dicta eos? Ipsum delectus impedit dignissimos in!</p>
            </div>
            <div className="reviews">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad odit error necessitatibus quia aperiam accusamus earum sunt, blanditiis dicta eos? Ipsum delectus impedit dignissimos in!</p>
            </div>
            <div className="reviews">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad odit error necessitatibus quia aperiam accusamus earum sunt, blanditiis dicta eos? Ipsum delectus impedit dignissimos in!</p>
            </div>
           </div>
        </div>
    </div>
  )
}
