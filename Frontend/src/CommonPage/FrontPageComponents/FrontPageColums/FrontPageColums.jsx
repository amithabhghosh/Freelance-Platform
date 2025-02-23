import React from 'react';
import './FrontPageColums.css';

export const FrontPageColums = () => {
  return (
    <div className="frontPageSection">
    
      <h2 className="section-heading">Find the Best Fit for You</h2>
      
      <div className="frontPageColums">
    
        <div className="freelancerCard">
          <div className="overlay">
            <p>Turn Your Skills Into Income!</p>
            <a href="" className="cta-button">Get Started</a>
          </div>
        </div>

        <div className="clientCard">
          <div className="overlay">
            <p>Hire Top Freelancers & Get Work Done!</p>
            <a href="" className="cta-button">Get Started</a>
          </div>
        </div>
      </div>
    </div>
  );
};
