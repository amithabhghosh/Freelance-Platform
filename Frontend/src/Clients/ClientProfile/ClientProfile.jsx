import React, { useContext ,useState} from 'react'
import './ClientProfile.css'
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
    <div className="profileBox">
    <h2>Profile Summary</h2>
<div className='freelancerProfile'>

    <div className="imageInput">
        <label htmlFor="profile">
            <img src={profile?URL.createObjectURL(profile):clientData.profile} alt="ProfileImage" />
            <input onChange={(e)=>setProfile(e.target.files[0])} type="file" name='profile' id='profile' hidden/>
        </label>
      <button onClick={updateProfile}>Update Image</button>
    </div>
    <div className="detailSection">

    <div className="emailSection">
            <p>Name</p>
            <input type="email" readOnly value={clientData.name} className='freelanceProfileInputDisbled' />
        </div>
        <div className="emailSection">
            <p>Email</p>
            <input type="email" readOnly value={clientData.email} className='freelanceProfileInputDisbled' />
        </div>
        
        <div className="countrySection">
            <p>Country</p>
            <input type="text" readOnly value={clientData.country} className='freelanceProfileInputDisbled'/>
        </div>
        <div className="phoneSection">
            <p>Phone Number</p>
            <input type="number" readOnly value={clientData.phone} className='freelanceProfileInputDisbled'/>
        </div>
        
    </div>
</div>
</div>
  )
}
