import React, { useContext, useEffect, useState } from "react";

import { AdminFreelancerCard } from "../AdminFreelancerCard/AdminFreelancerCard";
import { ContextAPI } from "../../ContextAPI/ContextAPI";
import API from "../../connectApi";
import { toast } from "react-toastify";
import LoadingSpinner from "../../CommonPage/FrontPageComponents/Loading/Loading";

export const AdminFreelancersList = () => {
  const [freelancersList, setFreelancersList] = useState([]);
  const { adminToken } = useContext(ContextAPI);
const [loading,setLoading]=useState(true)
  const loadFreelancer = async () => {
    try {
      setLoading(true)
      const response = await API.get("/admin/allFreelancers", {
        headers: { token: adminToken },
      });
      if (response.data.success) {
        setFreelancersList(response.data.freelancers);
      } else {
        toast.error(response.data.message);
      }
      setLoading(false)
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(adminToken){
      loadFreelancer()
    }else{
      setFreelancersList(false)
    }
    
  },[adminToken])

  return (
    // <div className="adminFreelancersList">

<div className="w-full max-w-5xl mt-20 mb-10 mx-auto p-6 bg-gray-50 rounded-lg shadow-lg text-center min-h-screen">
  {loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Freelancers</h2>

      {freelancersList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {freelancersList.map((item) => (
            <AdminFreelancerCard
              key={item._id}
              id={item._id}
              name={item.name}
              country={item.country}
              phone={item.phone}
              skills={item.skills}
              isVerified={item.isVerified}
              email={item.email}
              profile={item.profile}
            />
          ))}
        </div>
      ) : (
        <p className="text-lg font-bold text-gray-600 mt-6">No Freelancer Registered</p>
      )}
    </>
  )}
</div>


  );
};
