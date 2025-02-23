import React, { useContext } from 'react'
import './FreelancerNavbar.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import avatar from '../../assets/images/avatar.jpg'
import logo from '../../assets/images/Navbarlogo.png'

import { useNavigate } from 'react-router-dom';
import { ContextAPI } from '../../ContextAPI/ContextAPI';
export const FreelancerNavbar = () => {
  const navigate=useNavigate()
  const {freelancerToken,setFreelancerToken,freelancerData,setFreelancerData}=useContext(ContextAPI)
    
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
  const image=freelancerData.profile
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    const closeMenu = () => {
      setIsOpen(false);

    };
  const logout=()=>{
    setFreelancerToken("")
    localStorage.removeItem("freelancerToken")
      toast.success("LOGOUT SUCCESSFULL") 
  }
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <img className="logo" src={logo}/>
            <span className="menu-button" onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </span>
            <div className={`nav-links ${isOpen ? "active" : ""}`}>
            <Link to="/freelancerDashboard" className="nav-item" onClick={closeMenu}>Dashboard</Link>
              <Link to="/freelancer/proposals" className="nav-item" onClick={closeMenu}>Proposals</Link>
              <Link to="/proposals" className="nav-item" onClick={closeMenu}>My Work</Link>
              <Link to="/orders" className="nav-item" onClick={closeMenu}>Earnings</Link>
              <div className="profile-section">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="profile-button">
                  <img src={!image?avatar:image} alt="Profile" className="profile-avatar" />
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/freelancerProfile" className="dropdown-item" onClick={closeMenu}>Profile</Link>
                    <Link className="dropdown-item" onClick={logout}>Logout</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
}
