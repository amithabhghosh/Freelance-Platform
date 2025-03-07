import React, { useContext, useEffect, useState } from 'react'

import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'
export const FreelancerJobDetails = () => {
  const navigate=useNavigate()
    const {jobId}=useParams()
const {freelancerToken,freelancerId,freelancerData}=useContext(ContextAPI)
const [job,setJob]=useState(null)
const [clientId,setClientId]=useState()
const [name,setName]=useState("")
const [description,setDescription]=useState("")
const [budget,setBudget]=useState(null)
const [deadline,setDeadline]=useState(null)
const [buttonStatus,setButtonStatus]=useState(false)
const [applied,setApplied]=useState("Not Applied")
const [reviews,setReviews]=useState([])
const [loading,setLoading]=useState(true)
const loadClientReview=async()=>{
  
  try {
    const response=await API.get(`/review/getClientReviewsByScore/${clientId}`)

    if(response.data.success){
      if(response.data.topReviews.length===0){
        return setReviews([])
      }
      setReviews(response.data.topReviews)
    }else{
      setReviews([])
    }
  } catch (error) {
    toast.error(error.message)
  }
}

useEffect(() => {
 

  if (clientId && freelancerId && freelancerToken) {
    loadClientReview();
  } else {
    setReviews([]);
  }
}, [clientId, freelancerId, freelancerToken]);





const sentProposal = async () => {
  if (!name || !description || !budget || !deadline) {
      return toast.error("All Fields Required");
  }

  if(freelancerData.isVerified){
    return toast.error("You Are Not Verified")
  }
  try {  
      const response = await API.get(`/freelancer/getClientId/${jobId}`);
      if (!response.data.success) {
          return toast.error("Error Occured");
      }

      const clientId = response.data.clientId.ClientId; 

  
      const proposalResponse = await API.post(
          "/freelancer/postProposal",
          { name, description, budget, jobId, freelancerId, deadline, clientId },
          { headers: { token: freelancerToken } }
      );

      if (proposalResponse.data.success) {
          toast.success("Proposal Sent Successfully");
          setButtonStatus(true)
          setName("")
          setDeadline(null)
          setDescription("")
          setBudget(null)
          navigate("/freelancer/proposals")
      } else {
          toast.error(proposalResponse.data.message);
      }
  } catch (error) {
      toast.error(error.message);
  }
};


const loadJobData=async()=>{
    try {
      setLoading(true)
      const response=await API.get(`/freelancer/job/${jobId}`,{headers:{token:freelancerToken}})
      if(response.data.success){
        setJob(response.data.job)
        setClientId(response.data.job.ClientId)
      }  else{
        toast.error(response.data.message)
      }
      setLoading(false)
    } catch (error) {
        toast.error(error.message)
    }
}


const loadAppliedStatus=async()=>{
  try {
  
    const response=await API.get(`/freelancer/getAppliedStatus/${jobId}/${freelancerId}`)
    if(response.data.success){
      setApplied("Not Applied")
    }else{
      setApplied("Applied")
    }
  } catch (error) {
    toast.error(error.message)
  }
}

useEffect(()=>{
    if(freelancerToken){
        loadJobData()      
    }else{
        setJob(false)     
    }
},[freelancerToken,jobId])


useEffect(()=>{
  if(freelancerToken){
      loadAppliedStatus()
  }else{
      setApplied("Not Applied")  
  }
},[freelancerToken,jobId])

return (
  <>
    {loading ? (
     
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    ) : job ? (
      <div className="flex flex-col min-h-screen gap-5 max-w-5xl mx-auto p-5 mt-20 w-full">
        
   
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full flex-grow">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">Job Details</h2>

          <div className="space-y-4 text-gray-800">
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Title</h4>
              <p className="text-gray-600">{job?.title || "NA"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Description</h4>
              <p className="text-gray-600">{job?.description || "NA"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Category</h4>
              <p className="text-gray-600">{job?.catagory || "NA"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Skills</h4>
              <p className="text-gray-600">{job?.skills || "NA"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Budget</h4>
              <p className="text-gray-600">${job?.budget || "NA"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Deadline</h4>
              <p className="text-gray-600">{job?.deadline || "NA"} Days</p>
            </div>
          </div>
        </div>

  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          
    
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Send Proposal</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500"
            />

            <textarea
              placeholder="Short Description About You"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 h-24 resize-none"
            ></textarea>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="number"
                placeholder="Budget You Offer $"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500"
              />
              <input
                type="number"
                placeholder="Days Needed"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500"
              />
            </div>

            {applied === "Applied" || buttonStatus ? (
              <button disabled className="w-full p-3 mt-4 bg-gray-400 text-white rounded-md cursor-not-allowed">
                Applied
              </button>
            ) : (
              <button
                className="w-full p-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                onClick={sentProposal}
              >
                Send Proposal
              </button>
            )}
          </div>

  
          <div className="bg-white rounded-lg p-6 shadow-md flex flex-col h-full">
            <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Reviews</h4>

            <div className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide">
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
                <p className="text-gray-600">No Reviews For the Client</p>
              )}
            </div>
          </div>

        </div>

      </div>
    ) : (
      <p className="text-center text-gray-700 text-lg">No Job Details</p>
    )}
  </>
);


}
