import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import GuestLogin from "./pages/GuestLogin";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TeaTypes from "./pages/TeaTypes";
import ForgotPassword from "./pages/ForgotPassword";
import OrderForm from "./pages/OrderForm";
import DealerDashboard from "./pages/dealer/DealerDashboard";
import DealerOrderHistory from "./pages/dealer/DealerOrderHistory";
import DealerTeaTypes from "./pages/dealer/DealerTeaTypes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTeaTypes from "./pages/admin/AdminTeaTypes";
import AdminDealers from "./pages/admin/AdminDealers";
import AdminTransport from "./pages/admin/AdminTransport";
import AdminTea from "./pages/admin/AdminTea";
import FactoryList from "./pages/FactoryList";
import DealerNavbar from "./components/DealerNavbar";
import AdminNavbar from "./components/AdminNavbar";
import "leaflet/dist/leaflet.css";


function AppRoutes() {
  const location = useLocation();
  const path = location.pathname;

  const isDealerRoute = path.startsWith("/dealer");
  const isAdminRoute = path.startsWith("/admin");

  return (
    <>
      {isDealerRoute && <DealerNavbar />}
      {isAdminRoute && <AdminNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/guest-login" element={<GuestLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tea-types" element={<TeaTypes />} />
        <Route path="/dealer/tea-types" element={<DealerTeaTypes />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dealers/factories/:teaType" element={<FactoryList />} />
        <Route path="/dealer/order/:factoryId" element={<OrderForm />} />
        <Route path="/dealer-dashboard" element={<DealerDashboard />} />
        <Route path="/dealer/orders" element={<DealerOrderHistory />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tea-types" element={<AdminTeaTypes />} />
        <Route path="/admin/dealers" element={<AdminDealers />} />
        <Route path="/admin/transport" element={<AdminTransport />} />
        <Route path="/admin/tea" element={<AdminTea />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
