import React, { useContext, useEffect, useState } from 'react'
import './FreelancerProposalDetails.css'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { useParams } from 'react-router-dom'
import API from '../../connectApi'
import { toast } from 'react-toastify'
export const FreelancerProposalDetails = () => {
    const { freelancerToken } = useContext(ContextAPI);
    const { proposalId } = useParams();
    const [proposalData, setProposalData] = useState(null);
    const [jobData, setJobData] = useState(null);
    const [jobId, setJobId] = useState("");

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
            const response = await API.get(`/freelancer/job/${jobId}`, {
                headers: { token: freelancerToken },
            });

            if (response.data.success) {
                setJobData(response.data.job);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
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


  return jobData && (
    <div className='FreelancerProposalDetails'>
        <div className="jobProposalDetails">
       <div className="head">
        <h3>Job</h3>
       </div>
        <div className="proposalJobDetail">
            <h4>Title</h4>
            <p>{jobData.title}</p>
        </div>
        <div className="proposalJobDetail">
            <h4>Description</h4>
            <p>{jobData.description}</p>
        </div>
        <div className="proposalJobDetail">
            <h4>Skills</h4>
            <p>{jobData.skills}</p>
        </div>
        <div className="proposalJobDetail">
            <h4>Catagory</h4>
            <p>{jobData.catagory}</p>
        </div>
        <div className="proposalJobDetail">
            <h4>Budget</h4>
            <p>{jobData.budget}$</p>
        </div>
        <div className="proposalJobDetail">
            <h4>Day Alloted</h4>
            <p>{jobData.deadline} Days</p>
        </div>
        <div className="proposalJobStatus">
            <h4>Status</h4>
            <p>{jobData.status}</p>
        </div>
        </div>
        <div className="freelancerProposalDetail">
            <div className="head">
              <h3>Proposal</h3>
            </div>
            <div className="proposalDetailInfo">
                <h4>Name</h4>
                <p>{proposalData.name}</p>
            </div>
            <div className="proposalDetailInfo">
                <h4>Description</h4>
                <p>{proposalData.description}</p>
            </div>
            <div className="proposalDetailInfo">
                <h4>Budget</h4>
                <p>{proposalData.budget} $</p>
            </div>
            <div className="proposalDetailInfo">
                <h4>Deadline</h4>
                <p>{proposalData.deadline} Days</p>
            </div>
            <div className="proposalStatusInfo">
                <h4>Status</h4>
                <p>{proposalData.status}</p>
            </div>
        </div>
    </div>
  )
}
