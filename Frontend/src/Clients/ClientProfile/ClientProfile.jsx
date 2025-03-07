import React, { useContext ,useState} from 'react'

import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
export const ClientProfile = () => {
    const {clientData,setClientData,clientToken,setClientToken,loadClientData}=useContext(ContextAPI)

const [profile,setProfile]=useState(false)

const updateProfile=async()=>{
    try {
        const formData=new FormData()
        profile && formData.append("profile",profile)
      const response=await API.put("/client/updateClientData",formData,{headers:{token:clientToken}}) 
      if(response.data.success){
            toast.success(response.data.message)
            await loadClientData()
            setProfile(false)
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}


  return (



<div className="flex flex-col min-h-screen items-center gap-6 mt-20 px-4">
<h2 className="text-2xl font-bold text-center">Profile Summary</h2>

<div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
  <div className="flex flex-col items-center gap-6">
    
  
    <div className="flex flex-col items-center gap-3">
      <label htmlFor="profile" className="cursor-pointer">
        <img 
          src={profile ? URL.createObjectURL(profile) : clientData.profile} 
          alt="Profile" 
          className="w-24 h-24 rounded-full object-cover border border-gray-300"
        />
        <input 
          type="file" 
          id="profile" 
          hidden 
          onChange={(e) => setProfile(e.target.files[0])}
        />
      </label>
      <button 
        className="px-4 py-2 text-white font-bold bg-blue-500 rounded-md hover:bg-blue-600 transition"
        onClick={updateProfile}
      >
        Update Image
      </button>
    </div>


    <div className="w-full flex flex-col gap-4">
      
   
      <div className="flex flex-col">
        <p className="font-semibold">Name</p>
        <input 
          type="text" 
          readOnly 
          value={clientData.name} 
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>

 
      <div className="flex flex-col">
        <p className="font-semibold">Email</p>
        <input 
          type="email" 
          readOnly 
          value={clientData.email} 
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>

  
      <div className="flex flex-col">
        <p className="font-semibold">Country</p>
        <input 
          type="text" 
          readOnly 
          value={clientData.country} 
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>


      <div className="flex flex-col">
        <p className="font-semibold">Phone Number</p>
        <input 
          type="number" 
          readOnly 
          value={clientData.phone} 
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>
    </div>

  </div>
</div>
</div>




  )
}
