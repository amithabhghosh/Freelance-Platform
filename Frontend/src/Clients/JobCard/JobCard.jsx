import React from "react";
import { useNavigate } from "react-router-dom";


export const JobCard = (props) => {
  const navigate=useNavigate()
  return (


<div
  className="bg-white rounded-2xl p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full max-w-sm cursor-pointer border border-gray-200"
  onClick={() => navigate(`/client/job/${props.id}`)}
>

  <div className="flex justify-between items-center">
    <h3 className="text-xl font-semibold text-gray-800">{props.title}</h3>
    <span
      className={`px-3 py-1 rounded-full text-white text-xs font-semibold uppercase ${
        props.status.toLowerCase() === 'pending'
          ? 'bg-yellow-500'
          : props.status.toLowerCase() === 'assigned'
          ? 'bg-green-500'
          : 'bg-red-500'
      }`}
    >
      {props.status}
    </span>
  </div>


  <p className="text-sm text-gray-500 mt-2">{props.category}</p>

 
  <div className="flex justify-between mt-4 text-sm text-gray-700">
    <p>
      <strong className="text-gray-600">💰 Budget:</strong>{' '}
      <span className="text-gray-800 font-medium">{props.budget} $</span>
    </p>
    <p>
      <strong className="text-gray-600">⏳ Deadline:</strong>{' '}
      <span className="text-gray-800 font-medium">{props.deadline} Days</span>
    </p>
  </div>
</div>



  );
};


