import React, { useContext, useEffect, useState } from 'react';

import { FreelancerProposalCard } from '../FreelancerProposalCard/FreelancerProposalCard';
import { ContextAPI } from '../../ContextAPI/ContextAPI';
import API from '../../connectApi'; 
import { toast } from 'react-toastify'; 
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading';
export const FreelancerProposal = () => {
    const { freelancerId, freelancerToken } = useContext(ContextAPI);
    const [proposals, setProposals] = useState([]); 
const [loading,setLoading]=useState(true)
    const loadProposalsByFreelancer = async () => {
        try {
          setLoading(true)
            const response = await API.get(`/freelancer/freelancerProposals/${freelancerId}`,{headers:{token:freelancerToken}});
            if (response.data.success) {
                setProposals(response.data.freelancerProposals);
            } else {
                toast.error(response.data.message);
            }
            setLoading(false)
        } catch (error) {
           setProposals(null)
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
      

<div className="max-w-4xl mx-auto my-10 p-6 bg-white min-h-[400px] rounded-xl shadow-md mt-28">
  <div className="text-center mb-6">
    <h2 className="text-2xl font-semibold text-gray-800">Your Proposals</h2>
  </div>

  {loading ? (
    <LoadingSpinner />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {proposals.length > 0 ? (
        proposals.map((item) => (
          <FreelancerProposalCard
            key={item._id}
            id={item._id}
            title={item.title}
            status={item.status}
            deadline={item.deadline}
            budget={item.budget}
            jobId={item.jobId}
            className="w-full"
          />
        ))
      ) : (
        <p className="text-center text-lg text-gray-500 col-span-2">No Proposals</p>
      )}
    </div>
  )}
</div>



    );
};
