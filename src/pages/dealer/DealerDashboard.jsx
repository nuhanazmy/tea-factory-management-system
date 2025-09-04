import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import "../../styles/DealerDashboard.css";

export default function DealerDashboard() {
  const [orders, setOrders] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const id = decoded?.id;

        console.log("Dealer ID:", id);

        const response = await fetch(`http://localhost:5000/api/orders/dealer/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          alert(data.error || "Failed to fetch orders");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const visibleOrders = showAll ? orders : orders.slice(0, 3);

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div className="dealer-dashboard">
      <div className="dealer-dashboard-container">
        <h2>{showAll ? "Your Order History" : "Recent Orders"}</h2>
        <table className="recent-orders table">
          <thead>
            <tr>
              <th>Factory</th>
              <th>Tea Type</th>
              <th>Quantity (kg)</th>
              <th>Total Price</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((o) => (
              <tr key={o.id}>
                <td>{o.factory_name}</td>
                <td>{o.tea_type}</td>
                <td>{o.quantity_kg}</td>
                <td>Rs. {o.total_price}</td>
                <td>{o.payment_method === "cash" ? "Cash on Delivery" : "Online Payment"}</td>
                <td>{o.status || "Pending"}</td>
                <td>{new Date(o.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Recent Orders" : "Show Full History"}
        </button>
      </div>
    </div>
  );
}
