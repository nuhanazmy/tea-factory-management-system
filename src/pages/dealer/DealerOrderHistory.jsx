import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../styles/DealerOrderHistory.css";

export default function DealerOrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first.");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const dealerId = decoded?.id;

        const response = await fetch(`http://localhost:5000/api/orders/dealer/${dealerId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          alert(data.error || "Failed to load orders");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Error fetching orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      <button className="btn-back" onClick={() => navigate("/dealer-dashboard")}>
        ← Back to Dashboard
      </button>

      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <table className="order-history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Factory</th>
              <th>Tea Type</th>
              <th>Quantity (kg)</th>
              <th>Total (Rs.)</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{`ORD${order.id}`}</td>
                <td>{order.factory_name}</td>
                <td>{order.tea_type}</td>
                <td>{order.quantity_kg}</td>
                <td>{order.total_price}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td className={`status ${order.status.toLowerCase().replace(" ", "-")}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
