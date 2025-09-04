// src/pages/AdminDealers.jsx
import { useState, useEffect } from "react";
import "../../styles/AdminDealers.css";
import "../../components/AdminNavbar";

export default function AdminDealers() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dealer data from backend API
  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dealers");
        if (!res.ok) throw new Error("Failed to fetch dealers");
        const data = await res.json();
        setDealers(data);
      } catch (error) {
        console.error(error);
        setDealers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, []);

  const toggleStatus = async (id) => {
    // Optional: Call backend API to update dealer active status
    try {
      // Find current dealer
      const dealer = dealers.find((d) => d.id === id);
      if (!dealer) return;

      // Toggle status locally first (optimistic UI)
      setDealers((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, active: !d.active } : d
        )
      );

      // Call API to update status
      const res = await fetch(`http://localhost:5000/api/dealers/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !dealer.active }),
      });

      if (!res.ok) throw new Error("Failed to update status");
    } catch (error) {
      alert("Failed to update status");
      console.error(error);
      // Revert state on failure
      setDealers((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, active: !d.active } : d
        )
      );
    }
  };

  const deleteDealer = async (id) => {
    if (window.confirm("Are you sure you want to remove this dealer?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/dealers/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete dealer");

        setDealers((prev) => prev.filter((d) => d.id !== id));
      } catch (error) {
        alert("Failed to delete dealer");
        console.error(error);
      }
    }
  };

  if (loading) return <p>Loading dealers...</p>;

  return (
    <div className="dealers-container">
      <h2 className="dealers-title">Manage Dealers</h2>

      {dealers.length === 0 ? (
        <p>No dealers available.</p>
      ) : (
        <table className="dealers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dealers.map((dealer) => (
              <tr key={dealer.id}>
                <td>{dealer.id}</td>
                <td>{dealer.name}</td>
                <td>{dealer.contact}</td>
                <td>{dealer.email}</td>
                <td>
                  <span
                    className={
                      dealer.active ? "status active" : "status inactive"
                    }
                  >
                    {dealer.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-status"
                      onClick={() => toggleStatus(dealer.id)}
                    >
                      {dealer.active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteDealer(dealer.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
