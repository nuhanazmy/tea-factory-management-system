import { useEffect, useState } from "react";
import "../../styles/AdminOrderReport.css";

export default function AdminOrderReport() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders/all");
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        } else {
          alert("Failed to fetch all orders.");
        }
      } catch (err) {
        console.error(err);
        alert("Error loading admin orders.");
      }
    };

    fetchAllOrders();
  }, []);

  const generatePDF = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reports/orders");

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all_orders_report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error:", err.message);
      alert("Failed to generate report.");
    }
  };

  return (
    <div>
      <h2>Admin Order Report</h2>
      <button onClick={generatePDF}>Download PDF</button>
      <table>
        <thead>
          <tr>
            <th>Factory</th>
            <th>Tea</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.factory_name}</td>
              <td>{o.tea_type}</td>
              <td>{o.quantity_kg}</td>
              <td>Rs. {o.total_price}</td>
              <td>{o.payment_method}</td>
              <td>{o.status || "Pending"}</td>
              <td>{new Date(o.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
