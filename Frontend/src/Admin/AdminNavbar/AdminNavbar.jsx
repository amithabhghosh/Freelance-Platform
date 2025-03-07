import React, { useContext, useState } from "react";

import logo from "../../assets/images/jobo 1.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { ContextAPI } from "../../ContextAPI/ContextAPI";
import { toast } from "react-toastify";

export const AdminNavbar = () => {
    const navigate=useNavigate()
    const {adminToken,setAdminToken}=useContext(ContextAPI)
  const [menuOpen, setMenuOpen] = useState(false);
  
const logout=()=>{
    setAdminToken("")
    
localStorage.removeItem("adminToken")
toast.success("Logout Successfull")
navigate("/adminLogin")

}
  return (
 

    <nav className="fixed top-0 left-0 w-full bg-white shadow-md flex justify-between items-center px-6 py-4 z-50">
  
    <div className="flex-shrink-0">
      <img src={logo} alt="Logo" className="h-12 cursor-pointer" onClick={()=>navigate("/adminFreelancers")}/>
    </div>

  
    <div
      className={`absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 p-4 transition-all duration-300 md:relative md:flex-row md:top-auto md:w-auto md:shadow-none md:p-0 md:gap-6 ${
        menuOpen ? "flex" : "hidden"
      } md:flex`}
    >
      <Link to="/adminFreelancers" className="text-gray-800 font-semibold hover:text-blue-600">
        Freelancers
      </Link>
      <Link to="/adminClients" className="text-gray-800 font-semibold hover:text-blue-600">
        Clients
      </Link>
      <Link to="/adminJobs" className="text-gray-800 font-semibold hover:text-blue-600">
        Jobs
      </Link>
      <Link to="/admin/earnings" className="text-gray-800 font-semibold hover:text-blue-600">
        Earnings
      </Link>
      <Link to="/admin/addAdmin" className="text-gray-800 font-semibold hover:text-blue-600">
        Admins
      </Link>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition-all duration-300"
        onClick={logout}
      >
        Logout
      </button> 
  
    </div>

    {/* Mobile Menu Icon */}
    <div className="text-2xl cursor-pointer md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
      {menuOpen ? <FaTimes /> : <FaBars />}
    </div>
  </nav>



  );
};
