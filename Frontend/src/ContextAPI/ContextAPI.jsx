import { createContext, useContext, useState, useEffect } from "react";
import API from "../connectApi";
import { toast } from "react-toastify";

export const ContextAPI = createContext(); // Create context

 const ContextProvider = ({ children }) => {

const [loading,setLoading]=useState(true)
const [freelancerToken,setFreelancerToken]=useState(localStorage.getItem("freelancerToken")?localStorage.getItem("freelancerToken"):false)
const [freelancerData,setFreelancerData]=useState(false)

const [clientToken,setClientToken]=useState(localStorage.getItem("clientToken")?localStorage.getItem("clientToken"):false)
const [clientData,setClientData]=useState(false)

const [clientJobs,setClientJobs]=useState([])

const [freelancerId,setFreelancerId]=useState()
const [clientId,setClientId]=useState()

const [adminToken,setAdminToken]=useState(localStorage.getItem("adminToken")?localStorage.getItem("adminToken"):false)
const loadFreelancerProfileData=async()=>{
try {
  const response=await API.get("/freelancer/getProfile",{headers:{token:freelancerToken}})
  if(response.data.success){
    setFreelancerData(response.data.freelancer)
    setFreelancerId(response.data.freelancer._id)
  }else{
    toast.error(response.data.message)
  }
} catch (error) {
  toast.error(error.message)
}
}

const loadClientData=async()=>{
  try {
    const response=await API.get("/client/getClientData",{headers:{token:clientToken}})
    if(response.data.success){
      setClientData(response.data.client)
      setClientId(response.data.client._id)
          }else{
      toast.error(response.data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}
useEffect(()=>{
  if(clientToken){
    loadClientData()
  }else{
    setClientData(false)
  }
},[clientToken])

useEffect(()=>{
if(freelancerToken){
  loadFreelancerProfileData()
}else{
  setFreelancerData(false)
}
},[freelancerToken])


const clientUploadedJobs=async()=>{
  try {
    setLoading(true)
    const response=await API.get("/client/clientJobs",{headers:{token:clientToken}})
    if(response.data.success){
       setClientJobs(response.data.jobs)
    }else{
      setClientJobs(null)
    }
    setLoading(false)
  } catch (error) {
    toast.error(error.message)
  }
}

useEffect(()=>{
  if(clientToken){
    clientUploadedJobs()
  }else{
    setClientJobs(false)
  }
  
},[clientToken])


  return (
    <ContextAPI.Provider value={{loading,setLoading,freelancerToken,clientId,setFreelancerToken,freelancerId,setFreelancerId,clientToken,setClientToken,freelancerData,setFreelancerData,loadFreelancerProfileData,loadClientData,clientData,clientJobs,setClientJobs,clientUploadedJobs,adminToken,setAdminToken}}>
      {children}
    </ContextAPI.Provider>
  );
};

// Hook to access context
export default ContextProvider
