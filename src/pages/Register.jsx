import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"; // Adjust path if needed

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: "",
    orgName: "",
    regNo: "",
    address: "",
    location: "",
    incharge: "",
    contact: "",
    email: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
          setFormData((prev) => ({
            ...prev,
            location
          }));
        },
        (error) => {
          alert("Failed to get location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert(`Registration failed: ${data.error}`);
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Server error during registration.");
    }
  };

  const handleClear = () => {
    setFormData({
      userType: "",
      orgName: "",
      regNo: "",
      address: "",
      location: "",
      incharge: "",
      contact: "",
      email: "",
      username: "",
      password: ""
    });
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-container">
        <h2 className="register-title">Register to Tea Factory System</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <label>User Type</label>
          <select name="userType" value={formData.userType} onChange={handleChange} required>
            <option value="">Select User Type</option>
            <option value="dealer">Dealer</option>
            <option value="factory">Factory Officer</option>
          </select>

          <label>Organization Name</label>
          <input type="text" name="orgName" value={formData.orgName} onChange={handleChange} required />

          <label>Registration Number</label>
          <input type="text" name="regNo" value={formData.regNo} onChange={handleChange} required />

          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />

          <label>Current Location (Auto-Fetched)</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Click 'Get Location'"
              required
              readOnly
              style={{ flex: 1 }}
            />
            <button type="button" onClick={handleGetLocation}>
              Get Location
            </button>
          </div>

          <label>Incharge Name</label>
          <input type="text" name="incharge" value={formData.incharge} onChange={handleChange} required />

          <label>Contact Number</label>
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />

          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <div className="register-buttons">
            <button type="button" className="btn-outline" onClick={handleClear}>Clear</button>
            <button type="submit" className="btn-primary">Register</button>
            <button type="button" className="btn-outline" onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </form>
      </div>
    </div>
  );
}
