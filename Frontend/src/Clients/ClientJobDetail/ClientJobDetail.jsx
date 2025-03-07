import React, { useContext, useEffect, useState } from 'react'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { useParams } from 'react-router-dom'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'

export const ClientJobDetail = () => {
    const {clientToken,clientId}=useContext(ContextAPI)
    const {jobId}=useParams()
const [jobData,setJobData]=useState()
const [loading, setLoading] = useState(true);
const loadJobData=async()=>{
  

    try {
        setLoading(true);
        const response=await API.get(`/client/getJob/${jobId}`,{headers:{token:clientToken}})
        console.log("API Response:", response.data);
        if(response.data.success){
            console.log(response.data.job)
            setJobData(response.data.job)
        }else{
            toast.error(response.data.message)
            setJobData(null)
        }
    } catch (error) {
        toast.error(error.message)
    }finally {
        setLoading(false);
    }
}

useEffect(() => {
    
    if (clientToken && jobId) {
        loadJobData();
    } else {
        setJobData(null);
        setLoading(false);
    }
}, [jobId, clientToken, clientId]);



  return (
   <div className="max-w-2xl mt-28 min-h-[400px] mx-auto my-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-2">
        Job Details
      </h2>

    
      {loading ? (
                // <p className="text-center text-gray-500">Loading...</p>
                <LoadingSpinner/>
            ) : jobData ? (
                <div className="space-y-4">
                    <DetailItem label="Title" value={jobData.title} />
                    <DetailItem label="Description" value={jobData.description} />
                    <DetailItem label="Category" value={jobData.catagory} />
                    <DetailItem label="Skills" value={jobData.skills} />
                    <DetailItem label="Days Provided" value={jobData.deadline} />
                    <DetailItem label="Amount" value={`$${jobData.budget}`} />
                    <DetailItem label="Job Status" value={jobData.status} statusColor />
                </div>
            ) : (
                <p className="text-center text-red-500">No job details found.</p>
            )}
    </div>
  )
}


const DetailItem = ({ label, value, statusColor }) => (
    <div className="p-4 bg-gray-100 rounded-md">
      <span className="text-gray-700 font-medium block mb-1">{label}:</span>
      <span
        className={`font-semibold block ${
          statusColor ? "text-green-600" : "text-blue-500"
        }`}
      >
        {value || "N/A"}
      </span>
    </div>
  );
  