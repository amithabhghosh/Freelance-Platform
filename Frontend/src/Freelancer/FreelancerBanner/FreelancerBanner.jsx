import React from 'react'
import './FreelancerBanner.css'
import { useState, useEffect } from "react";
import freelanceBanner1 from '../../assets/images/FrontBanner1.jpg'
import freelanceBanner2 from  '../../assets/images/freelanceBanner2.jpg'
import frontBanner2 from '../../assets/images/ClientSignUpBanner.jpg'

const images=[
    freelanceBanner1,
    freelanceBanner2,
    frontBanner2
]
export const FreelancerBanner = () => {
   const [currentImage, setCurrentImage] = useState(0);
  
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
      }, []);
    
      return (
        <div className="banner">
          <div className="image-slider" style={{ backgroundImage: `url(${images[currentImage]})` }}></div>
          <div className="banner-content">
            <h1>Find the Best Jobs for Your Skills</h1>
            <p>Sent proposals to top professionals to Start Work And Get Paid</p>
            
          </div>
        </div>
      );
}
