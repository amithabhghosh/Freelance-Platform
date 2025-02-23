import React, { useContext } from 'react'
import './ClientNavbar.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import avatar from '../../assets/images/avatar.jpg'
import logo from '../../assets/images/Navbarlogo.png'

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ContextAPI } from '../../ContextAPI/ContextAPI';
export const ClientNavbar = () => {
  const navigate=useNavigate()
const {clientToken,setClientToken,clientData,setClientData}=useContext(ContextAPI)
  const image=clientData.profile
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
 
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    const closeMenu = () => {
      setIsOpen(false);
     
    };
    const logout=()=>{
      setClientToken("")
      localStorage.removeItem("clientToken")
     
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
            <Link to="/clientDashboard" className="nav-item" onClick={closeMenu}>Dashboard</Link>
              <Link to="/jobs" className="nav-item" onClick={closeMenu}>Jobs</Link>
              <Link to="/client/proposals" className="nav-item" onClick={closeMenu}>Proposals</Link>
              <Link to="/orders" className="nav-item" onClick={closeMenu}>Orders</Link>
              <div className="profile-section">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="profile-button">
                  <img src={!image?avatar:image} alt="Profile" className="profile-avatar" />
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/clientProfile" className="dropdown-item" onClick={closeMenu}>Profile</Link>
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
