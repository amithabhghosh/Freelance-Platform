import React, { useContext, useState } from 'react';
// import './ClientJobPost.css';
import { toast } from 'react-toastify';
import API from '../../connectApi';
import { ContextAPI } from '../../ContextAPI/ContextAPI';
import { useNavigate } from "react-router-dom";
export const ClientJobPost = () => {
    const navigate=useNavigate()
    const {clientToken,clientUploadedJobs}=useContext(ContextAPI)
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [catagory,setCatagory]=useState("")
    const [skills,setSkills]=useState("")
    const [budget,setBudget]=useState()
    const [deadline,setDeadline]=useState()

const jobPost=async()=>{


  
    if(!title.trim() || !description.trim() || !catagory.trim() || !budget || !deadline){
        return toast.error("Fields Are Missing")
    }

try {
    const response=await API.post("/client/postJob",{title,description,catagory,budget,skills,deadline},{headers:{token:clientToken}})
    if(response.data.success){
        toast.success("Job Uploaded SuccessFully")
        clientUploadedJobs()
        setTitle("")
        setDeadline(null)
        setBudget(null)
        setDescription("")
        setCatagory("")
        setSkills("")
navigate("/clientDashboard")
    }else{
        toast.error(response.data.message)
    }
} catch (error) {
    toast.error(error.message)
    console.log(error.message)
}
}

  return (
   

    <div className="flex flex-col mb-10 items-center gap-6 mt-28 px-4">
      <h2 className="text-2xl font-bold text-center">Post a Job</h2>

      <div className="w-full max-w-lg bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        
        <div className="flex flex-col gap-4">
     
          <div className="flex flex-col">
            <p className="font-semibold">Job Title</p>
            <input 
              type="text" 
              placeholder="Enter job title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

         
          <div className="flex flex-col">
            <p className="font-semibold">Job Description</p>
            <textarea 
              placeholder="Enter job details" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded-md h-24 resize-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="font-semibold">Days</p>
              <input 
                type="number" 
                placeholder="Estimated days" 
                value={deadline} 
                onChange={(e) => setDeadline(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-semibold">Budget ($)</p>
              <input 
                type="number" 
                placeholder="Enter budget" 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>


          <div className="flex flex-col">
            <p className="font-semibold">Category</p>
            <input 
              type="text" 
              placeholder="Job category" 
              value={catagory} 
              onChange={(e) => setCatagory(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

      
          <div className="flex flex-col">
            <p className="font-semibold">Required Skills</p>
            <input 
              type="text" 
              placeholder="Enter required skills" 
              value={skills} 
              onChange={(e) => setSkills(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

    
          <button 
            className="w-full py-3 mt-3 text-white font-bold bg-blue-500 rounded-md hover:bg-blue-600 transition"
            onClick={jobPost}
          >
            Post Job
          </button>

        </div>
      </div>
    </div>



  );
}
