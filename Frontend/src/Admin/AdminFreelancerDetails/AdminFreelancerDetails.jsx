import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/jobo 1.png";

import { ContextAPI } from "../../ContextAPI/ContextAPI";
import { useParams } from "react-router-dom";
import API from "../../connectApi";
import { toast } from "react-toastify";
import LoadingSpinner from "../../CommonPage/FrontPageComponents/Loading/Loading";

export const AdminFreelancerDetails = () => {
  const { freelancerId } = useParams(); 
  const { adminToken } = useContext(ContextAPI);
  const [freelancerDetails, setFreelancerDetails] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
const [loading,setLoading]=useState(true)
  const loadFreelancerDetails = async () => {
    try {
      setLoading(true)
      const response = await API.get(`/admin/freelancer/${freelancerId}`, {
        headers: { token: adminToken },
      });

      if (response.data.success) {
        setFreelancerDetails(response.data.freelancer);
        setIsVerified(response.data.freelancer.isVerified);
      } else {
        toast.error(response.data.message);
      }
      setLoading(false)
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (adminToken) {
      loadFreelancerDetails();
    }
  }, [adminToken, freelancerId]);

  const verifyButton = async () => {
    try {
      const res = await API.put(
        `/admin/updateFreelancerStatus/${freelancerId}`,
        {},
        { headers: { token: adminToken } }
      );

      if (res.data.success) {
        setIsVerified(true); 
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

const inactiveButton=async()=>{
  try {
    const response=await API.put(`/admin/inactiveFreelancer/${freelancerId}`,{},{headers:{token:adminToken}})
    if(response.data.success){
      toast.success("Account Inactivated")
      setIsVerified(false)
    }else{
      toast.error(response.data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

  return (
<>
  {loading ? (
     <div className="flex justify-center items-center min-h-[400px]">
     <LoadingSpinner />
   </div>
  ) : (
    <div className="max-w-2xl mx-auto min-h-screen my-10 p-6 bg-white shadow-lg rounded-lg flex flex-col mt-28 items-center text-center sm:min-h-screen">
     
      <div className="relative mb-6 flex flex-col items-center">
        <img
          src={freelancerDetails?.profile || logo}
          alt="Freelancer"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        {!isVerified ? (
          <button
            onClick={verifyButton}
            className="mt-3 px-4 py-2 text-white bg-blue-500 rounded-md text-sm font-semibold hover:bg-blue-600 transition"
          >
            Verify
          </button>
        ) : (
          <p className="mt-2 text-green-600 font-semibold">✔ Verified</p>
        )}
      </div>

 
      {isVerified && (
        <button 
          onClick={inactiveButton} 
          className="mb-4 px-4 py-2 text-white bg-red-500 rounded-md text-sm font-semibold hover:bg-red-600 transition"
        >
          Set as Inactive
        </button>
      )}

      <div className="w-full max-w-lg text-left space-y-3">
        <DetailItem label="Name" value={freelancerDetails?.name || "N/A"} />
        <DetailItem label="Email" value={freelancerDetails?.email || "N/A"} />
        <DetailItem label="Country" value={freelancerDetails?.country || "N/A"} />
        <DetailItem label="Phone" value={freelancerDetails?.phone || "N/A"} />
        <DetailItem label="Skills" value={freelancerDetails?.skills || "N/A"} />
        <DetailItem label="Jobs Completed" value={freelancerDetails?.jobsCompleted || 0} />
        <DetailItem label="Amount Earned" value={`$${freelancerDetails?.amount || "0"}`} />
        <DetailItem label="Rating" value={freelancerDetails?.rating || "0"} />
      </div>

    </div>
  )}
</>

  );
};


const DetailItem = ({ label, value }) => (
  <p className="flex justify-between text-gray-700 text-sm border-b pb-2">
    <span className="font-medium">{label}:</span> 
    <span className="font-semibold text-blue-500">{value}</span>
  </p>
);