// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";
import {
  Leaf,
  Users,
  Truck,
  FileText,
  MapPin
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const generateReport = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/reports/orders", {
      method: "GET",
      headers: {
        Accept: "application/pdf"
      }
    });

    if (!response.ok) throw new Error("Failed to generate report");

    const blob = await response.blob();

    // Create a new File object to hint the browser to open Save As dialog
    const file = new File([blob], "orders_report.pdf", { type: "application/pdf" });

    // Create a blob URL
    const url = window.URL.createObjectURL(file);

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;

    // Use MouseEvent to simulate a click (more consistent across browsers)
    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true
    });

    link.dispatchEvent(clickEvent);

    // Clean up
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error generating report:", err);
    alert("Error generating report: " + err.message);
  }
};



  return (
    <div className="admin-container">
      <h1 className="admin-title">Factory Admin Dashboard</h1>
      <p className="admin-subtitle">
        Manage your tea inventory, dealers, transport, and reports
      </p>

      <div className="admin-grid">
        <div className="admin-card" onClick={() => navigate("/admin/tea-types")}>
          <Leaf className="admin-icon" size={32} />
          <h3>Manage Tea Types</h3>
          <p>Add, update, or remove tea varieties</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/dealers")}>
          <Users className="admin-icon" size={32} />
          <h3>Manage Dealers</h3>
          <p>View and manage registered dealers</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/transport")}>
          <Truck className="admin-icon" size={32} />
          <h3>Transport & Logistics</h3>
          <p>Update vehicle and delivery info</p>
        </div>

        <div className="admin-card" onClick={generateReport}>
          <FileText className="admin-icon" size={32} />
          <h3>Download Orders Report</h3>
          <p>Generate and download order reports PDF</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/tracking")}>
          <MapPin className="admin-icon" size={32} />
          <h3>Live Tracking</h3>
          <p>Monitor delivery vehicle locations</p>
        </div>
      </div>
    </div>
  );
}
