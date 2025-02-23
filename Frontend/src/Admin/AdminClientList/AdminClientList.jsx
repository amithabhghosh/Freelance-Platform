import React, { useContext, useEffect, useState } from 'react'
import './AdminClientList.css'
import { AdminClientCard } from '../AdminClientCard/AdminClientCard'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
export const AdminClientList = () => {
    const {adminToken}=useContext(ContextAPI)
    const [clients,setClients]=useState([])
    const loadAllClients=async()=>{
try {
    const response=await API.get("/admin/allClients",{headers:{token:adminToken}})
    if(response.data.success){
        setClients(response.data.clients)
    }else{
        toast.error(response.data.message)
    }
} catch (error) {
    toast.error(error.message)
}
    }

    useEffect(()=>{
        if(adminToken){
            loadAllClients()
        }else{
            setClients(false)
        }
    },[adminToken])
  return (
    <div className='AdminClientList'>
       <h2>All Clients</h2>
       {clients?(<div className="clientCards">
{clients.map((item,i)=>(
    <AdminClientCard id={item._id} name={item.name} email={item.email} phone={item.phone} country={item.country} profile={item.profile} />
))}
</div>):(  <p>No Clients Registered</p> )
}
       
    </div>
  )
}
