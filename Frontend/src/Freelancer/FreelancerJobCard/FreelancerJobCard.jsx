import React from 'react'

import logo from '../../assets/images/jobo 1.png'
import { useNavigate } from 'react-router-dom'
export const FreelancerJobCard = (props) => {
    const navigate=useNavigate()
const toJobDetails=()=>{
navigate(`/freelancer/${props.id}`)
}

  return (
//     <div className='AdminJobCard' onClick={toJobDetails}>
//            <div className="adminJobLogo">
//                <img src={logo} alt="" />
//            </div>
//    <div className="jobCrad">
//        <p>Title: <span>{props.title}</span></p>
       
//        <p>Budget: <span>{props.budget}</span>$</p>
   
//    </div>
//    <div className="deadline">
//        <p>Deadline: <span>{props.deadline} Days</span></p>
//    </div>
//        </div>


<div 
className="w-full max-w-sm bg-white rounded-lg shadow-md p-4 text-center mx-auto border-l-4 border-blue-500 transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
onClick={toJobDetails}
>
<div className="flex justify-center mb-3">
  <img src={logo} alt="Job Logo" className="w-12 h-auto" />
</div>
<div className="mb-2">
  <p className="text-lg font-medium text-gray-800">Title: <span className="font-bold text-blue-500">{props.title}</span></p>
  <p className="text-lg font-medium text-gray-800">Budget: <span className="font-bold text-blue-500">{props.budget}$</span></p>
</div>
<div className="mt-2 py-2 bg-gray-100 rounded-md">
  <p className="text-sm font-bold text-red-500">Deadline: <span>{props.deadline} Days</span></p>
</div>
</div>


  )
}
