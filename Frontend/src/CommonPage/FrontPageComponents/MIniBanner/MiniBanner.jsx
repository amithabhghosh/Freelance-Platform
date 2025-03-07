import React from 'react';
import { useNavigate } from 'react-router-dom';


export const MiniBanner = () => {
  const navigate=useNavigate()
  return (
 
    <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white text-center p-6 sm:p-10 my-12 mx-4 sm:mx-auto rounded-3xl max-w-lg sm:max-w-3xl flex flex-col items-center justify-center shadow-lg">
    <h2 className="text-xl sm:text-2xl font-bold mb-2 uppercase">
      Empower Your Business with Freelancers
    </h2>
    <p className="text-base sm:text-lg font-medium mb-4 sm:mb-5">
      Freelance services at your fingertips
    </p>
    <li
      onClick={() => navigate("/clientSignup")}
      className="bg-blue-500 text-white text-base sm:text-lg cursor-pointer font-bold px-5 sm:px-6 py-3 rounded-lg transition-all duration-300 hover:bg-blue-700 hover:scale-105"
    >
      Join Now
    </li>
  </div>
  



  );
};
