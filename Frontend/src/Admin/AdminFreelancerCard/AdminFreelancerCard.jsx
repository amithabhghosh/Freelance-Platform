import React, { useContext, useState } from "react";
import "./AdminFreelancerCard.css";
import logo from "../../assets/images/NavbarLogo.png";
import API from "../../connectApi";
import { toast } from "react-toastify";
import { ContextAPI } from "../../ContextAPI/ContextAPI";
import { useNavigate } from "react-router-dom";

export const AdminFreelancerCard = (props) => {
  const navigate=useNavigate()
    const {adminToken}=useContext(ContextAPI)
    const [edit,setEdit]=useState(false)
   const [isVerified,setIsverified]=useState(props.isVerified)
const editButton=()=>{
    setEdit(!edit)
}


const saveUpdates = async()=>{
    try {
        const response=await API.put(`/admin/updateFreelancerStatus/${props.id}`,{},{headers:{token:adminToken}})  
        if(response.data.success){
            toast.success("Freelancer Verified")
            setIsverified(!isVerified)
            setEdit(!edit)
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

const toadminFreelancer=()=>{
navigate(`/adminFreelancer/${props.id}`)
}
  return (
    <div className="adminFreelancerCard" onClick={toadminFreelancer}>
  
      <div className="editButton">
        <img src={logo} alt="Logo" />
        {!isVerified?( <button className="hollowButton" onClick={editButton}>Edit</button>):null}
      
        
       
      </div>

    
      <div className="freelancerProfileIcon">
        <img src={props.profile} alt="Profile" />
        <p className="freelancerName">{props.name}</p>
      </div>

     
      <div className="freelancerCardDetails">
        <p>Email: <span>{props.email}</span></p>
        <p>Phone: <span>{props.phone}</span></p>

     
       {
        edit ? (<div className="verifiedStatus">
            <button className="hollowButton verify" onClick={saveUpdates}>Verify</button>
          </div>):null
       }
          
      
        {!edit?(
            <div className="status">
  <span className="verifiedBadge">{isVerified ? "✔ Verified" : "✖ Not Verified"}</span>
</div>
        ): null}  

    
      </div>
    </div>
  );
};
