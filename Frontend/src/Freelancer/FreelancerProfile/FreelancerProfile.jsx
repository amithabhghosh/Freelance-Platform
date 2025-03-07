import React, { useContext, useEffect, useState } from 'react'

import user from '../../assets/images/avatar.jpg'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
export const FreelancerProfile = () => {
  const {freelancerData,setFreelancerData,loadFreelancerProfileData,freelancerToken}=useContext(ContextAPI)

    const [profile,setProfile]=useState(false)


const [skills,setSkills]=useState("")
const skillsHandler=(e)=>{
    setSkills(e.target.value)
}

useEffect(() => {
    if (freelancerData && freelancerData.skills) {
        setSkills(freelancerData.skills);
    }
}, [freelancerData]);


const updateUserProfileData=async()=>{
try {
    const formData=new FormData()
    formData.append("skills",skills)

    profile && formData.append("profile",profile)
    const response=await API.put("/freelancer/updateFreelancerProfile",formData,{headers:{token:freelancerToken}})
    if(response.data.success){
        toast.success(response.data.message)
        await loadFreelancerProfileData()
        setProfile(false)
    }else{
        toast.error(response.data.message)
    }
} catch (error) {
    toast.error(error.message)
}
}
  

  return freelancerData && (


    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-24 mb-10">
    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Profile Summary</h2>
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="flex flex-col items-center">
        <label htmlFor="profile" className="cursor-pointer">
          <img
            src={profile ? URL.createObjectURL(profile) : freelancerData.profile}
            alt="ProfileImage"
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
          />
          <input
            onChange={(e) => setProfile(e.target.files[0])}
            type="file"
            name="profile"
            id="profile"
            hidden
          />
        </label>
        <p className="mt-2 text-lg font-medium text-gray-800">{freelancerData.name}</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 text-sm">Email</p>
          <input
            type="email"
            readOnly
            value={freelancerData.email}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <p className="text-gray-600 text-sm">Skills</p>
          <input
            type="text"
            value={skills}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={skillsHandler}
          />
        </div>

        <div>
          <p className="text-gray-600 text-sm">Country</p>
          <input
            type="text"
            readOnly
            value={freelancerData.country}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <p className="text-gray-600 text-sm">Phone Number</p>
          <input
            type="number"
            readOnly
            value={freelancerData.phone}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>
    </div>

    <div className="mt-6 text-center">
      <button
        onClick={updateUserProfileData}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Save Changes
      </button>
    </div>
  </div>


  )
}
