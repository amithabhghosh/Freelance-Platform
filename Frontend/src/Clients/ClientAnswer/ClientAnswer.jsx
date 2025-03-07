import React, { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
export const ClientAnswer = () => {

const {jobId}=useParams()
const {clientToken,clientId}=useContext(ContextAPI)
const [answers,setAnswers]=useState()
const [modalIsOpen,setModalIsOpen]=useState(false)
const [rating, setRating] = useState(0);
const [freelancerId,setFreelancerId]=useState()
const [message,setMessage]=useState("") 
const [buttonStatus,setButtonStatus]=useState(false)
const [satisFiedButtonStatus,setSatisFiedButtonStatus]=useState(false)

const loadAnswers=async()=>{
    try {
        const response=await API.get(`/client/getJobAnswer/${jobId}`,{headers:{token:clientToken}})
        if(response.data.success){
          const submissions = response.data.submissions;

          if (submissions) {
              setAnswers(submissions);
              setFreelancerId(submissions.freelancerId);  // Take first freelancer ID
          } else {
              setAnswers();  // Set an empty array if there are no submissions
              setFreelancerId(null);  // Avoid setting an invalid ID
          }

        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

useEffect(()=>{
    if(clientToken && jobId){
        loadAnswers()
    }else{
        setAnswers(null)
    }
},[jobId,clientToken,clientId])



const notSatisfied = async (id) => {
  try {
    const response = await API.put("/client/rejectAnswerSubmission", { id }, { headers: { token: clientToken } });

    if (response.data.success) {
      toast.success("Rejected");
      setButtonStatus(true)
    }
  } catch (error) {
    toast.error(error.message);
  }
};



const satisfied=async(submissionId)=>{

try {
  const response=await API.put(`/client/finalJobSubmission/${submissionId}`,{clientId:clientId,jobId:jobId},{headers:{token:clientToken}})
  if(response.data.success){
    setSatisFiedButtonStatus(true)
    toast.success("Job Completed SuccessFully")
   
  }else{
    toast.error(response.data.message)
  }
} catch (error) {
  toast.error(error.message)
}
}


const reviewSubmit=async(e)=>{
e.preventDefault()
  try {
    const response=await API.post("/review/reviewSent",{reviewerId:clientId,reviewerType:"Client",revieweeId:freelancerId,revieweeType:"Freelancer",jobId:jobId,rating:rating,message:message})
    if(response.data.success){
      toast.success("Review Posted SuccessFully")
      setMessage("")
      setModalIsOpen(false)
    }else{
      toast.error(response.data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}


return (



  <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
  {!answers ? (
    <p className="text-gray-600">No answers submitted yet</p>
  ) : (
    <div className="w-full max-w-2xl flex flex-col gap-6">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-transform">
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p className="font-semibold text-gray-800">Answer 1</p>
          <p className="text-gray-600">{answers.textAnswer1 || "Loading..."}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p className="font-semibold text-gray-800">Answer 2</p>
          <p className="text-gray-600">{answers.textAnswer2 || "NA"}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p className="font-semibold text-gray-800">Answer 3</p>
          <p className="text-gray-600">{answers.textAnswer3 || "NA"}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p className="font-semibold text-gray-800">Files</p>
          {Array.isArray(answers.files) && answers.files.length > 0 ? (
            <div className="flex flex-col gap-2 overflow-x-auto">
              {answers.files.map((link, index) => (
                <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate">
                  View Answer
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">NA</p>
          )}
        </div>


        <div className="flex flex-wrap gap-4 mt-4">
          {answers.isOk === "Pending" ? (
            <>
              <button onClick={() => satisfied(answers._id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                Satisfied
              </button>
              <button onClick={() => notSatisfied(answers._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                Not Satisfied
              </button>
            </>
          ) : answers.isOk === "Rejected" || buttonStatus ? (
            <button className="bg-red-400 text-white px-4 py-2 rounded-md">Rejected</button>
          ) : answers.isOk === "Completed" || satisFiedButtonStatus ? (
            <>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" onClick={() => setModalIsOpen(true)}>
                Write A Review
              </button>
            </>
          ) : null}
        </div>
        {answers.isOk === "Rejected" && (
  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
    <p className="font-semibold">Submission Rejected</p>
    <p className="text-sm">The freelancer has not yet resubmitted their work.</p>
  </div>
)}
      </div>
    </div>
  )}
  
  {modalIsOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <button className="absolute top-4 right-4 text-gray-500 text-2xl" onClick={() => setModalIsOpen(false)}>&times;</button>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Review Form</h2>
        <div className="flex justify-center gap-2 text-2xl mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-400"}`} onClick={() => setRating(star)}>
              ★
            </span>
          ))}
        </div>
        <form onSubmit={reviewSubmit} className="flex flex-col gap-4">
          <textarea placeholder="Write your review..." required className="border rounded-md p-2 h-24 w-full" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          <div className="flex justify-between">
            <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition" onClick={() => setModalIsOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>



  );
}