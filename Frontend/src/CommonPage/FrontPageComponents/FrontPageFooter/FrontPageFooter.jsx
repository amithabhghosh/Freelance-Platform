import React from 'react';

import logo from '../../../assets/images/jobo 1.png';
import { useNavigate } from 'react-router-dom';

export const FrontPageFooter = () => {
  const navigate=useNavigate()
  return (


<footer className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white py-8 sm:py-10 text-center flex flex-col items-center w-full px-6 sm:px-4">
  <div className="flex flex-col items-center gap-4 sm:gap-5 w-full max-w-screen-lg">
   
    <img src={logo} alt="Jobo Logo" className="max-w-[120px] sm:max-w-[150px] h-auto" />

 
    <ul className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-5 list-none p-0">
      {[
        { name: "Company", path: "/jobo" },
        { name: "Contact", path: "/job/contact" },
        { name: "Client", path: "/clientSignup" },
        { name: "Freelancer", path: "/freelancerSignup" },
      ].map((item, index) => (
        <li
          key={index}
          onClick={() => navigate(item.path)}
          className="text-white text-sm sm:text-base md:text-lg font-bold transition-colors duration-300 hover:text-[#00d4ff] cursor-pointer"
        >
          {item.name}
        </li>
      ))}
    </ul>

    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {["logo-instagram", "logo-facebook", "logo-reddit", "logo-whatsapp"].map((icon, index) => (
        <a
          key={index}
          href="#"
          className="text-white text-xl sm:text-2xl transition-transform duration-300 hover:text-[#00d4ff] hover:scale-110"
        >
          <ion-icon name={icon}></ion-icon>
        </a>
      ))}
    </div>
  </div>


  <div className="mt-6 text-center w-full max-w-screen-md px-4">
    <p className="text-base sm:text-lg md:text-xl font-bold">Jobo</p>
    <p className="text-xs sm:text-sm opacity-80 break-words">
      All Rights Reserved || &copy; Jobo International Ltd
    </p>
  </div>
</footer>



  );
};
