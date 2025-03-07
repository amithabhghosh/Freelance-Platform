import React from 'react'
// import './ClientBanner.css'
import { useState, useEffect } from "react";
import frontBanner from '../../assets/images/FrontBanner1.jpg'
import frontBanner2 from '../../assets/images/clinetBnnerChatGpt.webp'
import frontBanner3 from '../../assets/images/freeelancerChatgpt1.webp'
import { useNavigate } from 'react-router-dom';


const images=[
    frontBanner,
    frontBanner2,
    frontBanner3
]
export const ClientBanner = () => {
  const navigate=useNavigate()
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }, []);
  
    const toJobPage=()=>{
      navigate("/postJob")
    }
    return (
  


      <div className="relative w-full h-[80vh] flex items-center justify-center text-white mt-16 overflow-hidden">
      
   
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      ></div>

     
      <div className="relative bg-black/50 p-6 rounded-lg text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4 md:text-3xl sm:text-2xl">Find the Best Freelancers for Your Job</h1>
        <p className="text-lg mb-6 md:text-base sm:text-sm">Post a job and get proposals from top professionals.</p>
        <button
          className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 text-lg rounded-md"
          onClick={toJobPage}
        >
          Post Job
        </button>
      </div>
    </div>


    );
}
