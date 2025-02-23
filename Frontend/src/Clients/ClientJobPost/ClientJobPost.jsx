import React, { useContext, useState } from 'react';
import './ClientJobPost.css';
import { toast } from 'react-toastify';
import API from '../../connectApi';
import { ContextAPI } from '../../ContextAPI/ContextAPI';

export const ClientJobPost = () => {
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
        setDeadline()
        setBudget()
        setDescription("")
        setCatagory("")
        setSkills("")
    }else{
        toast.error(response.data.message)
    }
} catch (error) {
    toast.error(error.message)
    console.log(error.message)
}
}

  return (
    <div className='clientJobPost'>
      <h2>Post a Job</h2>
      <div className="jobPostForm">
        <div className="formContainer">
          <div className="inputField">
            <p>Job Title</p>
            <input type="text" placeholder='Enter job title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <div className="inputField">
            <p>Job Description</p>
            <textarea placeholder='Enter job details' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
          </div>
          <div className="budgetAndDay">
            <div className="inputField">
              <p>Days</p>
              <input type="number" placeholder='Estimated days' value={deadline} onChange={(e)=>setDeadline(e.target.value)}/>
            </div>
            <div className="inputField">
              <p>Budget $</p>
              <input type="number" placeholder='Enter budget' value={budget} onChange={(e)=>setBudget(e.target.value)}/>
            </div>
          </div>
          <div className="inputField">
            <p>Category</p>
            <input type="text" placeholder='Job category' value={catagory} onChange={(e)=>setCatagory(e.target.value)}/>
          </div>
          <div className="inputField">
            <p>Required Skills</p>
            <input type="text" placeholder='Enter required skills' value={skills} onChange={(e)=>setSkills(e.target.value)}/>
          </div>
          <button className='postJobBtn' onClick={jobPost}>Post Job</button>
        </div>
      </div>
    </div>
  );
}
