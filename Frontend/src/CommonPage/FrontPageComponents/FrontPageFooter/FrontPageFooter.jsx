import React from 'react';
import './FrontPageFooter.css';
import logo from '../../../assets/images/Navbarlogo.png';

export const FrontPageFooter = () => {
  return (
    <footer className='frontPageFooter'>
      <div className="footer-top">
        <img src={logo} alt="Joboo Logo" className="footer-logo" />
        
        <ul className="footer-links">
          <li><a href="">Company</a></li>
          <li><a href="">About</a></li>
          <li><a href="">Client</a></li>
          <li><a href="">Freelancer</a></li>
        </ul>

        <div className="socialMediaLogos">
          <a href="" className="social-icon"><ion-icon name="logo-instagram"></ion-icon></a>
          <a href="" className="social-icon"><ion-icon name="logo-facebook"></ion-icon></a>
          <a href="" className="social-icon"><ion-icon name="logo-reddit"></ion-icon></a>
          <a href="" className="social-icon"><ion-icon name="logo-whatsapp"></ion-icon></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="companyName">Joboo</p>
        <p className="copyRight">All Rights Reserved || &copy; Joboo International Ltd</p>
      </div>
    </footer>
  );
};
