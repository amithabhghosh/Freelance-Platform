import React, { useContext, useEffect, useState } from "react";
import "./AdminFreelancersList.css";
import { AdminFreelancerCard } from "../AdminFreelancerCard/AdminFreelancerCard";
import { ContextAPI } from "../../ContextAPI/ContextAPI";
import API from "../../connectApi";
import { toast } from "react-toastify";

export const AdminFreelancersList = () => {
  const [freelancersList, setFreelancersList] = useState([]);
  const { adminToken } = useContext(ContextAPI);

  const loadFreelancer = async () => {
    try {
      const response = await API.get("/admin/allFreelancers", {
        headers: { token: adminToken },
      });
      if (response.data.success) {
        setFreelancersList(response.data.freelancers);
      } else {
        toast.error(response.data.message);
      }
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
    <div className="adminFreelancersList">
      <h2 className="title">All Freelancers</h2>
      {freelancersList.length > 0 ? (
        <div className="freelancersList">
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
        <p className="noFreelancers">No Freelancer Registered</p>
      )}
    </div>
  );
};
