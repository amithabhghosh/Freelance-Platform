import React from 'react'

import logo from '../../assets/images/jobo 1.png'
import { useNavigate } from 'react-router-dom'
export const AdminClientCard = (props) => {
  const navigate=useNavigate()
  return (
    // <div className='AdminClientCard'>
    //     <div className="adminLogo">
    //         <img src={logo} alt="" />
    //     </div>
    //     <div className="profileImageAndName">
    //         <img src={props.profile} alt="" />
    //     <p>{props.name}</p>
    //     </div>
    //     <div className="clientPersonal">
    //         <p>Email: {props.email} </p>
    //         <p>Phone: {props.phone}</p>
    //         <p>Country: {props.country}</p>
    //     </div>
    // </div>

    <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 text-center transition-transform transform hover:-translate-y-2" onClick={()=>navigate(`/admin/clientDetail/${props.id}`)}>
    {/* Logo Section */}
    <div className="flex justify-center mb-4">
      <img src={logo} alt="Logo" className="w-12 h-auto" />
    </div>

    {/* Profile Section */}
    <div className="flex flex-col items-center">
      <img
        src={props.profile}
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
      />
      <p className="text-lg font-semibold text-gray-800 mt-3">{props.name}</p>
    </div>

    {/* Client Personal Details */}
    <div className="mt-4 space-y-2 text-gray-600">
      <p className="text-sm">
        <span className="font-medium text-gray-800">Email:</span> {props.email}
      </p>
      <p className="text-sm">
        <span className="font-medium text-gray-800">Phone:</span> {props.phone}
      </p>
      <p className="text-sm">
        <span className="font-medium text-gray-800">Country:</span> {props.country}
      </p>
    </div>
  </div>


  )
}
