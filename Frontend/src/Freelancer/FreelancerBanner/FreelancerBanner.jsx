import React from 'react'

import { useState, useEffect } from "react";
import freelanceBanner1 from '../../assets/images/FrontBanner1.jpg'
import freelanceBanner2 from  '../../assets/images/freelancerBannerChatgpt2.webp'
import frontBanner2 from '../../assets/images/freelancerBannerChatgpt3.webp'

const images=[
    freelanceBanner1,
    freelanceBanner2,
    frontBanner2
]
export const FreelancerBanner = ({setSearchQuery}) => {
   const [currentImage, setCurrentImage] = useState(0);
  
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
      }, []);
    
      return (
 

<div className="relative w-full h-[70vh] sm:h-[80vh] flex items-center justify-center text-white overflow-hidden">
 
  <div
    className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1] animate-zoomEffect transition-transform duration-[5s] ease-in-out"
    style={{ backgroundImage: `url(${images[currentImage]})` }}
  ></div>


  <div className="relative bg-black/50 p-4 sm:p-6 md:p-10 rounded-lg text-center w-[90%] sm:w-auto max-w-2xl">
    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
      Find the Best Jobs for Your Skills
    </h1>
    <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
      Send proposals to top professionals to Start Work And Get Paid
    </p>

    <input
      type="text"
      placeholder="Search jobs..."
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full sm:max-w-lg px-3 sm:px-4 py-2 rounded-md border-none outline-none bg-white/20 backdrop-blur-md text-white placeholder-white text-base sm:text-lg"
    />
  </div>
</div>


      );
}
