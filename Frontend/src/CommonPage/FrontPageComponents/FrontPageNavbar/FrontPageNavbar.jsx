import React, { useState } from 'react';
import './FrontPageNavbar.css';
import logo from '../../../assets/images/Navbarlogo.png';
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
    <div className='frontPageNavbar'>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      <ul className={`frontNavList ${menuOpen ? 'active' : ''}`}>
        <li>Company</li>
        <li>About</li>
        <li onClick={Client}>Client</li>
        <li onClick={freelancer}>Freelancer</li>
      </ul>
    </div>
  );
};
