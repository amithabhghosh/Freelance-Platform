import React from 'react'

import logo from '../../assets/images/jobo 1.png'
import { useNavigate } from 'react-router-dom'
export const AdminJobCard = (props) => {
  const navigate=useNavigate()
  return (
//     <div className='AdminJobCard'>
//         <div className="adminJobLogo">
//             <img src={logo} alt="" />
//         </div>
// <div className="jobCrad">
//     <p>Title: <span>{props.title}</span></p>
    
//     <p>Budget: <span>{props.budget}</span>$</p>
// <p>status: <span>{props.status}</span></p>
// </div>
// <div className="deadline">
//     <p>Deadline: <span>{props.deadline} Days</span></p>
// </div>
//     </div>


<div className="w-full max-w-sm bg-white rounded-lg shadow-md border-l-4 border-blue-500 p-4 text-center mx-auto transition-transform duration-300 hover:-translate-y-1" onClick={()=>navigate(`/admin/job/${props.id}`)}>
{/* Logo Section */}
<div className="flex justify-center mb-4">
  <img src={logo} alt="Job Logo" className="w-12 h-auto" />
</div>

{/* Job Details */}
<div className="text-gray-700 font-medium space-y-2">
  <p>
    Title: <span className="font-bold text-blue-600">{props.title}</span>
  </p>
  <p>
    Budget: <span className="font-bold text-blue-600">${props.budget}</span>
  </p>
  <p>
    Status:{" "}
    <span
      className={`font-bold ${
        props.status === "Completed" ? "text-green-600" : "text-red-500"
      }`}
    >
      {props.status}
    </span>
  </p>
</div>

{/* Deadline Section */}
<div className="mt-4 p-2 bg-gray-100 rounded-md">
  <p className="text-sm font-bold text-red-500">Deadline: {props.deadline} Days</p>
</div>
</div>


  )
}
