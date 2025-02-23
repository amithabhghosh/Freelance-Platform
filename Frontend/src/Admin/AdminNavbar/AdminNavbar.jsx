import React, { useContext, useState } from "react";
import "./AdminNavbar.css";
import logo from "../../assets/images/NavbarLogo.png";
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
    <nav className="adminNavbar">
      <div className="adminLO">
        <img src={logo} alt="Logo" />
      </div>

      <div className={`adminNavbarList ${menuOpen ? "open" : ""}`}>
        <Link to="/adminFreelancers">All Freelancers</Link>
        <Link to="/adminClients">All Clients</Link>
        <Link to="/adminJobs">All Jobs</Link>
        <Link to="/earnings">Earnings</Link>
        <button className="logoutBtn" onClick={logout}>Logout</button>
      </div>

      <div className="menuIcon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};
