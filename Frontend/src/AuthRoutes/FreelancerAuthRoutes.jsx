import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const FreelancerAuthRoutes = ({ children }) => {
  const navigate = useNavigate();
  const freelancerToken = localStorage.getItem("freelancerToken");

  useEffect(() => {
    if (!freelancerToken) {
      toast.error("Please Login")
      navigate("/freelancerLogin");
    }
  }, [freelancerToken, navigate]); 

  return freelancerToken ? children : null; // ✅ Ensures valid JSX return
};
