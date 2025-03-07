import React, { useContext, useEffect, useState } from "react";
import { ContextAPI } from "../../ContextAPI/ContextAPI";
import API from "../../connectApi";
import { toast } from "react-toastify";
import { ClientProposalCard } from "../ClientProposalCard/ClientProposalCard";
import LoadingSpinner from "../../CommonPage/FrontPageComponents/Loading/Loading";
// Import Loading Component

export const ClientProposalList = () => {
  const { clientToken, clientId } = useContext(ContextAPI);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true); // Loading State

  const loadClientProposals = async () => {
    setLoading(true); 
    try {
      const response = await API.get(`/client/getProposalRecievedByClient/${clientId}`, {
        headers: { token: clientToken },
      });

      if (response.data.success) {
        setProposals(response.data.clientProposals);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false); 
  };

  useEffect(() => {
    if (clientToken && clientId) {
      loadClientProposals();
    } else {
      setProposals([]);
      setLoading(false);
    }
  }, [clientToken, clientId]);

  return (
    <div className="max-w-5xl min-h-[400px] mx-auto p-5 mt-28">

      <div className="text-center text-lg font-bold text-white bg-blue-500 p-4 rounded-lg mb-5">
        <h2>Proposals Received</h2>
      </div>

      {loading ? ( 
        <div className="flex justify-center">
          <LoadingSpinner/>     
        </div>
      ) : proposals && proposals.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {proposals.map((item) => (
            <ClientProposalCard
              key={item._id}
              id={item._id}
              name={item.name}
              budget={item.budget}
              deadline={item.deadline}
              status={item.status}
              jobId={item.jobId}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500 mt-5">No Proposals Received</p>
      )}
    </div>
  );
};

