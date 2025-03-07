import React, { useContext } from 'react'
// import './ClientNavbar.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import avatar from '../../assets/images/avatar.jpg'
import logo from '../../assets/images/jobo 1.png'

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
     navigate("/clientLogin")
      toast.success("LOGOUT SUCCESSFULL")
    
    }

    return (
      


      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center py-3">
        
 
        <img className="w-20 cursor-pointer" src={logo} alt="Logo" onClick={()=>navigate("/clientDashboard")} />

      
        <button className="lg:hidden text-gray-700 focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

     
        <div className={`absolute lg:static top-16 left-0 w-full bg-white lg:bg-transparent lg:flex items-center gap-6 lg:w-auto transition-all duration-300
          ${isOpen ? "flex flex-col shadow-md py-4" : "hidden lg:flex"}`}>
          
          <Link to="/clientDashboard" className="text-gray-700 hover:text-blue-500 transition" onClick={closeMenu}>Dashboard</Link>
          <Link to="/client/job/info" className="text-gray-700 hover:text-blue-500 transition" onClick={closeMenu}>Jobs</Link>
          <Link to="/client/proposals" className="text-gray-700 hover:text-blue-500 transition" onClick={closeMenu}>Proposals</Link>
          <Link to="/client/orders" className="text-gray-700 hover:text-blue-500 transition" onClick={closeMenu}>Orders</Link>

          
          <div className="relative">
            <button className="focus:outline-none" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img src={!image ? avatar : image} alt="Profile" className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer" />
            </button>

           
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
                <Link to="/clientProfile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-center" onClick={closeMenu}>Profile</Link>
                <button className="block w-full text-center cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={logout}>Logout</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>



    );
}
