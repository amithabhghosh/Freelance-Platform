import React, { useContext } from 'react'

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import avatar from '../../assets/images/avatar.jpg'
import logo from '../../assets/images/jobo 1.png'

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
    navigate("/freelancerLogin")
      toast.success("LOGOUT SUCCESSFULL") 
  }
    return (



<nav className="bg-white shadow-md fixed top-0 w-full z-50 py-2 md:py-3 px-6">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
  
    <img className="w-16 cursor-pointer" src={logo} alt="Logo" onClick={()=>navigate("/freelancerDashboard")} />

    
    <button className="md:hidden p-0 m-0" onClick={toggleMenu}>
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

   
    <div
      className={`absolute md:relative top-full md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none flex flex-col md:flex-row items-center gap-4 p-4 md:p-0 transition-all duration-300 ${
        isOpen ? "flex" : "hidden md:flex"
      }`}
    >
      <Link
        to="/freelancerDashboard"
        className="block text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer rounded-t-md"
        onClick={closeMenu}
      >
        Dashboard
      </Link>
      <Link
        to="/freelancer/proposals"
        className="block text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer rounded-t-md"
        onClick={closeMenu}
      >
        Proposals
      </Link>
      <Link
        to="/freelancer/Works"
        className="block text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer rounded-t-md"
        onClick={closeMenu}
      >
        My Work
      </Link>
      <Link
        to="/freelancer/earnings"
        className="block text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer rounded-t-md"
        onClick={closeMenu}
      >
        Earnings
      </Link>

   
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="focus:outline-none"
        >
          <img
            src={!image ? avatar : image}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
            <Link
              to="/freelancerProfile"
              className="block text-gray-700 text-center py-2 px-4 hover:bg-gray-100 hover:text-blue-600 cursor-pointer rounded-t-md"
              onClick={closeMenu}
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="block text-gray-700 text-center w-full py-2 px-4 hover:bg-red-100 hover:text-red-600 cursor-pointer rounded-b-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
</nav>



    );
}
