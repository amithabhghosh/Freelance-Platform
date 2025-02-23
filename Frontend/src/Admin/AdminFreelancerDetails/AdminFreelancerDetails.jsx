import React, { useContext, useEffect, useState } from "react";
import "./AdminFreelancerDetails.css";
import logo from "../../assets/images/NavbarLogo.png";
import { ContextAPI } from "../../ContextAPI/ContextAPI";
import { useParams } from "react-router-dom";
import API from "../../connectApi";
import { toast } from "react-toastify";

export const AdminFreelancerDetails = () => {
  const { freelancerId } = useParams(); 
  const { adminToken } = useContext(ContextAPI);
  const [freelancerDetails, setFreelancerDetails] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const loadFreelancerDetails = async () => {
    try {
      const response = await API.get(`/admin/freelancer/${freelancerId}`, {
        headers: { token: adminToken },
      });

      if (response.data.success) {
        setFreelancerDetails(response.data.freelancer);
        setIsVerified(response.data.freelancer.isVerified);
      } else {
        toast.error(response.data.message);
      }
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

  return (
    <div className="AdminFreelancerDetails">
      <div className="imageSection">
        <img src={freelancerDetails?.profile || logo} alt="Freelancer" />
        {!isVerified ? (
          <button onClick={verifyButton}>Verify</button>
        ) : (
          <p>✔ Verified</p>
        )}
      </div>
      <div className="freelancerDetailsSection">
        <p>
          Name: <span>{freelancerDetails?.name || "N/A"}</span>
        </p>
        <p>
          Email: <span>{freelancerDetails?.email || "N/A"}</span>
        </p>
        <p>
          Country: <span>{freelancerDetails?.country || "N/A"}</span>
        </p>
        <p>
          Phone: <span>{freelancerDetails?.phone || "N/A"}</span>
        </p>
        <p>
          Skills: <span>{freelancerDetails?.skills|| "N/A"}</span>
        </p>
        <p>
          Job Completed: <span>{freelancerDetails?.jobCompleted || 0}</span>
        </p>
        <p>
          Amount Earned: <span>{freelancerDetails?.amountEarned || "0 $"} </span>
        </p>
        <p>
          Rating: <span>{freelancerDetails?.rating || "0"}</span>
        </p>
      </div>
    </div>
  );
};
