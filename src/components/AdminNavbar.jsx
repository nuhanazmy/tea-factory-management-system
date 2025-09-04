// src/components/AdminNavbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaLeaf, FaUsers, FaTruck, FaSignOutAlt } from "react-icons/fa";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role");
    localStorage.removeItem("username");
    navigate("/"); // redirect to home or login
    
  };

  return (
    <nav className="admin-navbar">
      <h3 className="admin-logo">🍃 TeaFactory Admin</h3>
      <ul className="admin-nav-links">
        <li>
          <NavLink to="/admin/tea" activeClassName="active-link">
            <FaLeaf className="nav-icon" /> Tea
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/dealers" activeClassName="active-link">
            <FaUsers className="nav-icon" /> Dealers
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/transport" activeClassName="active-link">
            <FaTruck className="nav-icon" /> Transport
          </NavLink>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="nav-icon" /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
