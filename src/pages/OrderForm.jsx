import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/OrderForm.css";

export default function OrderForm() {
  const { factoryId } = useParams();
  const navigate = useNavigate();

  const [dealerName, setDealerName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [amountKg, setAmountKg] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [factory, setFactory] = useState(null);
  const dealerId = localStorage.getItem("user_id");

  useEffect(() => {
    async function fetchFactory() {
      try {
        const response = await fetch(`http://localhost:5000/api/factories/${factoryId}`); // ✅ fixed line

        if (!response.ok) {
          throw new Error("Factory not found");
        }

        const data = await response.json();
        setFactory(data);
      } catch (error) {
        alert(error.message);
        navigate(-1); // Go back
      }
    }

    fetchFactory();
  }, [factoryId, navigate]);

  const totalPrice = amountKg ? amountKg * (factory?.pricePerKg || 0) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      tea_type_id: factory?.tea_type_id,
      factory_id: parseInt(factoryId),
      dealer_id: parseInt(dealerId),
      quantity_kg: parseFloat(amountKg),
      total_price: parseFloat(totalPrice),
      payment_method: paymentMethod,
      status: "pending",
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Order submission failed");
      }

      alert("Order placed successfully!");
      navigate("/dealer-dashboard");
    } catch (err) {
      alert("Error placing order: " + err.message);
      console.error(err);
    }
  };

  if (!factory) return <p>Loading factory...</p>;

  return (
    <div className="order-container">
      <h2 className="order-title">Place Order</h2>
      <div className="factory-summary">
        <p><strong>Factory:</strong> {factory.name}</p>
        <p><strong>Tea Type:</strong> {factory.teaType}</p>
        <p><strong>Quality:</strong> {factory.quality}</p>
        <p><strong>Price per kg:</strong> Rs. {factory.pricePerKg}</p>
      </div>

      <form className="order-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Dealer/Organization Name"
          value={dealerName}
          onChange={(e) => setDealerName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount (kg)"
          value={amountKg}
          onChange={(e) => setAmountKg(e.target.value)}
          min="1"
          required
        />

        <div className="total-price">
          Total: Rs. <strong>{totalPrice}</strong>
        </div>

        <div className="payment-method">
          <label>
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              value="gateway"
              checked={paymentMethod === "gateway"}
              onChange={() => setPaymentMethod("gateway")}
            />
            Online Payment
          </label>
        </div>

        <div className="order-buttons">
          <button type="submit" className="btn-primary">
            Confirm Order
          </button>
          <button type="button" onClick={() => navigate(-1)} className="btn-outline">
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
