import { useState, useEffect } from 'react';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/orders/all') // Get all orders
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  const updateOrderStatus = async (orderId, status, vehicle, link) => {
    await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        vehicle_assigned: vehicle,
        tracking_link: link
      })
    });
    alert('Order updated!');
  };

  return (
    <div>
      <h2>Manage Orders</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Dealer</th><th>Status</th><th>Assign</th></tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.dealer_name}</td>
              <td>{order.status}</td>
              <td>
                <input type="text" placeholder="Vehicle" id={`veh-${order.id}`} />
                <input type="text" placeholder="Tracking Link" id={`track-${order.id}`} />
                <select id={`status-${order.id}`}>
                  <option>Processing</option>
                  <option>On the Way</option>
                  <option>Delivered</option>
                </select>
                <button
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      document.getElementById(`status-${order.id}`).value,
                      document.getElementById(`veh-${order.id}`).value,
                      document.getElementById(`track-${order.id}`).value
                    )
                  }
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
