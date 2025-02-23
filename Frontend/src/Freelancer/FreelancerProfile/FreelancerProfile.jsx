import React, { useContext, useEffect, useState } from 'react'
import './FreelancerProfile.css'
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
    <div className="profileBox">
        <h2>Profile Summary</h2>
    <div className='freelancerProfile'>
   
        <div className="imageInput">
            <label htmlFor="profile">
                <img src={profile?URL.createObjectURL(profile):freelancerData.profile} alt="ProfileImage" />
                <input onChange={(e)=>setProfile(e.target.files[0])} type="file" name='profile' id='profile' hidden/>
            </label>
            <p>{freelancerData.name}</p>
        </div>
        <div className="detailSection">
            <div className="emailSection">
                <p>Email</p>
                <input type="email" readOnly value={freelancerData.email} className='freelanceProfileInputDisbled' />
            </div>
            <div className="skillSection">
                <p>Skills</p>
                <input type="text" value={skills} className='freelanceProfileInput' onChange={skillsHandler}/>
            </div>
            <div className="countrySection">
                <p>Country</p>
                <input type="text" readOnly value={freelancerData.country} className='freelanceProfileInputDisbled'/>
            </div>
            <div className="phoneSection">
                <p>Phone Number</p>
                <input type="number" readOnly value={freelancerData.phone} className='freelanceProfileInputDisbled'/>
            </div>
            <div className="submitSection">
                <button onClick={updateUserProfileData} >Save Changes</button>
            </div>
        </div>
    </div>
    </div>
  )
}
