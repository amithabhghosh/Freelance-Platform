import React, { useState } from 'react';
// import './FrontPageNavbar.css';
import logo from '../../../assets/images/jobo 1.png';
import { useNavigate } from 'react-router-dom';
export const FrontPageNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate()
const Client=()=>{
  navigate("/clientSignup")
}
const freelancer=()=>{
  navigate("/freelancerSignup")
}
  return (
    // <div className='frontPageNavbar'>
    //   <div className="logo">
    //     <img src={logo} alt="Logo" onClick={()=>navigate("/")}/>
    //   </div>
    //   <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
    //     ☰
    //   </div>
    //   <ul className={`frontNavList ${menuOpen ? 'active' : ''}`}>
    //     <li>Company</li>
    //     <li>About</li>
    //     <li onClick={Client}>Client</li>
    //     <li onClick={freelancer}>Freelancer</li>
    //   </ul>
    // </div>

<div className="fixed w-full top-0 left-0 bg-white shadow-md px-6 py-5 flex justify-between items-center z-50 h-20"> 
  
      <div className="ml-4 cursor-pointer">  
        <img src={logo} alt="Logo" className="h-16 md:h-14" onClick={() => navigate("/")} />
      </div>

      <div className="md:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      
      <ul className={`md:flex md:gap-8 absolute md:static top-[80px] right-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none flex-col md:flex-row text-center p-4 md:p-0 transition-all duration-300 ${menuOpen ? "flex" : "hidden"}`}>
        <li className="cursor-pointer text-lg font-medium text-gray-800 hover:text-blue-600" onClick={()=>navigate("/jobo")}>Company</li>
        <li className="cursor-pointer text-lg font-medium text-gray-800 hover:text-blue-600" onClick={()=>navigate("/job/contact")}>Contact</li>
        <li className="cursor-pointer text-lg font-medium text-gray-800 hover:text-blue-600" onClick={Client}>Client</li>
        <li className="cursor-pointer text-lg font-medium text-gray-800 hover:text-blue-600" onClick={freelancer}>Freelancer</li>
      </ul>
    </div>
  );
};
