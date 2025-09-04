// src/pages/ForgotPassword.jsx
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your registered email");
      return;
    }

    // TODO: Integrate with backend to send reset email
    alert("Password reset link sent to your email.");
    navigate("/login");
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-title">Reset Password</h2>
      <form className="forgot-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Registered Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="forgot-buttons">
          <button type="submit" className="btn-primary">Send Reset Link</button>
          <button type="button" onClick={() => navigate("/login")} className="btn-outline">Back to Login</button>
        </div>
      </form>
    </div>
  );
}
