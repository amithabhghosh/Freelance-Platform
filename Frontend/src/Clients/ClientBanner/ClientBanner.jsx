import React from 'react'
import './ClientBanner.css'
import { useState, useEffect } from "react";
import frontBanner from '../../assets/images/FrontBanner1.jpg'
import frontBanner2 from '../../assets/images/ClientSignUpBanner.jpg'
import frontBanner3 from '../../assets/images/SignUpCover.jpg'
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
      <div className="banner">
        <div className="image-slider" style={{ backgroundImage: `url(${images[currentImage]})` }}></div>
        <div className="banner-content">
          <h1>Find the Best Freelancers for Your Job</h1>
          <p>Post a job and get proposals from top professionals.</p>
          <button className="post-job" onClick={toJobPage}>Post Job</button>
        </div>
      </div>
    );
}
