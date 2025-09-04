// src/components/DealerNavbar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaLeaf, FaHistory, FaSignOutAlt } from "react-icons/fa";
import "./DealerNavbar.css";

export default function DealerNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role");
    localStorage.removeItem("username");
    navigate("/"); // redirect to home or login
  };

  return (
    <nav className="dealer-navbar">
      <ul>
        <li className={location.pathname === "/dealer-dashboard" ? "active" : ""}>
          <Link to="/dealer-dashboard">
            <FaHome className="nav-icon" /> Dashboard
          </Link>
        </li>
        <li className={location.pathname === "/dealer/tea-types" ? "active" : ""}>
          <Link to="/dealer/tea-types">
            <FaLeaf className="nav-icon" /> Tea Types
          </Link>
        </li>
        <li className={location.pathname === "/dealer/orders" ? "active" : ""}>
          <Link to="/dealer/orders">
            <FaHistory className="nav-icon" /> Order History
          </Link>
        </li>
        <li>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="nav-icon" /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
