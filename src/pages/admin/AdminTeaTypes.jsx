import { useEffect, useState } from "react";
import "../../styles/AdminTea.css";
import "../../components/AdminNavbar";

export default function AdminTea() {
  const [teaList, setTeaList] = useState([]);
  const [newTea, setNewTea] = useState({ name: "", quality: "", quantity: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch tea types from backend
  useEffect(() => {
    fetchTeaTypes();
  }, []);

  const fetchTeaTypes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tea-types");
      const data = await res.json();
      setTeaList(data);
    } catch (err) {
      console.error("Error fetching tea types:", err);
    }
  };

  const handleInputChange = (e) => {
    setNewTea({ ...newTea, [e.target.name]: e.target.value });
  };

  const addOrUpdateTea = async (e) => {
    e.preventDefault();
    const { name, quality, quantity, price } = newTea;

    if (!name || !quality || !quantity || !price) {
      alert("Please fill all fields");
      return;
    }

    const teaData = {
      name,
      quality,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };

    try {
      if (editingId !== null) {
        // Update existing tea
        await fetch(`http://localhost:5000/api/tea-types/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(teaData),
        });
        setEditingId(null);
      } else {
        // Add new tea
        await fetch("http://localhost:5000/api/tea-types", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(teaData),
        });
      }
      setNewTea({ name: "", quality: "", quantity: "", price: "" });
      fetchTeaTypes(); // Refresh list
    } catch (err) {
      console.error("Error saving tea type:", err);
    }
  };

  const deleteTea = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tea-types/${id}`, {
        method: "DELETE",
      });
      fetchTeaTypes();
    } catch (err) {
      console.error("Error deleting tea:", err);
    }
  };

  const editTea = (tea) => {
    setNewTea({
      name: tea.name,
      quality: tea.quality,
      quantity: tea.quantity,
      price: tea.price,
    });
    setEditingId(tea.id);
  };

  return (
    <div className="tea-container">
      <h2 className="tea-title">Manage Tea Types</h2>

      <form className="tea-form" onSubmit={addOrUpdateTea}>
        <input
          type="text"
          name="name"
          placeholder="Tea Name"
          value={newTea.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="quality"
          placeholder="Quality (High/Medium/Low)"
          value={newTea.quality}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity (kg)"
          value={newTea.quantity}
          onChange={handleInputChange}
          min="0"
        />
        <input
          type="number"
          name="price"
          placeholder="Price per kg"
          value={newTea.price}
          onChange={handleInputChange}
          min="0"
          step="0.01"
        />
        <button type="submit" className="btn-primary">
          {editingId !== null ? "Update Tea" : "Add Tea"}
        </button>
      </form>

      <table className="tea-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quality</th>
            <th>Quantity (kg)</th>
            <th>Price (Rs/kg)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teaList.map((tea) => (
            <tr key={tea.id}>
              <td>{tea.name}</td>
              <td>{tea.quality}</td>
              <td>{tea.quantity}</td>
              <td>{parseFloat(tea.price).toFixed(2)}</td>
              <td className="action-buttons">
                <button className="btn-edit" onClick={() => editTea(tea)}>Edit</button>
                <button className="btn-delete" onClick={() => deleteTea(tea.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
