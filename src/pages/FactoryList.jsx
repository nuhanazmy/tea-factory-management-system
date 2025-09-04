import  "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/FactoryList.css";

export default function FactoryList() {
  const navigate = useNavigate();
  const { teaType } = useParams(); // from route param like /dealers/factories/BOPF

  const factoryData = [
    {
      id: 1,
      name: "Green Valley Factory",
      quality: "High",
      quantity: 500,
      price: 750,
      transportAvailable: true,
    },
    {
      id: 2,
      name: "Mountain Leaf Tea Co.",
      quality: "Medium",
      quantity: 300,
      price: 690,
      transportAvailable: false,
    },
  ];

  return (
    <div className="factory-container">
      <h2 className="factory-title">Factories Offering {teaType} Tea</h2>
      <div className="factory-list">
        {factoryData.map((factory) => (
          <div className="factory-card" key={factory.id}>
            <h3>{factory.name}</h3>
            <p><strong>Quality:</strong> {factory.quality}</p>
            <p><strong>Available Quantity:</strong> {factory.quantity} kg</p>
            <p><strong>Price per kg:</strong> Rs. {factory.price}</p>
            <p><strong>Transport:</strong> {factory.transportAvailable ? "Available" : "Not Available"}</p>
            <button 
              className="btn-primary" 
              onClick={() => navigate(`/dealer/order/${factory.id}`)}
            >
              View Details / Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
