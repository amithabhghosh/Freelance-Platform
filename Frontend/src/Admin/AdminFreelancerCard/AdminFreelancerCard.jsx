import React, { useContext, useState } from "react";

import logo from "../../assets/images/jobo 1.png";
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
//     <div className="adminFreelancerCard" onClick={toadminFreelancer}>
  
//       <div className="editButton">
//         <img src={logo} alt="Logo" />
//         {!isVerified?( <button className="hollowButton" onClick={editButton}>Edit</button>):null}
      
        
       
//       </div>

    
//       <div className="freelancerProfileIcon">
//         <img src={props.profile} alt="Profile" />
//         <p className="freelancerName">{props.name}</p>
//       </div>

     
//       <div className="freelancerCardDetails">
//         <p>Email: <span>{props.email}</span></p>
//         <p>Phone: <span>{props.phone}</span></p>

     
//        {
//         edit ? (<div className="verifiedStatus">
//             <button className="hollowButton verify" onClick={saveUpdates}>Verify</button>
//           </div>):null
//        }
          
      
//         {!edit?(
//             <div className="status">
//   <span className="verifiedBadge">{isVerified ? "✔ Verified" : "✖ Not Verified"}</span>
// </div>
//         ): null}  

    
//       </div>
//     </div>


<div
className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4 text-center transform transition duration-300 hover:-translate-y-2"
onClick={toadminFreelancer}
>
{/* Edit Button Section */}
<div className="flex justify-between items-center">
  <img src={logo} alt="Logo" className="w-12 h-12 " />
  {!isVerified && (
    <button
      className="border-2 border-blue-500 text-blue-500 px-4 py-1 rounded-lg font-semibold text-sm hover:bg-blue-500 hover:text-white transition"
      onClick={editButton}
    >
      Edit
    </button>
  )}
</div>

{/* Freelancer Profile */}
<div className="flex flex-col items-center">
  <img
    src={props.profile}
    alt="Profile"
    className="w-24 h-24 rounded-full border-4 border-blue-500"
  />
  <p className="text-lg font-bold mt-2">{props.name}</p>
</div>

{/* Freelancer Details */}
<div className="text-gray-700 text-sm">
  <p>
    Email: <span className="font-semibold">{props.email}</span>
  </p>
  <p>
    Phone: <span className="font-semibold">{props.phone}</span>
  </p>
</div>

{/* Verification and Status */}
{edit ? (
  <div className="mt-2">
    <button
      className="border-2 border-green-500 text-green-500 px-4 py-1 rounded-lg font-semibold text-sm hover:bg-green-500 hover:text-white transition"
      onClick={saveUpdates}
    >
      Verify
    </button>
  </div>
) : (
  <div className="mt-2">
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border-2 ${
        isVerified
          ? "bg-green-100 text-green-700 border-green-700"
          : "bg-red-100 text-red-700 border-red-700"
      }`}
    >
      {isVerified ? "✔ Verified" : "✖ Not Verified"}
    </span>
  </div>
)}
</div>




  );
};
