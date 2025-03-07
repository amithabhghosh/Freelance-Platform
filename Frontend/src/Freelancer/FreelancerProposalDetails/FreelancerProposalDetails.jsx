import React, { useContext, useEffect, useState } from 'react'

import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { useParams } from 'react-router-dom'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'
export const FreelancerProposalDetails = () => {
    const { freelancerToken } = useContext(ContextAPI);
    const { proposalId } = useParams();
    const [proposalData, setProposalData] = useState(null);
    const [jobData, setJobData] = useState(null);
    const [jobId, setJobId] = useState("");
const [loading,setLoading]=useState(true)
    const getJobId = async () => {
        try {
            const response = await API.get(`/freelancer/getProposalDetails/${proposalId}`, {
                headers: { token: freelancerToken },
            });

            if (response.data.success) {
                const jobId = response.data.proposal?.jobId; 
                setProposalData(response.data.proposal);
                
                if (jobId) {
                    setJobId(jobId);
                    return jobId; 
                } else {
                    toast.error("Job ID not found.");
                    return null;
                }
            } else {
                toast.error(response.data.message);
                return null;
            }
        } catch (error) {
            toast.error(error.message);
            return null;
        }
    };

    const getJobDetails = async () => {
        const jobId = await getJobId(); 

        if (!jobId) {
            
            return; 
        }

        try {
          setLoading(true)
            const response = await API.get(`/freelancer/job/${jobId}`, {
                headers: { token: freelancerToken },
            });

            if (response.data.success) {
                setJobData(response.data.job);
            } else {
                toast.error(response.data.message);
            }
            setLoading(false)
        } catch (error) {
    setJobData(null)
        }
    };

    useEffect(() => {
        if (freelancerToken && proposalId) {
            getJobDetails();
        } else {
            setProposalData(null);
            setJobData(null);
            setJobId("");
        }
    }, [freelancerToken, proposalId]);


    return (
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white min-h-[400px] rounded-xl shadow-md mt-20">
        {loading ? (
          // Ensure the loading spinner maintains space to prevent layout shift
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Job Details Section */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full transform transition-transform hover:scale-105">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">Job Details</h3>
              </div>
              <div className="border-b border-gray-200 py-2">
                <h4 className="text-gray-700 font-semibold">Title</h4>
                <p className="text-gray-600">{jobData?.title}</p>
              </div>
              <div className="border-b border-gray-200 py-2">
                <h4 className="text-gray-700 font-semibold">Description</h4>
                <p className="text-gray-600">{jobData?.description}</p>
              </div>
              <div className="border-b border-gray-200 py-2">
                <h4 className="text-gray-700 font-semibold">Skills</h4>
                <p className="text-gray-600">{jobData?.skills}</p>
              </div>
              <div className="border-b border-gray-200 py-2">
                <h4 className="text-gray-700 font-semibold">Category</h4>
                <p className="text-gray-600">{jobData?.catagory}</p>
              </div>
              <div className="border-b border-gray-200 py-2">
                <h4 className="text-gray-700 font-semibold">Budget</h4>
                <p className="text-gray-600">{jobData?.budget}$</p>
              </div>
              <div className="border-b border-gray-200 py-2">
                <h4 className="text-gray-700 font-semibold">Days Allotted</h4>
                <p className="text-gray-600">{jobData?.deadline} Days</p>
              </div>
              <div
                className={`mt-4 px-4 py-2 text-center rounded-md font-bold text-sm ${
                  jobData?.status === 'pending'
                    ? 'bg-yellow-400 text-yellow-900'
                    : jobData?.status === 'assigned'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {jobData?.status === "pending" ? "Pending" : jobData?.status === "assigned" ? "Assigned" : jobData?.status === "completed" ? "Completed" : null}
              </div>
            </div>
    
           
            <div className="bg-white p-6 rounded-lg shadow-md w-full transform transition-transform hover:scale-105">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">Proposal Details</h3>
              </div>
              <div className="border-b border-gray-200 py-2">
                <h4 className="text-gray-700 font-semibold">Name</h4>
                <p className="text-gray-600">{proposalData?.name}</p>
              </div>
              <div className="border-b border-gray-200 py-2">
                <h4 className="text-gray-700 font-semibold">Description</h4>
                <p className="text-gray-600">{proposalData?.description}</p>
              </div>
              <div className="border-b border-gray-200 py-2">
                <h4 className="text-gray-700 font-semibold">Budget</h4>
                <p className="text-gray-600">{proposalData?.budget}$</p>
              </div>
              <div className="border-b border-gray-200 py-2">
                <h4 className="text-gray-700 font-semibold">Deadline</h4>
                <p className="text-gray-600">{proposalData?.deadline} Days</p>
              </div>
              <div
                className={`mt-4 px-4 py-2 text-center rounded-md font-bold text-sm ${
                  proposalData?.status === 'pending'
                    ? 'bg-yellow-400 text-yellow-900'
                    : proposalData?.status === 'accepted'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {proposalData?.status === "accepted" ? "Accepted" : proposalData?.status === "rejected" ? "Rejected" : proposalData?.status === "pending" ? "Pending" : null}
              </div>
            </div>
          </div>
        )}
      </div>
    );
    
}
