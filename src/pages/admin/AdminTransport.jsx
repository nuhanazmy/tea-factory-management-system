import { useState } from "react";
import "../../styles/AdminTransport.css";
import "../../components/AdminNavbar";

export default function AdminTransport() {
  const [vehicles, setVehicles] = useState([
    { id: 1, plate: "NB-1234", driver: "Ramesh", status: "Available", fuel: "75%" },
    { id: 2, plate: "CP-4567", driver: "Suresh", status: "On Delivery", fuel: "40%" },
  ]);

  const toggleStatus = (id) => {
    setVehicles(vehicles.map(v =>
      v.id === id ? { ...v, status: v.status === "Available" ? "On Delivery" : "Available" } : v
    ));
  };

  const handleDelete = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <div className="transport-container">
      <h2 className="transport-title">Transport Management</h2>
      <table className="transport-table">
        <thead>
          <tr>
            <th>Vehicle Plate</th>
            <th>Driver Name</th>
            <th>Status</th>
            <th>Fuel Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle.id}>
              <td>{vehicle.plate}</td>
              <td>{vehicle.driver}</td>
              <td>
                <span className={`status ${vehicle.status === "Available" ? "available" : "delivery"}`}>
                  {vehicle.status}
                </span>
              </td>
              <td>{vehicle.fuel}</td>
              <td>
                <div className="action-buttons">
                  <button className="btn-status" onClick={() => toggleStatus(vehicle.id)}>Toggle</button>
                  <button className="btn-delete" onClick={() => handleDelete(vehicle.id)}>Delete</button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
