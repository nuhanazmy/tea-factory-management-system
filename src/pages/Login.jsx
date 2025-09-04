import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import { User, Lock, LogIn, RotateCcw, Home } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClear = () => {
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Login response data:", data);

      if (response.ok) {
        alert("Login successful!");
        console.log("data",data)
        // Save token and user info to localStorage
        localStorage.setItem("token", data.token);             // JWT token
        localStorage.setItem("user_id", data.user.id);
        localStorage.setItem("user_role", data.user.role);
        localStorage.setItem("username", data.user.username);

        // Redirect based on role
        if (data.user.role === "dealer") {
          navigate("/dealer-dashboard");
        } else if (data.user.role === "factory_admin" || data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          alert("Unknown user role.");
        }
      } else {
        alert(data.error || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error during login.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">User Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">
          <User size={18} /> Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />

        <label htmlFor="password">
          <Lock size={18} /> Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />

        <div className="forgot-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <div className="login-buttons">
          <button type="submit" className="btn-primary">
            <LogIn size={18} /> Submit
          </button>
          <button type="button" onClick={handleClear} className="btn-outline">
            <RotateCcw size={18} /> Clear
          </button>
          <button type="button" onClick={() => navigate("/")} className="btn-outline">
            <Home size={18} /> Back to Home
          </button>
        </div>
      </form>
    </div>
  );
}
