import React, { useContext, useEffect, useState } from 'react';
import './FreelancerProposal.css';
import { FreelancerProposalCard } from '../FreelancerProposalCard/FreelancerProposalCard';
import { ContextAPI } from '../../ContextAPI/ContextAPI';
import API from '../../connectApi'; 
import { toast } from 'react-toastify'; 
export const FreelancerProposal = () => {
    const { freelancerId, freelancerToken } = useContext(ContextAPI);
    const [proposals, setProposals] = useState([]); 

    const loadProposalsByFreelancer = async () => {
        try {
            const response = await API.get(`/freelancer/freelancerProposals/${freelancerId}`,{headers:{token:freelancerToken}});
            if (response.data.success) {
                setProposals(response.data.freelancerProposals);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (freelancerToken) {
            loadProposalsByFreelancer();
        } else {
            setProposals([]); 
        }
    }, [freelancerToken, freelancerId]);

    return (
        <div className='freelancerProposal'>
            <div className="proposalsHeading">
                <h2>Your Proposals</h2>
            </div>
            <div className="proposalLists">
                {proposals.length > 0 ? (
                    proposals.map((item, i) => (
                        <FreelancerProposalCard 
                            id={item._id} 
                            title={item.title} 
                            status={item.status}  
                            deadline={item.deadline}  
                            budget={item.budget} 
                            jobId={item.jobId}
                        />
                    ))
                ) : (
                    <p>No Proposals</p>
                )}
            </div>
        </div>
    );
};
