import React, { useContext, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import API from '../../connectApi';
import { ContextAPI } from '../../ContextAPI/ContextAPI';
import { useParams } from 'react-router-dom';

export const FreelancerAnswerSubmission = () => {
const {jobId}=useParams()
const {freelancerToken,freelancerId}=useContext(ContextAPI)
const [isSubmitted,setIsSubmitted]=useState(false)
const [answerId,setAnswerId]=useState()
const [status,setStatus]=useState()
const [rating, setRating] = useState(0);
const [message,setMessage]=useState("")
const [modalIsOpen,setModalIsOpen]=useState(false)
const [clientId,setClientId]=useState()
const [submitStatus,setSubmitStatus]=useState(false)
const loadClientId=async()=>{
  try {
    const response=await API.get(`/freelancer/getClientId/${jobId}`,{headers:{token:freelancerToken}})
    if(response.data.success){
      setClientId(response.data.clientId.ClientId)
    }else{
      toast.error(response.data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
  }
  useEffect(()=>{
    if(freelancerToken && jobId){
      loadClientId()
    }else{
      setClientId(null)
    }
  },[freelancerToken,jobId])

    const [formData, setFormData] = useState({
        textAnswer1: '',
        textAnswer2: '',
        textAnswer3: '',
        jobId:jobId,
        isOk:"Pending",
        files: [],
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, files: Array.from(e.target.files) });
      };

const handleSubmit=async()=>{

    if (!formData.textAnswer1.trim()) {
        toast.error("Answer 1 Is Required")
        return;
      }

      const data = new FormData();
      data.append("jobId",formData.jobId)
      data.append('textAnswer1', formData.textAnswer1);
    
      if (formData.textAnswer2) data.append('textAnswer2', formData.textAnswer2);
      if (formData.textAnswer3) data.append('textAnswer3', formData.textAnswer3);


      if (formData.files.length > 0) {
        formData.files.forEach((file) => {
          data.append('files', file);
        });
      }

      try {
        const response=await API.post("/freelancer/jobAnswerSubmission",data,{headers:{token:freelancerToken}})
        if(response.data.success){
          setSubmitStatus(true)
            toast.success(response.data.message)
            setFormData({
              textAnswer1: "",
              textAnswer2: "",
              textAnswer3: "",
              jobId: jobId,
              isOk: "Pending",
              files: [],
            });
        }else{
            toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
}


const loadAnserSubmitted=async()=>{
    try {
        const response=await API.get(`/freelancer/getAnswerSubmittedByJobIdAndFreelancerId/${jobId}`,{headers:{token:freelancerToken}})
        if(response.data.success){
setAnswerId(response.data.answer._id)

setStatus(response.data.answer.isOk)
    setIsSubmitted(true)
        
        }else{
          
            setIsSubmitted(false)
        }
    } catch (error) {
        toast.error(error.message)
        setIsSubmitted(false)
    }
}


const resubmitAnswer=async()=>{
  if(status=== "Pending" || status=== "Completed"){
    return toast.error("Already Submitted")
  }
  if (!formData.textAnswer1.trim()) {
    toast.error("Answer 1 Is Required")
    return;
  }

  const data = new FormData();
  data.append("jobId",formData.jobId)
  data.append('textAnswer1', formData.textAnswer1);
  data.append("isOk",formData.isOk)
  if (formData.textAnswer2) data.append('textAnswer2', formData.textAnswer2);
  if (formData.textAnswer3) data.append('textAnswer3', formData.textAnswer3);


  if (formData.files.length > 0) {
    formData.files.forEach((file) => {
      data.append('files', file);
    });
  }



  try {
    const response=await API.put(`/freelancer/resubmitAnswer/${answerId}`,data,{headers:{token:freelancerToken}})
    if(response.data.success){
      setStatus("Pending")
      toast.success("Resubmitted SuccessFully")
      setFormData({
        textAnswer1: "",
        textAnswer2: "",
        textAnswer3: "",
        jobId: jobId,
        isOk: "Pending",
        files: [],
      });
    }else{
      toast.error(response.data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}


useEffect(()=>{
    if(freelancerToken && jobId){
        loadAnserSubmitted()
    }else{
        setIsSubmitted(false)
    }
},[freelancerToken,jobId])





const reviewSubmit=async(e)=>{
e.preventDefault()
try {
  const response=await API.post("/review/reviewSent",{reviewerId:freelancerId,reviewerType:"Freelancer",revieweeId:clientId,revieweeType:"Client",jobId:jobId,rating:rating,message:message})
  if(response.data.success){
    setMessage("")
    setModalIsOpen(false)
    toast.success(response.data.message)
  }else{
    toast.error(response.data.message)
  }
} catch (error) {
  toast.error(error.message)
}
}


  return (


<div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Answer Submission</h3>

  <div className="space-y-3 sm:space-y-4">
    <textarea name="textAnswer1" className="w-full p-2 border rounded text-sm sm:text-base" placeholder="Answer 1" value={formData.textAnswer1}  onChange={handleChange} required />
    <textarea name="textAnswer2" className="w-full p-2 border rounded text-sm sm:text-base" placeholder="Answer 2"    value={formData.textAnswer2}  onChange={handleChange} />
    <textarea name="textAnswer3" className="w-full p-2 border rounded text-sm sm:text-base" placeholder="Answer 3"    value={formData.textAnswer3} onChange={handleChange} />
    <input type="file" className="block w-full text-sm" accept=".jpg,.jpeg,.png,.pdf,.mp4,.avi,.doc,.ppt" onChange={handleFileChange} multiple />
  </div>


  <div className="mt-3 sm:mt-4">
    {status === "Pending" || submitStatus ? (
      <button className="w-full bg-gray-400 text-white p-2 rounded cursor-not-allowed">In Review</button>
    ) : status === "Rejected" ? (
      <button onClick={resubmitAnswer} className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded transition">Resubmit</button>
    ) : status === "Completed" ? (
      <button disabled className="w-full bg-blue-500 text-white p-2 rounded">Completed</button>
    ) : (
      <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition">Submit Answer</button>
    )}
  </div>


  {status === "Completed" && (
    <div className="mt-3">
      <button className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded transition" onClick={() => setModalIsOpen(true)}>Write A Review</button>
    </div>
  )}

  {modalIsOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-5 sm:p-6 rounded-lg shadow-lg w-full max-w-sm relative">
        <span className="absolute top-2 right-2 text-gray-600 text-2xl cursor-pointer" onClick={() => setModalIsOpen(false)}>&times;</span>
        <h2 className="text-lg font-semibold text-gray-800">Review Form</h2>

        <div className="flex space-x-1 my-3 sm:my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star} 
              className={`text-2xl cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-400"}`} 
              onClick={() => setRating(star)}
            >★</span>
          ))}
        </div>

  
        <textarea className="w-full p-2 border rounded text-sm sm:text-base" placeholder="Write your review..." value={message} onChange={(e) => setMessage(e.target.value)} required />

     
        <div className="flex justify-between mt-3 sm:mt-4">
          <button className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded transition" onClick={() => setModalIsOpen(false)}>Cancel</button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition" onClick={reviewSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )}

  <div className="mt-3 text-sm sm:text-base text-center">
    {status === "Pending" ? (
      <p className="text-gray-600">📌 Your answer is under review.</p>
    ) : status === "Rejected" ? (
      <p className="text-red-500 font-semibold">❌ Client was not satisfied. Please resubmit.</p>
    ) : status === "Completed" ? (
      <p className="text-green-500 font-semibold">✅ Your submission was accepted! <span className="underline cursor-pointer" onClick={() => setModalIsOpen(true)}>Give a Review</span></p>
    ) : null}
  </div>
</div>

  );
};
