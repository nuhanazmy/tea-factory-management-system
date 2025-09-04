import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaEye } from "react-icons/fa";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-background">
      <div className="home-container">
        <h1 className="home-title">Tea Factory Management System</h1>

        <p className="home-intro">
          Welcome! This system connects tea factories and dealers to manage orders, inventory, and logistics efficiently.
        </p>

        <section className="home-section">
          <h2>How to Use</h2>
          <ul>
            <li><strong>Admins:</strong> Manage tea stock, deliveries, and logistics.</li>
            <li><strong>Dealers:</strong> Search, reserve, and purchase tea online.</li>
            <li><strong>Guests:</strong> View the system demo with limited access.</li>
          </ul>
        </section>

        <section className="home-section">
          <h2>Benefits</h2>
          <ul>
            <li>Real-time inventory updates</li>
            <li>Live delivery tracking</li>
            <li>Fuel usage monitoring</li>
            <li>Secure, user-friendly platform</li>
            <li>Streamlined communication between dealers and factories</li>
          </ul>
        </section>

        <div className="home-buttons">
          <button className="btn-outline" onClick={() => navigate("/guest-login")}>
            <FaEye /> Try as Guest
          </button>
          <button className="btn-primary" onClick={() => navigate("/register")}>
            <FaUserPlus /> Register
          </button>
          <button className="btn-primary" onClick={() => navigate("/login")}>
            <FaSignInAlt /> Login
          </button>
        </div>

        <p className="home-footer-text">
          Guests have read-only access to explore the system.
        </p>
      </div>
    </div>
  );
}
