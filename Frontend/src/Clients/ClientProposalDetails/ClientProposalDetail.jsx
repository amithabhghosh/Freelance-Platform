import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { useParams } from 'react-router-dom'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'
export const ClientProposalDetail = () => {
const {clientToken,clientId}=useContext(ContextAPI)
const {proposalId}=useParams()
const [proposalData,setProposalData]=useState()
const [freelanceId,setFreelanceId]=useState()
const [freelancerData,setFreelancerData]=useState()
const [job,setJob]=useState()
const [reviews,setReviews]=useState([])
const [loading, setLoading] = useState(true); 

const loadFreelancerReview=async()=>{
  try {
    const response=await API.get(`/review/getFreelancerReviewsByScore/${freelanceId}`)
    if(response.data.success){
      if(response.data.topReviews.length===0){
        return setReviews(null)
      }
      setReviews(response.data.topReviews)

    }else{
      setReviews()
    }
  } catch (error) {
    toast.error(error.message)
  }
}

useEffect(()=>{
  if(freelanceId && clientId && clientToken){
loadFreelancerReview()
  }else{
    setReviews(null)
  }
},[freelanceId,clientId,clientToken])


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
//     await jobAssigning()
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

const loadJobData=async()=>{
    try {
    const response=await API.get(`/client/getJobByProposalId/${proposalId}`,{headers:{token:clientToken}})
    if(response.data.success){
setJob(response.data.job)
    }else{
        toast.error(response.data.message)
    }
    } catch (error) {
       toast.error(error.message) 
    }
}


useEffect(() => {
  const fetchData = async () => {
    setLoading(true); 
    await loadJobData();
    await loadProposal();
    setLoading(false);
  };

  if (clientToken && proposalId) {
    fetchData();
  } else {
    setJob(false);
  }
}, [clientToken, proposalId]);






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
            { freelanceId }, 
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


if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner/>
    </div>
  );
}

  return freelancerData && (

<div className="flex flex-col min-h-screen items-center gap-10 mt-28 p-5 w-full max-w-6xl mx-auto">


<div className="bg-white rounded-lg p-6 shadow-md w-full md:w-3/5">
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-gray-800">Name</h4>
    <p className="text-gray-600">{proposalData.name}</p>
  </div>
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-gray-800">Description</h4>
    <p className="text-gray-600">{proposalData.description}</p>
  </div>
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-gray-800">Budget Offered</h4>
    <p className="text-gray-600">${proposalData.budget}</p>
  </div>
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-gray-800">Days</h4>
    <p className="text-gray-600">{proposalData.deadline} Days</p>
  </div>

  {proposalData.status === "accepted" && <p className="text-green-600 font-semibold">Accepted</p>}
  {proposalData.status === "rejected" && <p className="text-red-600 font-semibold">Rejected</p>}
  {proposalData.status === "pending" && (
    <div className="flex gap-3 mt-4">
      <button 
        onClick={paymentToWork} 
        className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
      >
        Accept
      </button>
      <button 
        onClick={rejectProposal} 
        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition"
      >
        Reject
      </button>
    </div>
  )}
</div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-4/5">

 
  <div className="bg-white rounded-lg p-6 shadow-md">
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-gray-800">Freelancer Name</h4>
      <p className="text-gray-600">{freelancerData.name}</p>
    </div>
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-gray-800">Skills</h4>
      <p className="text-gray-600">{freelancerData.skills}</p>
    </div>
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-gray-800">Country</h4>
      <p className="text-gray-600">{freelancerData.country}</p>
    </div>
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-gray-800">Jobs Completed</h4>
      <p className="text-gray-600">{freelancerData.jobsCompleted}</p>
    </div>
   
<div className="mb-4">
  <h4 className="text-lg font-semibold text-gray-800">Rating</h4>
  <div className="flex items-center space-x-1 text-yellow-500">
    {[...Array(freelancerData.rating)].map((_, index) => (
      <FaStar key={index} />
    ))}
  </div>
</div>
  </div>

 
  <div className="bg-white rounded-lg p-6 shadow-md">
    <h4 className="text-lg font-semibold text-gray-800 mb-4">Reviews</h4>
    <div className="space-y-3">
  {reviews && reviews.length > 0 ? (
    reviews.map((review, index) => (
      <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
       
        {review.rating > 0 && (
          <div className="text-yellow-500 text-lg">
            {"★".repeat(review.rating)}
          </div>
        )}
        <p className="text-gray-700">"{review.message}"</p>
      </div>
    ))
  ) : (
    <p>No Reviews For the Freelancer</p>
  )}
</div>

  </div>

</div>

</div>



  )
}
