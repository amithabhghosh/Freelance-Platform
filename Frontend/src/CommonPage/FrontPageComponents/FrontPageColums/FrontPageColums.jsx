import React from 'react';
// import './FrontPageColums.css';
import cardImage from '../../../assets/images/FreelancerCardImage.png'
import clientCardImage from '../../../assets/images/ClientCardImage.webp'
import { useNavigate } from 'react-router-dom';

export const FrontPageColums = () => {
  const navigate=useNavigate()
  return (



<div className="text-center mt-[100px] mb-[50px] px-4">
  <h2 className="text-[24px] sm:text-[28px] font-bold text-gray-800 mb-8 sm:mb-10">
    Find the Best Fit for You
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-center">
 
    <div
      className="w-full max-w-[320px] h-[420px] mx-auto rounded-[15px] bg-cover bg-center flex items-center justify-center relative overflow-hidden transition-transform duration-300 hover:scale-105 shadow-lg"
      style={{ backgroundImage: `url(${cardImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white font-bold text-center rounded-[15px] p-6">
        <p className="text-[20px] sm:text-[24px] drop-shadow-md mb-4 sm:mb-5">
          Turn Your Skills Into Income!
        </p>
        <li
          onClick={() => navigate("/freelancerLogin")}
          className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold text-base sm:text-lg py-3 px-5 sm:px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Get Started
        </li>
      </div>
    </div>

   
    <div
      className="w-full max-w-[320px] h-[420px] mx-auto rounded-[15px] bg-cover bg-center flex items-center justify-center relative overflow-hidden transition-transform duration-300 hover:scale-105 shadow-lg"
      style={{ backgroundImage: `url(${clientCardImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white font-bold text-center rounded-[15px] p-6">
        <p className="text-[20px] sm:text-[24px] drop-shadow-md mb-4 sm:mb-5">
          Hire Top Freelancers & Get Work Done!
        </p>
        <li
          onClick={() => navigate("/clientLogin")}
          className="bg-green-500 hover:bg-green-700 cursor-pointer text-white font-bold text-base sm:text-lg py-3 px-5 sm:px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Get Started
        </li>
      </div>
    </div>
  </div>
</div>




  );
};
