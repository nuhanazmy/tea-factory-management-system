import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPaperPlane, FaEraser, FaHome } from "react-icons/fa";
import "../styles/GuestLogin.css";

export default function GuestLogin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleClear = () => {
    setUsername("");
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && email.trim()) {
      alert("Guest login successful!");
      navigate("/guest-dashboard");
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="guest-container">
      <h2 className="guest-title">Guest Login</h2>

      <form className="guest-form" onSubmit={handleSubmit}>
        <label htmlFor="username"><FaUser style={{ marginRight: "6px" }} /> Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="email"><FaEnvelope style={{ marginRight: "6px" }} /> Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <div className="guest-buttons">
          <button type="submit" className="btn-primary">
            <FaPaperPlane style={{ marginRight: "6px" }} /> Submit
          </button>
          <button type="button" onClick={handleClear} className="btn-outline">
            <FaEraser style={{ marginRight: "6px" }} /> Clear
          </button>
          <button type="button" onClick={() => navigate("/")} className="btn-outline">
            <FaHome style={{ marginRight: "6px" }} /> Back to Home
          </button>
        </div>
      </form>

      <p className="guest-note">Guest users can only view the system as read-only.</p>
    </div>
  );
}
