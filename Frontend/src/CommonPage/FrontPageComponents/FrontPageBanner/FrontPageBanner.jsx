import React from 'react'
// import './FrontPageBanner.css'
import bannerImage from '../../../assets/images/FrontBanner1.jpg'
import { useNavigate } from 'react-router-dom'
export const FrontPageBanner = () => {
  const navigate=useNavigate()
  return (




<div
  className="mt-[120px] mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-20 h-[80vh] md:h-[90vh] rounded-[30px] relative flex justify-center items-center overflow-hidden bg-cover bg-center bg-no-repeat shadow-lg"
  style={{ backgroundImage: `url(${bannerImage})` }}
>
  <div className="absolute inset-0 rounded-[30px] bg-black/50"></div>

  <div className="relative text-center max-w-[90%] sm:max-w-[80%] z-10 px-4">
    <p className="text-white text-[28px] sm:text-[36px] md:text-[40px] lg:text-[50px] font-bold leading-[1.2] drop-shadow-lg">
      Scale your professional workforce <br className="hidden sm:block" /> with freelancers
    </p>
    <li
      onClick={() => navigate("/clientSignup")}
      className="mt-6 inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold text-base sm:text-lg md:text-xl py-3 px-6 sm:px-8 cursor-pointer rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
    >
      Get Started 🚀
    </li>
  </div>
</div>


  )
}
